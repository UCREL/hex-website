---
layout: article.njk
title: Deciding Project Requirements. 
author: Henry Oldroyd
tags:
    - article
---


When deciding the requirements for your project you will need to consider a variety of factors:
* How long will your job need to run for?
* How computational intensive is it?
* How parralelisable is it? or is is highly sequential?
* Can it benefit from hardware like a GPU or does it just require a CPU?

Example Jobs:

Webscraping:
This class of jobs is unlikely to benefit from hardware like a GPU. It can be parallelized but can also be sped up by making each request asynchronously so that the CPU is always doing something. This task it unlikely to be very computationally intensive but the job may need to be left running for some time. This kind of task is also more likely to require lots of intervention and debugging (e.g. if you discover some html pages have a different format). Therefore being able to run it directly in a notebook or console where you can interact with it may be beneficial. For this reason the HEX cluster is likely to be more use suitable than the HEC or BEDE which use a queue based system for batch jobs. 