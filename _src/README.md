# _src — site source

`index.html` and `faq.html` at the repo root are **generated** from:

- `content.json` — all editable text (headings, paragraphs, FAQ policies, gear list, contact info, SEO)
- `templates/index.html`, `templates/faq.html` — page structure with `{{placeholders}}`

Edit content with the site editor (`node editor/server.js` in the parent folder), or
edit these files by hand and rebuild with `node editor/build.js`.

This folder starts with an underscore so GitHub Pages does not publish it,
but it is versioned in git like everything else.
