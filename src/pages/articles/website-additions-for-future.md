---
layout: article.njk
title: Running a Job on the HEC
author: Henry Oldroyd
tags:
    - article
---

Here is a list of ideas for future to add to the articles on this website based on feedback.

Technical Ideas to try and document:

Creating documentation for how to setup virtual environments in HEC and BEDE. 

(For example with this code template from Damith)

```
module add git
module add anaconda3/2023.09
module add cuda/12.0
source activate {virtual env}
huggingface-cli login --token $HUGGINGFACE_TOKEN
```

Trying to overcome issues with running jobs on Bede by not using ghlogin instead using other nodes. I am aware this this node correspond to the Grace Hopper so if likely very busy and overkill for some jobs. I did try submitting jobs to the GPU node but had some issues. With more time and Stephen's template for doing this on Slurm (https://github.com/st7ma784/MLSlurmTemplate) hopefully I will be able to submit jobs to BEDE. I even try accessing the login nodes on BEDE. 

Additions to articles:

Adding more additional information about hardware comparison between the HEC and BEDE with regards to their G100 GPUs. Adding more information on their limits and who to talk to when you exceed these limits. 

Also I'll have look into adding to the hardware comparison article an "interactive use" column and a "use case column" that merges description and usability information. 