# MediaControls

MediaControls is the outlined playback bar: play/pause, restart, a segmented seek track, and icon actions.

**Provide:** `playing`, `progress` (0–1), `segments` (relative chapter lengths, drawn as separate pills), `actions` (subset of comment, volume, download, expand), `panelToggle`, `valueText` for screen readers, and handlers `onPlayToggle`, `onRestart`, `onSeek(progress)`, `onAction(name)`.

Played length fills `rose`; the thumb is an ink disc ringed in paper. The track is a keyboard slider: ←/→ and ↑/↓ step 5%, Page Up/Down step 10%, Home/End jump to the start or end. Place it directly below the media frame, at the same width. When the bar is too narrow for one row (below about 500px with the default actions), the action icons wrap to a second, right-aligned row; buttons keep their 40px size.
