---
layout: page.njk
tags:
    - slurm
author: John Vidler
title: The 'Slurm' Batch Service
next:
    url: /pages/slurm/connecting
    text: Connecting over SSH
---

This service is handled on a per-request basis, and to request access please use [The Hex Sign-Up Form](https://forms.office.com/e/qhzG7ZSWTd).

If approved, you will be given access to the login node, from which you can deploy jobs to any of the worker nodes, including various configurations of GPU-equipped hardware.

<form action="https://forms.office.com/e/qhzG7ZSWTd" method="get" class="w-full place-content-center grid">
    <button class="btn btn-outline border-red-600 border-2">The Hex Sign-Up Form</button>
</form>

<br />

# Service Notice

By continuing to use this service you confirm that you understand and agree
with the following statements:

+ This is a BETA service, and no service or storage guarantees are implied or
  given, and you should back your work up often.

+ This is a SHARED SERVICE so other users may be present on the node at any
  time, and you should check if the node is in use before attempting to launch
  large-scale services (via `squeue`, `sinfo` minimally, to get other users
  and workloads present)

+ Network traffic and system logs are collected and stored, and you are
  responsible for any/all data that is loaded onto Hex, but data within your
  user home directory is secure from other users.

+ Admin users (Dr John Vidler and SCC-Systems users) may inspect data held in
  your home folder, and logs if we suspect anything untoward.

<form action="/pages/undergraduate-terms-of-use" method="get" class="w-full place-content-center grid">
    <button class="btn btn-outline border-red-600 border-2">Additional Terms for Undergraduate and Masters Students</button>
</form>

<br />