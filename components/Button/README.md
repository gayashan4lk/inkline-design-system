# Button

Buttons trigger an action; use `primary` for the one main action in a view, `secondary` for every other labelled action (Cancel included), `accent` sparingly and `ghost` only for icon buttons inside toolbars.

**Provide:** `children` (label, sentence case) and/or `icon`; an icon-only button needs `aria-label`. Any native button prop passes through.

- `primary`: soft blue `action` fill, `ink` label, `outline` at `stroke-bold`; deepens to `action-hover` on hover. One per view, for the main action (Save changes).
- `secondary`: `paper` fill, `ink` label, `outline` at `stroke-bold`; `stone` on hover. For every other action (Export, Add, Cancel).
- Buttons never lift or cast a shadow.

**Sizes** (`size`, default `md`). The 2px outline is the same at every size.

| size | height | text | icon | side padding | radius |
| --- | --- | --- | --- | --- | --- |
| `sm` | 32px | 13px | 16px | `space-3` | `radius-control-sm` |
| `md` | 40px | 15px | 18px | `space-4` | `radius-md` |
| `lg` | 48px | 16px | 20px | `space-5` | `radius-control-lg` |

Icon-only buttons are circles of the same height (32 / 40 / 48). Use `md` almost everywhere, `sm` in dense rows and toolbars, `lg` for a single hero action (an empty state, a landing panel). Keep one size per row.
- `accent`: a `rose` fill with `ink` text; darkens slightly on hover. Use it for the single moment you want to celebrate (Publish, Record).
- `ghost`: no border; `stone` on hover. Only for icon buttons in toolbars such as MediaControls — never for a labelled action like Cancel.
- `disabled`: 45% opacity and a not-allowed cursor; no hover or press feedback on any variant.

Do: keep labels to 1–3 words. Don't: put two primary buttons side by side, or set `paper` text on rose.
