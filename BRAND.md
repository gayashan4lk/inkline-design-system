**Version 1.2.0** · see the Changelog section for what changed in each release and how versions are numbered.

Inkline is a calm, hand-drawn-feeling system for web apps: warm off-white canvas, soft pastel blocks, and every container traced with a confident ink outline. It feels like a well-kept notebook. It's friendly and editorial, and it's never glossy.

## Principles

- **Borders, not shadows.** Every surface is outlined in `outline` at `stroke-bold`. Elevation comes from the outline and a flat pastel fill. The only shadow, `shadow-lift`, is a hard ink offset when a card is hovered.
- **Pastels carry meaning by grouping, not by status.** `lilac`, `sage`, `peach`, `periwinkle`, `mint` and `stone` separate kinds of content (a person, a team, a metric). They never mean success or error.
- **One accent.** `rose` marks progress, selection and the single accent action in a view. `clay` is reserved for an assistant or system voice.
- **Serif for numbers and names, sans for everything else, mono for files.**

## Content fundamentals

- Write in plain sentence case: "Add comment", "Resolve thread". ALL CAPS only in the `label` style (stat and field labels), always short: "NAME", "TEAM", "# DEMOS RECORDED".
- Address the user as "you"; the product doesn't say "I" except in an assistant's own comments.
- Comments and helper text are conversational and short. Quote timecodes in `code`: "at 0:14".
- No emoji in UI chrome. People can use them in their own comment text.
- Numbers are shown big and alone: a stat tile holds one value, not a sentence.

## Color

- Page: `canvas` with the dot grid (`.ik-canvas`, dots in `canvas-dot` at a `space-5` pitch). Raised panels: `paper`.
- Text: `ink` on any surface; `ink-muted` for labels, names, timestamps and hints (4.9:1 or better on every surface and pastel). On `rose` and `clay` fills, text uses `ink-on-accent` (the same as `ink` in light, the full off-white in dark); components switch to it inside those fills. Never put `paper` or `ink-muted` text on them.
- Outlines: `outline` (equal to `ink` in both themes) at `stroke-bold` on cards, inputs, buttons, threads and the media bar; `stroke-thin` on tags, avatars and progress segments. Dividers inside a surface: `line` at `stroke-hairline`.
- Pastel fills for cards, stat tiles, tags and avatars. Stack tiles in the order `lilac` → `sage` → `peach` when there's no meaning to assign.
- `rose` is a fill only (progress, accent button, selected). Use `rose-ink` when rose has to be text.
- @mentions: `mention-ink` on `mention`.
- Errors: `danger` text or border, `danger-soft` background, always with words. Inkline has no green "success" color. Confirm with words and an icon (`check`).
- Focus: `focus` is a clear, strong blue. A 2px solid `focus` outline at 2px offset on buttons and other controls. Inputs show a thicker border instead: their `stroke-bold` outline turns `focus` and a 2px `focus` ring hugs it. With an error the border stays `danger` and the ring still shows, so focus is never hidden. Inside `rose` and `clay` fills, focus rings use `ink-on-accent`.

## Dark mode

- Two themes: `light` (default) and `dark`. Every color token has a value for each, so components switch without any code change; always use tokens, never raw hex.
- Dark keeps the same idea, inverted: a warm charcoal `canvas` with faint dots, `paper` panels a step lighter, deep muted pastels (`lilac`, `sage`, `peach`…), `ink` text and the 2px `outline` are the warm off-white at 75% (`#b6b3ad`) so text and edges read clearly without glaring. Text on `rose` and `clay` stays the full off-white (`ink-on-accent`, `#f3efe7`), and `ink-muted` sits a step below `ink`.
- `action` (primary button) becomes deep blue with a light label; `rose` deepens so light text still reads on it; `focus` becomes a lighter blue that stands out on dark surfaces; `shadow-lift` uses the dark outline color.
- Switching: by default the theme follows the device setting (`prefers-color-scheme`). Set `data-theme="light"` or `data-theme="dark"` on `<html>` to force one, or call `Inkline.setTheme('light' | 'dark' | 'system')`.
- Contrast in dark: body text 5.8:1 or better and `ink-muted` 4.7:1 or better on every surface and pastel, `ink-on-accent` 4.6:1 or better on `rose` and `clay`, `focus` 4.8:1 or better on every surface and pastel, and `outline` 8.7:1 against `canvas` and 7.9:1 against `paper`.

## Type

The system uses OS fonts only, with no web-font downloads.

- `serif` (New York / Iowan / Charter / Georgia): `display-xl`, `display`, `display-sm`. Use them for stat values, names and page titles. Keep them at regular weight and never bold.
- `sans` (system-ui): `heading` (600), `body-lg` (500, comments), `body` (400, default), `body-strong` (600, buttons), `caption` (500, metadata in `ink-muted`), `label` (600, caps, +0.08em).
- `mono` (ui-monospace): `filename` above framed cards, `code` for timecodes and IDs.
- Don't mix serif and sans in one line. A tile is a `label` over a serif value.

## Space, radius, layout

- Use the 4px scale: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-5` 20 · `space-6` 24 · `space-8` 32 · `space-12` 48.
- Cards pad `space-6`; gutters between cards are `space-4`–`space-6`. Leave generous canvas around the work, so the dot grid shows.
- Radii: `radius-lg` (20) for cards, threads and the media bar; `radius-md` (12) for inputs and medium buttons, `radius-control-sm` (10) and `radius-control-lg` (14) for small and large buttons; `radius-sm` (6) for tags and mentions; `radius-pill` for avatars, icon buttons and progress segments.
- Typical layout: a stack of stat tiles beside a framed main card, with a comment thread beside it.

## Iconography

- These are line icons drawn in the bundle (`Icon`): a 24px grid, 2px stroke with round caps and joins, `currentColor`. Sizes are 16 (small buttons) and 18–20 (default).
- Icons are always outlined, never filled, the play triangle included.
- Inkline has no logo yet. Set the product name in `serif` until you have one.

## States

- Buttons: all share one shape, the `outline` border and an `ink` label (`ink-on-accent` on `accent`); only the fill changes. `primary` is soft blue (`action`) for the one main action; `secondary` is `paper` and covers every other labelled action, Cancel included; `ghost` (no border) is only for icon buttons in toolbars; `accent` (`rose`) is for a rare celebratory action.
- Hover: buttons stay flat — primary deepens to `action-hover`, secondary and ghost get a `stone` fill, accent darkens slightly. Cards and stat tiles lift 2px and gain `shadow-lift`, but are never clickable.
- Disabled: 45% opacity, no hover or press feedback.
- Selected / active: a `rose` fill with `ink-on-accent` text, or `aria-pressed` with an `ink` fill and `paper` icon (the resolve button).
- Motion: 120ms ease on the card lift and on button fills. Nothing bounces. With reduced motion the card doesn't move: it only gains `shadow-lift` on hover, with no transition.
