# Changelog

Current version: **1.1.1**

## How Inkline is versioned

Inkline uses semantic versioning, `MAJOR.MINOR.PATCH`.

- **Patch** (1.0.**1**): fixes that change nothing about how the system is used — a contrast tweak, a guideline typo, a preview fix.
- **Minor** (1.**1**.0): additions that leave existing screens untouched — a new token, a new size, a new component, a new variant that isn't the default.
- **Major** (**2**.0.0): changes that break or visibly alter existing work — renaming or removing a token, prop or variant, changing a default, changing what a variant looks like or means.

Rules for every change:

1. Add an entry at the top of this log: version, date, and what was **Added**, **Changed**, **Deprecated**, **Removed** or **Fixed**, naming the tokens and components affected.
2. Update the version on the first line of this section and of the brand book.
3. Save the system with the version as its label (for example "v1.1.0"), so any release can be reopened or restored.
4. Deprecate before removing: keep a renamed or retired token or prop for at least one minor release, with "Deprecated in x.y — use `new-name`" in its usage note, then remove it in the next major.
5. Token names are the contract. Changing a value is usually a patch; renaming one is always a major.

## 1.1.1 — 2026-10-17

### Changed

- Dark theme: `outline` is now `#7a7874` (the off-white `ink` at 50% brightness) instead of following `ink`, so card, button and input borders are softer. Still 4.1:1 against `canvas` and 3.8:1 against `paper`.
- Dark theme: `shadow-lift` uses the same `#7a7874`.
- Light theme unchanged.

## 1.1.0 — 2026-10-17

Dark mode.

### Added

- **Dark theme** (`dark`) for every color token: charcoal `canvas` (`#161513`) and `paper` (`#201e1b`), off-white `ink` and `outline` (`#f3efe7`), `ink-muted` `#b5afa4`, deep pastels (`lilac` `#3a2f37`, `sage` `#2c3733`, `peach` `#3d322b`, `periwinkle`, `mint`, `stone`), deep-blue `action` (`#263a63`), deeper `rose` (`#9c5570`), lighter `rose-ink`, `mention-ink`, `danger` and `focus` (`#7fa2f0`).
- `shadow-lift` has a dark value: an off-white hard offset.
- **Follow the device setting.** The bundle applies `dark` when the OS prefers dark and no `data-theme` is set on `<html>`, and keeps following OS changes. `Inkline.setTheme('light' | 'dark' | 'system')` switches or returns to following the OS.
- Native form controls and scrollbars follow the theme (`color-scheme`).

### Unchanged

- The light theme, all token names and all component APIs.

## 1.0.0 — 2026-10-17

First stable release.

### Added

- **Foundations.** Light theme with `canvas` (dot grid), `paper`, `ink`, `ink-muted`, `outline`, the pastels `lilac`, `sage`, `peach`, `periwinkle`, `mint`, `stone`, the accents `rose`, `rose-ink`, `clay`, `mention`, `mention-ink`, `danger`, `danger-soft`, `action`, `action-hover` and `focus`.
- **Type.** System font stacks only: `serif` for display (`display-xl`, `display`, `display-sm`), `sans` for UI (`heading`, `body-lg`, `body`, `body-strong`, `caption`, `label`), `mono` for `filename` and `code`.
- **Scales.** Spacing `space-1`–`space-12` on a 4px grid; radii `radius-sm`, `radius-control-sm`, `radius-md`, `radius-control-lg`, `radius-lg`, `radius-pill`; strokes `stroke-bold`, `stroke-thin`, `stroke-hairline`; one shadow, `shadow-lift`.
- **Button.** Variants `primary` (soft blue `action` fill), `secondary` (`paper`), `accent` (`rose`) and `ghost` (toolbar icons only), all with the 2px ink outline and no lift. Sizes `sm` 32px, `md` 40px (default), `lg` 48px, with icon-only circles at each size. Disabled buttons give no hover or press feedback.
- **Card** and **StatTile.** Outlined pastel or paper containers that lift 2px with `shadow-lift` on hover but are never clickable; optional mono caption above a card.
- **Input.** Caps label, hint and error; a single border that turns `focus` blue when focused, or stays `danger` when the field has an error.
- **Tag** (including the `mention` chip), **Avatar** (`sm`, `md`, `lg`), **CommentThread** with a resolve toggle, **MediaControls** with a segmented seek track, and **Icon** (13 line icons).
- Brand book covering principles, content, color, type, layout, iconography and states; a cover.
