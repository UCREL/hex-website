---
layout: page.njk
tags:
    - managed-metal
    - guide
title: Connecting to Hex over SSH
author: John Vidler
back:
    url: /pages/managed-metal
    text: Overview and Terms
next:
    url: /pages/managed-metal/using-vscode
    text: Using VSCode
---

## Generating a new SSH key

You can generate a new SSH key on your local machine by following the steps outlined here

1. Open Terminal on Linux or Mac (or Git Bash console for Windows)

2. Paste the text below, replacing the email used in the example with your GitHub email address.

   `ssh-keygen -t ed25519 -C "your_email@example.com"`

   Note: If you are using a legacy system that doesn't support the Ed25519 algorithm, use:

   `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

   This creates a new SSH key, using the provided email as a label.

   When you're prompted to "Enter a file in which to save the key", you can press Enter to accept the default file
   location. Please note that if you created SSH keys previously, ssh-keygen may ask you to rewrite another key, in
   which case we recommend creating a custom-named SSH key. To do so, type the default file location and replace
   `id_ALGORITHM` with your custom key name.

3. You will be prompted to type a secure passphrase. While passwordless keys will work, they are discouraged and we
   strongly recommend you set a password at this stage.

   > Enter passphrase (empty for no passphrase): [Type a passphrase]
   > 
   > Enter same passphrase again: [Type passphrase again]

Once these steps complete you should now have `id_ALGORITHM.key` and `id_ALGORITHM.pub` files created on your local machine.
You should _never_ share your `.key` file, but you can freely share your `.pub` key.

## Connections through the Lancaster University VPN

If you already have a connection to the university VPN (managed machines should come with this as default) you can directly
access this website and any Hex compute node. To do this, simply append the following host definition to your `.ssh/config`
file (Mac/Linux) or `%USERPROFILE%\.ssh\config` on Windows.

> The windows path normally resolves to something roughly approximating `C:\Users\username\.ssh\config`

```
Host hex-host-*.scc.lancs.ac.uk
    User YOUR_USERNAME
    Port 6767
    IdentityFile YOUR_PRIVATE_KEY
```

Once this is in place, you should be able to connect to your assigned Node(s) by typing `ssh hex-host-???.scc.lancs.ac.uk`
where `???` is your assigned node number. This should automatically drop you into a bash terminal session.



## Connections through the SCC Bastion Server

If you have an account on the ssh bastion server, you do not need to use the university VPN to connect through to Hex
compute nodes, although this site, and its associated domains will not work. Note that the bastion is an SCC managed
service, and not technically part of Hex itself, so to request access please contact the SCC Systems Team directly.

To connect, extend the `.ssh/config` we discussed above with a new entry for the `scc-bastion` host:

```
Host scc-bastion
    Hostname scc-bastion.lancs.ac.uk
    Port 6767
    ForwardAgent yes
    User YOUR_USERNAME
    IdentityFile YOUR_PRIVATE_KEY

Host hex-host-*.scc.lancs.ac.uk
    User YOUR_USERNAME
    Port 6767
    IdentityFile YOUR_PRIVATE_KEY
    ForwardAgent yes
    ProxyJump scc-bastion
```