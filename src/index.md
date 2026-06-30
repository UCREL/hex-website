---
layout: page.njk
title: UCREL-Hex
---

To request access to this resource, please select the button below and fill out the form.
You will have to agree to our [Service Agreement](http://localhost:8081/pages/slurm/#service-notice), and this service is **only available to current staff, students and visiting academics at Lancaster University, UK**.

<div class="w-full">
    <div class="mx-auto w-fit">
        <a href="https://forms.cloud.microsoft/e/qhzG7ZSWTd" class="btn btn-sm btn-outline btn-primary" style="font-weight: bold; padding: 1rem; padding-bottom: 2.5rem; border-width: 3px; font-size: 1.5rem;">Request access to Hex</a>
    </div>
</div>



## What is 'Hex'?
Hex is a collection of GPU equipped hosts onto which single- multi- or GPU-processor jobs can be executed.
The current, exact specification of all nodes can be found [on the hardware page](/pages/hardware) and we are actively looking to expand our capabilities overe time to align better with larger HPC systems.

Hex _is not HEC_ - it is not yet another high-performance system, but is rather an modular development system, which attempts to reach feature parity with larger systems to allow students, researchers and staff to design software to run on [HEC](https://lancaster-hec.readthedocs.io/en/latest/index.html), [BEDE](https://n8cir.org.uk/bede/), [AWS](https://aws.amazon.com/), [Google Compute](https://cloud.google.com/products/compute?hl=en), and other systems, but in a much more development-friendly environment.

Note that Hex is not directly affiliated with any of these systems (although Hex and HEC are both located at Lancaster University) and simply attempts to reach feature parity wherever it can with these; where budget and practicality allow.

## Service Status? Downtime? Connection Issues?

<table class="w-fit">
    <tr>
        <th>Service</th>
        <th class="text-center">Status</th>
        <th class="text-center">7-Day</th>
    </tr>
    <tr>
        <td>Login Node</td>
        <td class="text-center"><img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/hex-core-services_login-node/health/badge.svg" alt="" /></td>
        <td class="text-center"><img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/hex-core-services_login-node/uptimes/7d/badge.svg" alt="" /></td>
    </tr>
    <tr>
        <td>Web Frontend</td>
        <td class="text-center"><img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/hex-core-services_hex-website/health/badge.svg" alt="" /></td>
        <td class="text-center"><img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/hex-core-services_hex-website/uptimes/7d/badge.svg" alt="" /></td>
    </tr>
    <tr>
        <td>Package Sources</td>
        <td class="text-center"><img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/scc-services_scc-labs-apt-mirror-service/health/badge.svg" alt="" /></td>
        <td class="text-center"><img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/scc-services_scc-labs-apt-mirror-service/uptimes/7d/badge.svg" alt="" /></td>
    </tr>
</table>

See [this status page](https://status.ucrel-hex.scc.lancs.ac.uk) for a more complete list of statuses for each node and service, and check the Hex Teams channel for any maintenance announcements. If you continue to have issues contact j.vidler@lancaster.ac.uk or p.rayson@lancaster.ac.uk via email.

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

<div class="h-fit w-fit mx-auto p-5 bg-white rounded-xl shadow-lg">
<img loading="lazy" src="/assets/img/Hex-by-Dall-E.png" alt="A GPT generated image for the fantasy computer 'Hex' from the works of Sir. Terry Pratchett" />
<div class="text-center h-fit">A GPT generated image for the fantasy computer 'Hex' from the works of Sir. Terry Pratchett</div>
</div>
