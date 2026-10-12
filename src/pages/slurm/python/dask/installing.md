---
layout: page.njk
tags:
    - slurm
    - python
    - dask
title: Installing Dask
author: John Vidler
back:
    url: /pages/slurm/python/dask
    text: Dask on Hex
next:
    url: /pages/slurm/python/dask/single-job
    text: Dask in a Single Slurm Job
---

Dask is installed with `pip` into your own Python virtual environment; there is no system-wide Dask installation on Hex.
If you have not used virtual environments before, have a quick read of [Python Virtual Environments](/pages/slurm/python/virtual-environments) first.

Because Hex respects the initiating environment for its Slurm jobs, an environment created in your home directory on the login node will also be used by any jobs you submit from it, so you only need to install things once.

## Installing Dask
### 1. Create and activate a virtual environment

Connect to the login node, then create a new environment for your project and activate it:

```
$> python3 -m venv ~/envs/dask-env
$> source ~/envs/dask-env/bin/activate
```

Your prompt should now start with `(dask-env)`. Recent versions of Dask need Python 3.10 or newer, which you can check with `python --version`.

### 2. Upgrade pip

Older versions of `pip` can struggle to find pre-built packages, so it is worth upgrading it first:

```
$> pip install --upgrade pip
```

### 3. Install Dask

Dask is split into several optional parts. The `complete` option installs Dask along with the distributed scheduler, the dashboard, and the array and dataframe support (NumPy, pandas and friends):

```
$> pip install "dask[complete]"
```

Note the quotes around `dask[complete]`; without them some shells will try to interpret the square brackets.

### 4. Install dask-jobqueue (optional)

If you plan to [scale Dask across several nodes](/pages/slurm/python/dask/multi-node), you will also need `dask-jobqueue`, which knows how to submit Dask workers as Slurm jobs:

```
$> pip install dask-jobqueue
```

If you will only ever run Dask [inside a single Slurm job](/pages/slurm/python/dask/single-job), you can skip this step.

### 5. Save your requirements

Once everything is installed, record the exact versions so you (or your collaborators) can rebuild the environment later:

```
$> pip freeze > requirements.txt
```

## Checking the installation

The quickest check is to import Dask and print its version. This is lightweight enough to run on the login node:

```
$> python -c "import dask, distributed; print(dask.__version__, distributed.__version__)"
```

To check that Dask actually works on a worker node, run a small test on one of the 5-minute partitions. Save the following as `dask_check.py`:

```python
from dask.distributed import Client, LocalCluster
import dask.array as da

if __name__ == "__main__":
    # Start a tiny cluster using 2 worker processes on this node
    cluster = LocalCluster(n_workers=2, threads_per_worker=1)
    client = Client(cluster)
    print(client)

    x = da.ones((4_000, 4_000), chunks=(1_000, 1_000))
    print("Sum:", x.sum().compute())  # Should print 16000000.0

    client.close()
    cluster.close()
```

... and run it through Slurm with `srun`, asking for two CPU cores on the `cpu-5m` partition:

```
$> srun --partition=cpu-5m --cpus-per-task=2 python dask_check.py
```

You should see a description of the client (the number of workers, threads and memory) followed by `Sum: 16000000.0`.

<div role="alert" class="alert">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>

Always protect the code that starts a cluster with `if __name__ == "__main__":`. Dask starts its workers as new Python processes, and without this guard each of them will try to start a cluster of its own.
</div>

## Optional extras

Some other packages that work well alongside Dask:

+ `dask-ml`: scalable machine learning, including parallel hyperparameter searches for scikit-learn models.
+ `pyarrow`: fast reading and writing of Parquet files (already included by `dask[complete]`).
+ `xarray`: labelled, multi-dimensional arrays (common for climate and scientific data) with Dask support built in.
+ `jupyterlab` and `dask-labextension`: if you are using Dask interactively from a notebook.

For GPU support, see [Dask with GPUs](/pages/slurm/python/dask/gpus), as these packages need to match the CUDA version on the GPU workers.
