from syftbox.lib import Client
import os
import sys
import json
import diffprivlib.tools as dp
from pathlib import Path


def compute_value(dataset):
    return dp.mean(
        dataset["data"],
        epsilon=dataset["eps"],
        bounds=tuple(dataset["bounds"]),
    )


def check_dataset_modified(dataset_path: Path):
    checkpoint_path = dataset_path.with_suffix(".timestamp")
    last_modified = os.stat(dataset_path).st_mtime

    # if there is no checkpoint file,
    # consider the dataset changed, since this is the first computation
    if not checkpoint_path.is_file():
        with open(checkpoint_path, "w") as f:
            f.write(str(last_modified))
        return True

    with open(checkpoint_path) as f:
        checkpoint = float(f.read())

    if last_modified == checkpoint:
        return False

    with open(checkpoint_path, "w") as f:
        f.write(str(last_modified))

    return True


if __name__ == "__main__":
    client = Client.load()

    dataset_path = client.datasite_path / "datasets" / "dataset.json"
    value_path = client.datasite_path / "public" / "value.txt"

    if not dataset_path.exists() or not dataset_path.is_file():
        print("\n========== Compute ==========\n")
        print(f"dataset not found at {dataset_path}. skipping computation...")
        print("\n=============================\n")
        sys.exit(0)

    if not check_dataset_modified(dataset_path):
        print("\n========== Compute ==========\n")
        print(f"dataset didn't change. skipping computation...")
        print("\n=============================\n")
        sys.exit(0)

    with open(dataset_path) as f:
        dataset = json.load(f)

    value = compute_value(dataset)

    with open(value_path, "w") as f:
        f.write(str(value))
