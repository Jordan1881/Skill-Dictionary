/**
 * skill.js — authoritative definition of the Skill shape.
 *
 * This is the single source of truth for what a Skill is.
 * Both the server (skillsParser) and the client (useSkills) produce/consume
 * objects matching this shape. Tests share this definition via SKILL_FIXTURE.
 */

/**
 * @typedef {Object} Skill
 * @property {string}   name        - Display name of the skill (from frontmatter or dir name)
 * @property {string}   domain      - Grouping domain (from frontmatter metadata.domain)
 * @property {string}   description - Short summary (from frontmatter description)
 * @property {string[]} triggers    - Keywords that invoke this skill
 * @property {string}   content     - Markdown body (frontmatter stripped)
 */

/**
 * Validates that a value matches the Skill shape at runtime.
 * Throws if any required field is missing or of the wrong type.
 *
 * @param {unknown} value
 * @param {string}  [context] - label for error messages (e.g. file path)
 * @returns {Skill}
 */
export function assertSkill(value, context = '') {
  const label = context ? ` (${context})` : ''
  if (!value || typeof value !== 'object') {
    throw new TypeError(`Expected Skill object${label}`)
  }
  for (const field of ['name', 'domain', 'description', 'content']) {
    if (typeof value[field] !== 'string') {
      throw new TypeError(`Skill.${field} must be a string${label}, got ${typeof value[field]}`)
    }
  }
  if (!Array.isArray(value.triggers)) {
    throw new TypeError(`Skill.triggers must be an array${label}`)
  }
  return /** @type {Skill} */ (value)
}

/**
 * A minimal valid Skill fixture for use in tests.
 * @type {Skill}
 */
export const SKILL_FIXTURE = {
  name: 'Example Skill',
  domain: 'Test Domain',
  description: 'A test skill.',
  triggers: ['example', 'test'],
  content: '## Overview\n\nThis is a test skill.',
}
