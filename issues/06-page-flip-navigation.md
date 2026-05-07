# Issue 6 — Page-flip navigation

**Type:** AFK
**Label:** needs-triage

## What to build

Wire up `react-pageflip`'s built-in drag-to-flip for sequential browsing between skills. Dragging the right page edge forward advances to the next skill; dragging backward returns to the previous. Index click navigation (from Issue #4) should coexist with drag navigation.

End-to-end: user can grab the corner of any page and drag to flip to the next or previous skill with realistic page-turn physics. The index always reflects the currently visible skill.

## Acceptance criteria

- [ ] Dragging the page edge triggers a realistic page-flip animation via `react-pageflip`
- [ ] Flipping forward shows the next skill in the list
- [ ] Flipping backward shows the previous skill
- [ ] Index click navigation and drag navigation both update the same `currentPage` state
- [ ] Active skill in the index is visually highlighted to match the currently open page
- [ ] No double-flip or state desync between index and book position

## Blocked by

- Issue #4 — Index page
- Issue #5 — Skill reader page
