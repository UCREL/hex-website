---
layout: hero.njk
title: The UCREL-Hex Temporary Landing Page
---

## What is 'Hex'?
Hex is a collection of GPU equipped hosts onto which single- multi- or GPU-processor jobs can be executed.
The current, exact specification of all nodes can be found [on the hardware page](/pages/hardware) and we are actively looking to expand our capabilities overe time to align better with larger HPC systems.

Hex _is not HEC_ - it is not yet another high-performance system, but is rather an modular development system, which attempts to reach feature parity with larger systems to allow students, researchers and staff to design software to run on [HEC](https://lancaster-hec.readthedocs.io/en/latest/index.html), [BEDE](https://n8cir.org.uk/bede/), [AWS](https://aws.amazon.com/), [Google Compute](https://cloud.google.com/products/compute?hl=en), and other systems, but in a much more development-friendly environment.

Note that Hex is not directly affiliated with any of these systems (although Hex and HEC are both located at Lancaster University) and simply attempts to reach feature parity wherever it can with these; where budget and practicality allow.

## Service Status? Downtime? Connection Issues?

Jupyter Notebooks: <img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/hex-core-services_jupyter-notebooks/uptimes/7d/badge.svg" alt="7-day status badge for the Jupyter service" /><br />
iSCSI Backend: <img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/hex-core-services_truenas-iscsi-storage/uptimes/7d/badge.svg" alt="7-day status badge for the iSCSI service" /><br />
Web Frontend: <img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/hex-core-services_traefik-frontend/uptimes/7d/badge.svg" alt="7-day status badge for the Web Frontend service" /><br />
Local DNS Service: <img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/scc-services_scc-acme-dns-service/uptimes/7d/badge.svg" alt="7-day status badge for the DNS service" />

See [this status page](https://status.ucrel-hex.scc.lancs.ac.uk) for all basic service status, and the Hex Teams channel for any maintenance announcements. If you continue to have issues contact j.vidler@lancaster.ac.uk or p.rayson@lancaster.ac.uk via email.

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

<img loading="lazy" class="w-fit" src="/assets/img/Hex-by-Dall-E.png" alt="A GPT generated image for the fantasy computer 'Hex' from the works of Sir. Terry Pratchett" />
<div class="text-center h-fit">A GPT generated image for the fantasy computer 'Hex' from the works of Sir. Terry Pratchett</div>