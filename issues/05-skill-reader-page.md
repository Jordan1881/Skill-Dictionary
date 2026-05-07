# Issue 5 — Skill reader page

**Type:** AFK
**Label:** needs-triage

## What to build

Implement the `SkillPage` component that occupies the right page of the book. It renders the selected skill's markdown content with full formatting, drop cap on the first paragraph, ornamental dividers between `##` sections, and a Roman numeral page number at the bottom.

End-to-end: clicking a skill in the index flips to a right page showing that skill's content rendered as formatted markdown within the aged-paper design — headers in Playfair Display, body in Lora, code in Source Code Pro, tables and lists styled to match the book aesthetic.

## Acceptance criteria

- [ ] Selected skill's `content` rendered via `react-markdown` + `remark-gfm`
- [ ] YAML frontmatter not visible in rendered output
- [ ] First letter of first paragraph rendered as a large drop cap
- [ ] `❧` ornamental divider inserted between each `##` section
- [ ] Roman numeral page number displayed at bottom of page
- [ ] Tables, code blocks, and lists styled to match the aged-paper theme
- [ ] Content fits within 450×620px with scroll if overflow

## Blocked by

- Issue #2 — Skills API
- Issue #3 — Book shell + cover
