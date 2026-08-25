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

{% if publications.byYear | length %}
{% for record in publications.byYear | reverse %}
<div class="">
    {%- if record.Fields.preferred_url %}
        <a href={{ record.Fields.preferred_url | safe }}><h2 class="card-title">({{ record.Fields.year }}) {{ record.Fields.title }}</h2></a>
    {%- else %}
        <h2 class="card-title">({{ record.Fields.year }}) {{ record.Fields.title }}</h2>
    {%- endif %}
    {% if record.Fields.abstract %}
        <p class="italic w-5/6 ml-auto mr-auto">{{ record.Fields.abstract }}</p>
    {% endif %}
    <span>{{ record.Fields.author }}</span>
</div>
{% endfor %}
{% else %}
Nothing yet! But watch this space...
{% endif %}