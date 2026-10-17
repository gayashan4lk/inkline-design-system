# MediaControls

MediaControls is the outlined playback bar: play/pause, restart, a segmented seek track, and icon actions.

**Provide:** `playing`, `progress` (0–1), `segments` (relative chapter lengths, drawn as separate pills), `actions` (subset of comment, volume, download, expand), `panelToggle`, `valueText` for screen readers, and handlers `onPlayToggle`, `onRestart`, `onSeek(progress)`, `onAction(name)`.

Played length fills `rose`; the thumb is an ink disc ringed in paper. The track is a keyboard slider (←/→ steps 5%). Place it directly below the media frame, at the same width.
