---
layout: page.njk
tags:
    - slurm
    - guide
author: John Vidler
title: Using VSCode to connect to Hex
back:
    url: /pages/slurm/connecting
    text: Connecting over SSH
next:
    url: /pages/slurm/basic-linux-tools
    text: Basic Linux Tools - Terminal Commands
---

<div role="alert" class="alert">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>

Note that this requires you can successfully connect to Hex with SSH. See [this guide on SSH access](/pages/slurm/connecting) before continuing.
</div>

For newer users, we strongly recommended using the [Microsoft Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
extension pack for vscode, as it integrates with your system configuration and shows remote docker instances that you can manage.
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

For the Slurm login node, simply enter `login.ucrel-hex.scc.lancs.ac.uk`. Once you have connected at least once the server name will be populated on the sidebar and this step can be skipped by just clicking it there.