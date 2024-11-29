---
layout: article.njk
title: Hardware Comparison
author: Henry Oldroyd
tags:
    - article
---


This article aims to provide detail about the current and future hardware for the Hex. It will also include links to their data sheets and in future a hardware comparison with other HPCs systems.

| Hardware | Quantity | Currently Operational | Data Sheet | Description | Task Suitability |
| --- | --| --- | ----- | ----- | ----- |
| 12th Generation Intel Core i9 | 1 | Is Currently Operational | [to be found] |  | Tasks that don't require a high level of parallelization or involve matrix operations |
| NVIDIA RTX A2000 12GiB GPU | 1 | Is Currently Operational | https://www.nvidia.com/content/dam/en-zz/Solutions/design-visualization/rtx-a2000/nvidia-rtx-a2000-datasheet-1987439-r5.pdf | This GPU runs on CUDA version 12.3. It has over 3300 CUDA cores and over 100 tensor cores. It uses the Ampere architecture (instruction bit width and register size is 32 bits) https://www.nvidia.com/content/dam/en-zz/Solutions/design-visualization/rtx-a2000/nvidia-rtx-a2000-datasheet-1987439-r5.pdf | Suitable for tasks that utilize matrix operations. 12 GB of RAM allows for language models like LAMA to be be fully loaded into the GPU's memory making it suited for inference, training and fine tuning tasks. 
| NVIDIA RTX A5000 GPU | 3 | To be installed | https://nvdam.widen.net/s/wrqrqt75vh/nvidia-rtx-a5000-datasheet | These more powerful GPUs boast over 8000 CUDA cores and over 250 Tensor cores. Each has 24GB of onboard memory and are equivalent to RTX 3090s for most jobs. It also runs on the Ampere architecture (instruction bit width and register size is 32 bits) | Increased cores and memory will allow for more intensive machine learning tasks and larger language models. Suitable to inference, training and fine tuning. 
| HEC V100  | 30+ | Is Currently Operational | https://lancaster-hec.readthedocs.io/en/latest/index.html | This is the Universities own HPC offering, designed to take the brunt of computationally intense jobs | HEC is designed for repeated, queuable high latency jobs. Once you have working code, this is the ideal place to queue a series of tests. However, remember that jobs may run concurrently so a framework for remote logging and storing of results is advised. SLURM is used for managing the HPC resource. Please contact an RSE for more details. 
|Bede V100 SXM| 120+ | Is Currently Operational | https://n8cir.org.uk/bede/ | This is the next tier of supercomputer above HEC. It boasts nodes optimized for machine learning workloads and greater file storage. | Optimum use case is for multi-node experiments, or long duration. However, wait times are typically far longer than on HEC, so this should not be used for debugging and code should already be known to work on HEC. Please contact an RSE for more information and support. 
