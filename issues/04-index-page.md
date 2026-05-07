# Issue 4 — Index page

**Type:** AFK
**Label:** needs-triage

## What to build

Implement the `SkillIndex` component that occupies the left page of the book. Skills are grouped by domain and displayed as a clickable list. Domain groups are styled as leather bookmark tabs. Clicking a skill name navigates directly to that skill's page.

End-to-end: the left page shows all skills from `/api/skills` grouped under their domain bookmark tabs. Clicking any skill name triggers `react-pageflip` to flip to that skill's page on the right.

## Acceptance criteria

- [ ] `useSkills` hook fetches from `/api/skills` and exposes skills grouped by domain
- [ ] All domain groups rendered as leather bookmark tabs on the left page
- [ ] Each skill name rendered as a clickable link within its domain group
- [ ] Clicking a skill navigates the book to that skill's page
- [ ] Loading state shown while fetch is in progress
- [ ] Index fits within 450×620px (left page dimensions) without overflow

## Blocked by

- Issue #2 — Skills API
- Issue #3 — Book shell + cover
