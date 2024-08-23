---
layout: article.njk
title: Running a Job on the HEC
author: Henry Oldroyd
tags:
    - article
---

# Running a job on the HEC
So you've successfully run a jupyter notebook on the HEX. 
Now you've debugged it you may want to run in on the more powerful HEC. Here is a Guide for how to submit it as a batch job.
This guide was based on this [HEC page](https://lancaster-hec.readthedocs.io/en/latest/submit.html)


## Follow [previous guide](/pages/articles/accessing-the-HEC/) for getting through SSH to the HEC

## Running Hello World Job

fist connect by SSH in command line:

```
ssh -X username@wayland-2022.hec.lancaster.ac.uk
(enter password)

wayland-2022%
```

Lets explore the file system:

```
wayland-2022% pwd
/home/hpc/04/username
wayland-2022% cd /storage/hpc/04/username
wayland-2022% cd /scratch/hpc/04/username
wayland-2022% cd /tmp
wayland-2022% cd /home/hpc/04/username
wayland-2022%
```

You can see the directories here of each of types of storage available on the HEC: See [File Store](https://lancaster-hec.readthedocs.io/en/latest/filestore.html)

| File Area | Quota     | Backup Policy              | File Retention Policy                                     |
|-----------|-----------|----------------------------|-----------------------------------------------------------|
| home      | 10G       | Nightly for 90 days        | For the lifetime of the account                           |
| storage   | 200G      | None                       | For the lifetime of the account                           |
| scratch   | 10T       | None                       | Files automatically deleted after 4 weeks                 |
| temp      | Unlimited | None                       | Files automatically deleted at the end of the job         |


Then create a new python file to print a message:

See this HEC page for [linux help](https://lancaster-hec.readthedocs.io/en/latest/linux.html)

Then create a HEC job file to run this python program 

```
wayland-2022% nano hello_world.py
```
(Then type in the editor)
```
print('Hello from the HEC')
```
You can then see the file contents with
```
wayland-2022% cat hello_world.py
print('Hello from the HEC')
wayland-2022%
```

Now you need to make a job file to run this python program
The HEC uses a SLURM based system for scheduling batch jobs. 
You define the job in a .com file using the SLURM syntax
Use this template to run the hello world job

Repeat the above steps to create a file called ```hello_job.com```


```
#!/bin/bash 
#SBATCH -p serial
#SBATCH -J helloTest


echo Job running on compute node `uname -n`

python3 /home/hpc/04/oldroydh/hello_world.py
```

Then use this console command to submit the job:

```
sbatch hello_job.com
```

Then you can use the command 

```
squeue --me
```
to see the job you have submitted. (If you don't see anything it may have already finished)

```
wayland-2022% sbatch hello_job.com
Submitted batch job 9775217
wayland-2022% squeue --me
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
           9775217    serial helloTes oldroydh  R       0:01      1 comp10-09
wayland-2022% ls helloTest*
helloTest.9775217.err  helloTest.9775217.out
wayland-2022%
```

The number given is the job id. You should then notice that there are some new files in your home directory.

```
wayland-2022% cat helloTest.9775217.err
wayland-2022% cat helloTest.9775217.out
Job running on compute node comp10-09
Hello from the HEC
wayland-2022%
```

The .err file is empty as there were no errors in the job. The .out file shows the jobs output which are as expected
