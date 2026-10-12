---
layout: hero.njk
title: About Hex
---

## The People behind Hex

<div class="not-prose grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {%- for person in people %}<div class="card rounded-box border border-base-300 bg-base-100 p-5">
        <img class="mx-auto mb-4 w-32 mask mask-squircle" src="{{ person.avatar }}" alt="{{ person.name }}" />
        <div class="items-center text-center">
            <h3 class="font-semibold">{{ person.name }}</h3>
            {%- if person.position | is_array %}
                <p class="mt-1 text-sm text-base-content/60">{{ person.position | join('<br />') | safe }}</p>
            {%- else %}
                <p class="mt-1 text-sm text-base-content/60">{{ person.position }}</p>
            {%- endif %}
        </div>
    </div>{%- endfor %}
</div>