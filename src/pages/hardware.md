---
layout: article.njk
title: Cluster Hardware
author: John Vidler
---

A (nearly) complete list of the equipment that currently (August 2024) makes up Hex.

<div class="not-prose">{% for groupName, group in hosts %}
<div>
<h3 class="font-extrabold">{{ groupName }}</h3>
{% for host, info in group %}
    <div class="flex flex-col p-3 m-3 break-inside-avoid" style="border: 1px dashed #000">
        <span class="font-extrabold">{{ host }}</span>
        <div class="not-prose flex flex-col align-middle gap-1 text-sm">
            {% if info.cpu %}
            <div class="flex flex-row align-middle gap-2">
                <img src="/assets/icons8/icons8-cpu-50.png" alt="CPU" class="h-[1.5em]" />
                <span>{{ info.cpu }}</span>
            </div>
            {% endif %}
            {% if info.gpu %}
            <div class="flex flex-row align-middle gap-2">
                <img src="/assets/icons8/icons8-video-card-50.png" alt="GPU" class="h-[1.5em]" />
                <span>{{ info.gpu }}</span>
            </div>
            {% endif %}
            {% if info.ram %}
            <div class="flex flex-row align-middle gap-2">
                <img src="/assets/icons8/icons8-memory-slot-50.png" alt="RAM" class="h-[1.5em]" />
                <span>{{ info.ram }} RAM</span>
            </div>
            {% endif %}
            {% if info.disk %}
            <div class="flex flex-row align-middle gap-2">
                <img src="/assets/icons8/icons8-ssd-50.png" alt="SSD" class="h-[1.5em]" />
                <span>{{ info.disk }}</span>
            </div>
            {% endif %}
            {% if info.net %}
            <div class="flex flex-row align-middle gap-2">
                <img src="/assets/icons8/icons8-wired-network-50.png" alt="Network" class="h-[1.5em]" />
                <span>{{ info.net }}</span>
            </div>
            {% endif %}
            {% if info.services|length %}
            <span class="font-bold">Services:</span>
            <div class="flex flex-row align-middle gap-1 ml-2.5">
                {% for service in info.services %}
                    {% if service == 'docker' %}
                        <div><img src="/assets/icons8/icons8-docker-container-50.png" alt="Container Services" class="h-[1.5em]" /></div>
                    {% endif %}
                    {% if service == 'jupyter' %}
                        <div><img src="/assets/icons8/icons8-jupyter-50.png" alt="Jupyter Notebooks" class="h-[1.5em]" /></div>
                    {% endif %}
                    {% if service == 'ssh' %}
                        <div><img src="/assets/icons8/icons8-ssh-50.png" alt="Managed Metal" class="h-[1.5em]" /></div>
                    {% endif %}
                {% endfor %}
            </div>
            {% endif %}
        </div>
    </div>
{% endfor %}</div>
{% endfor %}</div>

## Further Information

### The Management VMs

There are two 'management' virtual machines; `ucrel-hex` and `ucrel-hex-nas`, both of which are provisioned from the normal ISS vSphere research pool.

Both are fairly unremarkable in specification, but perform core 'backhaul' duties, such as scheduling the workers, presenting the various web UIs, performing ingress/egress monitoring, logging and metrics storage and presentation, and most important of all; presenting a common interface for long-term backing storage back to the ISS Luna service.

### The Original 11 Workers

The 'core' of Hex is made up of 11 identical worker nodes; with each having the following specification:

- 12th Generation Intel Core i9, with 20 logical processors (10 physical)
- NVIDIA RTX A2000 12GiB GPU
- 32 GiB RAM
- 512 GiB NVMe solid-state disk
- 1 Gbit Ethernet

Each node also has a 2.5Gbit network port but the switch we have available only supports 1GBit uplinks (for now!)

### The "Extended 3" Workers

Added in August of 2024, these three additional boxes each include multiple RTX A5000 GPUs and are intended to better support multi-GPU workloads with larger datasets.

- 64 Core Intel Xeon Silver 4216 CPU @ 2.10GHz
- 3x NVIDIA RTX A5000 24GiB GPUs
- 128 GiB RAM
- 512 GiB NVMe solid-state disk and 1 TiB NVMe solid-state disk
- 1Gbit Ethernet

---
<span class="text-sm">Note: Icons on this page from [Icons8](https://icons8.com)</span>