# Issue 8 — Error & loading states

**Type:** AFK
**Label:** needs-triage

## What to build

Handle the two failure modes in the data layer: slow loads and unreadable skills directory. Show a loading skeleton while skills fetch, and a clear error message if the server can't read `~/.claude/skills/`.

End-to-end: on slow connection, the book pages show a paper-textured skeleton shimmer. If `~/.claude/skills/` is missing or unreadable, the right page shows a styled error message explaining the problem — no blank screen, no console-only errors.

## Acceptance criteria

- [ ] Loading skeleton shown on left and right pages while `/api/skills` fetch is in progress
- [ ] Skeleton uses the aged-paper aesthetic (cream background, subtle shimmer)
- [ ] If `/api/skills` returns an error, a readable error message is shown on the right page
- [ ] Error message states the likely cause (e.g. "Could not read ~/.claude/skills/")
- [ ] Server returns a meaningful HTTP error status (not 200 with error body) when parsing fails
- [ ] Skills missing `metadata.domain` silently fall into "Uncategorized" — not treated as errors

## Blocked by

- Issue #2 — Skills API
