# Inkline

**Version 1.2.0** · [Changelog](CHANGELOG.md) · [Brand book](BRAND.md)

Inkline is a calm, hand-drawn-feeling design system for web apps: a warm off-white canvas with a dot grid, soft pastel blocks, and every container traced with a confident ink outline. It uses system fonts only and comes in light and dark themes.

## What's in this repo

| Path | What it is |
| --- | --- |
| `BRAND.md` | The brand book: principles, content, color, type, layout, iconography, states. Start here. |
| `CHANGELOG.md` | Release history and the versioning rules. |
| `tokens.json` | The source of truth for every token: colors, type styles, spacing, radii, strokes, shadow. |
| `tokens.css` | `tokens.json` compiled to CSS custom properties for both themes, plus type-style classes (`.heading`, `.body`, `.label`…). |
| `components/bundle.js` | The React components as one classic script that sets `window.Inkline`. Needs React 18 and ReactDOM 18 loaded first. |
| `components/bundle.css` | Component styles; every value reads from the tokens. |
| `components/index.d.ts` | Prop types for every component, as documentation. |
| `components/<Name>/README.md` | Usage guidelines per component. |
| `components/<Name>/preview.html` | Example markup for each component (rendered in the design-system viewer, which preloads the files above). |
| `scripts/` | Release checks: `check_tokens.py` (tokens.css matches tokens.json), `check_versions.py` (version lines agree), `changelog_notes.py` (a version's CHANGELOG entry as release notes). |
| `.github/workflows/` | **Checks** runs those checks on every pull request; **Release** publishes a GitHub release when a version tag is pushed. |

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

## Light and dark

The theme follows the device setting by default. To force one, set it on `<html>`:

```html
<html data-theme="dark">
```

or switch at runtime with `Inkline.setTheme('light')`, `Inkline.setTheme('dark')` or `Inkline.setTheme('system')`. Without the bundle, `tokens.css` alone also follows the OS through `prefers-color-scheme`.

## Versioning

Inkline follows semantic versioning. Every change gets a `CHANGELOG.md` entry and a matching git tag (`v1.0.0`, `v1.1.1`, …). See the versioning rules at the top of the changelog.

`tokens.css` is generated: change `tokens.json`, then regenerate the CSS rather than editing it by hand. The **Checks** workflow fails a pull request when the two disagree.

### Releasing

1. In a pull request, add the `CHANGELOG.md` entry (`## 1.2.0 — 2026-11-02`), and set the same version on the "Current version" line of `CHANGELOG.md` and the first line of `README.md` and `BRAND.md`. **Checks** fails if they disagree. The entry becomes the release notes, so write it for the people using Inkline.
2. Merge, then tag the merge commit on `main` and push the tag:

   ```bash
   git switch main && git pull
   git tag -a v1.2.0 -m "Inkline v1.2.0"
   git push origin v1.2.0
   ```

3. The **Release** workflow checks that the tag is on `main`, that the version lines match the tag and that `tokens.css` matches `tokens.json`, then publishes the GitHub release "Inkline v1.2.0" with the CHANGELOG entry and a link to the full diff. A version with a suffix, such as `v2.0.0-rc.1`, is published as a pre-release.

If the workflow fails, fix the problem on `main`, then move the tag to the fixed commit (`git tag -d v1.2.0 && git push origin :v1.2.0`, then tag and push again). Re-running it after a release exists updates that release's notes instead of failing.
