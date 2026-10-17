# Inkline

**Version 1.0.0** · [Changelog](CHANGELOG.md) · [Brand book](BRAND.md)

Inkline is a calm, hand-drawn-feeling design system for web apps: a warm off-white canvas with a dot grid, soft pastel blocks, and every container traced with a confident ink outline. It uses system fonts only.

## What's in this repo

| Path | What it is |
| --- | --- |
| `BRAND.md` | The brand book: principles, content, color, type, layout, iconography, states. Start here. |
| `CHANGELOG.md` | Release history and the versioning rules. |
| `tokens.json` | The source of truth for every token: colors, type styles, spacing, radii, strokes, shadow. |
| `tokens.css` | `tokens.json` compiled to CSS custom properties and type-style classes (`.heading`, `.body`, `.label`…). |
| `components/bundle.js` | The React components as one classic script that sets `window.Inkline`. Needs React 18 and ReactDOM 18 loaded first. |
| `components/bundle.css` | Component styles; every value reads from the tokens. |
| `components/index.d.ts` | Prop types for every component, as documentation. |
| `components/<Name>/README.md` | Usage guidelines per component. |
| `components/<Name>/preview.html` | Example markup for each component (rendered in the design-system viewer, which preloads the files above). |

Components: `Button`, `Card`, `StatTile`, `Input`, `Tag`, `Avatar`, `CommentThread`, `MediaControls`, `Icon`.

## Using it in a page

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<script src="https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="components/bundle.js"></script>

<div id="root"></div>
<script>
  const { Button, StatTile } = window.Inkline;
  const h = React.createElement;
  ReactDOM.createRoot(document.getElementById('root')).render(
    h('div', { className: 'ik-row' },
      h(Button, null, 'Save changes'),
      h(Button, { variant: 'secondary' }, 'Cancel'),
      h(StatTile, { label: 'Team', value: 'Design', tone: 'sage' }))
  );
</script>
```

Add `class="ik-canvas"` to the page body for the dotted canvas background.

## Versioning

Inkline follows semantic versioning. Every change gets a `CHANGELOG.md` entry and a matching git tag (`v1.0.0`, `v1.1.0`, …). See the versioning rules at the top of the changelog.

`tokens.css` is generated: change `tokens.json`, then regenerate the CSS rather than editing it by hand.
