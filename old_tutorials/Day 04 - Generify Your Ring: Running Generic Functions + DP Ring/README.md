
# Day 04 - Generify Your Ring: Running Generic Functions in a Distributed Ring + Differential Privacy Ring.
_Author_: Ionesio Junior
```
Learn how to transform your ring application into a generic framework that can run arbitrary functions across distributed nodes.
```

Welcome back! In the previous tutorial, we built a simple ring application that allowed nodes to pass a data packet around, aggregating a secret value at each step. While this was a great starting point, it had limitations:

1.  **Lack of Privacy:** Our secret value lacked any mechanism to protect its privacy.
2.  **Inefficiency:** Serial communication slowed down the process.
3.  **Scalability Issues:** Hardcoded file names and lack of generic functionality.

In this tutorial, we'll address the first and third point by transforming our ring app into a generic framework capable of running any function you define. This sets the stage for future enhancements like improving privacy and efficiency.


## Table of Contents

-   [Step 1: Understanding the Need for Generic Functions](#step-1-understanding-the-need-for-generic-functions)
-   [Step 2: Modifying `main.py` to Support Generic Functions](#step-2-modifying-mainpy-to-support-generic-functions)
-   [Step 3: Adding some privacy hammering into the ring.](#step-3-adding-some-privacy-hammering-into-the-ring.)
-   [Conclusion](#conclusion)

----------

## Step 1: Understanding the Need for Generic Functions

Our initial ring app was limited to incrementing a data value by each node's secret. While illustrative, this isn't flexible for real-world applications where you might want to perform different computations like averaging, concatenation, or custom data transformations.

By making our app capable of running generic functions, we empower each node to apply any computation to the data packet as it passes through.

## Step 2: Modifying `main.py` to Support Generic Functions

In order to do it, we just need to modify the  ```ring_data.data += self.my_secret()``` ! So, let's dive into the code and modify `main.py` to handle generic functions. 

### Original `main.py`

```python
class RingRunner:
	# <Ring Runner methods>

    def process_input(self, file_path) -> None:
        print(f"Found input {file_path}! Let's get to work.")

        ring_data = load_json(file_path)

        ring_data.data += self.my_secret()
        if ring_data.current_index < ring_length(ring_data) - 1:
            ring_data.current_index += 1
            next_person = ring_data.ring[ring_data.current_index]
            self.send_data(next_person, ring_data)
        else:
            self.terminate_ring(ring_data)

        self.cleanup(file_path)
 
	# <Ring Runner methods>
```

### Updated `main.py`
```python
class RingRunner:
	# <Ring Runner methods>

    def process_input(self, file_path) -> None:
        print(f"Found input {file_path}! Let's get to work.")

        ring_data = load_json(file_path)

        ring_data.data = ring_function(ring_data, self.secret_file)  # Changed line
        if ring_data.current_index < ring_length(ring_data) - 1:
            ring_data.current_index += 1
            next_person = ring_data.ring[ring_data.current_index]
            self.send_data(next_person, ring_data)
        else:
            self.terminate_ring(ring_data)

        self.cleanup(file_path)
 
	# <Ring Runner methods>
```

That's pretty much it! =)

## Step 3: Adding some privacy hammering into the ring.

Let's take things a step further by exploring a differential privacy use case. Instead of aggregating just a single value, we'll focus on calculating the mean of a list of values (think of any sequential data as an example). The goal is to compute this mean while ensuring that the privacy of individual values in the dataset is preserved. To achieve this, we'll apply differential privacy by adding noise to the mean, preventing any specific value from being inferred.

### Example structure of the new `secret.txt`

Each peer must be able to set their own epsilon value and define their min/max boundaries. To accommodate this, the `secret.txt` file (kept private and not shared) will include additional details. To streamline reading and parsing, we are converting it to JSON format. The new `secret.json` will be structured as follows:
```
{
 "data": [98, 51, 71, 78, 98, 11, 26, 99, 98, 31, 91, 53, 8],
 "epsilon": "0.6",
 "bound_min": "0",
 "bound_max": "100"
}
```

### Example structure of the new `data.json`


Given this new use case, the structure of `data.json` will remain unchanged.
```
{
  "ring": ["a@openmined.org", 
		  "b@openmined.org",
		  "a@openmined.org"],
  "data": 0,
  "current_index": 0
}
```

### Example structure of the new `ring_function`

Finally, to support this new use case, we need to modify our `ring_function` method. This will involve loading the updated secret structure and applying differential privacy to it.

```python
import diffprivlib.tools as dp

def ring_function(ring_data: SimpleNamespace, secret_path: Path):
    with open(secret_path, "r") as secret_file:
        secret_data = json.load(secret_file)

    return ring_data.data + dp.mean(
        secret_data["data"],
        epsilon=float(secret_data["epsilon"]),
        bounds=(float(secret_data["bound_min"]), float(secret_data["bound_max"])),
    )
```

## Conclusion

In this tutorial, we've significantly enhanced our ring application by transforming it into a generic framework capable of running arbitrary functions across distributed nodes. This flexibility opens up a myriad of possibilities for real-world applications, allowing each node to perform custom computations on the data packet as it circulates through the ring.

By modifying the `main.py` file to support a generic `ring_function`, we've decoupled the computation logic from the application's core flow. This change not only makes our codebase more scalable and maintainable but also empowers you to implement complex functionalities without altering the fundamental structure of the ring.

We also introduced differential privacy into our ring by leveraging the `diffprivlib` library. By calculating a noisy mean of a dataset, we've ensured that the privacy of individual data points is preserved, aligning our application with privacy standards and regulations. Each node can now contribute data securely, with configurable privacy parameters like epsilon and data bounds, enhancing trust and compliance in distributed computations.

While we've addressed the lack of privacy and scalability issues, there's still room for improvement:

-   **Advanced Privacy Features:** Future tutorials will focus on exploring more sophisticated privacy-preserving techniques, such as secure multi-party computation or federated learning.
-   **Observability:** Enhancing the ring application with robust monitoring and logging capabilities to gain real-time insights into its performance and behavior.
-   **Robust Error Handling:** Implementing comprehensive error handling to make the ring more resilient to node failures or communication disruptions.

Feel free to experiment with different functions and privacy settings to tailor the ring to your specific needs. By understanding and manipulating the core components we've discussed, you can build a powerful and secure distributed application.

Stay tuned for the next tutorial, where we'll continue to refine our ring by improving efficiency and exploring more advanced features. Happy coding!
