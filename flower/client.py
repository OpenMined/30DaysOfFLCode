import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import flwr as fl
import logging

# Set up logging to display on the console
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


# Load the model and tokenizer
logging.info("Loading GPT-2 model and tokenizer...")
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

# Add a padding token if it doesn't exist
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

model = GPT2LMHeadModel.from_pretrained("gpt2")
logging.info("Model and tokenizer loaded successfully.")


# Load client-specific data (example data here)
client_data = ["Hello, how are you?", "This is a test sentence for training."]  # Replace with real data

# Define the training loop with monitoring
def train(model, train_data, epochs=1):
    model.train()
    optimizer = torch.optim.AdamW(model.parameters(), lr=5e-5)
    for epoch in range(epochs):
        total_loss = 0
        for text in train_data:
            # Tokenize input text and get input tensors
            inputs = tokenizer(text, return_tensors="pt", truncation=True, padding="max_length", max_length=512)
            outputs = model(**inputs, labels=inputs["input_ids"])
            loss = outputs.loss
            loss.backward()
            optimizer.step()
            optimizer.zero_grad()
            total_loss += loss.item()
        
        # Log the loss after each epoch
        logging.info(f"Epoch {epoch + 1}/{epochs}, Loss: {total_loss / len(train_data)}")

    return model

# Flower client class
class GPT2Client(fl.client.NumPyClient):
    def __init__(self):
        logging.info("Initializing GPT-2 Flower client...")
        self.model = model
        self.data = client_data
        logging.info("Client initialized.")

    def get_parameters(self, config=None):
        logging.info("Getting model parameters...")
        return [val.cpu().numpy() for _, val in self.model.state_dict().items()]

    def set_parameters(self, parameters):
        logging.info("Setting model parameters...")
        params_dict = zip(self.model.state_dict().keys(), parameters)
        state_dict = {k: torch.tensor(v) for k, v in params_dict}
        self.model.load_state_dict(state_dict, strict=True)
        logging.info("Model parameters set.")

    def fit(self, parameters, config):
        logging.info("Starting training round...")
        self.set_parameters(parameters)
        self.model = train(self.model, self.data, epochs=1)
        updated_parameters = self.get_parameters()
        logging.info("Training round completed.")
        return updated_parameters, len(self.data), {}

    def evaluate(self, parameters, config):
        logging.info("Evaluating model...")
        self.set_parameters(parameters)
        self.model.eval()
        total_loss = 0
        with torch.no_grad():
            for text in self.data:  # Replace `self.data` with a validation dataset if available
                inputs = tokenizer(text, return_tensors="pt", truncation=True, padding="max_length", max_length=512)
                outputs = self.model(**inputs, labels=inputs["input_ids"])
                loss = outputs.loss
                total_loss += loss.item()
        avg_loss = total_loss / len(self.data)
        logging.info(f"Evaluation complete, average loss: {avg_loss}")
        return avg_loss, len(self.data), {}


# Start the Flower client using the updated approach
if __name__ == "__main__":
    logging.info("Starting Flower client...")
    fl.client.start_client(
        server_address="localhost:8081",
        client=GPT2Client().to_client(),  # Convert NumPyClient to FlowerClient using .to_client()
        grpc_max_message_length=1024 * 1024 * 1024  # Set to 1 GB (1024 MB)
    )
