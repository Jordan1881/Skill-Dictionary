# Pipeline — skill-dictionary
> A responsive web app that displays SKILL.md files as an interactive book with page-flip animations
Started: 2026-05-07 | Last updated: 2026-05-07

## Progress

| # | Stage | Status | Output |
|---|---|---|---|
| 1 | grill-me | ✅ done | Spec locked — Vite+React+Express, react-pageflip, aged paper theme |
| 2 | to-prd | ✅ done | skill-dictionary-PRD.md — 28 user stories, 7 modules defined |
| 3 | to-issues | ✅ done | 8 issues in /issues/ — dependency order, all AFK |
| 4 | tdd | ✅ done | 10 tests green — skillsParser (6) + useSkills (4) |
| 5 | ralph-loop | ✅ done | Full app built — 9 files, 10/10 tests green, API verified |
| 6 | improve-codebase-architecture | ⏳ pending | — |

## Stage Notes

### to-issues
- 8 issues published to /issues/ in dependency order
- Issue 1: scaffold (no blockers)
- Issue 2: skills API (blocked by 1)
- Issue 3: book shell + cover (blocked by 1)
- Issue 4: index page (blocked by 2, 3)
- Issue 5: skill reader page (blocked by 2, 3)
- Issue 6: page-flip nav (blocked by 4, 5)
- Issue 7: mobile view (blocked by 4, 5, 6)
- Issue 8: error/loading states (blocked by 2)

### to-prd
- PRD file: skill-dictionary-PRD.md
- 28 user stories covering all features
- 7 modules: skillsParser, server/index, useSkills, Book, Cover, SkillIndex, SkillPage
- Tests scoped to: skillsParser.js + useSkills.js
- API contract defined: GET /api/skills → structured skill objects

### grill-me
- Stack: Vite + React frontend, Express backend
- Page-flip: react-pageflip with drag support
- Markdown: react-markdown + remark-gfm + gray-matter
- Theme: aged paper — cream #f5f0e8, dark brown ink #2c1810, gold #c9a84c, Playfair Display + Lora + Source Code Pro
- Layout: 900×620 book spread, left=domain-grouped index, right=rendered skill
- Mobile: single-page + swipe below 768px, index as slide-in drawer
- Data: Express reads ~/.claude/skills/ live at /api/skills
- Cover: leather brown #3d1c02, gold-embossed title on open
