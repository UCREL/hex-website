---
layout: page.njk
tags:
    - slurm
    - guide
    - python
    - dask
title: Dask on Hex
author: John Vidler
back:
    url: /pages/slurm/python/virtual-environments
    text: Python Virtual Environments
next:
    url: /pages/slurm/python/dask/installing
    text: Installing Dask
---

[Dask](https://www.dask.org/) is a Python library for parallel and distributed computing. It lets you take code that you would normally write with NumPy, pandas or plain Python functions and spread it across many CPU cores, many nodes, or many GPUs, usually with only a handful of changed lines.

This makes it a good fit for Hex: you can develop and test your code at a small scale on a single worker, then scale the same code out across the cluster once you are happy it works.

Rather than reiterate the _excellent_ upstream documentation, these pages focus on getting Dask running on Hex specifically. For everything else, see:

- [The Dask Documentation](https://docs.dask.org/en/stable/)
- [Dask Tutorial](https://tutorial.dask.org/)
- [Dask Distributed (the scheduler)](https://distributed.dask.org/en/stable/)
- [Dask-Jobqueue (Dask on HPC schedulers like Slurm)](https://jobqueue.dask.org/en/latest/)

## When should I use Dask?

Dask is worth reaching for when:

+ Your data is too large to fit in memory on a single machine, but can be processed in pieces (chunks).
+ You have lots of independent tasks (parameter sweeps, per-file processing, cross-validation folds) that could run at the same time.
+ You already use NumPy or pandas and want to parallelise without rewriting everything.

Dask is probably _not_ what you want if your job is a single PyTorch or TensorFlow training run; those frameworks have their own distributed training tools, and a plain Slurm job on a GPU partition is usually simpler.

## The main pieces

Dask has a few core concepts that come up throughout these guides:

+ **Collections**, like `dask.array`, `dask.dataframe` and `dask.bag`, which look and feel like NumPy arrays, pandas DataFrames and Python lists, but are split into many small chunks.
+ **Delayed functions**, via `dask.delayed`, which turn ordinary Python functions into tasks that can run in parallel.
+ **The scheduler**, which decides which worker runs which task. On Hex we use the _distributed_ scheduler, which gives you a live dashboard.
+ **Workers**, the processes that actually do the work. These can all live inside one Slurm job, or be spread across many Slurm jobs.

Here is about the smallest useful example; note that nothing is calculated until `.compute()` is called:

```python
import dask.array as da

# A 20,000 x 20,000 array of random numbers, split into 1,000 x 1,000 chunks
x = da.random.random((20_000, 20_000), chunks=(1_000, 1_000))

# This only builds a task graph; nothing is calculated yet
result = (x + x.T).mean(axis=0)

# This runs the graph, in parallel, and returns a regular NumPy array
print(result.compute()[:5])
```

## Running Dask on Hex

There are two common ways of running Dask on Hex, and which you pick depends on how much hardware you need:

1. **Inside a single Slurm job:** you request one worker with a number of cores via `sbatch`, and Dask starts a `LocalCluster` using those cores. This is the simplest option, and is the right place to start. See [Dask in a Single Slurm Job](/pages/slurm/python/dask/single-job).

2. **Across many Slurm jobs:** a small 'controller' script uses [dask-jobqueue](https://jobqueue.dask.org/) to submit worker jobs to Slurm on your behalf, and connects them together into one cluster. Use this when one node is not enough. See [Scaling Dask Across Nodes](/pages/slurm/python/dask/multi-node).

Throughout these guides we build up a small helper module, `hex_dask.py`, with one function for each approach: `configure_local()` and `configure_cluster()`. Both return a connected client and cluster, so your analysis code stays the same and you can move from one to the other by changing a single line. They are based on settings known to work on Hex, but they are a starting point rather than a fixed recipe; adapt them to suit your own work.

In either case, please **do not run Dask workloads directly on the login node**. The login node is shared by every Hex user and is only intended for editing files, managing environments and submitting jobs.

## Guides in this series

1. [Installing Dask](/pages/slurm/python/dask/installing)
2. [Dask in a Single Slurm Job](/pages/slurm/python/dask/single-job)
3. [Scaling Dask Across Nodes](/pages/slurm/python/dask/multi-node)
4. [The Dask Dashboard and Good Practice](/pages/slurm/python/dask/dashboard-and-tips)
5. [Dask with GPUs](/pages/slurm/python/dask/gpus)
