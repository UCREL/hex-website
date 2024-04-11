---
layout: page.njk
title: Project Status
---

Hex is composed of a number of subsystems, some of which are industry standard designs; whereas others are new innovations built in-house to support ongoing research.
As the total person-hours available for development is limited, these subsystems may be at various stages of readiness, and may require significant work to be available for normal users; however, if you have a research project that has specific requirements don't hesitate to get in touch via the links in this page's footer. We're happy to discuss options and help you get your design running!

## Service: Managed Metal
<ul class="steps">
  <li class="step step-primary">Design</li>
  <li class="step step-primary">Hardware Deployment</li>
  <li class="step step-primary">Alpha<span>Limited user testing</span></li>
  <li class="step step-primary">Beta<span>Open user testing</span></li>
  <li class="step">General Availability</li>
</ul>

The "Managed Metal" service is currently providing GPU and CPU compute access to a number of research projects and is now in a "Beta" testing state.
If you have a project that would benefit from access to these resources, contact us to arrange access.

<div role="alert" class="alert">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
This service requires a Lancaster University login.
</div>

## Service: Jupyter Notebooks
<ul class="steps">
  <li class="step step-primary">Design</li>
  <li class="step step-primary">Hardware Deployment</li>
  <li class="step step-primary">Alpha<span class="text-xs">Limited user testing</span></li>
  <li class="step">Beta<span class="text-xs">Open user testing</span></li>
  <li class="step">General Availability</li>
</ul>

The Jupyter Notebooks service is currently providing simple CPU compute access to a small number of users, but does not currently provide any long-term storage on the cluster, so use at your own risk.
This is dependent on the CSI storage system being selected and deployed, so until this is resolved no data will be persisted between instances of notebooks. To prevent any data loss, please ensure you back up frequently!

<div role="alert" class="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
This service has no storage persistence! All data will be lost of your instance is restarted, always back up your code and data!
</div>

## Container/User Storage Subsystem
<ul class="steps">
  <li class="step step-primary">Design</li>
  <li class="step">Hardware Deployment</li>
  <li class="step">Alpha<span class="text-xs">Limited user testing</span></li>
  <li class="step">Beta<span class="text-xs">Open user testing</span></li>
  <li class="step">General Availability</li>
</ul>

The persistent, large format storage subsystem is still being designed, and currently has no users. This service will provide a way for applications and services to storage and share data across instances.
There are a number of data security, resilience and compatibility issues with readily available designs, so we are currently working on a bespoke solution to support large file storage in the future.
This may also require additional hardware deployments within the cluster to support near-local storage speeds.


## Multi-GPU and Swarm/Cluster Deployments
<ul class="steps">
  <li class="step step-primary">Design</li>
  <li class="step step-primary">Hardware Deployment</li>
  <li class="step">Alpha<span class="text-xs">Limited user testing</span></li>
  <li class="step">Beta<span class="text-xs">Open user testing</span></li>
  <li class="step">General Availability</li>
</ul>

Currently there is no way for a 'normal' user to deploy services across multiple GPU nodes without there being system security concerns. We are currently exploring options for how this should be orchestrated, and are examining existing technologies such as `slurm` and friends to support distributed runs.