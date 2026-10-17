# CommentThread

CommentThread is a paper panel holding a short conversation pinned to something, with a resolve toggle.

**Provide:** `comments` (`{author, body, tone?, initial?, time?}[]`, where body may contain a `Tag tone="mention"`), optional `title` (default "Comment"), `resolved` + `onResolve`, `resolvable={false}` to hide the toggle, and `children` for a footer (usually a reply Input).

Place it next to the thing it discusses. Keep it ≤ 380px wide. Resolved threads mute their text.
