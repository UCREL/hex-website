---
layout: page.njk
tags:
    - managed-metal
    - guide
    - python
title: Python Virtual Environments
author: John Vidler
back:
    url: /pages/managed-metal/basic-linux-tools
    text: Basic Linux Tools - Terminal Commands
next:
    url: /pages/managed-metal/python/python-gpu-notebooks
    text: GPU Accelerated Jupyter Notebooks
---

Python's `venv` (short for "virtual environment") is a module that allows you to create isolated environments for your Python projects. This is particularly useful for managing dependencies and avoiding conflicts between packages required by different projects. Each virtual environment has its own Python interpreter and can have its own set of installed packages.
Key Benefits of Using venv:

  - Isolation: Each virtual environment is independent, so changes in one environment do not affect others.
  - Dependency Management: You can install specific versions of packages for a project without affecting the global Python installation.
  - Reproducibility: You can create a requirements.txt file to specify the packages and their versions, making it easier to replicate the environment.

Using `venv` is a best practice for Python development, especially when working on multiple projects with different dependencies. It helps maintain clean and manageable environments, making it easier to develop, test, and deploy Python applications.

## Basic Usage of venv
### 1. Creating a Virtual Environment

To create a virtual environment, you can use the following command in your terminal:

```
$> python -m venv myenv
```

myenv is the name of the directory where the virtual environment will be created. You can name it anything you like.

### 2. Activating the Virtual Environment

After creating the virtual environment, you need to activate it. The activation command varies depending on your operating system:

```
$> source myenv/bin/activate
```

Once activated, your terminal prompt will change to indicate that you are now working within the virtual environment.

### 3. Installing Packages

With the virtual environment activated, you can install packages using pip:

```
$> pip install requests
```

This installs the requests library only in the myenv environment.

### 4. Listing Installed Packages

To see which packages are installed in your virtual environment, you can use:

```
$> pip list
```

### 5. Deactivating the Virtual Environment

When you are done working in the virtual environment, you can deactivate it by simply running:

```
$> deactivate
```

This will return you to your system's global Python environment.

### 6. Creating a requirements.txt File

To make it easier to replicate your environment, you can create a requirements.txt file that lists all installed packages:

```
$> pip freeze > requirements.txt
```

You can then use this file to install the same packages in another environment:

```
$> pip install -r requirements.txt
```
