<h1><img src="./../assets/OpenMined-Icon.png" height="100">Day 01 - Intro to Syftbox </h1>
Author: Subha Ramkumar

# What is Syftbox?

Before we dive into building cool programs and apps throughout this 50-day federated learning journey, let’s first get familiar with the platform we’ll be using—Syftbox. Syftbox is a platform designed to build apps and projects that serve groups of individuals by securely accessing and aggregating verified private data. The three most important things Syftbox does are accessing private information securely, aggregating it, and verifying it. Currently under development, Syftbox will be the primary platform for our 50 Days of FL program, providing the foundation for all the awesome projects you’ll build.


<br>

# Install Syftbox

Here is the one-line installer for Syftbox on macOS, Linux and WSL on Windows.
```
curl -LsSf https://syftboxstage.openmined.org/install.sh | sh
```
Running this script will both install Syftbox and start your Syftbox client.
Enter your email ID to create your account in Syftbox, aka your datasite!
You should see a folder open up like in the screenshot below, listing a few datasite folders.
You should also be able to see your datasite folder appear in this domain- https://syftbox.openmined.org/datasites

<img src="./assets/sbfolder.png" style="width: 60%;">

<br>

# What is a datasite?


In Syftbox, a datasite refers to your own personal domain. This term is analogous to a website, but here, it’s called a datasite because all the data within belongs to you. You have complete control over which parts of your data are publicly accessible, which are privately accessible, and over which pieces you grant selective access to others. Your datasite serves as your fundamental space within Syftbox, allowing you to create, add your data, and develop your own projects. 

<br>

# What are the private and public spaces in my datasite? 

When you open your datasite folder, you’ll notice a default file called the _.syftperm file. This file functions like any other file permission system, allowing you to decide who can read and write to it. As the admin of your own datasite, you have complete control over who can access different parts of your space.

For example, if you check your public folder within your datasite, you’ll see that the syftperm file indicates the read permissions are set to global. This means that the contents of the public folder are viewable by all other users within the Syftbox network. As admin of your datasite you decide the access permissions associated with every folder in your datasite, thus helping you effectively manage access to your data while maintaining your privacy.


<br>

# Video tutorial #1:
**explore your datasite, create your first public home.html and explore other datasites on the Syft network!**
<br>
(coming soon)

<br>




# Congratulations!!

Tomorrow you'll build your first app on Syftbox!


