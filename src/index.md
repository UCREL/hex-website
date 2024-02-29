---
layout: hero.njk
title: The UCREL-Hex Temporary Landing Page
---

## What is 'Hex'?
Hex is a collection of GPU equipped hosts onto which single- multi- or GPU-processor jobs can be executed.
Currently 3 of these hosts are continuously available (60 CPU, 3 GPU, and 96GiB of RAM) with plans to extend these up to 11 hosts (220 CPU, 11 GPU and 352GiB of RAM), with a further 160 similar machines additionally available for overnight runs on a <i>best effort</i> basis.

## What technologies does Hex use?
The software stack for Hex is a combination of Docker, Swarm, Docker Compose, Svelte, Javascript and Python, plus the required GPU drivers and operating systems for the hosts.
The hardware stack includes a large number of small form factor desktop PCs running Ubuntu, each equipped with a 20-core Intel-based CPU, an A3000 GPU, and 32GB of RAM or equivalent technology. In the future we would like to expand this to include ARM64 based hardware hosts to enable very large numbers of densely co-located instances to be deployed

User software is executed in one or more docker containers distributed across the cluster and we support <a href="https://github.com/UCREL/hex-runtime">a number of base images targetting the <a href="https://spacy.io/">spaCy</a> pipeline, with and without GPU support.
However, and intel-based docker container images can be executed on Hex, although Hex's security requirements may mean that some have limited functionality

## Why is it called 'Hex'?
'Hex' is named after an elaborate, Rube Goldberg-esque, magic-powered computer housed at Unseen University in the city of Ankh-Morpork, in author Terry Pratchett's Discworld series.
It consists of a very large number of esoteric components including (but not limited to) an entire any colony, large numbers of interconnected glass tubes, a mouse, and a stuffed teddy bear; the removal of any of which causes Hex to cease operating.

> 'Of course, Hex doesn't actually think. Not as such. It just appears to be thinking.'
>
> 'Ah. Like the Dean,' said Ridcully.  'Any chance of fitting a brain like this into the Dean's head?'
>
> 'It does weigh ten tons, Archchancellor.'
>
> 'Ah. Really? Oh. Quite a large crowbar would be in order, then.'

Excerpt from the works of Sir. Terry Pratchett

## Compute Node Status

<div class="status">
{% for node, info in hosts %}
    <!--<div class="node">
        <span class="name">{{ node }}</span>
        <img src={{ info.status_badge }} />
    </div>-->
{% endfor %}
</div>

<Button>Test</Button>