---
layout: page.njk
tags:
    - slurm
    - python
    - dask
title: Dask in a Single Slurm Job
author: John Vidler
back:
    url: /pages/slurm/python/dask/installing
    text: Installing Dask
next:
    url: /pages/slurm/python/dask/multi-node
    text: Scaling Dask Across Nodes
---

The simplest way to use Dask on Hex is to ask Slurm for a single worker with several CPU cores, then start a Dask `LocalCluster` _inside_ that job which uses exactly those cores.
Everything (the scheduler, the workers and your own script) lives inside one Slurm allocation, and it all goes away cleanly when the job ends.

This approach comfortably covers most workloads, and is the best place to start even if you plan to [scale across nodes](/pages/slurm/python/dask/multi-node) later.

## Sizing the cluster to your job

Slurm tells your job what it has been given through environment variables. The two most useful for Dask are:

+ `SLURM_CPUS_PER_TASK`: the number of CPU cores allocated, set when you use `--cpus-per-task`.
+ `SLURM_MEM_PER_NODE`: the memory allocated in megabytes, set when you use `--mem`.

Using these, rather than hard-coding numbers, means your script always uses what you asked for; no more, no less.

## A reusable configure_local() function

Rather than repeating the cluster setup at the top of every script, it is good practice to keep it in one small function in its own module, which your analysis scripts then import.
At its simplest, this can be just a few lines; Dask starts a `LocalCluster` for you when you create a `Client` with worker settings:

```python
from dask.distributed import Client


def configure_local(n_workers=3, threads_per_worker=1, memory_limit="8GB"):
    client = Client(
        n_workers=n_workers,
        threads_per_worker=threads_per_worker,
        memory_limit=memory_limit,  # Per worker, not in total
    )
    print(f"Local cluster dashboard available at: {client.dashboard_link}")

    return client
```

This works well, but you have to remember to keep the numbers in step with your `#SBATCH` options. A more robust version fills in its defaults from the Slurm environment variables above, while still letting you override them.
Save the following as `hex_dask.py` (we will add a second function to it in [Scaling Dask Across Nodes](/pages/slurm/python/dask/multi-node)), and adapt it to your needs:

```python
import os
from dask.distributed import Client, LocalCluster


def configure_local(n_workers=None, threads_per_worker=1, memory_limit=None):
    """Start a LocalCluster inside the current Slurm job, sized to its allocation."""
    if n_workers is None:
        cores = int(os.environ.get("SLURM_CPUS_PER_TASK", 2))
        n_workers = max(1, cores // threads_per_worker)

    if memory_limit is None:
        # Share ~90% of the job's memory between the workers, leaving some headroom
        # for your own script and the scheduler
        mem_mb = os.environ.get("SLURM_MEM_PER_NODE")
        memory_limit = f"{int(int(mem_mb) * 0.9 / n_workers)}MB" if mem_mb else "auto"

    cluster = LocalCluster(
        n_workers=n_workers,
        threads_per_worker=threads_per_worker,
        memory_limit=memory_limit,  # Per worker, not in total
        # Somewhere fast and local for workers to spill data to disk if memory runs short
        local_directory=os.environ.get("TMPDIR", "/tmp"),
    )
    client = Client(cluster)
    print(f"Local cluster dashboard available at: {client.dashboard_link}")

    return client, cluster
```

