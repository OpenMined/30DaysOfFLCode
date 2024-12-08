import flwr as fl
from flwr.server import ServerConfig

from datasets import load_dataset

# Load a sample dataset, e.g., wikitext for language modeling
dataset = load_dataset("wikitext", "wikitext-2-raw-v1")


# Split the dataset for multiple clients
clients_data = []
for i in range(5):  # Assuming 5 clients for demonstration
    clients_data.append(dataset['train'].shard(num_shards=5, index=i))


# Define the strategy for federated learning
strategy = fl.server.strategy.FedAvg(
    min_fit_clients=1,  # Minimum number of clients required to start training
    min_available_clients=1,  # Minimum number of clients that must be connected
    min_evaluate_clients=1,
)

# Configure the number of federated learning rounds
server_config = ServerConfig(num_rounds=3)

# Start the Flower server with increased message size
if __name__ == "__main__":
    fl.server.start_server(
        server_address="localhost:8081",
        config=server_config,
        strategy=strategy,
        grpc_max_message_length=1024 * 1024 * 1024,  # Set to 1 GB (1024 MB)
    )
