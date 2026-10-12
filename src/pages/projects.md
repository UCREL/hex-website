---
layout: page.njk
title: Projects running on Hex
---

The following are projects that are currently running (or have been run) on Hex.
They range from research staff working on AI, ML and other topics; to PhD students exploring new methods and technologies for NLP (and beyond!).

See also our <a href="/pages/publications">Publications</a> page for related works.

<div class="not-prose mt-10 flex flex-col gap-10">
{%- for year, list in projects %}
<section>
  <h2 id="projects-{{ year }}" class="mb-4 flex items-center gap-3 text-xl font-semibold tracking-tight">
    Projects in {{ year }}
    <span class="badge badge-sm badge-ghost font-medium">{{ list | length }}</span>
  </h2>
  <ul class="flex flex-col gap-3">
    {%- for info in list %}
      {%- if info.title %}
        <li class="rounded-box border border-base-300 bg-base-100 p-5">
          <div class="font-semibold leading-snug">{{ info.title | safe }}</div>
          <div class="mt-2 text-sm leading-relaxed text-base-content/70">{{ info.description | safe }}</div>
        </li>
      {%- else %}
        <li class="rounded-box border border-base-300 bg-base-100 px-5 py-3 font-semibold">{{ info | safe }}</li>
      {%- endif %}
    {%- endfor %}
  </ul>
</section>
{%- endfor %}
</div>