By default this starts one single-threaded worker process per core, which is the safest choice for general Python code. If your work is mostly NumPy or pandas (which release Python's GIL), fewer processes with more threads each is usually more efficient; for example `configure_local(threads_per_worker=4)` on an 8-core job gives 2 workers with 4 threads each.

Returning both the `client` and the `cluster` means your scripts can close them cleanly when they finish, and keeps the function interchangeable with `configure_cluster()` on the next page.

## The batch script

Next, a Slurm batch script to request the resources and run your code. Save this as `dask_job.sh`:

```bash
#!/bin/bash
#SBATCH --job-name=dask-single
#SBATCH --partition=cpu-6h
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8
#SBATCH --mem=16G
#SBATCH --output=dask-single-%j.out

source ~/envs/dask-env/bin/activate

python my_analysis.py
```

The important line is `--cpus-per-task`, which sets how many workers our `LocalCluster` will start. Pick a partition that suits your runtime; see [Partitions on Hex](/pages/slurm/running-jobs/#partitions-on-hex) for the full list. For quick tests, use `cpu-5m`.

Submit it from the login node with:

```
$> sbatch dask_job.sh
```

... and check on it with `squeue --me`. Output will be written to `dask-single-JOBID.out` in the directory you submitted from.

## Examples

Each of the following can be saved as `my_analysis.py`, next to your `hex_dask.py`, and run with the batch script above. They all follow the same pattern: start the cluster, do the work, then close the cluster.

### 1. Parallel function calls with dask.delayed

`dask.delayed` is the easiest way to parallelise existing code. Wrapping a function in `delayed` means calling it returns a _task_ instead of running immediately, and `dask.compute` then runs all the tasks in parallel.
This is ideal for parameter sweeps or processing many files:

```python
import time
import dask
from hex_dask import configure_local


@dask.delayed
def simulate(seed):
    """Stand-in for a slow, independent piece of work."""
    import random
    rng = random.Random(seed)
    time.sleep(1)
    return sum(rng.random() for _ in range(100_000))


if __name__ == "__main__":
    client, cluster = configure_local()

    # Build 32 tasks; nothing runs yet
    tasks = [simulate(seed) for seed in range(32)]

    # Run them all in parallel; with 8 workers this takes ~4 seconds rather than ~32
    results = dask.compute(*tasks)
    print(f"Mean of {len(results)} runs: {sum(results) / len(results):.2f}")

    client.close()
    cluster.close()
```

### 2. Futures with client.map

If you want to start work straight away and collect results as they finish, use the futures interface instead.
`client.map` sends a function and a list of inputs to the workers immediately, and `as_completed` hands back results in the order they finish:

```python
from dask.distributed import as_completed
from hex_dask import configure_local


def count_primes(limit):
    """Count the primes below `limit` (deliberately slow)."""
    return sum(all(n % d for d in range(2, int(n ** 0.5) + 1)) for n in range(2, limit))


if __name__ == "__main__":
    client, cluster = configure_local()

    limits = [50_000, 100_000, 150_000, 200_000]
    futures = client.map(count_primes, limits)

    for future in as_completed(futures):
        print(f"Finished a task: {future.result()} primes")

    client.close()
    cluster.close()
```

### 3. Larger-than-memory arrays with dask.array

`dask.array` mirrors the NumPy interface, but splits the array into chunks which are processed in parallel and never all held in memory at once:

```python
import dask.array as da
from hex_dask import configure_local

if __name__ == "__main__":
    client, cluster = configure_local()

    # ~3.2 GB of float64 data, in 100 chunks of ~32 MB each
    x = da.random.random((20_000, 20_000), chunks=(2_000, 2_000))

    # Standardise each column, then find the overall standard deviation
    z = (x - x.mean(axis=0)) / x.std(axis=0)
    print("Std of z:", z.std().compute())  # Should be very close to 1.0

    client.close()
    cluster.close()
```

As a rule of thumb, aim for chunks of roughly 100 MB. Chunks that are too small create huge numbers of tiny tasks, and chunks that are too large can exhaust a worker's memory.

### 4. Tabular data with dask.dataframe

`dask.dataframe` mirrors pandas. This example uses a small built-in demonstration dataset so it runs anywhere:

```python
import dask
from hex_dask import configure_local

if __name__ == "__main__":
    client, cluster = configure_local()

    # A month of fake per-second records: ~2.6 million rows
    df = dask.datasets.timeseries(start="2024-01-01", end="2024-02-01", freq="1s")

    summary = df[df.x > 0].groupby("name").y.agg(["mean", "count"])
    print(summary.compute().head())

    client.close()
    cluster.close()
```

With your own data, replace the demonstration dataset with `dd.read_csv` or `dd.read_parquet`, which accept wildcards so that a whole folder of files becomes one DataFrame:

```python
import dask.dataframe as dd

df = dd.read_csv("data/measurements-*.csv")
# or, much faster for large data:
df = dd.read_parquet("data/measurements/")
```

## Interactive use

For quick experiments, you can also run Dask interactively on a worker node rather than through a batch script. This asks for an interactive shell on a worker with 4 cores for up to 6 hours:

```
$> srun --partition=cpu-6h --cpus-per-task=4 --pty bash
```

Once the shell starts, activate your environment and start `python` as normal; `configure_local()` will pick up the 4 cores automatically.
Remember to `exit` the shell when you are finished, so the cores are released for other users.
