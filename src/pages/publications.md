---
layout: page.njk
title: Publications
---

The slowly growing list of publications that reference Hex.
If your work uses Hex, please use the following reference in your bibliography (in LaTeX/BibTex format):

<pre class="nostyle">
{% raw %}
@misc{UcrelHex,
	title        = {{UCREL - Hex}; A shared, hybrid multiprocessor system},
    author       = {Vidler, John AND Rayson, Paul},
	abstract     = {Hex is a collection of GPU equipped hosts onto which single- multi-
                    or GPU-processor jobs can be executed hosted at Lancaster University,
                    UK as part of the School of Computing and Communications and the
                    UCREL group.},
	howpublished = {\url{https://github.com/UCREL/hex}},
    note         = {Accessed: 2024}
}
{% endraw %}
</pre>

## Publications using Hex

{% if publications.byYear | length %}
<ol class="not-prose flex flex-col gap-4">
{%- for record in publications.byYear | reverse %}
<li class="rounded-box border border-base-300 bg-base-100 p-5">
    <div class="flex items-start gap-4">
        <span class="badge badge-soft badge-primary mt-0.5 shrink-0 font-mono">{{ record.Fields.year }}</span>
        <div class="min-w-0">
            {%- if record.Fields.preferred_url %}
                <h3 class="font-semibold leading-snug"><a class="hover:text-primary hover:underline" href={{ record.Fields.preferred_url | safe }}>{{ record.Fields.title }}</a></h3>
            {%- else %}
                <h3 class="font-semibold leading-snug">{{ record.Fields.title }}</h3>
            {%- endif %}
            <p class="mt-1 text-sm text-base-content/60">{{ record.Fields.author }}</p>
            {%- if record.Fields.abstract %}
                <details class="group mt-3 text-sm">
                    <summary class="cursor-pointer font-medium text-primary select-none">Abstract</summary>
                    <p class="mt-2 leading-relaxed text-base-content/75">{{ record.Fields.abstract }}</p>
                </details>
            {%- endif %}
        </div>
    </div>
</li>
{%- endfor %}
</ol>
{% else %}
Nothing yet! But watch this space...
{% endif %}
