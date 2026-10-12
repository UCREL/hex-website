# The UCREL-Hex Website

## Running a development server

Quickstart:

```
$> git clone https://github.com/UCREL/hex-website.git
$> cd hex-website
$> git submodule update --init --recursive
$> npm install
$> npm start
```

This does a full build (including the search index) and then runs a dev server on port 8081 of your local machine that watches for changes and reloads automatically.
Use `npm run dev` to skip the initial build; search will use whatever index was last built.

`npm run build` produces the deployable site in `dist/` (Eleventy, then [Pagefind](https://pagefind.app) for search).

## Where things live

- `src/_data/navigation.yaml` - the sidebar navigation. Guides and articles are added automatically from their `guide` / `article` tags.
- `src/assets/css/main.css` - all styling: Tailwind CSS v4, daisyUI v5 and the light/dark theme colours.
- `src/assets/js/site.js` - theme toggle, search dialog, code copy buttons and the "On this page" highlighting.
- `src/_includes/layouts/` - `home.njk` for the front page, `page.njk` (with the beta notice) and `article.njk` for documentation, `article-wide.njk` for wide pages without the "On this page" column.
