---
layout: article.njk
title: Running a job on BEDE
author: Henry Oldroyd
tags:
    - article
---

Step 1: Login to BEDE by SSH

Enter the password for your machine account as the first factor and then multi-factor authentication as the second factor

```
PS C:\Users\henry> ssh login1.bede.dur.ac.uk
(henryoldroyd@login1.bede.dur.ac.uk) First Factor:
(henryoldroyd@login1.bede.dur.ac.uk) Second Factor:

                              ============
                              Bede - N8CIR
                              ============

For documentation, see:
  https://bede-documentation.readthedocs.io/en/latest/

There is a Slack workspace for general Bede questions. To request access:
  https://n8cir.org.uk/supporting-research/facilities/bede/rse-support-bede/

Interested in a workshop on the effective use of BEDE? Let us know here:
  https://forms.gle/cjNJrqUkMEw9AYUm8

Last login: Wed Sep  4 08:19:18 2024 from 90.248.225.180
[henryoldroyd@login1.bede ~]$
```

Step 2:

Make a job file based on the SLURM syntax:


```
[henryoldroyd@login1.bede ~]$ cat job.com
#!/bin/bash

#SBATCH --account=bdlan09
#SBATCH --TIME=10:0

echo "echo job on bede"
[henryoldroyd@login1.bede ~]$
```


Step 3:
Make a login session by providing the project code

```
ghlogin -A bdlan09
```

Step 4:
Run the job with srun

