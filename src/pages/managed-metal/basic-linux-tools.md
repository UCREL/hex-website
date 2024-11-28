---
layout: page.njk
tags:
    - managed-metal
    - guide
    - linux
title: Basic Linux Tools - Terminal Commands
author: John Vidler
back:
    url: /pages/managed-metal/using-vscode
    text: Using VSCode
next:
    url: /pages/managed-metal/python/virtual-environments
    text: Python Virtual Environments
---

Most of the interactions with the Managed Metal service are achieved through the terminal over SSH, or through VSCode, and to users new to Linux this can be quite a change from the way they might normally access computer systems. Thankfully, the system is largely self-describing.

## Man Pages

The `man` command in Linux is used to view the manual pages (or "man pages") for various commands, system calls, library functions, and configuration files. These manual pages provide detailed documentation about the usage, options, and functionality of commands and programs available on the system.

To view the manual page for a specific command, you can use the following syntax:

```
$> man command_name
```

For example, to view the manual page for the ls command, you would run:

```
man ls
```

Man pages are organized into sections, and each section covers different types of documentation:

1. User Commands: Commands available to users.
2. System Calls: Functions provided by the kernel.
3. Library Calls: Functions provided by programming libraries.
4. Special Files: Files in `/dev`.
5. File Formats and Conventions: Configuration files and formats.
6. Games: Games and demonstrations.
7. Miscellaneous: Macro packages and conventions.
8. System Administration Commands: Commands for system administration.

You can specify a section number when using the man command to view a specific section. For example:

```
$> man 5 passwd
```

This command would show the man page for the `passwd` file format (section 5).

## `-h` and `--help`
Many Linux commands and programs also provide a `-h` or `--help` option to display a brief summary of how to use the command, including available options and arguments. This is particularly useful for quickly understanding the command's functionality without needing to navigate through the full `man` page.

The output will typically include a brief description of the command, its syntax, and a list of options. This is often more concise than the information found in the man pages.

## Common Commands

The following lists some of the most common commands you might use on a Linux system, and some of their options. For any of these listed below, further options can be found by supplying the `-h` or `--help` argument to the command.

### 1. `ls` - Lists the contents of a directory.
  Usage: `ls [options] [directory]`

  Common Options:
  - `-l`: Long format (detailed information).
  - `-a`: Show hidden files (those starting with a dot).
  - `-h`: Human-readable file sizes.

### 2. `cd` - Changes the current directory.
  Usage: `cd [directory]`

  Common Usage:
  - `cd ..`: Move up one directory.
  - `cd ~`: Move to the home directory.

### 3. `pwd` - Description: Prints the current working directory.
  Usage: `pwd`
  
  Common Usage: Useful to know your current location in the filesystem.

### 4. `cp` - Copies files and directories.
  Usage: `cp [options] source destination`
  Common Options:
  - `-r`: Recursively copy directories.
  - `-i`: Prompt before overwriting files.

### 5. `mv` - Moves or renames files and directories.
  Usage: `mv [options] source destination`

  Common Options:
  - `-i`: Prompt before overwriting files.

### 6. `rm` - Removes files or directories.
  Usage: `rm [options] file`

  Common Options:
  - `-r`: Recursively remove directories and their contents.
  - `-i`: Prompt before each removal.

### 7. `mkdir` - Creates a new directory.
  Usage: `mkdir [options] directory`

  Common Options:
  - `-p`: Create parent directories as needed.

### 8. `rmdir` - Removes empty directories.
  Usage: `rmdir directory`

  Common Usage: Deleting directories conditionally, as it only works if the directory is empty.

### 9. `touch` - Creates an empty file or updates the timestamp of an existing file.
  Usage: `touch filename`

  Common Usage: Useful for creating new files quickly.

### 10. `cat` - Concatenates and displays the content of files.
  Usage: `cat [options] file`

  Common Options:
  - `-n`: Number the output lines.

### 11. `grep` - Searches for patterns in files.
  Usage: `grep [options] pattern [file]`
  
  Common Options:
  - `-i`: Ignore case.
  - `-r`: Recursively search directories.
  - `-v`: Invert match (show lines that do not match).

### 12. `find` - Searches for files and directories in a directory hierarchy.
  Usage: `find [path] [options] [expression]`
  
  Common Options:
  - `-name`: Search for files by name.
  - `-type`: Search by file type (e.g., f for files, d for directories).

### 13. `chmod` - Changes the file permissions.
  Usage: `chmod [options] mode file`

  Common Usage: Use numeric or symbolic modes to set permissions.

### 14. `chown` - Changes the ownership of files and directories.
  Usage: `chown [options] owner[:group] file`

  Common Usage: Useful for changing file ownership.

### 15. `ps` - Displays information about running processes.
  Usage: `ps [options]`

  Common Options:
  - `-e`: Show all processes.
  - `-f`: Full format listing.

### 16. `htop` - Displays real-time information about system processes.
  Usage: `htop`

  Common Usage: Use to monitor system performance and resource usage.

### 17. `df` - Displays disk space usage for file systems.
  Usage: `df [options]`

  Common Options:
  - `-h`: Human-readable format.

### 18. `du` - Displays disk usage of files and directories.
  Usage: `du`

  Common Options:
  - `-h`: Human-readable format.
  - `-s`: Produce summaries rather than per-file listings
