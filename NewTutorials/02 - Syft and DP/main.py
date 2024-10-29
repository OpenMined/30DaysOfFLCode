from syftbox.lib import Client
from pathlib import Path
import sys
import json
import diffprivlib.tools as dp


def compute_result(dataset):
    return dp.mean(
        dataset["data"],
        epsilon=dataset["eps"],
        bounds=dataset["bounds"],
    )


if __name__ == "__main__":
    client = Client.load()

    dataset_path = client.datasite_path / "datasets" / "dataset.json"
    result_path = client.datasite_path / "public" / "value.txt"

    if result_path.exists():
        print("\n========== Compute ==========\n")
        print("result file already exists. skipping execution...")
        print(f"to force a re-execution, delete the result file at {result_path}")
        print("\n=============================\n")
        sys.exit(0)

    if not dataset_path.exists() or not dataset_path.is_file():
        print("\n========== Compute ==========\n")
        print(f"dataset not found at {dataset_path}. skipping computation...")
        print("\n=============================\n")
        sys.exit(0)

    with open(dataset_path) as f:
        dataset = json.load(f)

    result = compute_result(dataset)

    with open(result_path, "w") as f:
        f.write(str(result))
