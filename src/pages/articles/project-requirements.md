---
layout: article.njk
title: Deciding Project Requirements. 
author: Henry Oldroyd
tags:
    - article
---


When deciding the requirements for your project you will need to consider a variety of factors:
* How long will your job need to run for?
* How computational intensive is it?
* How parralelisable is it? or is is highly sequential?
* Can it benefit from hardware like a GPU or does it just require a CPU?

In practically all computational catagories the ordering from least to most powerful system is:
HEX -> HEC -> BEDE

A good general approach, regardless of your task, could be to try to run the task (perhaps scaled down) locally first, then on the HEX cluster before the HEC or BEDE. 
This is because running locally or on the HEX allows you to directly interact with your program as it runs. This could help with diagnosing any errors or issues before scaling up. The HEC and BEDE use a SLURM job scheduling system so you will be unable to interact with your job as it is running. 


Example Jobs:

Webscraping:
This class of jobs is unlikely to benefit from hardware like a GPU. It can be parallelized but can also be sped up by making each request asynchronously so that the CPU is always doing something. This task it unlikely to be very computationally intensive but the job may need to be left running for some time. This kind of task is also more likely to require lots of intervention and debugging (e.g. if you discover some html pages have a different format). Therefore being able to run it directly in a notebook or console where you can interact with it may be beneficial. For this reason the HEX cluster is likely to be more use suitable than the HEC or BEDE which use a queue based system for batch jobs. 


Hardware and Limit Task:

Here I attempt to comment on the available GPU hardware on each system. Then I will try to identify which tasks the system is likely to be able to comfortably perform and what task is pushing the limits of the system 

HEX:
[GPU Hardware Details](https://ucrel-hex.scc.lancs.ac.uk/pages/hardware/)
The HEX cluster has the lowest computational power but greater flexibility. It features a combination of NVidia RTX A2000 (12GB) and RTX A5000 (24GB) GPUS. 
This makes this system suitable for inference with small to medium size models and suitable for fine tuning for small models. 
Bert based models or models like GPT 2 can easily fit within the A5000's 24GB of GPU memory. 
However larger models like GPT3 would require some quantitation to fit (e.g. can fit GPT-3 13B at INT 8 precision) making inference and certainly fine tuning challenging on this system. 

HEC:
[GPU Hardware Details](https://lancaster-hec.readthedocs.io/en/latest/gpu.html#gpu-hardware-contributions)
The HEC HPC system is in the middle for computational power within out 3 system comparison. It's Many NVidia V100 32GB GPUs and a few L20 48GB GPUs make it more capable of inference and fine tuning for larger language models. Models like GPT3 can be more feasible for inference and fine tuning on this system (e.g  GPT-3 13B can be used at FP16 precision). This makes it a suitable for larger scale NLP. 
However training from scratch larger transformer models in the order of GPT3 (175 Billion parameters) would still be challenging to on this system given the APU resources available.

BEDE:
[GPU Hardware Details](https://bede-documentation.readthedocs.io/en/latest/hardware/index.html)
BEDE is the most powerful HPC system here. It features 32 GPU nodes each with 4 V100 32GB GPUs. It also features 2 Grace Hopper Super Chip. It also featured the InfiniBand high speed (100 Gbit/sec) low latency network technology. This allow for fast transfer of data between GPUs and thereby reduces the bottlenecks associated with distributed computations.  With access to many 32GB V100 GPUs and 2 H100 96GB GPUs as part of the Grace Hopper Superchip, this system is extremely capable of intensive machine learning calculations. It comes with IMB's Distributed Deep Learning Software. This would allow for from scratch training of full sized 100 billion plus parameter models by distributing calculations between the GPUs. For example is has over 4TB total of GPU memory which is much more that the 700GB total size of GPT3 (175B at FP32). This means that this system is capable of inference and fine tuning of extremely large language models but would be unable to train models like GPT4 which are in the trillions of parameters from scratch. 
