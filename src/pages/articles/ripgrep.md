---
layout: article.njk
title: Finding Things Fast with ripgrep
author: John Vidler
tags:
    - guide
    - tools
---

Every researcher eventually hits the same question: "I *know* I wrote that function / config option / file path somewhere... but where?"
Or maybe it is a different flavour of the same problem: which of these 4,000 log files mentions the error that killed my job overnight?

`grep` has been answering this question for decades, but on a big directory tree it can be slow, and it happily wanders into places you do not care about.
We have just installed **ripgrep** on Hex, which is a modern take on the same idea. The command is `rg`, and it is fast, friendly, and has sensible defaults.

## Why bother?

- **It is quick.** ripgrep searches in parallel across your files, so big directories that make `grep -r` crawl are often done in a blink.
- **Recursive by default.** No `-r` flag needed. Just point it at a folder (or leave it out to search where you are).
- **It skips the junk.** It respects your `.gitignore` files, and ignores hidden files and binary files, so you do not get results from `.git` folders, `node_modules`, or virtual environments.
- **Nice output.** Results are grouped by file, with line numbers and highlighted matches, which makes them far easier to read.

## When would I use it?

ripgrep earns its keep any time you are looking _inside_ files rather than for file names. Some common cases:

- Finding where a function, variable or setting is used in a large codebase.
- Searching job output and logs for errors, warnings or a specific job ID.
- Digging through a corpus for a word, phrase or tag pattern, whether that is a quick sanity check before a proper analysis or a first look at a collection you have just been handed (see [ripgrep for corpus work](#ripgrep-for-corpus-work) below).
- Hunting down where you set a path or parameter in a pile of scripts and config files.

If you just want to find a file by its _name_, `find` (or `rg --files`, see below) is a better fit.

## Basic use

The simplest form is a pattern, followed by an optional place to look:

```
$> rg "CUDA out of memory"
$> rg "CUDA out of memory" ~/jobs/logs
```

With no path given, ripgrep searches the current directory and everything below it.
Each matching file is listed with its matching lines and line numbers:

```
logs/train-4821.err
112:RuntimeError: CUDA out of memory. Tried to allocate 2.00 GiB

logs/train-4833.err
98:RuntimeError: CUDA out of memory. Tried to allocate 2.00 GiB
```

The pattern is a _regular expression_, so you can be more flexible if you need to, for example `rg "epoch (9|10)\b"`.
If you want to search for something with punctuation in it exactly as typed, add `-F` (fixed string): `rg -F "foo(bar)"`.

## Flags worth knowing

You can get a long way with just a handful of options.

| Flag | What it does |
| --- | --- |
| `-i` | Ignore case, so `error` matches `Error` and `ERROR` |
| `-w` | Match whole words only |
| `-l` | Just list the names of files that match, not the lines |
| `-c` | Count matching lines per file |
| `-C 3` | Show 3 lines of context around each match (`-A` for after, `-B` for before) |
| `-t py` | Only search Python files (`rg --type-list` shows what is available) |
| `-g "*.log"` | Only search files matching a glob (prefix with `!` to exclude) |
| `-v` | Invert the match: show lines that do _not_ contain the pattern |
| `-U` | Allow matches to span multiple lines |
| `--hidden` | Include hidden files and directories |
| `--no-ignore` | Do not skip files listed in `.gitignore` |

A few examples put together:

```
# Which scripts mention a particular environment variable?
$> rg -l "SCRATCH_DIR" -t sh

# Case-insensitive search for warnings, with a little context
$> rg -i -C 2 "warning" -g "*.log"

# How many times does each file mention "segmentation fault"?
$> rg -c "segmentation fault" logs/
```

### Listing files

ripgrep can also list the files it _would_ search, honouring all the same ignore rules:

```
$> rg --files
$> rg --files -g "*.csv"
```

It is a handy, quick alternative to `find` when you just want your project's real files and none of the clutter.

## ripgrep for corpus work

Corpora tend to be exactly the kind of thing ripgrep is good at: lots of plain text files, in lots of folders, that you want to poke at before (or instead of) firing up a full concordancer. The examples below assume a corpus laid out in a folder called `corpus/`, but the same ideas work on whatever you have.

### Quick concordance lines

Find every line containing a word, as a whole word, in any case, with a little context either side:

```
$> rg -i -w -C 1 "nevertheless" corpus/
```

If your corpus has one sentence or utterance per line, this is effectively a poor man's concordance. If it does not, `-o` prints only the matched part, and a regular expression can grab some surrounding characters to give you a simple key-word-in-context view:

```
$> rg -o -i ".{0,40}\bnevertheless\b.{0,40}" corpus/
```

### Counting things

`-c` counts matching _lines_ per file, which is not quite the same as counting _occurrences_ if a word appears twice on one line. For that, use `--count-matches`:

```
# Occurrences of "however" in each file
$> rg -i -w --count-matches "however" corpus/

# A rough total across the whole corpus
$> rg -i -w -o "however" corpus/ | wc -l
```

### Quick frequency lists

Combining `-o` with `sort` and `uniq` gives you a rapid look at which forms of a word turn up, and how often. `-I` hides the file names so only the matches are counted:

```
# Which forms of "colo(u)r" occur, and how many of each?
$> rg -o -I -i -w "colou?r(s|ed|ing)?" corpus/ | sort | uniq -c | sort -rn
```

That is a handy way to check spelling variants (British vs American, for example) without writing any code.

### Searching tagged and annotated data

Annotated corpora are often just text with extra structure, which makes them perfectly searchable. How you write the pattern depends on your format, so treat these as templates.

For **vertical** or tab-separated formats (one token per line, with columns for word, tag, lemma and so on), match on the columns directly. Here, a word followed by a tag starting with `VB` (a verb, in many tagsets):

```
$> rg "\tVB[A-Z]*\t" corpus/ -g "*.vert"
```

For **inline-tagged** text like `running_VVG`, find a word along with its tag, or all words with a given tag:

```
$> rg -o "\w+_NN1\b" corpus/
```

For **XML**, `-o` is again your friend for pulling out just the elements you care about, without the rest of the line:

```
$> rg -o "<w [^>]*pos=\"JJ\"[^>]*>[^<]+" corpus/ -g "*.xml"
```

Searching tags with a regular expression is great for exploration and quick checks, but for anything you plan to publish, parse the XML properly, or use a purpose-built corpus tool.

### Phrases, patterns and multi-line text

Regular expressions let you look for patterns, not just words. For example, "kind of" or "sort of" with anything up to two words in between:

```
$> rg -i -o "\b(kind|sort) of(\s+\w+){0,2}" corpus/
```

If the thing you are looking for might be split across a line break, such as in text that was wrapped at 80 characters, turn on multi-line mode:

```
$> rg -U -i "in\s+spite\s+of" corpus/
```

### Non-English text, compressed files and subsets

- **Unicode works by default.** ripgrep reads UTF-8 and understands Unicode classes, so `\p{L}+` matches a word in any script, and accents and non-Latin text behave properly. If your files are in another encoding, `-E latin1` (or similar) will help.
- **Compressed corpora.** Add `-z` to search inside `.gz`, `.bz2`, `.xz` and similar files without unpacking them first. Handy when the corpus is large and you would rather not fill up your quota.
- **Search a subset.** Use `-g` to restrict by file name, which is very useful if your files are named by genre, year or speaker: `rg -w "mate" corpus/ -g "*spoken*"` or `-g "!*written*"` to leave something out.
- **Know which files matched.** `rg -l` gives you the list of matching files, which you can then feed to other tools, or use to build a sub-corpus.

## Using it with other tools

ripgrep plays nicely in pipelines, and it detects when its output is going somewhere other than your terminal and adjusts (it drops the colours and grouping to keep things easy to process):

```
# Which files have the most hits?
$> rg -c "TODO" | sort -t: -k2 -n -r | head

# Open every file that mentions something in your editor
$> rg -l "old_function_name" | xargs code
```

## Using it on Hex

A few practical notes for working on the cluster:

- **Run it on the login node for quick searches, but be kind.** Searching your own project folder is fine. Pointing it at an enormous shared dataset over and over is the sort of thing that should go in a job instead.
- **Big searches belong in jobs.** If you are searching terabytes of data, put it in a Slurm job like any other heavy task, rather than leaving it running on the login node.
- **Shared filesystems are slower than local disks.** ripgrep is fast, but it can only read as quickly as the storage allows. Narrowing the search with `-t` or `-g`, or by choosing a more specific folder, helps a lot.
- **VSCode already uses it.** If you use the search panel in VSCode, you have been using ripgrep all along. The command line version is just the same engine with more knobs. See our article on [keeping VSCode tidy with profiles](/pages/articles/vscode-profiles/) if you are setting up your editor.

## Tips

- **Start simple.** `rg "thing"` solves most problems. Add flags only when the results are too noisy.
- **Too few results?** Files might be ignored. Try `--hidden` or `--no-ignore`, or `-uuu` to turn off all the filtering at once.
- **Too many results?** Narrow with `-t`, `-g`, or `-w`, or search a more specific folder.
- **Set defaults with a config file.** Point the `RIPGREP_CONFIG_PATH` environment variable at a file containing your favourite flags, one per line, and `rg` will use them every time.
- **Check the built-in help.** `rg --help` has a short summary, and `man rg` has the full story.

## Wrapping up

ripgrep will not change how you do your research, but it will save you a surprising amount of time spent squinting at `grep` output or scrolling through files by hand.
Try it out the next time you are hunting for "that one line somewhere", and see how quickly it turns up.

If you have a handy ripgrep trick of your own, we would love to hear about it; share it with us in the Teams channels.
