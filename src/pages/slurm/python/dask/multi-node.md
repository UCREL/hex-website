---
layout: page.njk
tags:
    - slurm
    - python
    - dask
title: Scaling Dask Across Nodes
author: John Vidler
back:
    url: /pages/slurm/python/dask/single-job
    text: Dask in a Single Slurm Job
next:
    url: /pages/slurm/python/dask/dashboard-and-tips
    text: The Dask Dashboard and Good Practice
---

When a single worker node is not enough, [dask-jobqueue](https://jobqueue.dask.org/) lets Dask submit its own worker jobs to Slurm, then connects them all into one large cluster.
Your analysis code does not change at all; only the way the cluster is created does. If you followed [Dask in a Single Slurm Job](/pages/slurm/python/dask/single-job), this means swapping `configure_local()` for the `configure_cluster()` function we build on this page.

This requires `dask-jobqueue` to be installed in your environment; see [Installing Dask](/pages/slurm/python/dask/installing).

## How it works

With dask-jobqueue there are two parts:

1. **The controller** is your Python script, which also runs the Dask _scheduler_. It needs very few resources, but it must keep running for as long as your analysis does.
2. **Worker jobs** are submitted to Slurm automatically by the controller, using `sbatch`. Each one starts a Dask worker which connects back to the scheduler over the network and waits for tasks.

Because Hex respects the initiating environment for Slurm jobs, and dask-jobqueue launches workers using the same Python interpreter as your controller, the workers automatically use your virtual environment; there is no need to activate it inside the worker jobs.
When your script finishes, the controller cancels its worker jobs and the resources are released back to the cluster.

## Hex-specific settings

Most dask-jobqueue settings are the same on any Slurm cluster, but two matter in particular on Hex:

+ **The network interface.** Hex nodes have several network interfaces, and Dask must use the one the nodes share for the workers to reach the scheduler. On Hex this is `ens19`, and it must be set for _both_ the workers (`interface=`) and the scheduler (`scheduler_options`). If this is missing or wrong, worker jobs will start but never connect.
+ **The dashboard address.** Setting `dashboard_address` to `0.0.0.0:8787` makes sure the dashboard listens on all of the node's interfaces, not just `ens19`, which makes it much easier to reach by forwarding the port with VSCode or SSH (see [The Dask Dashboard](/pages/slurm/python/dask/dashboard-and-tips)).

## A reusable configure_cluster() function

As with `configure_local()`, it is good practice to keep the cluster setup in one small function rather than scattering it through your analysis code.
The following is based on a configuration known to work well on Hex; add it to your `hex_dask.py` alongside `configure_local()`, and adjust the defaults to suit your own work:

```python
import os
from dask import config
from dask.distributed import Client
from dask_jobqueue.slurm import SLURMCluster


def configure_cluster(partition="cpu-6h", walltime="05:55:00", cores=12, memory="24GB",
                      processes=1, min_workers=1, max_workers=8, log_file="job.log"):
    """Start a Dask cluster whose workers are submitted to Slurm as separate jobs."""

    # All worker jobs append to a single log file, so start each run with an empty one
    if os.path.exists(log_file):
        print(f"Clearing old {log_file} contents")
        os.truncate(log_file, 0)

    cluster = SLURMCluster(
        # Hex nodes talk to each other over ens19; set this for workers AND scheduler
        interface="ens19",
        scheduler_options={
            "interface": "ens19",
            "dashboard_address": "0.0.0.0:8787",
        },
        cores=cores,          # CPU cores per worker job
        memory=memory,        # Memory per worker job
        processes=processes,  # Dask worker processes per job (cores are shared between them)
        walltime=walltime,    # Must fit within the partition's time limit
        job_extra_directives=[
            f"--partition={partition}",
            "--open-mode=append",
            f"-o {log_file}",
        ],
    )

    # Let Dask submit and cancel worker jobs as the amount of work changes
    cluster.adapt(minimum=min_workers, maximum=max_workers)

    # Report the dashboard at the address you will open it on, once the port is forwarded
    config.set({"distributed.dashboard.link": "http://127.0.0.1:8787/status"})

    client = Client(cluster)  # Connect this process to the scheduler
    print(f"Cluster dashboard available at: {client.dashboard_link}")

    return client, cluster
```

A few notes on the choices made here:

+ **One worker per job.** With `processes=1`, each Slurm job runs a single Dask worker using all of its `cores` as threads. This suits NumPy and pandas workloads well. For pure-Python code, increase `processes` so the cores are split across several worker processes instead.
+ **Set a walltime.** If you leave `walltime` out, dask-jobqueue defaults to just 30 minutes per worker job. Pick a `partition` and a `walltime` that fits inside its limit (see [Partitions on Hex](/pages/slurm/running-jobs/#partitions-on-hex)). Hex also has an `any` partition, which lets Slurm place workers on whichever nodes are available; check `sinfo` for its current limits.
+ **One log file.** By default every worker job writes its own output file, which quickly clutters your directory. Here they all append to `job.log`, which is emptied at the start of each run. If your workers misbehave, this is the first place to look.
+ **Adaptive scaling.** `adapt` starts with `min_workers`, submits more worker jobs (up to `max_workers`) when there is a backlog of tasks, and cancels idle ones. This is the 'polite' option on a shared system like Hex, as unused resources go straight back to other users. If you would rather have a fixed number, replace it with `cluster.scale(n)`.

Before submitting anything for real, it is a good habit to print the batch script that dask-jobqueue will generate for each worker:

```python
print(cluster.job_script())
```

With the defaults above, this should look something like the following, which should look familiar if you have written your own batch scripts before:

```bash
#!/usr/bin/env bash

#SBATCH -J dask-worker
#SBATCH -n 1
#SBATCH --cpus-per-task=12
#SBATCH --mem=23G
#SBATCH -t 05:55:00
#SBATCH --partition=cpu-6h
#SBATCH --open-mode=append
#SBATCH -o job.log

/home/you/envs/dask-env/bin/python -m distributed.cli.dask_worker tcp://... --nthreads 12 --memory-limit 22.35GiB --interface ens19 ...
```

## A complete example

Save the following as `my_analysis.py`, next to your `hex_dask.py`. It runs a simple Monte Carlo estimate of π across the worker jobs:

```python
import dask.array as da
from hex_dask import configure_cluster

if __name__ == "__main__":
    client, cluster = configure_cluster(partition="cpu-6h", min_workers=2, max_workers=6)

    # One billion random points, in 100 chunks
    n = 1_000_000_000
    xy = da.random.random((n, 2), chunks=(10_000_000, 2))
    inside = ((xy ** 2).sum(axis=1) <= 1.0).sum()

    print(f"Pi is approximately {4 * inside.compute() / n:.6f}")

    client.close()
    cluster.close()
```

Compared to the single-job examples, the only change is the line that creates the cluster. A useful pattern while developing is to test with `configure_local()` on a small slice of data first, then switch to `configure_cluster()` for the full run.

## Running the controller

The controller should not run on the login node, so run it as its own small, long-running Slurm job. Save this as `dask_controller.sh`:

```bash
#!/bin/bash
#SBATCH --job-name=dask-controller
#SBATCH --partition=cpu-6h
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=4G
#SBATCH --output=dask-controller-%j.out

source ~/envs/dask-env/bin/activate

python my_analysis.py
```

... and submit it as usual:

```
$> sbatch dask_controller.sh
```

Running `squeue --me` shortly afterwards should show the controller job, followed by the `dask-worker` jobs it submits. The controller's own output (including the dashboard link and your results) goes to `dask-controller-JOBID.out`, while the workers' output goes to `job.log`.

For interactive work, you can instead start a shell on a worker node with `srun --partition=cpu-6h --cpus-per-task=1 --pty bash`, activate your environment, and run `configure_cluster()` from `python` there.

Remember that the controller needs to outlive the analysis, so place it on a partition with a long enough time limit.

## Worker job time limits

Worker jobs are subject to the same partition time limits as any other job, and Slurm will stop them when their `walltime` runs out, even if they are part-way through a task.
With adaptive scaling, Dask will notice and submit replacement workers, but any work in progress on the stopped workers is lost and has to be redone.

For long-running analyses, you can avoid this by giving workers a _lifetime_ slightly shorter than their walltime. Workers will then shut down gracefully (handing their data to other workers) shortly before Slurm would stop them, and `adapt` will start fresh ones to replace them. To do this, add the following option to the `SLURMCluster(...)` call in `configure_cluster()`:

```python
    # Retire each worker ~10 minutes before its walltime, staggered so they don't all leave at once
    worker_extra_args=["--lifetime", "5h45m", "--lifetime-stagger", "4m"],
```

## Troubleshooting

+ **Workers never appear:** check `squeue --me` to see if the worker jobs are pending (Hex may simply be busy, or your `partition` may be wrong), then check `job.log` for errors.
+ **Workers start, but never connect to the scheduler:** check that `interface="ens19"` is set both on `SLURMCluster` itself and in `scheduler_options`.
+ **Workers are killed for using too much memory:** reduce your chunk sizes, increase `memory`, or use fewer `processes` per job so each worker gets a larger share.
+ **Workers keep disappearing after 30 minutes:** you have not set a `walltime`, so the dask-jobqueue default is being used.
+ **Leftover worker jobs:** if your controller crashes, its worker jobs will normally shut themselves down after a minute or so without a scheduler. If any linger, cancel them with `scancel --me --name=dask-worker`.
