# Input

Input is a single-line text field with an optional caps label, hint and error.

**Provide:** `label`, optional `hint`, `error` (replaces the hint, turns the outline `danger`, sets `aria-invalid`), plus any native input props (`placeholder`, `value`, `onChange`…). An `id` is generated if you omit one.

Do: write errors that say how to fix it ("Use 3–40 characters"). Don't: rely on the red border alone.
