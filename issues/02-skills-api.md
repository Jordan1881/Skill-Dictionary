# Issue 2 — Skills API

**Type:** AFK
**Label:** needs-triage

## What to build

Implement the Express `/api/skills` endpoint that reads `~/.claude/skills/` recursively, parses every `SKILL.md` with `gray-matter`, and returns structured skill objects as JSON. This is the data layer everything else consumes.

End-to-end: `curl http://localhost:3001/api/skills` returns a JSON array of skill objects with `name`, `domain`, `description`, `triggers`, and `content` fields. Skills without a `domain` field appear under `"Uncategorized"`.

## Acceptance criteria

- [ ] `GET /api/skills` returns HTTP 200 with `Content-Type: application/json`
- [ ] Every `SKILL.md` found under `~/.claude/skills/**` is included in the response
- [ ] YAML frontmatter is stripped from `content` — only markdown body returned
- [ ] `name`, `domain`, `description`, and `triggers` extracted from frontmatter metadata
- [ ] Skills missing `metadata.domain` are assigned `domain: "Uncategorized"`
- [ ] Plugin-namespaced skills (e.g. `grill-me`, `to-prd`) parsed correctly
- [ ] Skills are re-read from disk on every request (no server-side cache)
- [ ] `skillsParser.js` is a separate module with a clean `parseSkills()` export

## Blocked by

- Issue #1 — Project scaffold
