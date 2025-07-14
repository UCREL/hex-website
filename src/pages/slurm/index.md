---
layout: page.njk
tags:
    - slurm
author: John Vidler
title: The 'Slurm' Batch Service
next:
    url: /pages/managed-metal/connecting
    text: Connecting over SSH
---

This service is handled on a per-request basis, and to request access please use [The Hex Sign-Up Form](https://forms.office.com/e/qhzG7ZSWTd).
Individual cases will be considered and access granted for cases where low-level access to specific hardware configurations is needed.

You will have direct access to a single specific compute node with user-level access (non-root) but access to launch docker runtimes to support custom software configurations.

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
  large-scale services (via `who`, `docker ps` and `htop` minimally, to get
  other users and workloads present)

+ Network traffic and system logs are collected and stored, and you are
  responsible for any/all data that is loaded onto Hex, but data within your
  user home directory is secure from other users.

+ Admin users (Dr John Vidler and SCC-Systems users) may inspect data held in
  your home folder, and logs if we suspect anything untoward.

<form action="/pages/undergraduate-terms-of-use" method="get" class="w-full place-content-center grid">
    <button class="btn btn-outline border-red-600 border-2">ADDITIONAL TERMS FOR UNDERGRADUATE STUDENTS</button>
</form>

<br />