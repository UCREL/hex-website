---
layout: page.njk
title: Projects running on Hex
---

The following are projects that are currently running (or have been run) on Hex.
They range from research staff working on AI, ML and other topics; to PhD students exploring new methods and technologies for NLP (and beyond!).

See also our <a href="/pages/publications">Publications</a> page for related works.

</article>
<div class="h-5">&nbsp;</div>
<div class="w-full xl:max-w-screen-xl ml-auto mr-auto">
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
    {% for project in projects %}<div class="card w-96 bg-base-100 shadow-xl image-full mb-5">
      <figure><img src="{{ project.image }}" /></figure>
      <div class="card-body">
        <h2 class="card-title">{{ project.title }}</h2>
        {% for line in project.description %}
          <p>{{ line }}</p>
        {% endfor %}
        <p style="flex-grow: 10;"></p>
        <div class="card-actions justify-end text-ellipsis">
          <ul>
            {% for author in project.author %}
              <li>{{ author }}</li>
            {% endfor %}
          </ul>
        </div>
      </div>
    </div>{% endfor %}
  </div>
</div>
<article class="prose mx-auto">