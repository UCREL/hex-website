---
layout: page.njk
title: The 'Managed Metal' Service
---

## Test

This service is handled on a per-request basis, and to gain access you should contact either
<a href="mailto:j.vidler@lancaster.ac.uk">Dr John Vidler</a> or <a href="mailto:p.rayson@lancaster.ac.uk">Prof. Paul Rayson</a>.
Individual cases will be considered and access granted for cases where low-level access to specific hardware configurations
is needed.

You will have direct access to a single specific compute node with user-level access (non-root) but access to launch docker
runtimes to support custom software configurations.

## Service Notice

By continuing to use this service you confirm that you understand and agree
with the following statements:

+ This is a BETA service, and no service or storage guarantees are implied or
  given, and you should back your work up often.

+ This is a SHARED SERVICE so other users may be present on the node at any
  time, and you should check if the node is in use before attempting to launch
  large-scale services (via `who`, `docker ps` and `htop` minimally, to get
  other users and workloads present)

+ Network traffic and system logs are collected and stored, and you are
  responsible for any/all data that is loaded onto Hex, but data within your
  user home directory is secure from other users.

+ Admin users (Dr John Vidler and SCC-Systems users) may inspect data held in
  your home folder, and logs if we suspect anything untoward.

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
compute nodes, although this site, and its associated domains will not work.

To connect, extend the `.ssh/config` we discussed above with a new entry for the `scc-bastion` host, 

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

## VSCode Integration

Its strongly recommended to use the [Microsoft Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
extension pack for vscode for this, as it integrates with your system configuration and shows remote docker instances
that you can manage.
Equally the [Microsoft Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) extension
provides a level of autocompletion and integration with `Dockerfile` and `docker-compose.yml` files, which may make
editing these files easier.

Unfortunately the 'Remote Explorer' does not currently support wildcard `.ssh/config` host entries, so fails to show these
in the list. However it is simple to affect a connection through the `Command Palette`. This can be accessed with a keyboard
shortcut; this is either:

- Windows/Linux: <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">P</kbd>
- Mac: <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Command</kbd> + <kbd class="kbd">P</kbd>

... and typing `ssh` into the search. This should present the `Remote-SSH: Connect to Host` option which you can use to enter
any valid host entry.

![The VSCode command Palette showing the Remote-SSH connection option](/assets/img/vscode-remote-ssh.png)