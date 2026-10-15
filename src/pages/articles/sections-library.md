---
layout: article.njk
title: Structured Script Output with ucrel_sections
author: John Vidler
tags:
    - guide
    - python
library:
    name: ucrel_sections
    module: ucrel_sections
    repo: https://github.com/UCREL/python-sections
    release: v1.0.0
---

Long-running data science scripts tend to produce long, unstructured logs, which makes it hard to tell at a glance which stage a job reached, how long each step took, or whether your sanity checks passed.
**{{ library.name }}** is a small Python library, with no dependencies beyond the standard library, that helps with this, by grouping your script's output into clearly marked _sections_ (and subsections), with built-in _timers_, lightweight _tests_ and _assertions_, and a colour-coded summary at the end of each section.

It is particularly handy on Hex, where most work runs as batch jobs and you only see the output afterwards in a Slurm log file.

## Getting the library

The source code, issue tracker and latest changes for {{ library.name }} are all on GitHub:

- [{{ library.repo }}]({{ library.repo }})

{{ library.name }} needs **Python 3.10 or newer**; you can check which version you have with `python3 --version`.

### 1. Activate your environment

As with any Python package, install {{ library.name }} into a virtual environment for your project (see [Python Virtual Environments](/pages/slurm/python/virtual-environments) if you have not used one before):

```
$> source ~/envs/my-project/bin/activate
```

### 2. Install the package

Install the latest version straight from GitHub with `pip`:

```
$> pip install git+{{ library.repo }}.git
```

For work you need to reproduce later, such as anything you plan to publish, it is better to install a specific release instead, so the library cannot change underneath you:

```
$> pip install git+{{ library.repo }}.git@{{ library.release }}
```

The list of releases can be found on the [tags page]({{ library.repo }}/tags) of the repository.

### 3. Check the installation

To confirm everything worked, print the installed version:

```
$> python -c "import {{ library.module }}; print({{ library.module }}.__version__)"
```

You can now import it in your scripts as normal:

```python
from {{ library.module }} import Section
```

If you keep a `requirements.txt` for your project, add {{ library.name }} to it as a single line (here pinned to a release):

```
{{ library.name }} @ git+{{ library.repo }}.git@{{ library.release }}
```

### Updating

To pick up the latest changes from GitHub later on, upgrade it with:

```
$> pip install --upgrade --force-reinstall git+{{ library.repo }}.git
```

## A first example

Everything in {{ library.name }} is built around the `Section` class, which is used as a context manager with Python's `with` statement.
Here is a small but complete example, which loads a dataset, checks it, and times a slow step:

```python
import time
from {{ library.module }} import Section

with Section("Loading data", width=80) as section:

    with section.timer("Read dataset") as timer:
        time.sleep(0.5)  # Stand-in for loading a large file
        rows = 1000
        timer.report(f"Loaded {rows} rows")

    section.tryAssert(rows > 0, "No rows were loaded", name="Dataset is not empty")
    section.report("Columns", "id, text, label")
```

Running this prints a banner when the section starts, the timer's progress as it happens, and then a summary of everything that was recorded when the section ends:

{% terminal "sections/first-example", "python first_example.py" %}

