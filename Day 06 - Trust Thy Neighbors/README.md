# Day NN - Trust Thy Neighbors

_Author:_ [Sameer Wagh]

    > TL;DR: Learn how to build an aggregation app where privacy is bootstrapped using local trust -- hence, trust thy neighbors. The idea is that each ring member trusts their neighbor but not the others -- privacy is achieved using this.

---

## Introduction

Welcome to Day NN of the **50 Days of Federated Learning** series! Today we will be adding an element of privacy to a distributed aggregation application using SyftBox. Before we jump into the code, we'll cover some basics that will make it easier for building Python apps in the SyftBox ecosystem.

### Building Python Apps in the SyftBox Ecosystem

We will first look into a base class that provides a foundational architecture to help with basic functionalities required for app building over Syftbox. The two main components we will be looking at are the `ApplicationBase` base class and a flexible `config.json` configuration file.

#### The Base Class

It would be good to build apps in SyftBox from a base class like `ApplicationBase` in our setup. This base class is essential because it abstracts away much of the boilerplate functionality like creating necessary directories, setting permissions, and managing configurations. By following a clear directory structure, each user's app can manage private and public data securely, as well as orchestrate interaction between multiple users in a federated network.

Here's a quick breakdown of the key methods in `ApplicationBase`:
- **Directory Management**: Automatically creates directories for each user in the SyftBox's sync folder, which handles private, public, and app-specific folders.
- **Permission Management**: Uses `_.syftperm` files to define who can read, write, and manage different folders. This ensures each participant in the federated learning network has appropriate access levels.
- **File Management**: Handles file creation, checking, and reading operations across the app pipeline.

#### The `config.json` File

Every SyftBox app uses a `config.json` file that defines how the app behaves within the SyftBox ecosystem. This includes how frequently it should run (`schedule`), the command to run the app (`command`), and the target platforms.

A sample `config.json` looks like this:

```json
{
  "version": "0.1.0",
  "app": {
    "version": "0.1.0",
    "run": {
      "command": ["python", "main.py"],
      "schedule": "* * * * *", 
      "interval": "10"
    },
    "env": {},
    "platforms": ["darwin", "linux"],
    "pre_install": [],
    "post_install": [],
    "pre_update": [],
    "post_update": []
  }
}
```
This file helps SyftBox execute your application in intervals (e.g., every minute) and ensures consistency across different environments (Mac, Linux, etc.).

### Building the Aggregation App

Our app today involves secure key setup, data encryption using homomorphic techniques, and aggregation (decryption) of results. While this is not homomorphic encryption, it is a good example of how to bootstrap privacy using local trust. This is crucial for scenarios where participants collaboratively train a model or aggregate sensitive data without directly sharing their private data. For the full data, refer to the [snwagh/private-histogram](https://github.com/snwagh/private-histogram/tree/main). As an example of private data, we will consider this mock netflix data
```json
{ 
    "view_time": 1200,
    "average_views_per_day": 2,
    "num_movies_watched": 10, 
    "num_movies_rated": 4
}
```
Furthermore, for a batteries included experience, the app will create mock data for you if you don't have any.

---

## Step-by-Step: The Protocol in `main.py`

Now, let’s break down the protocol in the app’s `main.py`. The app has three main stages:

1. **Key Setup**: In this stage, each participant generates and exchanges secret keys with their neighbors in the ring.
2. **Data Encryption**: Each participant encrypts their private data using the exchanged keys.
3. **Aggregation and Decryption**: Once all participants have encrypted their data, they send it to a central node for aggregation and decryption.

### Key Setup: Establishing Trust and Privacy

Key setup ensures that each participant in the ring has the necessary secret values to encrypt their data securely.

```python
# Stage 1: Key Setup
if not check_file_exists(runner.get_key_paths(runner.my_user_id, "second")) or \
   not check_file_exists(runner.get_key_paths(runner.my_user_id, "first")):
    runner.setup_folder_perms()
    secret_value = runner.create_secret_value()
    runner.write_to_next_person(secret_value)
```

Each participant generates a secret value and shares it with their neighbor. Thus each pair of neighbors has a shared secret value that is known only to them and no one else. The keys are stored securely in each participant’s folder with appropriate permissions.

### Data Encryption: Ensuring Privacy Using Homomorphic Techniques
Once the keys are established, participants encrypt their data. This ensures that only the aggregated data is visible, preserving the privacy of each individual’s raw data.

```python
# Stage 2: Encrypt Data
encrypted_data_path = runner.public_dir(runner.my_user_id) / runner.app_name / "encrypted_data.json"
if not check_file_exists(encrypted_data_path):
    first_key = int(open(runner.get_key_paths(runner.my_user_id, "first")).read())
    second_key = int(open(runner.get_key_paths(runner.my_user_id, "second")).read())
    encrypted_data = runner.encrypt_data(my_data, first_key, second_key)
    create_file(encrypted_data_path, json.dumps(encrypted_data))
```

Here, the participant's private data is encrypted using a combination of the **two exchanged keys**. The encryption method ensures that the data remains private even during the aggregation process and no one neighbor can decrypt the data of another participant (let alone any other member of the ring).

### Aggregation and Decryption: Secure Aggregation of Results
After encryption, the final stage is aggregating all participants' data. Once aggregation is complete, the decrypted values are revealed.

```python
# Stage 3: Aggregate Data
aggregate = {"view_time": 0, "average_views_per_day": 0, "num_movies_watched": 0, "num_movies_rated": 0}
for user_id in ring_participants:
    encrypted_file = runner.public_dir(user_id) / runner.app_name / "encrypted_data.json"
    with open(encrypted_file) as f:
        user_data = json.load(f)
        for key, value in user_data.items():
            aggregate[key] += int(value)
average_data = {key: total / num_members for key, total in aggregate.items()}
```
This part collects encrypted data from each participant, sums up the values, and computes the average. The aggregate result is saved for further analysis.

---

## Conclusion
In today's tutorial, you've learned how to build a privacy preserving aggregation application using SyftBox. By leveraging key setup, encryption, and aggregation techniques, we ensured the privacy of each participant's data while still enabling meaningful collaboration.

For deeper dives and future work, you can explore the following:
- Explore how the syftperms are designed to see what data for each participant is shared with everyone in the ring. 
- Look into how the key setup can be implemented one time.
- Look into robustness of the protocol against malicious behavior or adaptive ring behavior.
- Stay tuned for Day NN+1, where we’ll introduce more advanced techniques in federated learning applications.

