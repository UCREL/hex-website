---
layout: page.njk
tags:
    - slurm
    - python
    - dask
title: Dask with GPUs
author: John Vidler
back:
    url: /pages/slurm/python/dask/dashboard-and-tips
    text: The Dask Dashboard and Good Practice
---

Hex has GPU worker nodes on the `a2000-*` and `a5000-*` partitions, and the 'Extended 3' nodes each carry three RTX A5000 cards (see [Cluster Hardware](/pages/hardware)).
Dask can make use of these in two main ways:

1. **Running one task per GPU**, for example training several models or cross-validation folds at once, with each one on its own card.
2. **GPU-backed arrays**, where the chunks of a `dask.array` live in GPU memory as [CuPy](https://cupy.dev/) arrays rather than NumPy arrays.

Both use [Dask-CUDA](https://docs.rapids.ai/api/dask-cuda/stable/), which provides a `LocalCUDACluster` that starts _one worker per GPU_ and pins each worker to its own card.
It plays the same role as `LocalCluster` in [Dask in a Single Slurm Job](/pages/slurm/python/dask/single-job), so once you are happy with the examples below you may want to add a similar `configure_gpu()` function to your `hex_dask.py`.

## Installing the GPU packages

Install these into your existing [Dask environment](/pages/slurm/python/dask/installing). Dask-CUDA itself is installed with:

```
$> source ~/envs/dask-env/bin/activate
$> pip install dask-cuda
```

If you want GPU-backed arrays, you will also need CuPy, which must match the major CUDA version on the GPU nodes. Check this by running `nvidia-smi` on a GPU node (the CUDA version is shown in the top-right of its output):

```
$> srun --partition=a2000-5m nvidia-smi
```

At the time of writing Hex's GPU nodes run CUDA 12.x, for which you would install:

```
$> pip install cupy-cuda12x
```

## Checking which GPUs your job can see

Before running anything larger, it is worth confirming that your job can see the GPUs you expect. This asks for a short interactive job on an A5000 node and lists the visible devices:

```
$> srun --partition=a5000-5m --pty nvidia-smi -L
```

`LocalCUDACluster` will start one worker for each GPU listed. If fewer GPUs appear than you need, you may need to request them explicitly with Slurm's `--gres` option (for example `--gres=gpu:3`); please get in touch if you are unsure what to request.

## One task per GPU

This pattern works with any GPU library, including PyTorch, TensorFlow and JAX. Each worker only sees its own card, so inside a task the GPU is always simply `cuda:0`.
Save the following as `dask_gpu_tasks.py`. It uses PyTorch (`pip install torch`) to run a stand-in workload on each GPU in parallel:

```python
from dask.distributed import Client
from dask_cuda import LocalCUDACluster


def run_fold(fold):
    """Stand-in for training one cross-validation fold on this worker's GPU."""
    import os
    import torch

    device = torch.device("cuda:0")  # Each worker only sees its own GPU
    torch.manual_seed(fold)

    a = torch.randn(8_000, 8_000, device=device)
    for _ in range(50):
        a = torch.tanh(a @ a.T / a.shape[0])

    return {
        "fold": fold,
        "gpu": os.environ.get("CUDA_VISIBLE_DEVICES", "?").split(",")[0],
        "name": torch.cuda.get_device_name(device),
        "score": a.mean().item(),
    }


if __name__ == "__main__":
    with LocalCUDACluster() as cluster, Client(cluster) as client:
        print(client)

        futures = client.map(run_fold, range(6))   # 6 folds shared between the GPUs
        for result in client.gather(futures):
            print(result)
```

With three GPUs, the six folds will run three at a time, and the output will show which physical card each fold ran on.

## GPU-backed arrays with CuPy

Here, each chunk of the Dask array is a CuPy array held in GPU memory, so the arithmetic runs on the GPUs while Dask handles splitting the work between them. Save this as `dask_gpu_array.py`:

```python
import cupy as cp
import dask.array as da
from dask.distributed import Client
from dask_cuda import LocalCUDACluster

if __name__ == "__main__":
    with LocalCUDACluster() as cluster, Client(cluster) as client:
        print(client)

        # Generate the random chunks directly on the GPUs, using CuPy's generator
        rng = da.random.default_rng(cp.random.default_rng(42))
        x = rng.random((40_000, 40_000), chunks=(5_000, 5_000))
        print(type(x._meta))  # <class 'cupy.ndarray'>: the chunks are GPU arrays

        result = (x @ x.T).mean()

        # The result is a 0-d CuPy array; .item() copies it back to the CPU
        print("Mean:", result.compute().item())
```

If you already have a NumPy-backed Dask array, you can move it onto the GPUs with `x.map_blocks(cp.asarray)`, and back again with `x.map_blocks(cp.asnumpy)`.

## The batch script

GPU jobs are submitted in exactly the same way as CPU jobs, just on a GPU partition. Save this as `dask_gpu_job.sh`:

```bash
#!/bin/bash
#SBATCH --job-name=dask-gpu
#SBATCH --partition=a5000-6h
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=6
#SBATCH --mem=32G
#SBATCH --output=dask-gpu-%j.out

source ~/envs/dask-env/bin/activate

nvidia-smi -L    # Record which GPUs this job was given
python dask_gpu_tasks.py
```

... and submit it with:

```
$> sbatch dask_gpu_job.sh
```

Requesting a couple of CPU cores per GPU is a good idea, as each GPU worker still needs some CPU time to prepare data and launch work on its card.

## Tips for GPU work

+ **Mind the GPU memory.** An RTX A2000 has 12 GB and an RTX A5000 has 24 GB. Keep individual chunks comfortably below this, as some operations need several chunks in GPU memory at once.
+ **Avoid copying back and forth.** Moving data between the CPU and GPU is slow compared to the calculation itself, so try to load data, compute, and reduce it on the GPU, only bringing the (small) final result back.
+ **Not everything has a GPU version.** Most of the NumPy API is supported by CuPy, but not all of it; if an operation fails on a CuPy-backed array, check the [CuPy comparison table](https://docs.cupy.dev/en/stable/reference/comparison.html).
+ **Use the short partitions to test.** GPU nodes are some of the most in-demand resources on Hex, so please debug on the `*-5m` partitions and release GPUs as soon as your work is finished.
