---
layout: page.njk
title: Cluster Hardware
---

## The Management VMs

There are two 'management' virtual machines; `ucrel-hex` and `ucrel-hex-store`, both of which are provisioned from the normal ISS vSphere research pool.

Both are fairly unremarkable in specification, but perform core 'backhaul' duties, such as scheduling the workers, presenting the various web UIs, performing ingress/egress monitoring, logging and metrics storage and presentation, and most important of all; presenting a common interface for long-term backing storage back to the ISS Luna service.

## The Original 11 Workers

The 'core' of Hex is made up of 11 identical worker nodes; with each having the following specification:

- 12th Generation Intel Core i9, with 20 logical processors (10 physical)
- NVIDIA RTX A2000 12GiB GPU (CUDA Version: 12.3)
- 32GiB RAM
- 512GiB NVMe solid-state disk
- 1Gbit Ethernet

Each node also has a 2.5Gbit network port but the switch we have available only supports 1GBit uplinks (for now!)


## The "Extended 3" Workers (to be merged into the cluster)

These three additional boxes each include multiple RTX A5000 GPUs and will be included to better support multi-GPU workloads with larger datasets.

Unfortunately they have slower local storage, although larger overall capacity, but this may be upgraded in the future.

- Dual-die Intel Xeon CPUs (64 cores)
- 3x NVIDIA RTX A5000 24GiB GPUs (CUDA Version: 12.3)
- ???GiB RAM
- ???GiB SATA hard drive
- 1Gbit Ethernet

## Hardware Wishlist

