# Write Tests for Skill Dictionary

## Project Context
Testing framework: **Vitest + Testing Library**

**Example test locations:**
- `tests/useSkills.test.jsx` - Hook tests
- `tests/skillsParser.test.js` - Server tests
- Component tests go in `tests/` directory

**Test patterns to follow:**
```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
```

## Task
Write comprehensive tests for:

### Component/Function: {{TARGET}}

**What to test:**
- Happy path (normal usage)
- Edge cases (empty data, missing props, etc.)
- Error handling
- User interactions (if component)
- Props validation

## Requirements
1. Use Vitest + Testing Library conventions
2. Aim for >80% code coverage
3. Mock external dependencies (API calls, hooks)
4. Use descriptive test names
5. Test behavior, not implementation details
6. Include setup/teardown if needed

## Done When
- All tests pass (`npm test`)
- Test file follows existing patterns
- Coverage is >80% for the target
- Code is clear and maintainable
