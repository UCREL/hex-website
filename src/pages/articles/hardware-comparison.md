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
| NVIDIA RTX A5000 GPU | 3 | To be installed | https://nvdam.widen.net/s/wrqrqt75vh/nvidia-rtx-a5000-datasheet | These more powerful GPUs boast over 8000 CUDA cores and over 250 Tensor cores. Each has 24GB of onboard memory. It also runs on the Ampere architecture (instruction bit width and register size is 32 bits) | Increased cores and memory will allow for more intensive machine learning tasks and larger language models. Suitable to inference, training and fine tuning. 