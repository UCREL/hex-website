---
layout: page.njk
title: Projects running on Hex
---

The following are projects that are currently running (or have been run) on Hex.
They range from research staff working on AI, ML and other topics; to PhD students exploring new methods and technologies for NLP (and beyond!).

See also our <a href="/pages/publications">Publications</a> page for related works.

{%- for year, list in projects %}
<ul class="text-lg">
  <li>
    <div class="pt-5 text-xl font-bold">Projects in {{ year }}</div>
    <ul class="pl-5">
      {%- for info in list %}
        {%- if info.title %}
          <li>
            <div class="font-bold">{{ info.title | safe }}</div>
            <div class="italic pt-2 ml-5 mr-5 mb-2">{{ info.description | safe }}</div>
          </li>
        {%- else %}
          <li class="pt-2 font-bold">{{ info | safe }}</li>
        {%- endif %}
      {%- endfor %}
    </ul>
</ul>
{%- endfor %}