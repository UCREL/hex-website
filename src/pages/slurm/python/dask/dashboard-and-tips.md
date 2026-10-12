---
layout: page.njk
tags:
    - slurm
    - python
    - dask
title: The Dask Dashboard and Good Practice
author: John Vidler
back:
    url: /pages/slurm/python/dask/multi-node
    text: Scaling Dask Across Nodes
next:
    url: /pages/slurm/python/dask/gpus
    text: Dask with GPUs
---

## The Dask dashboard

The distributed scheduler comes with a live, web-based dashboard which shows what every worker is doing, how much memory is in use, and which tasks are taking the longest. It is _by far_ the best tool for understanding why a Dask job is slow, and is well worth getting set up.

### 1. Find which node the scheduler is on

The dashboard runs on the same node as the scheduler; in a [single-job cluster](/pages/slurm/python/dask/single-job) that is your job's worker node, and in a [multi-node cluster](/pages/slurm/python/dask/multi-node) it is the node running your controller.
To find it, look at the `NODELIST` column for that job in:

```
$> squeue --me
```

Both `configure_local()` and `configure_cluster()` print a dashboard link when they start, which will appear in your job's output file. This will normally read `http://127.0.0.1:8787/status`: that is the address you will open once the port has been forwarded to your machine, rather than the node itself.

The usual port is `8787`. If another user's dashboard is already using that port on the same node, Dask will pick a different one and print a warning in your job's output; if so, use that port in the steps below instead.

### 2. Forward the port with VSCode (recommended)

The worker nodes are not directly reachable from your web browser, so the dashboard port needs to be forwarded to you. By far the easiest way to do this is with VSCode, connected to Hex as described in [Connecting with VSCode](/pages/slurm/using-vscode):

1. Open the **Ports** panel (next to the Terminal panel; or run `Ports: Focus on Ports View` from the command palette).
2. Select **Forward a Port**, and enter the node and port from step 1, for example `hex-host-003:8787`.
3. VSCode will show the forwarded address, normally `127.0.0.1:8787`, which now leads to the dashboard.

You can then open the dashboard in either of two ways:

+ **In your own web browser**, by visiting [http://127.0.0.1:8787/status](http://127.0.0.1:8787/status), or clicking the globe icon next to the port in the Ports panel.
+ **Inside VSCode itself**, using its built-in browser: open the command palette, run `Simple Browser: Show`, and enter `http://127.0.0.1:8787/status`. This keeps the dashboard right next to your code, which is handy on a single screen.

The forwarded port stays open for as long as VSCode is connected; remove it from the Ports panel when you are finished.

### 3. Forward the port over SSH (without VSCode)

If you are not using VSCode, you can create the same forwarding with a plain SSH tunnel. On your _local_ machine, replacing `hex-host-003` with the node from step 1:

```
$> ssh -N -L 8787:hex-host-003:8787 login.ucrel-hex.scc.lancs.ac.uk
```

This assumes you have already set up your SSH configuration as described in [Connecting over SSH](/pages/slurm/connecting). The `-N` flag means no remote shell is opened; the command will appear to 'hang', which is expected. While it is running, visit [http://127.0.0.1:8787/status](http://127.0.0.1:8787/status) in your browser, and press <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">C</kbd> to close the tunnel when you are finished.

### What to look for

+ **Task Stream:** each row is a worker thread, and each coloured bar a task. Lots of white space means workers are sitting idle, usually because tasks are too small or there is not enough parallel work.
+ **Worker Memory:** bars turning orange or grey mean workers are close to their memory limit and are spilling data to disk, which is slow. Consider smaller chunks or more memory.
+ **Progress:** how many tasks of each type have completed, are in memory, or are still waiting.

## Saving a performance report

If you cannot watch a long batch job live, you can record the dashboard to a standalone HTML file instead, and open it later from your own machine:

```python
from dask.distributed import performance_report

with performance_report(filename="dask-report.html"):
    result = my_dataframe.groupby("name").y.mean().compute()
```

Copy the file back to your machine (for example with `scp`, or by downloading it through VSCode) and open it in any web browser.

## Good practice

A few habits that will make your Dask jobs faster, and kinder to other Hex users.

### 1. Test small, on the short partitions

Develop and debug against a small slice of your data on the `cpu-5m` partition, where jobs start quickly and at a slightly higher priority. Only move to the `*-6h` or `*-48h` partitions, and the full dataset, once things work.

### 2. Choose sensible chunk sizes

Aim for chunks (or DataFrame partitions) of roughly 100 MB. Each task carries a small scheduling overhead, so millions of tiny tasks can be slower than doing the work without Dask at all.

```python
import dask.array as da

x = da.random.random((50_000, 50_000), chunks="auto")  # Let Dask pick a size
print(x.chunksize, x.npartitions)

df = df.repartition(partition_size="100MB")             # Re-balance a DataFrame
```

### 3. Call compute once, not in a loop

Every `.compute()` call runs the task graph from scratch. Gather everything you need and compute it in one go, so Dask can share the intermediate results:

```python
import dask

# Slow: reads and filters the data three separate times
# low, high, total = df.x.min().compute(), df.x.max().compute(), df.x.sum().compute()

# Fast: one pass over the data
low, high, total = dask.compute(df.x.min(), df.x.max(), df.x.sum())
```

### 4. Persist data you reuse

If you will use the same intermediate result repeatedly, `persist` keeps it in the workers' memory rather than recalculating it each time:

```python
clean = df[df.x > 0].persist()   # Computed once, kept on the workers

print(clean.y.mean().compute())
print(clean.groupby("name").size().compute())
```

### 5. Keep results on the cluster

Calling `.compute()` on a huge collection pulls all of it back into your controller process, which can easily run out of memory. Reduce your data first (aggregations, filtering, sampling), or write large results straight to disk from the workers:

```python
df.to_parquet("results/cleaned/")   # Each worker writes its own partitions in parallel
```

### 6. Prefer Parquet over CSV

Parquet files are compressed, typed and column-oriented, so they are typically many times faster to read than CSV, and Dask can load only the columns you ask for. If you read the same CSV files repeatedly, converting them once to Parquet is usually well worth it.

### 7. Keep the cluster setup in one place

Keeping your cluster setup in a small module, like the `hex_dask.py` built up in the earlier pages, means each analysis script only needs one line to choose where it runs. Develop against `configure_local()` with a small slice of data, then switch to `configure_cluster()` for the full run without touching the analysis itself.

Treat the settings in those functions as a starting point, not a recipe: adjust the cores, memory, partition and worker counts to match what your work actually needs, and check the dashboard to see whether your workers are busy, idle or short of memory.

### 8. Always close your cluster

Close the client and cluster at the end of your script so that worker jobs and resources are released promptly:

```python
client.close()
cluster.close()
```

If you create a cluster directly, using them as context managers does this automatically, even if your code raises an error:

```python
from dask.distributed import Client, LocalCluster

if __name__ == "__main__":
    with LocalCluster(n_workers=4) as cluster, Client(cluster) as client:
        ...  # Your analysis here
```
