---
layout: article.njk
title: Keeping VSCode Tidy with Profiles
author: John Vidler
tags:
    - guide
    - tools
---

If you have been using VSCode for a while, there is a good chance your extension list looks like a junk drawer: a Python linter, a C++ debugger, three themes you tried once, a Docker helper, and something that seemed important in 2022.
Everything loads together, everything competes for your attention (and your RAM), and the Python extension is quietly trying to be helpful in a folder full of CMake files.

**Profiles** are the fix. A profile is a named bundle of extensions, settings, keyboard shortcuts, snippets and UI layout, and you can switch between them in a couple of clicks.
The approach that has worked well for me is simple:

1. Keep a **minimal, clean default profile** that you never really "work" in.
2. Create **one profile per task** you regularly do.

## Why bother?

There are a few reasons:

- **Faster start-up.** Fewer active extensions means less to load, and less to go wrong.
- **Less noise.** Your C++ autocomplete will not pop up in a Python file, and your Python linter will not complain about a JSON config.
- **Safe experiments.** Want to try a new extension? Install it in a throwaway profile and delete the whole thing if you do not like it.
- **Easier to share.** A profile can be exported, so a new student or colleague can get an identical working set-up in a minute.

## The clean default profile

Your default profile is what you get when you open VSCode for a quick edit of a text file, a README, or a one-off script.
It should be boring. I keep mine down to a handful of things:

- A theme and icon pack (because life is too short for a bad colour scheme, or in my case, to fumble around without a colour-blind friendly one!)
- **Remote Development**, by Microsoft - an extension pack for editing files on Hex and other servers, or inside container environments.
- A spell checker, such as _Code Spell Checker_
- **EditorConfig**, to respect a project's whitespace rules
- Markdown support, if you write a lot of notes or docs

That is it. No language servers, no debuggers, no build tools.
If you find yourself installing something language-specific into the default profile, that is a sign it belongs in a task profile instead.

## Creating a task profile

1. Click the **gear icon** (bottom left) and choose **Profiles > Create Profile...**
2. Give it a name, such as `Python`.
3. Choose where to start from. You can pick:
    - **Empty**, which is what you want most of the time,
    - **Copy from** an existing profile, or
    - one of VSCode's built-in **templates** (it ships with ones for Python, Data Science, Node.js, C++ and others), which is a handy head start.
4. Click **Create**, then install the extensions for that role. They will only be installed _in that profile_.

You can switch at any time from the gear icon, or with the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and **Profiles: Switch Profile**.

### Handy command-line tricks

You can also open a folder straight into a given profile from your terminal:

```
$> code --profile "Python" ~/projects/my-analysis
```

Even better, VSCode can remember which profile goes with which folder. When you open a project, switch to the profile you want, and VSCode will use it the next time you open that same folder. No more thinking about it.

## My profiles

Here are the roles I use day to day. Yours will differ, but they might give you some ideas.

### Web Design

For Node.js, TypeScript and front-end work.

- ESLint
- Prettier
- Tailwind CSS IntelliSense (if you use Tailwind)
- A live preview or browser debugging extension

### Embedded Systems

For microcontrollers and anything with a toolchain that takes a while to explain.

- C/C++
- CMake Tools
- PlatformIO IDE
- A serial monitor, if PlatformIO's built-in one is not enough
- Various ESP32 and MicroPython extensions and tools

### MakeCode Extensions

For writing custom blocks and packages for Microsoft MakeCode (micro:bit and friends).

- TypeScript tooling
- Git helpers, since MakeCode extensions live and die by their GitHub repositories
- The `pxt` command-line tools installed via npm (not an extension, but this is the profile where you will use them)

### Python

For data science, scripting, and anything you will later run on Hex.

- Python
- Pylance
- Ruff (or your linter of choice)
- Jupyter, if you work in notebooks

Notice how little the profiles overlap. That is the point!

## Using profiles over SSH (Hex)

Most Hex users will connect to the login node with the **Remote - SSH** extension, so it is worth knowing how profiles behave there.

The profile you have active locally is the one used for the remote session as well, and the extensions that run on the remote machine (the Python extension on the login node, for example) are recorded as part of that same local profile.
In practice this means:

- Connect from your `Python` profile, and the Python tooling gets installed on Hex under that profile. You do not need to maintain a separate "remote" set-up.
- Exported or synced profiles include those remote extensions too, so a new machine gets the whole lot.
- If you connect from your clean default profile, you will only get the minimal set on the remote end. If the Python extension seems to be missing on Hex, check which profile you connected with!

The one extension that must be present _locally_ is Remote - SSH itself, which is why it lives in the clean default profile. If you want it available when working in a task profile as well, install it there too.

## Tips

- **Start empty and add as you need.** It is much easier to add an extension the first time you miss it than to prune a profile later.
- **Settings are per profile too.** Your Python profile can use a different font size, formatter, or terminal from the web one. Useful for demos, where you may want bigger text.
- **Use the same name as the task.** `Python`, `Embedded`, `Web`. You will be picking from the list a lot, so keep it obvious.
- **Turn on Settings Sync** if you work across several machines. Profiles are synced along with everything else.
- **Export what you build.** From the gear icon, **Profiles > Export Profile...** lets you save to a file or a GitHub gist, which is a great way to hand a new team member a ready-made set-up (or back up your own).

## Wrapping up

Profiles take about ten minutes to set up and pay you back every day: a quieter editor, quicker start-up, and one less thing to think about when you sit down to work.
Start with the clean default, make a profile for whatever you are working on next, and add others as the need arises.

If you have a profile set-up that works well for your own work, we would love to hear about it; share it with us in the Teams channels.
