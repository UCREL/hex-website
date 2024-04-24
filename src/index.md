---
layout: hero.njk
title: The UCREL-Hex Temporary Landing Page
---

## What is 'Hex'?
Hex is a collection of GPU equipped hosts onto which single- multi- or GPU-processor jobs can be executed.
Currently 11 of these hosts are continuously available (220 CPU, 11 GPU and 352GiB of RAM) with plans to extend these up to 14 hosts with the inclusion of 3 dedicated GPU carrier hosts and again with a further 160 machines similar to the original 11 available for overnight runs on a <i>best effort</i> basis.

## How do I reference Hex in published works?
If your work uses Hex, please use the following reference in your bibliography (in LaTeX/BibTex format):

<pre class="nostyle">
{% raw %}
@misc{UcrelHex,
	title        = {{UCREL - Hex}; A shared, hybrid multiprocessor system},
    author       = {Vidler, John AND Rayson, Paul},
	abstract     = {Hex is a collection of GPU equipped hosts onto which single- multi-
                    or GPU-processor jobs can be executed hosted at Lancaster University,
                    UK as part of the School of Computing and Communications and the
                    UCREL group.},
	howpublished = {\url{https://github.com/UCREL/hex}},
    note         = {Accessed: 2024}
}
{% endraw %}
</pre>

See also our <a href="/pages/publications">Publications</a> page for related works.

## What technologies does Hex use?
The software stack for Hex is a combination of Docker, Swarm and Kubernetes, Docker Compose, Svelte, Javascript and Python, plus the required GPU drivers and operating systems for the hosts.
The hardware stack includes a large number of small form factor desktop PCs running Ubuntu, each equipped with a 20-core Intel-based CPU, an A3000 GPU with 12GB of VRAM, and 32GB of RAM or equivalent technology. In the future we would like to expand this to include ARM64 based hardware hosts to enable very large numbers of densely co-located instances to be deployed

User software is executed in one or more docker containers distributed across the cluster and we support <a href="https://github.com/UCREL/hex-runtime">a number of base images targetting the <a href="https://spacy.io/">spaCy</a> pipeline, with and without GPU support.
However, and intel-based docker container images can be executed on Hex, although Hex's security requirements may mean that some have limited functionality

## Why is it called 'Hex'?
'Hex' is named after an elaborate, Rube Goldberg-esque, magic-powered computer housed at Unseen University in the city of Ankh-Morpork, in author Terry Pratchett's Discworld series.
It consists of a very large number of esoteric components including (but not limited to) an entire ant colony, large numbers of interconnected glass tubes, a mouse, and a stuffed teddy bear; the removal of any of which causes Hex to cease operating.

> 'Of course, Hex doesn't actually think. Not as such. It just appears to be thinking.'
>
> 'Ah. Like the Dean,' said Ridcully.  'Any chance of fitting a brain like this into the Dean's head?'
>
> 'It does weigh ten tons, Archchancellor.'
>
> 'Ah. Really? Oh. Quite a large crowbar would be in order, then.'

Excerpt from the works of Sir. Terry Pratchett