The banners are shown in cyan, passing entries in green, and failures in red, so problems stand out immediately. The examples on this page use `width=80` so that their output fits on the page; see [Sections](#sections) below.

## Sections

A `Section` marks out one stage of your script. When it starts, it prints a banner with its title; when it ends, it prints how long it took, followed by the results of any timers, tests, assertions and reports recorded inside it.

```python
from {{ library.module }} import Section

with Section("Preprocessing") as section:
    ...  # Your code here
```

The banners are 120 characters wide by default. If that is too wide for your terminal, or for the log files you will be reading, set the `width` when creating the section:

```python
with Section("Preprocessing", width=80) as section:
    ...
```

### Subsections

Sections can be nested to give your output more structure. Each subsection has its own banner, timing and results summary:

```python
import time
from {{ library.module }} import Section

with Section("Experiment 1", width=80) as experiment:

    with Section("Load data", width=80) as load:
        time.sleep(0.2)  # Stand-in for loading a dataset
        load.report("Rows", "25,000")

    with Section("Train model", width=80) as train:
        with train.timer("Fit"):
            time.sleep(0.8)  # Stand-in for training

    with Section("Evaluate", width=80) as evaluate:
        evaluate.report("Accuracy", "91.3%")
```

{% terminal "sections/subsections", "python experiment.py" %}

A good rule of thumb is to have one top-level section per major stage of your script, and use subsections for the steps within it.

### Dividers

To visually break up a long section without starting a new one, use `divider()`. Passing `showTime=True` also prints how long the section has been running so far, which is a handy progress marker in loops:

```python
import time
from {{ library.module }} import Section

with Section("Processing files", width=80) as section:
    for path in ["a.csv", "b.csv", "c.csv"]:
        print(f"Processing {path}")
        time.sleep(0.3)  # Stand-in for processing one file
        section.divider(showTime=True)
```

{% terminal "sections/dividers", "python process_files.py" %}

## Timers

`section.timer(name)` returns a timer which measures how long the code inside its `with` block takes. It prints a message when it starts and the elapsed time when it finishes, and the timing is also included in the section's summary:

```python
import time
from {{ library.module }} import Section

with Section("Model training", width=80) as section:

    with section.timer("Fit model"):
        time.sleep(2)  # Stand-in for a slow training step

    with section.timer("Score test set"):
        time.sleep(0.5)
```

{% terminal "sections/timers", "python train.py" %}

Timers are an easy way to find out which parts of a script are actually slow before you spend time optimising it (or requesting more hardware).

## Tests

`section.test(name)` creates a small unit test for checking that your data or results look the way you expect. Inside the test, call `reject(condition, detail)` to fail the test if `condition` is **true**:

```python
from {{ library.module }} import Section

labels = ["pos", "neg", "pos", None]

with Section("Validate labels", width=80) as section:

    with section.test("No missing labels", canFail=True) as test:
        missing = labels.count(None)
        test.reject(missing > 0, f"{missing} rows have no label")
```

{% terminal "sections/test-can-fail", "python validate.py" %}

The failure is printed as soon as it happens, then listed again in the summary when the section ends.

Note that `reject` works the opposite way around to Python's `assert`: you describe the situation you want to _reject_, rather than the one you expect. `test.reject(missing > 0, ...)` reads as "reject this if anything is missing".

### Tests that can fail, and tests that cannot

What happens when a test fails depends on the `canFail` option:

+ **`canFail=True`:** the failure is printed and recorded in the section's summary, and your script carries on. Use this for checks that are worth knowing about but are not fatal, like a few missing values.
+ **`canFail=False`** (the default): the failure stops the script. The section prints a `HALT // ERROR` banner and its summary (so you can still see what passed before the failure), then the error is raised as normal.

```python
from {{ library.module }} import Section

with Section("Training", width=80) as section:

    with section.test("Loss is finite") as test:
        loss = float("nan")
        test.reject(loss != loss, "Loss is NaN, so training has diverged")

    print("This line is never reached")
```

{% terminal "sections/test-halt", "python train.py" %}

Stopping early like this is exactly what you want for problems that would make the rest of the job meaningless. On Hex, it also means a broken job releases its resources straight away, rather than running on for hours producing results you cannot use.

### Adding detail to a test

Tests and timers can both carry extra information with `report(message)`. These messages are listed underneath the test in the section's summary:

```python
with Section("Validate labels", width=80) as section:

    with section.test("Labels are balanced", canFail=True) as test:
        ratio = labels.count("pos") / len(labels)
        test.report(f"Positive ratio: {ratio:.2f}")
        test.reject(abs(ratio - 0.5) > 0.2, "Classes are badly imbalanced")
```

{% terminal "sections/test-report", "python validate.py" %}

## Assertions and reports

For simple checks that should never stop the script, `section.tryAssert(condition, detail, name)` records a pass or a fail in the summary without raising an error. Unlike `reject`, it works the same way around as `assert`: the check passes when `condition` is **true**.

```python
with Section("Sanity checks", width=80) as section:
    section.tryAssert(len(rows) > 0, "No rows were loaded", name="Dataset is not empty")
    section.tryAssert(len(rows) >= 5000, "Expected at least 5000 rows", name="Dataset is large enough")
```

{% terminal "sections/try-assert", "python checks.py" %}

`section.report(name, message)` simply records a piece of information, like a parameter setting or a final score, so that it appears alongside everything else in the summary:

```python
with Section("Evaluate", width=80) as section:
    accuracy = 0.913
    section.report("Accuracy", f"{accuracy:.1%}")
    section.report("Model", "logistic regression, C=1.0")
```

{% terminal "sections/report", "python evaluate.py" %}

This makes the end of each section a convenient, self-contained record of what happened, which is especially useful when comparing the logs of several runs.

## Using {{ library.name }} on Hex

{{ library.name }} works the same in a Slurm batch job as it does in your terminal, so there is nothing special to set up. A few things are worth knowing, though.

### Watching a job's progress

All of {{ library.name }}'s output is written immediately (rather than being buffered by Python), so you can follow a running job's progress through its Slurm output file. From the login node:

```
$> tail -f slurm-JOBID.out
```

Press <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">C</kbd> to stop watching; the job itself keeps running.

### Colours in log files

The colours are added using standard terminal escape codes, which are saved into your Slurm output file along with the text. Viewing the file with `cat`, `tail` or `less -R` in a terminal will show the colours properly:

```
$> less -R slurm-JOBID.out
```

Some text editors (including VSCode's main editor) show these codes as odd-looking characters like `[32m` instead. They are harmless, and opening the file in a terminal shows it as intended.

### Example: timing a Dask job

{{ library.name }} pairs nicely with the [Dask on Hex](/pages/slurm/python/dask) guides, to see how long each stage of a parallel job takes and to check the results along the way:

```python
import dask
from {{ library.module }} import Section
from hex_dask import configure_local

if __name__ == "__main__":
    client, cluster = configure_local()

    with Section("Summarise dataset", width=80) as section:

        with section.timer("Load and filter"):
            df = dask.datasets.timeseries(start="2024-01-01", end="2024-01-08")
            df = df[df.x > 0].persist()

        with section.timer("Group by name"):
            summary = df.groupby("name").y.mean().compute()

        section.report("Groups", str(len(summary)))
        section.tryAssert(summary.abs().max() < 1, "Group means look wrong", name="Means in range")

    client.close()
    cluster.close()
```

{% terminal "sections/dask", "python summarise.py" %}

## Quick reference

| Code | What it does |
|---|---|
| `with Section(title, width=120) as section:` | Starts a section, printing a banner. Prints the elapsed time and a results summary when it ends |
| `section.timer(name)` | A timer for use in a `with` block, recorded in the summary |
| `section.test(name, canFail=False)` | A test for use in a `with` block. A failure stops the script unless `canFail=True` |
| `test.reject(condition, detail)` | Fails the test if `condition` is **true** |
| `section.tryAssert(condition, detail, name)` | Records a pass if `condition` is **true**, otherwise a failure, without stopping the script |
| `section.report(name, message)` | Records a piece of information in the summary |
| `test.report(message)` / `timer.report(message)` | Adds a detail line underneath a test or timer in the summary |
| `section.divider(showTime=False)` | Prints a divider line, optionally with the time elapsed so far |
| `fmt(text, style=None, width=120)` | Returns `text` centred in a banner of `=` characters, optionally coloured with a `Color` style |
| `{{ library.module }}.__version__` | The installed version of the library |

The library also includes a `Color` class of terminal colour codes (for example `Color.GREEN`, `Color.BOLD` and `Color.RESET`), and the `fmt` function it uses to draw its banners, both of which you can use for your own messages:

```python
from {{ library.module }} import Color, fmt

print(f"{Color.BRIGHT_YELLOW}Warning:{Color.RESET} using a reduced dataset")
print(fmt("Checkpoint saved", Color.STYLE_SECTION, width=80))
```

{% terminal "sections/color-fmt", "python messages.py" %}

For full details, and to report bugs or suggest improvements, see the [repository on GitHub]({{ library.repo }}).
