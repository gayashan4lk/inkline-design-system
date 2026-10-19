# Card

Card is the outlined container every Inkline screen is built from: a pastel or paper fill, an ink outline at `stroke-bold`, `radius-lg` corners.

**Provide:** `children`; optional `tone` (default `paper`), `padding` (`none` | `sm` | `md` | `lg`), and `caption` to set a mono file name above the card, like a framed document. `as` picks a semantic element (`section`, `article`, `aside`, `li`).

On hover a card lifts 2px and gains `shadow-lift` (StatTile too); with reduced motion it doesn't move, only the shadow appears. In `rose` and `clay` cards, muted text and focus rings switch to `ink`. It is still not clickable: no click handler, no pointer cursor, never a button or link. Put actions inside a card as Buttons.

Do: use `padding="none"` to frame media edge to edge. Don't: make a whole card clickable, or nest outlined cards inside each other — use `line` dividers inside instead.
