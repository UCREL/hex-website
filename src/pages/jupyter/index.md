---
layout: page.njk
tags:
    - jupyter
title: The 'Jupyter Notebook' Service
author: John Vidler
---

<div class="badge-row">
    <img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/hex-core-services_jupyter-notebooks/uptimes/24h/badge.svg" />
    <img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/hex-core-services_jupyter-notebooks/response-times/24h/badge.svg" />
    <img loading="lazy" class="h-fit inline" src="https://status.ucrel-hex.scc.lancs.ac.uk/api/v1/endpoints/hex-core-services_jupyter-notebooks/health/badge.svg" />
</div>

> JupyterLab is the latest web-based interactive development environment for notebooks, code, and data. Its flexible interface allows users to configure and arrange workflows in data science, scientific computing, computational journalism, and machine learning. A modular design invites extensions to expand and enrich functionality.

> The Jupyter Notebook is the original web application for creating and sharing computational documents. It offers a simple, streamlined, document-centric experience.

Primarily this service caters to **Data Scientists** who wish to use **Python-based** or **R-based** environments to process their data.
Each instance is launched on one of Hex's worker nodes and can use up to 20 CPU cores, and approximately 32GB of RAM. The storage for notebooks is handled by a centralised VM `ucrel-hex-nas` which provides synchronised storage between instances. It is however somewhat limited in its current configuration, and we are looking to upgrade this to a colocated storage server in the future.

If you have specific requirements or concerns, please contact us via the links below.

If you require GPU accelerated notebooks, please contact us for access to the [Managed Metal](/pages/managed-metal) service. Although do please make sure your notebooks work on a CPU instance first before attempting them on the limited GPU resources.

## User Declaration

I understand that **this is a BETA service**, and while persistent storage between instances is now provided, no backups are currently available so **users are responsible for their own data retention**.
It is the user's responsibility to ensure a suitable backup strategy is used to prevent unexpected data loss, and it is understood that this service is supplied with no guarantee, implied or otherwise.

<form action="/pages/undergraduate-terms-of-use" method="get" class="w-full place-content-center grid">
    <button class="btn btn-outline border-red-600 border-2">ADDITIONAL TERMS FOR UNDERGRADUATE STUDENTS</button>
</form>

<br />

<form action="https://hub.ucrel-hex.scc.lancs.ac.uk/" method="get" class="w-full place-content-center grid">
    <button class="btn btn-neutral">
        I understand, take to me to the notebooks!
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
    </button>
</form>