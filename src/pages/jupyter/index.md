---
layout: page.njk
tags:
    - jupyter
    - guide
title: The 'Jupyter Notebook' Service
author: John Vidler
---

> JupyterLab is the latest web-based interactive development environment for notebooks, code, and data. Its flexible interface allows users to configure and arrange workflows in data science, scientific computing, computational journalism, and machine learning. A modular design invites extensions to expand and enrich functionality.

> The Jupyter Notebook is the original web application for creating and sharing computational documents. It offers a simple, streamlined, document-centric experience.

Primarily this service caters to **Data Scientists** who wish to use **Python-based** or **R-based** environments to process their data.
Each instance is launched on one of Hex's worker nodes and can use up to 20 CPU cores, and approximately 32GB of RAM; however currently this service has no long-term storage backend, so uses ephemeral storage for short-term data retention. While this can store quite a large amount of data, it will be lost when an instance is restarted or shut down.

We're working on fixing this in a future release, but for the moment, if you have specific requirements or concerns, please contact us via the links below.

## User Declaration

I understand that no storage backend is currently configured for this service, so **when an instance is stopped or restarted all data will be lost**.
It is the user's responsibility to ensure a suitable backup strategy is used to prevent unexpected data loss, and it is understood that this service is supplied with no guarantee, implied or otherwise.

<form action="/hub" method="get" class="w-full place-content-center grid">
    <button class="btn btn-neutral">
        I understand, take to me to the notebooks!
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
    </button>
</form>