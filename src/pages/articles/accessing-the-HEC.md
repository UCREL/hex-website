---
layout: article.njk
title: How to get access to the HEC. 
author: Henry Oldroyd
tags:
    - article
next:
    url: /pages/articles/running-on-HEC
    text: Running code on HEC
---



(initial skelton draft for article. Still being worked on)

## How to get a HEC account:

To get access to the HEC you should have a look over these pages:
- <https://lancaster-hec.readthedocs.io/en/latest/getaccount.html>
- <https://portal.lancaster.ac.uk/ask/hec>

This [form](https://helpcentre.lancaster.ac.uk/plugins/servlet/desk/portal/4/create/338) should then be filled in. If you are a researched then the Principle investigator or Lead researcher should complete it. If you are a degree student then your supervisor should complete it.  

This should lead to the ISS sending you a username and password


## How to login through console SSH:

SSH stands for Secure Shell. It is an industry standard method of securely accessing a remote machine (in this case a node on the HEC)
Most operating systems will already have SSH software already installed. To check try running in the console:

SSH

If this doesn't lead to an error then you already have SSH installed.
If SSH is not working look here:
- [windows](https://learn.microsoft.com/en-us/windows/terminal/tutorials/ssh)
- [mac OS](https://osxdaily.com/2022/07/08/turn-on-ssh-mac/)
- [linux](https://linuxize.com/post/how-to-enable-ssh-on-ubuntu-18-04/)


## Connect to HEC by SSH in console

You can follow this guide in the [HEC documentation](https://lancaster-hec.readthedocs.io/en/latest/login.html)

Enter this line of code in the console to run:


```
ssh -X username@wayland-2022.hec.lancaster.ac.uk
```
(replace username)


You may see this message when first connecting:

```
Host key not found from the list of known hosts.
Are you sure you want to continue connecting (yes/no)?
yes>
```

reply yes.

You will then be prompted for the password. Use the username and password the ISS provided

Once this is complete you will be connected to a login node in the HEC. 

The message should look like this 

```
Welcome to the High End Compute cluster at Lancaster University.

-----

If you experience problems or would like further software or
libraries installed, please submit a request or report via
https://helpcentre.lancaster.ac.uk

Guidelines for HEC usage and example job templates can be found in
the online course found on the HEC web pages at
https://lancaster-hec.readthedocs.io/en/latest/

Please ensure that any published research or projects that use the
HEC have their entries on PURE linked with the HEC facility (see
the online course above for details)

---

27/06 : File store quota for storage is now increased to 200G

Last login: Mon Aug  5 09:38:29 2024 from 148.88.245.138
wayland-2022%
```

From here you can access relevant directories and store source code needed for a job.

You can connect through SSH in a vscode window (same method as HEC see that article)


## Details about the HEC

You can find details about hardware requirements and the different storage types in the HEC documentation here:
- [Intro](https://lancaster-hec.readthedocs.io/en/latest/intro.html)
- [How it Works](https://lancaster-hec.readthedocs.io/en/latest/howitworks.html)
- [File Store](https://lancaster-hec.readthedocs.io/en/latest/filestore.html)
