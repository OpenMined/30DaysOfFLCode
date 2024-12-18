# Awesome #30DaysOfFLCode [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

A community curated and contributed list of helpful resources and materials about _Federated Learning_ and PETs as part of the [`#30DaysOfFLCode`](https://info.openmined.org/30daysofflcode) Challenge by [OpenMined](https://openmined.org).

## `#30DaysOfFLCode` Challenge

**Two main rules**:

1. Study Federated Learning (and/or any other PETs) for _at least_ 1 hour/day for 30 days
2. Share Your Progress Daily by posting on social media using `#30DaysOfFLCode` and engage with other participants.

**Publicly commit to the challenge**: Hold yourself accountable by making a public statement saying you intend to participate in the program

Discover more on [www.30DaysOfFLCode.com](https://www.30DaysOfFLCode.com).

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork this repository
2. Add your resource(s)
3. Submit a pull request

Find all the information and instructions on how to contribute in [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Awesome Resources

Please find below all the contributed resources, organised by category (click to expand on the resources!)

<!----------- DIVIDER ----------->

<details open>

<summary><b>🛠️ Tools</b></summary>

- [SyftBox | #30DaysOfFLCode](https://syftbox-documentation.openmined.org/) - The new project by [OpenMined](https://openmined.org) that aims to make privacy-enhancing technologies more accessible and user-friendly for developers.

  - [SyftBox Computational Model](https://syftbox-documentation.openmined.org/tutorials/computation-model) - How computation works on SyftBox, in a nutshell
  - [Federated CPU Tracker Member (part1)](https://syftbox-documentation.openmined.org/tutorials/cpu-tracker/member-api) - An example of SyftBox API that monitors local CPU usage and shares a private/sanitized version of the data within the SyftBox federated network.
  - [Federated CPU Tracker Leader (part 2)](https://syftbox-documentation.openmined.org/tutorials/cpu-tracker/aggregator-api) - A SyftBox API that aggregates CPU data from all members contributing to the computation, and creates a live visualization dashboard.
  - [Getting Started with Federated Learning on SyftBox](https://syftbox-documentation.openmined.org/tutorials/federated-learning/getting-started/) - A complete federated learning workflow for MNIST digit classification using SyftBox.
  - [Ring Computation Walkthrough: Calculating An Average Across Nodes](https://github.com/flow254/FLFun/blob/main/create-average-ring-computation.md) - A brief walkthrough on creating a Ring Computation on SyftBox that computes the average value from nodes.

- [OpenVector](https://openvector.gitbook.io/openvector) - CoFHE (Collaborative-Fully Homomorphic Encryption). Confidential compute primitive that is 100x faster than FHE. **[Github repo not found for this tool]**

- [PanzaMail](https://github.com/IST-DASLab/PanzaMail) - Panza is an automated email assistant customized to your writing style and past email history, trained without ever sharing your sensitive data.

- [Secure XGBoost](https://mc2-project.github.io/secure-xgboost/) - Secure XGBoost is a library that provides the capability to collaboratively train XGBoost models on untrusted cloud enviroments using secure hardware enclaves.

</details>
<!----------- DIVIDER ----------->

<details>

<summary><b>👤 Differential Privacy</b></summary>

### Articles 

- [Privacy-Preserving Retrieval Augmented Generation with Differential Privacy](https://arxiv.org/abs/2412.04697) - The first paper to explore RAG (Retrieval Augmented Generation) with Differential Privacy.

### Videos

- [Tutorial on Differential Privacy](https://youtu.be/ekIL65D0R3o?feature=shared) - Katrina Ligett, California Institute of Technology - Big Data and Differential Privacy

- [Tutorial: Differential Privacy and Learning: The Tools, The Results, and The Frontier](https://youtu.be/hoEyvHCRRc8?feature=shared) - Katrina Ligett, California Institute of Technology - NeurIPS tutorial 2014
  
- [A Course In Differential Privacy](https://www.youtube.com/playlist?list=PLmd_zeMNzSvRRNpoEWkVo6QY_6rR3SHjp) - A course on Differential Privacy by Gautam Kamath, Assistant Professor at the University of Waterloo's Cheriton School of Computer Science

### Books

- [Programming Differential Privacy](https://programming-dp.com/) - An open source book about differential privacy, for programmers.

- [The Algorithmic Foundations of Differential Privacy](https://www.cis.upenn.edu/~aaroth/Papers/privacybook.pdf) - A foundational text that delves into the theoretical aspects of differential privacy, exploring its principles and practical applications in safeguarding individual data.

</details>
<!----------- DIVIDER ----------->

<details>
<summary><b>🔏 Homomorphic Encrpytion</b></summary>

### Articles

- [Introduction to Homomorphic Encryption by Zama](https://www.zama.ai/introduction-to-homomorphic-encryption) - This article provides a good introduction to Homomorphic Encryption, with several demo examples on HuggingFace and DeepDives attached.

- [FHE.org Resources](https://fhe.org/resources/) - Compiled resources on homomorphic encryption

</details>

<!----------- DIVIDER ----------->

<details open>
<summary><b>📡 Federated Learning</b></summary>

### Tutorials

- [From Centralised to Decentralised Training: An Intro to Federated Learning](https://github.com/deep-learning-indaba/indaba-pracs-2024/tree/main/practicals/Federated_Learning) - A Jupyter Notebook tutorial aimed to provide a practical overview with code examples to all the the foundational concepts tackled in federated learning. This tutorial was written by Andrej Jovanović, Sree Harsha Nelaturu and Luca Powell and presented at the 2024 iteration of the Deep Learning Indaba.

- [Collection of Tutorials in Federated Learning from Tensor Flow](https://www.tensorflow.org/federated/tutorials/tutorials_overview) - A TensorFlow Colab Notebook collection of Federated Learning tutorials designed to provide practical examples of Federated Learning, covering concepts from basic to advanced levels.

- [Federated Learning for Credit Scoring](https://blog.openmined.org/federated-credit-scoring/) - A detailed blog post exploring the application of federated learning to credit scoring. It discusses key concepts such as silo vs. device architectures, horizontal vs. vertical federated learning, and non-IID data challenges, and includes source code examples.

- [Flower Framework Tutorials](https://flower.ai/docs/framework/index.html) - This webpage contains Flower Framework Tutorials on Federated Learning, Quickstart tutorials with Flower Framework, How-To Guides and Reference Docs.
  
- [FedN Tutorials by Scaleout Systems](https://docs.scaleoutsystems.com/en/stable/quickstart.html) - Collection of Introductory tutorials on FedN, setting up FedN Project, using the FedN API Client,  Developer Guide and much more.

- [NVFlare by NVIDIA](https://nvidia.github.io/NVFlare/catalog/) - A great collection of tutorials in form of a Catalog on Federated Learning using NVFlare by NVIDIA.

- [Tutorials on FATE (Federated AI Technology Enabler)](https://fate.readthedocs.io/en/latest/2.0/fate/quick_start/) - Collection of tutorials on FATE framework (an industrial grade FL Framework), quickstart, pipelines, ML Tutorials and much more.

- [OpenFL Running the Federation Tutorials](https://openfl.readthedocs.io/en/latest/developer_guide/running_the_federation.tutorial.html) - These tutorials use the Jupyter Lab server to understand the APIs used in Open Federated Learning (OpenFL).

- [SubstraFL Tutorials by Owkin](https://docs.substra.org/en/stable/examples/substrafl/index.html) - These tutorials are for getting started with SubstraFL, which is a open-source Federated Learning Framework developed by Owkin Research focused on Healthcare.

- [FedML Tutorials by TensorOpera (Previously FEDML)](https://docs.tensoropera.ai/federate/getting_started) - Getting started tutorials on Federated Learning for FedML by TensorOpera. FedML is a library for large-scale distributed training, model serving, and federated learning.

- [FedLab Tutorials](https://fedlab.readthedocs.io/en/master/tutorials/tutorial.html) - Tutorials for FedLab (A flexible Federated Learning Framework based on PyTorch) by [SMILELab-FL](https://github.com/SMILELab-FL). FedLab aims to standardize FL simulation procedure, including synchronous algorithm, asynchronous algorithm and communication compression.

- [PFL Tutorials by Apple](https://github.com/apple/pfl-research/tree/develop/tutorials) - A collection of tutorial notebooks for [pfl](https://apple.github.io/pfl-research/) which is a simulation framework for accelerating research in Private Federated Learning by Apple Research.

### Articles

- [An online comic on Federated Learning, by Google AI](https://federated.withgoogle.com/) - Google AI came up with this fun online comic on Federated Learning which is a great resource for beginners starting their journey in the field of Federated Learning. Great for building up the motivation to learn FL.

- [Communication-Efficient Learning of Deep Networks from Decentralized Data](https://proceedings.mlr.press/v54/mcmahan17a/mcmahan17a.pdf) - First paper on Federated Learning by McMahan et. al. Google Inc. This paper introduces the term Federated Learning, runs experiments on MNIST and CIFAR Datasets, and also introduces the famous aggregation algorithm FedAverage. Check out the blog based on the paper here: [Federated Learning: Collaborative Machine Learning without Centralized Training Data](https://research.google/blog/federated-learning-collaborative-machine-learning-without-centralized-training-data/)

- [Federated Learning: Challenges, Methods, and Future Directions](https://arxiv.org/abs/1908.07873) - Federated learning involves training statistical models over remote devices or siloed data centers, such as mobile phones or hospitals, while keeping data localized. In this article, we discuss the unique characteristics and challenges of federated learning, provide a broad overview of current approaches, and outline several directions of future work that are relevant to a wide range of research communities.

- [Advances and Open Problems in Federated Learning](https://arxiv.org/abs/1912.04977) - Federated learning (FL) is a machine learning setting where many clients collaboratively train a model under the orchestration of a central server, while keeping the training data decentralized. Motivated by the explosive growth in FL research, this paper discusses recent advances and presents an extensive collection of open problems and challenges.

- [User-Empowered Federated Learning in the Automotive Domain](https://ieeexplore.ieee.org/abstract/document/10664305) - This paper proposes a User-Empowered FL approach, built upon the Flower Framework, implemented in an Android Automotive app. Source code is available [here](https://github.com/marcellomaugeri/User-Empowered-Federated-Learning-in-Automotive). Please note that the paper is not open access and requires an IEEE subscription or institutional login.

- [Federated Learning and Privacy](https://dl.acm.org/doi/pdf/10.1145/3500240) - This article provides a brief introduction to key concepts in federated learning and analytics with an emphasis on how privacy technologies may be combined in real-world systems and how their use charts a path toward societal benefit from aggregate statistics in new domains and with minimized risk to individuals and to the organizations who are custodians of the data.
  
- [Import AI 393: 10B distributed training run; China VS the chip embargo; and moral hazards of AI development](https://jack-clark.net/2024/12/03/import-ai-393-10b-distributed-training-run-china-vs-the-chip-embargo-and-moral-hazards-of-ai-development/) - Interesting article about the future of decentralised training
  
- [Federated Learning on Non-IID Data Silos: An Experimental Study](https://arxiv.org/pdf/2102.02079v4) - This study introduces the first comprehensive benchmark with diverse data partitioning strategies to systematically evaluate FL algorithms under non-IID settings, providing valuable insights for future research. Source code: [here](https://github.com/Xtra-Computing/NIID-Bench).

### Courses

- [Federated Learning @ DeepLearning.AI](https://www.deeplearning.ai/short-courses/intro-to-federated-learning/) - An introductory course on federated learning delivered by DeepLearning.AI in collaboration with Flower.

- [Federated Fine-tuning of LLMs with Private Data @ DeepLearning.AI x Flower Labs](https://learn.deeplearning.ai/courses/intro-to-federated-learning-c2)- Part 2 of the Intro to Federated Learning course delivered by DeepLearning.AI and Flower Labs.

- [Federated Learning Tutorial @ NeurIPS 2020](https://drive.google.com/file/d/1QGY2Zytp9XRSu95fX2lCld8DwfEdcHCG/view) - Federated Learning Tutorial @ NeurIPS 2020

</details>



<!----------- DIVIDER ----------->

<details>
<summary><b>🎮 Games & Simulations</b></summary>

- [DP Vision](https://www.oblivious.com/games/dp-vision) - Test your image recognition skills with differentially private images! Players manage a privacy budget to reveal image details, aiming to identify the correct image within 5 guesses while minimizing privacy loss.

- [Guess Who (DP Edition)](https://www.oblivious.com/games/guess-who) - A privacy-preserving twist on the classic game where players ask yes/no questions with adjustable accuracy levels. Lower epsilon means less reliable but more private answers, teaching the privacy-utility tradeoff.

- [WORDPL](https://www.oblivious.com/games/wordpl) - A Wordle-style game with differential privacy mechanics. Players guess 5-letter words while managing privacy budgets that affect the accuracy of feedback, demonstrating how DP noise impacts information gathering.

- [Federated Learning Hyperparam Tuning Game](https://amanpriyanshu.github.io/FL-Interactive-Game/) - Understand and play with federated learning hyperparams! In-browser tensorflow-js simulation of FedAvg to understand and gain intuition about IID and Non-IID Federated Learning settings.

- [Differentially Private Tetris](https://amanpriyanshu.github.io/Differentially-Private-Tetris/) - A unique twist on classic Tetris where players manage a privacy budget to reveal blocks, demonstrating differential privacy concepts through gameplay. Experience privacy-utility tradeoffs in an engaging way.

- [The Unlearning Protocol](https://amanpriyanshu.github.io/The-Unlearning-Protocol/) - An interactive game exploring machine learning unlearning and fairness concepts. Players select data points that least impact the dataset, providing hands-on experience with data removal and model fairness considerations.

</details>



<!----------- DIVIDER, UNCATEGORIZED----------->
<details>
<summary><b>🛡️ Multiple PETs and Others</b></summary>

### Articles

- [Beyond Privacy Trade-offs with Structured Transparency](https://arxiv.org/abs/2012.08347) - Structured Transparency: a five-part framework to combine multiple PETs, such as secure computation and federated learning, to maximise their value, and to reduce lingering use-misuse trade-offs in multiple domains.

### Courses

- [The Private AI Series](https://courses.openmined.org/) - Learn how privacy technology is changing our world and how you can lead the charge.

- [Secure and Private AI](https://www.udacity.com/course/secure-and-private-ai--ud185) - Learn skills to build AI systems that prioritize security and privacy using cutting-edge techniques. The course introduces tools and methods for securely handling sensitive data in AI applications, including Federated Learning, Differential Privacy, and Encrypted Computation.

### Videos

- [Privacy Preserving AI (Andrew Trask) | MIT Deep Learning Series](https://youtu.be/4zrU54VIK6k?feature=shared) - Lecture by Andrew Trask in January 2020, part of the MIT Deep Learning Lecture Series.

- [Multi Party Computation Concepts](https://youtube.com/playlist?list=PLvJRBKreefNyPFgkjcFJ2UMIy6Icche1H&feature=shared) - Beginner Friendly series of videos about MPC
  
### Books

- [Optimization Algorithms for Distributed Machine Learning](https://link.springer.com/book/10.1007/978-3-031-19067-4) - Textbook discussing SoTA optimization algorithms for distributed/federated machine learning. Access to materials requires subscription.

- [Data Privacy Handbook](https://utrechtuniversity.github.io/dataprivacyhandbook/index.html) - A short guide from the Utrecht University on data privacy regulations and classical techniques used to make the data private like de-indetification through ommision and other statistical methods.


###  Experiments
- https://github.com/kokkatil/llmFineTuning
  

</details>