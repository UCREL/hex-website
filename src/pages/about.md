---
layout: hero.njk
title: About Hex
---

## The People behind Hex

<div class="grid grid-cols-3 gap-5 w-full">
    {% for person in people %}<div class="card w-56 bg-base-100 shadow-xl rounded-xl border-solid border-2">
        <img class="m-3 mask mask-squircle" src="{{ person.avatar }}" alt="{{ person.name }}" />
        <div class="items-center text-center">
            <h3>{{ person.name }}</h3>
            {% if person.position | is_array %}
                <p>{{ person.position | join('<br />') | safe }}</p>
            {% else %}
                <p>{{ person.position }}</p>
            {% endif %}
        </div>
    </div>{% endfor %}
</div>