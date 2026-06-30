---
layout: page.njk
tags:
    - slurm
    - guide
    - python
title: Running Slurm Jobs on Hex
author: John Vidler

next:
    url: /pages/slurm/python/virtual-environments
    text: Python Virtual Environments
back:
    url: /pages/slurm/basic-linux-tools
    text: Basic Linux Tools - Terminal Commands
---

Rather than reiterate the contents of the _absolutely excellent_ online documentation for Slurm over at the [SchedMD](https://schedmd.com/) pages, we instead link to these guides here:

- [The Slurm Documentation](https://slurm.schedmd.com/)
- [Getting Started with Slurm](https://slurm.schedmd.com/quickstart.html)
- [Web-Formatted Manual Pages for each Tool](https://slurm.schedmd.com/man_index.html)


If you have a particularly good source for more Slurm or related batch compute technology, please do contact us so we can update this list!

## Partitions on Hex

Rather than forcing users to fully specify their resource needs on each run, Hex instead provides a number of partition queues that describe particular environments for you.

These can be found by running `sinfo` on the login node, and follow the general schema: `[type]-[duration]` whereby `type` encodes the runtime's main hardware resource and `duration` encodes the maximum runtime for a job on this resource.

Currently (June 2026) we have `a2000`, `a5000` and `cpu` job types, which map to our RTX A2000 GPUs, RTX A5000 GPUs, and regular CPU-only workers respectively.

Our durations are `48h`, `6h` and `5m` options for each of the above; mapping to 48-hours maximum, 6-hour maximum and 5-minute maximum runtimes.
These durations should be used as a 'safety net' for processes running on Hex, where if you are looking to do short test runs, placing the jobs on the `*-5m` queues will place the jobs at a slightly higher priority than the longer runs to allow a consistent quality-of-service across the cluster for development. the `*-6h` and `*-48h` queues have correspondingly lower priority so equipment is not needlessly tied up on excessive runtimes.

Note that these are _limits_ for runtime, your processes can quit early and the resources will be _immediately_ released to the cluster for other jobs.