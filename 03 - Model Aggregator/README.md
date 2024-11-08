# Syftbox and Model Aggregation for AI
Author: Ionesio Junior

## Extending the Aggregator Concept to AI Models
In the previous tutorial, we explored how Syftbox’s privacy-preserving aggregator works for combining values from private datasets. This time, we’ll apply that same aggregator framework to AI models, making it possible to build a federated model by aggregating parameters from multiple datasites without needing to share raw data.

## Use Case
Consider a scenario where we want to train an AI model to predict health outcomes based on datasets held by multiple organizations. Due to privacy concerns, these organizations can’t share their data directly, but they can each train local models. Using the aggregator, we can combine these local models into a single federated model, which leverages insights from all datasites while keeping each dataset private.

This federated approach not only preserves data privacy but also improves the model’s generalizability by drawing on more diverse data, all while avoiding the centralization of sensitive information.

## Model Aggregation Workflow
Similar to the previous setup, this workflow involves datasites (A, B, and C) training models on their own datasets and then sending only their model parameters (e.g., weights) to the aggregator running on Datasite X. The aggregator combines these parameters into a single federated model by averaging the weights across models.

Here’s the general workflow:
* Each datasite (A, B, and C) trains a model locally on its private dataset.
* The model aggregator on Datasite X then combines the model parameters into a federated model.

## Training Locally and Sharing Model Parameters
To keep things simple, we’ll assume the models are already trained and available in the network. We'll cover the details of training and sharing parameters in the next tutorial.

##  Model Aggregator App
If you recall the basic aggregator app, the workflow for aggregating models is very similar. The key differences are:

* Instead of looking for `value.txt`, we’re looking for `model.pth`.
* Instead of aggregating a single `float`, we’re aggregating `models`.

## How Model Aggregation Works
The model aggregator continuously monitors each datasite’s folder for updated model parameters. Once it detects updates from all datasites, it starts the aggregation process. Typically, model aggregation involves averaging the weights and biases layer-by-layer across models from all datasites.

Here’s the code in `main.py`:
```python
from pathlib import Path
from syftbox.lib import Client
import os
from datetime import datetime, timedelta
import json
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset


class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(28 * 28, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = x.view(-1, 28 * 28)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x


def aggregate_model(
    participants: list[str], datasite_path: Path, global_model_path: Path
):
    global_model = SimpleNN()
    global_model_state_dict = global_model.state_dict()

    aggregated_model_weights = {}

    n_peers = len(participants)
    for user_folder in participants:
        model_file: Path = Path(datasite_path) / user_folder / "public" / "model.pth"

        user_model_state = torch.load(str(model_file))
        for key in global_model_state_dict.keys():

            # Check for architecture mismatch
            if user_model_state.keys() != global_model_state_dict.keys():
                continue

            if aggregated_model_weights.get(key, None) is None:
                aggregated_model_weights[key] = user_model_state[key] * (1 / n_peers)
            else:
                aggregated_model_weights[key] += user_model_state[key] * (1 / n_peers)

    if aggregated_model_weights:
        global_model.load_state_dict(aggregated_model_weights)
        torch.save(global_model.state_dict(), str(global_model_path))
        return global_model
    else:
        return None


def peer_has_new_model(dataset_peer_path: Path) -> bool:
    model_path: Path = Path(dataset_peer_path / "public" / "model.pth")
    last_model_update: Path = Path(dataset_peer_path / "public" / "model_training.json")

    if model_path.is_file() and last_model_update.is_file():
        with open(str(last_model_update), "r") as model_info:
            model_info = json.load(model_info)

        last_trained_time = datetime.fromisoformat(model_info["last_train"])
        time_now = datetime.now()

        if (time_now - last_trained_time) <= timedelta(minutes=10):
            return True

    return False


def network_participants(datasite_path: Path):
    exclude_dir = ["apps", ".syft"]

    entries = os.listdir(datasite_path)

    users = []
    for entry in entries:
        user_path = Path(datasite_path / entry)
        is_excluded_dir = entry in exclude_dir

        is_valid_peer = user_path.is_dir() and not is_excluded_dir
        if is_valid_peer and peer_has_new_model(user_path):
            users.append(entry)

    return users


def time_to_aggregate(datasite_path: Path):
    last_round_file_path: Path = (
        Path(datasite_path) / "app_pipelines" / "fl_app" / "last_round.json"
    )
    fl_pipeline_path: Path = last_round_file_path.parent

    if not fl_pipeline_path.is_dir():
        os.makedirs(str(fl_pipeline_path))
        return True

    with open(str(last_round_file_path), "r") as last_round_file:
        last_round_info = json.load(last_round_file)

        last_trained_time = datetime.fromisoformat(last_round_info["last_train"])
        time_now = datetime.now()

        if (time_now - last_trained_time) >= timedelta(seconds=10):
            return True

    return False


def save_aggregation_timestamp(datasite_path: Path) -> None:
    last_round_file_path: Path = (
        Path(datasite_path) / "app_pipelines" / "fl_app" / "last_round.json"
    )
    with open(str(last_round_file_path), "w") as last_round_file:
        timestamp = datetime.now().isoformat()
        json.dump({"last_train": timestamp}, last_round_file)


def evaluate_global_model(global_model: nn.Module, dataset_path: Path) -> float:
    global_model.eval()

    # load the saved mnist subset
    images, labels = torch.load(str(dataset_path))

    # create a tensordataset
    dataset = TensorDataset(images, labels)

    # create a dataloader for the dataset
    data_loader = DataLoader(dataset, batch_size=64, shuffle=True)

    correct = 0
    total = 0
    with torch.no_grad():
        for images, labels in data_loader:
            outputs = global_model(images)
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
    accuracy = 100 * correct / total
    return accuracy


if __name__ == "__main__":
    client = Client.load()
    
    if not time_to_aggregate(client.datasite_path):
        print("It's not time for a new aggregation round,  skipping it for now.")
        exit()
    
    participants = network_participants(client.datasite_path.parent)
    
    global_model = None
    if len(participants) == 0:
        print("No new model found! Skipping aggregation...")
    else:
        print("Aggregating models between ", participants)

        global_model = aggregate_model(
            participants,
            client.datasite_path.parent,
            client.datasite_path / "public" / "global_model.pth",
        )

    if global_model:
        dataset_path = "./mnist_dataset.pt"
        accuracy = evaluate_global_model(global_model, dataset_path)
        print(f"Global model accuracy: {accuracy:.2f}%")

    save_aggregation_timestamp(client.datasite_path)
```

## Workflow Execution
Each part of the workflow has a unique role:

* Local training apps on datasites (A, B, and C) train local models and save parameters in model_params.json.
* Model aggregator app on Datasite X collects and aggregates these models into a single federated model.

This setup allows each datasite to contribute to a global model without ever sharing raw data, enhancing privacy while still enabling collaborative model training.

## Final Observations
With this setup:

* Each datasite contributes to a global model while keeping its data private.
* The aggregator app on Datasite X only needs access to the model parameters, not the datasets.
* This extends Syftbox’s aggregator functionality to support federated model training, enabling organizations to securely collaborate on AI.


In the next tutorial, we’ll cover advanced topics like controlling update frequencies and handling asynchronous updates. Stay tuned!

