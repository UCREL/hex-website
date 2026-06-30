---
layout: article.njk
title: Cluster Hardware
author: John Vidler
---

A (nearly) complete list of the equipment that currently (June 2026) makes up Hex.

<div class="not-prose">{% for groupName, group in hosts %}
<div>
<h3 class="font-extrabold">{{ groupName }}</h3>
{% for host, info in group %}
    <div class="flex flex-col p-3 m-3 break-inside-avoid">
        <span class="font-extrabold">{{ host }}</span>
        <div class="not-prose flex flex-col align-middle gap-1 text-sm">
            {% if info.note %}
            <div class="flex flex-row align-middle gap-2">
                {{ info.note }}
            </div>
            {% endif %}
            {% if info.cpu %}
            <div class="flex flex-row align-middle gap-2">
                <img src="/assets/icons8/icons8-cpu-50.png" alt="CPU" class="h-[1.5em] icon" />
                <span>{{ info.cpu }}</span>
            </div>
            {% endif %}
            {% if info.gpu %}
            <div class="flex flex-row align-middle gap-2">
                <img src="/assets/icons8/icons8-video-card-50.png" alt="GPU" class="h-[1.5em] icon" />
                <span>{{ info.gpu }}</span>
            </div>
            {% endif %}
            {% if info.ram %}
            <div class="flex flex-row align-middle gap-2">
                <img src="/assets/icons8/icons8-memory-slot-50.png" alt="RAM" class="h-[1.5em] icon" />
                <span>{{ info.ram }} RAM</span>
            </div>
            {% endif %}
            {% if info.disk %}
            <div class="flex flex-row align-middle gap-2">
                <img src="/assets/icons8/icons8-ssd-50.png" alt="SSD" class="h-[1.5em] icon" />
                <span>{{ info.disk }}</span>
            </div>
            {% endif %}
            {% if info.net %}
            <div class="flex flex-row align-middle gap-2">
                <img src="/assets/icons8/icons8-wired-network-50.png" alt="Network" class="h-[1.5em] icon" />
                <span>{{ info.net }}</span>
            </div>
            {% endif %}
            {% if info.services|length %}
            <span class="font-bold">Services:</span>
            <div class="flex flex-row align-middle gap-1 ml-2.5">
                {% for service in info.services %}
                    {% if service == 'docker' %}
                        <div><img src="/assets/icons8/icons8-docker-container-50.png" alt="Container Services" class="h-[1.5em] icon" /></div>
                    {% endif %}
                    {% if service == 'jupyter' %}
                        <div><img src="/assets/icons8/icons8-jupyter-50.png" alt="Jupyter Notebooks" class="h-[1.5em] icon" /></div>
                    {% endif %}
                    {% if service == 'ssh' %}
                        <div><img src="/assets/icons8/icons8-ssh-50.png" alt="Managed Metal" class="h-[1.5em] icon" /></div>
                    {% endif %}
                {% endfor %}
            </div>
            {% endif %}
            {% if info.badges|length %}
            <span class="font-bold">Status:</span>
            <div class="columns-4 align-middle gap-1 ml-2.5">
                {% for host, badge in info.badges %}
                    <div class="w-fit text-lg">{{ host }}:<img src={{ badge }} alt="Status badge for {{ host }}" class="h-[1em] inline-block pl-3" /></div>
                {% endfor %}
            </div>
            {% elif info.status_badge %}
            <span class="font-bold">Status:</span>
            <div class="gap-1 ml-2.5">
                <div class="w-fit text-lg">{{ host }}:<img src={{ info.status_badge }} alt="Status badge for {{ host }}" class="h-[1em] inline-block pl-3" /></div>
            </div>
            {% endif %}
        </div>
    </div>
{% endfor %}</div>
{% endfor %}</div>

<span class="text-sm">Note: Icons on this page from [Icons8](https://icons8.com)</span>