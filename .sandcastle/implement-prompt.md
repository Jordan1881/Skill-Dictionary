# Implement Feature for Skill Dictionary

## Project Context
This is a React + Express web app that displays Claude skills in an interactive book UI with page-flip animations.

**Tech Stack:**
- Frontend: React 18 + Vite
- Backend: Express.js
- Page flip: react-pageflip
- Markdown: react-markdown + remark-gfm
- Tests: Vitest + Testing Library

**Project Structure:**
- `src/components/` - React components (Book, Cover, SkillPage, TOCPage, TOCDrawer)
- `src/hooks/` - Custom hooks (useSkills)
- `server/` - Express API
- `tests/` - Test files

## Task
Implement the following feature:

### Feature: {{FEATURE_TITLE}}

**Description:**
{{FEATURE_DESCRIPTION}}

**Acceptance Criteria:**
- [ ] Code implements the feature as described
- [ ] Tests are written (aim for >80% coverage of new code)
- [ ] No console warnings or errors
- [ ] Component styling is consistent with existing theme
- [ ] Mobile responsive (if UI component)
- [ ] Documentation updated if needed

## Requirements
1. Follow existing code style and patterns in the project
2. Use the existing component structure and hooks
3. Write tests using Vitest + Testing Library
4. Make a clear, descriptive Git commit
5. Do NOT modify package.json unless absolutely necessary

## Done When
- Code compiles without errors
- All tests pass (`npm test`)
- Feature works as described in acceptance criteria
- Commit message explains the "why"
