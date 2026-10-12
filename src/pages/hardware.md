---
layout: article-wide.njk
title: Cluster Hardware
author: John Vidler
---

A (nearly) complete list of the equipment that currently (June 2026) makes up Hex.

<div class="not-prose flex flex-col gap-10">{%- for groupName, group in hosts %}
<section>
<h2 class="mb-4 text-xl font-semibold tracking-tight">{{ groupName }}</h2>
<div class="grid gap-4 md:grid-cols-2">
{%- for host, info in group %}
    <div class="flex flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-5 break-inside-avoid">
        <h3 class="font-mono text-[0.95rem] font-semibold">{{ host }}</h3>
        {%- if info.note %}
        <p class="text-sm leading-relaxed text-base-content/70">{{ info.note }}</p>
        {%- endif %}
        <ul class="flex flex-col gap-1.5 text-sm">
            {%- if info.cpu %}
            <li class="flex items-center gap-2.5"><img src="/assets/icons8/icons8-cpu-50.png" alt="CPU" title="CPU" class="size-5 icon" /><span>{{ info.cpu }}</span></li>
            {%- endif %}
            {%- if info.gpu %}
            <li class="flex items-center gap-2.5"><img src="/assets/icons8/icons8-video-card-50.png" alt="GPU" title="GPU" class="size-5 icon" /><span>{{ info.gpu }}</span></li>
            {%- endif %}
            {%- if info.ram %}
            <li class="flex items-center gap-2.5"><img src="/assets/icons8/icons8-memory-slot-50.png" alt="RAM" title="RAM" class="size-5 icon" /><span>{{ info.ram }} RAM</span></li>
            {%- endif %}
            {%- if info.disk %}
            <li class="flex items-center gap-2.5"><img src="/assets/icons8/icons8-ssd-50.png" alt="SSD" title="SSD" class="size-5 icon" /><span>{{ info.disk }}</span></li>
            {%- endif %}
            {%- if info.net %}
            <li class="flex items-center gap-2.5"><img src="/assets/icons8/icons8-wired-network-50.png" alt="Network" title="Network" class="size-5 icon" /><span>{{ info.net }}</span></li>
            {%- endif %}
        </ul>
        {%- if info.services|length %}
        <div class="flex items-center gap-2 text-sm">
            <span class="font-medium text-base-content/60">Services</span>
            {%- for service in info.services %}
                {%- if service == 'docker' %}
                    <img src="/assets/icons8/icons8-docker-container-50.png" alt="Container Services" title="Container Services" class="size-5 icon" />
                {%- endif %}
                {%- if service == 'jupyter' %}
                    <img src="/assets/icons8/icons8-jupyter-50.png" alt="Jupyter Notebooks" title="Jupyter Notebooks" class="size-5 icon" />
                {%- endif %}
                {%- if service == 'ssh' %}
                    <img src="/assets/icons8/icons8-ssh-50.png" alt="Managed Metal" title="Managed Metal" class="size-5 icon" />
                {%- endif %}
            {%- endfor %}
        </div>
        {%- endif %}
        {%- if info.badges|length %}
        <div class="mt-auto border-t border-base-300 pt-3">
            <span class="text-xs font-medium tracking-wider text-base-content/55 uppercase">Status</span>
            <div class="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-xs sm:grid-cols-3">
                {%- for host, badge in info.badges %}
                    <div class="flex items-center gap-2">{{ host }}<img src={{ badge }} alt="Status badge for {{ host }}" class="h-[1.1em]" loading="lazy" /></div>
                {%- endfor %}
            </div>
        </div>
        {%- elif info.status_badge %}
        <div class="mt-auto flex items-center gap-2 border-t border-base-300 pt-3">
            <span class="text-xs font-medium tracking-wider text-base-content/55 uppercase">Status</span>
            <img src={{ info.status_badge }} alt="Status badge for {{ host }}" class="h-[1.1em]" loading="lazy" />
        </div>
        {%- endif %}
    </div>
{%- endfor %}
</div>
</section>
{%- endfor %}</div>

<span class="text-sm text-base-content/60">Note: Icons on this page from [Icons8](https://icons8.com)</span>