# Building Applications on SyftBox

_Author:_ <a>Ionesio Junior</a>

## Apps in Syftbox?

Although SyftBox is often described as `"Dropbox with permissions"` it is not designed as regular cloud storage. This project has a completely different goal: `enable developers to build PETs applications on top of it with minimal barriers`. Its new architecture emphasizes modularity, aiming to provide a development experience as intuitive and seamless as building applications for an operating system. Regardless of environment, programming language, or protocol, it should be as flexible and accessible as an OS file system.


In this tutorial, we’ll walk you through developing your first app.

## Basic Aggregator

Alright, let’s build our first app! We’ll dive into the use case and the code, and then break down what’s happening under the hood.

### Use case

In our first app, we’ll search for and aggregate a specific file value across the entire Syftbox network. This file may be located in the `/public` folder _(we’ll explore private folders later)_. If a peer doesn’t have this file, we’ll add them to a missing list.


Here’s what our `main.py` would look like:
```python
from pathlib import Path
from syftbox.lib import Client
import os

# Iterate over a list of participants, looking for their /public/value.txt
# If they have the file, read it and aggregate in the total, otherwise, add the username in the missing list.
# Return both total value and missing list.
def aggregate(participants: list[str], datasite_path: Path):
    total = 0  
    missing = []  

    for user_folder in participants:
        value_file: Path = Path(datasite_path) / user_folder / "public" / "value.txt"

        if value_file.exists():
            with value_file.open("r") as file:
                total += float(file.read())
        else:
            missing.append(user_folder)

    return total, missing

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

    total, missing = aggregate(participants, client.datasite_path.parent)
    print("\n====================\n")
    print("Total aggregation value: ", total)
    print("Missing value.txt peers: ", missing)
    print("\n====================\n")
```


Now, we need a `run.sh`

```shell
#!/bin/sh

# this will create venv from python version defined in .python-version
uv venv

# run app using python from venv
uv run main.py
```

Simply place both files in a folder, move it to `/SyftBox/apps`, and you're all set! You've just created your first app!


## How?

When developing on top of SyftBox, the emphasis is on modularity and flexibility. Applications should be designed in a way that allows them to be handled and integrated in multiple contexts. Currently, the first approach to implementing application logic is through our App Plugin system.

To get started, any folder inside `/app` is considered a valid application. Each app must include an entry point—a shell script named `run.sh`. This script serves as the main point of execution for the app, providing a clear and consistent structure for running applications on SyftBox.


Your Syftbox will likely have a folder structure like this:
```
/SyftBox
    /apps
        /application1
            run.sh
            main.py
        /application2
            run.sh
            main.c
            Makefile
        /application3
            run.sh
            main.js
    /user1@email.com
    /user2@email.com
    /user3@email.com
    /user4@email.com
```

Note: This is not the only way to design and develop apps on SyftBox. We are actively working on a better plugin system to enhance the development experience. For now, we recommend sticking with the basics.


### It's All About Files and Directories!

With Syftbox, the workflow is designed to be straightforward and efficient. Your applications run entirely within your local environment. From apps perspective, everything revolves around files and folders, which are shared, created, and managed right on your system.

### Running an App

To `add a new app to the system`, simply drag your app's folder (containing a `run.sh` file) into the `SyftBox/apps` folder. That's it! The App Plugin will handle the execution for you.


## What We’ve Learned

In this tutoral we've learned:

*   Syftbox is designed to support various types of PET applications in a highly flexible manner.
*   Files placed in public folders, like `/public`, are shared across the network and accessible to other peers.
*   Iteracting with the network is basically iteracting with a list of directories.
*   Simplicity is key: it's all about managing files and folders, without any hidden complexity.
*   Any folder placed in `/SyftBox/apps` will be recognized as a valid app and executed every 10 seconds.
*   `run.sh` dictates what will be executed.



## Conclusion
In this brief tutorial, we've explored the basics of Syftbox and created our first app! To spark some ideas for our next tutorial, consider the following questions:

* How can peers share anonymized information in this new paradigm? Is it possible to create an app for that?
* Instead of simply skipping peers with missing files, could we skip those with incorrect file formats, dataset formats, or other data constraints?
* What if, instead of sharing just a single number, peers chose to share model hyperparameters?
* What if, rather than only sharing a number, peers opted to share their datasets after applying differential privacy or homomorphic encryption?

There are many more questions and exciting possibilities within this new paradigm. We look forward to exploring this approach further. But for today, that’s a wrap! Thanks for following along, and see you in the next tutorial!