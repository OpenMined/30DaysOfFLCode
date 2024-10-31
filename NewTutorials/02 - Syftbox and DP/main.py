from syftbox.lib import Client
import sys
import json
import diffprivlib.tools as dp


def compute_value(dataset):
    return dp.mean(
        dataset["data"],
        epsilon=dataset["eps"],
        bounds=tuple(dataset["bounds"]),
    )


if __name__ == "__main__":
    client = Client.load()

    dataset_path = client.datasite_path / "datasets" / "dataset.json"
    value_path = client.datasite_path / "public" / "value.txt"

    if value_path.exists():
        print("\n========== Compute ==========\n")
        print("value.txt file already exists. skipping execution...")
        print(f"to force a re-execution, delete the value.txt file at {value_path}")
        print("\n=============================\n")
        sys.exit(0)

    if not dataset_path.exists() or not dataset_path.is_file():
        print("\n========== Compute ==========\n")
        print(f"dataset not found at {dataset_path}. skipping computation...")
        print("\n=============================\n")
        sys.exit(0)

    with open(dataset_path) as f:
        dataset = json.load(f)

    value = compute_value(dataset)

    with open(value_path, "w") as f:
        f.write(str(value))
