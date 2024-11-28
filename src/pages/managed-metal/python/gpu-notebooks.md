---
layout: page.njk
tags:
    - managed-metal
    - guide
    - python
title: GPU Accelerated Jupyter Notebooks
author: John Vidler
back:
    url: /pages/managed-metal/python/virtual-environments
    text: Python Virtual Environments
---

If you already have Python notebooks that would benefit from GPU compute resources - or just want to use notebooks rather than running things from the terminal, it is possible to set up a notebook environment within VSCode that runs on a Hex worker node with a few additional setup steps.

Please ensure you can [connect VSCode to your Hex instance](/pages/managed-metal/using-vscode/) before attempting these steps.

![Installing the Jupyter service on a remote VSCode instance](/assets/img/vscode-notebooks/stage1.png)

In the 'Extensions' sidebar, searching for `Jupyter` should bring up the Microsoft Jupyter for VSCode pack, which includes all the sub-components for basic Python (and other language!) notebooks.

![The extension pack installed on node 003, showing the 4 sub-components have been installed](/assets/img/vscode-notebooks/stage2.png)

At this stage, we recommend that you create a new project directory on the Hex node, in this example I'll be simply calling it `notebook`, and creating it directly in my home drive by running `mkdir notebook` in the built-in terminal. If your VSCode instance has closed the terminal for any reason, you can always create a new one by opening the command palette and typing `create terminal`.

To open the command palette, press the following:

- Windows/Linux: <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">P</kbd>
- Mac: <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Command</kbd> + <kbd class="kbd">P</kbd>

![Running 'mkdir' in the built-in terminal to create a new directory in our home drive](/assets/img/vscode-notebooks/stage3.png)

We **strongly** recommend creating a Python virtual environment at this stage, to keep your notebook packages and environments separate from the system-wide ones, and to prevent clashes with your other projects. To create a new virtual environment, run `python3 -m venv .venv` and Python should create everything for you. Note that we don't need to `activate` this environment like we would in normal Python use (yet).

![Configuring a new Virtual Environment (venv) for Python in our notebook folder](/assets/img/vscode-notebooks/stage3a.png)

Once you have a working directory, you can open it by going back to the 'Explorer' panel on the left of VSCode, and selecting 'Open Folder', this will then prompt you to select a folder on the remote node to use:

![The explorer panel in VSCode, showing the Open Folder button](/assets/img/vscode-notebooks/stage3b.png)

Navigate to the new folder, and select 'Ok'. This is likely to prompt VSCode to ask if you're sure you want to trust the files in the folder; which as they should be your files, you can. We suggest you _do not_ select the 'Trust the authors of all files in the parent folder...' toggle, as this will suppress all subsequent checks, which while a little irritating to see, are an important security layer designed to prevent accidentally opening malicious files.

![VSCode prompting to select a folder on a remote node](/assets/img/vscode-notebooks/stage4.png)
![The VSCode Trust dialog](/assets/img/vscode-notebooks/stage5.png)

At this stage, we can actually start creating notebooks! Create a new file (<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">n</kbd> or <kbd class="kbd">Command</kbd> + <kbd class="kbd">n</kbd>) and save it with the `.ipynb` extension and VSCode will automatically pick up that this is a Python Notebook, and you can start creating documentation and runner cells as usual.

![An extremely minimal Python notebook example](/assets/img/vscode-notebooks/stage6.png)

To actually run any of our code cells, we need to tell VSCode to use our virtual environment as the current kernel. To select a kernel click the 'Select Kernel' button on the top-right of the editor and choose 'Python Environments' in the dropdown. In most cases VSCode will have noticed our virtual environment folder already and should now give you the option to choose it in the list.

![The Python Kernel selection button](/assets/img/vscode-notebooks/stage7.png)
![Selecting a Python kernel to run our notebook](/assets/img/vscode-notebooks/stage7b.png)

Depending on exactly which version of everything you're running, you may also need to install another package, which VSCode should automatically prompt for.

At this point, you should have a working Python environment on a GPU compute node, so by installing PyTorch and asking it if CUDA is available should report at least one device, in this case an RTX A2000.

![Importing and running PyTorch to detect CUDA capable devices](/assets/img/vscode-notebooks/stage11.png)

Most of the time, installing the _latest_ version of PyTorch and its associated libraries should work just fine, but if you encounter problems, check that the CUDA libraries are the right version for PyTorch by checking `nvidia-smi`:

![Running nvidia-smi to detect the CUDA devices and driver versions installed](/assets/img/vscode-notebooks/stage10.png)