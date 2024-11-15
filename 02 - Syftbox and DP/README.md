# Syftbox and DP

_Author:_ Matei Simtinică

## Add a layer of privacy

Syftbox is designed to allow developers to analyze data while leveraging PETs, so let's walk through a brief example of how we could add a layer of anonymization on top of yesterday's aggregation app.

## Use case

The `aggregator` app simply aggregates public values stored on various datasites in `value.txt` files, but in a real-life scenario, those values would likely be computed from a _private_ dataset.

The computation applied on the dataset would be defined by a researcher who wants to run a study, but the participants to the study (who own the private datsets) want to make sure the results they'll make publicly available won't leak information about individual data points from the original dataset.

This is one of the simplest use-cases for using DP (Differential Privacy).

## Aggregator recap

Yesterday's `aggregator` app workflow looks something like this:

<p align="center">
    <img src="./assets/aggregator-workflow.png" width="500px"/>
</p>

The `aggregator` app runs on Datasite X (which we can associate with a _researcher_) and assumes other datasites have a `value.txt` file which is **public**, based on which it computes an aggregated result (in this case, their sum).

## Extend with DP

In a real-life scenario, that value could be computed from a _private dataset_. One issue with computing _public_ values from _private_ data is that aggregated outpus can unintentionally leak information about individual data points, exposing sensitive details if not carefully protected. DP (Differential Privacy) introduces noise in the results in a controlled way, ensuring that individual data points cannot be reverse-engineered or identified, thus preserving privacy without compromising the overall utility of the data. This is why we need DP.

<!-- **Note**: Check out [this short recap on DP](./DP_Recap.md) for more details on how this works. -->

In this tutorial we'll extend the `aggregator` workflow with another app, `dp_compute`, which will compute the public values (stored in `value.txt`) from a private dataset (`dataset.json`) on each participating datasite, using DP!

<p align="center">
    <img src="./assets/dp-workflow.png" width="500px"/>
</p>

**Important Observation**: `dp_compute` is designed to run on Datasites A, B and C (at the same time), while the `aggregator` app will only run on Datasite X.

We could dive deeper into how to configure the DP parameters, but for this tutorial let's assume they are stored alongside the dataset in each `dataset.json` file.

A private dataset could look like this:

```json
{
  "data": [1.2, 2.6, 0.9, 1, 1.3, 0.8, 2, 1.9],
  "eps": 1,
  "bounds": [1, 3]
}
```

The computation that generates the public value that takes part in the aggregation could be anything. For this tutorial we'll use the _mean_ value:

```py
import diffprivlib.tools as dp

def compute_result(dataset):
    return dp.mean(
        dataset["data"],
        epsilon=dataset["eps"],
        bounds=tuple(dataset["bounds"]),
    )
```

**Note**: `diffprivlib` is a Python library with various utilities for DP and needs to be installed (check out [their repository](https://github.com/IBM/differential-privacy-library?tab=readme-ov-file#setup) for more details on how to do that)

## Write the app

Having the workflow above in mind, we can scaffold an application that will compute the public values with DP:

```py
from syftbox.lib import Client
from pathlib import Path
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

    with open(dataset_path) as f:
        dataset = json.load(f)

    value = compute_value(dataset)

    with open(value_path, "w") as f:
        f.write(str(value))
```

Now, Syftbox runs an application every 10 seconds, meaning that an app with the code above will regenerate a different public value every 10 seconds (since DP uses randomly generated noise for each computation).

This could cause issues down the pipeline, so we can extend our application to take this into consideration with a simple rule: if `dataset.json` was _not_ modified (or it doesn't exist on the filesystem), skip the computation.

The checking logic needs to be dealt with _by our application_, so the new code will look like this:

```py
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
```

Notice how we added a new function, `check_dataset_modified`, which checks the timestamp of the file's last modification and compares it with the last remembered timestamp (stored in `dataset.timestamp`).

That's about it! We created an app on top of the `aggregator` workflow, which generates the values that are being aggregated from a _private_ dataset!

## Make sure it runs on Syftbox

Now that we have the main app logic, we need to make sure it can properly run on Syftbox.

We'll need two more files :

- `run.sh`, which is the entrypoint for every Syftbox app
- `requirements.txt`, to specify any dependencies required by our app

Our app uses the `syftbox` Python library and `diffprivlib` for DP, so `requirements.txt` will look like this:

```
syftbox
diffprivlib
```

Our entrypoint needs to make sure we run the app using the right Python environment (with the app's dependencies), so `run.sh` will look like this:

```sh
#!/usr/bin/env sh

# this will create a Python virtual environment
uv venv

# install the app's dependencies
uv pip install -r requirements.txt

# run app using the Python version from the virtual environment
uv run main.py
```

The directory structure of our `apps` directory should look like this:

```
/apps
├── ...
├── ... (other apps)
└── dp_compute
    ├── main.py
    ├── requirements.txt
    └── run.sh
```

## Final observations

We now have a workflow that involves _two_ applications:

- `aggregator`, running _on a researcher's datasite_ (Datasite X in the figure above), and computes an aggregated value from public values stored on _other_ datasites
- `dp_compute`, designed to run on _other datasites_, belonging to organizations or individuals willing to contribute with insights from their private data (Datasites A, B and C in the figure above), that computes _public values_ from _private data_ in a privacy-preserving manner

You can also find the contents of each file in this tutorial's directory:

- [`main.py`](./main.py)
- [`run.sh`](./run.sh)
- [`requirements.txt`](./requirements.txt)

## Conclusions

This tutorials outlines how you can create a workflow that uses DP on top of Syftbox to protect the privacy of the data on other datasites taking part in data analysis experiments.

For the purpose of this tutorial series, we kept it pretty simple, but you can extend it however you think best fits your use-case. See you in the next tutorial!
