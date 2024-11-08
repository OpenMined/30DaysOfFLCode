from pathlib import Path
from syftbox.lib import Client
import os


# Iterate over a list of participants, looking for their /public/value.txt
# If they have the file, read it and aggregate in the total, otherwise, add the username in the missing list.
# Return both total value and missing list.
def aggregate(participants: list[str], datasite_path: Path):
    result = 0
    missing = []

    for user_folder in participants:
        value_file: Path = Path(datasite_path) / user_folder / "public" / "value.txt"

        if value_file.exists():
            with value_file.open("r") as file:
                result += float(file.read())
        else:
            missing.append(user_folder)

    return result, missing


# Return a list of all network peers
def network_participants(datasite_path: Path):
    exclude_dir = ["apps", ".syft"]

    entries = os.listdir(datasite_path)

    users = []
    for entry in entries:
        if Path(datasite_path / entry).is_dir() and entry not in exclude_dir:
            users.append(entry)

    return users


if __name__ == "__main__":
    client = Client.load()

    participants = network_participants(client.datasite_path.parent)

    result, missing = aggregate(participants, client.datasite_path.parent)
    print("\n====================\n")
    print("Total aggregation value: ", result)
    print("Missing value.txt peers: ", missing)
    print("\n====================\n")

    # Write the result to a public file
    result_path = client.datasite_path / "public" / "result.txt"
    with open(result_path, "w") as f:
        f.write(str(result))
