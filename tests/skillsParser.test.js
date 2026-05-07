import { describe, it, expect } from 'vitest'
import { parseSkills } from '../server/skillsParser.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FIXTURES_DIR = path.join(__dirname, 'fixtures/skills')

describe('parseSkills', () => {
  it('returns a skill object for each SKILL.md found in the directory', async () => {
    const skills = await parseSkills(FIXTURES_DIR)
    expect(skills).toHaveLength(3)
  })

  it('strips frontmatter — content is pure markdown body', async () => {
    const skills = await parseSkills(FIXTURES_DIR)
    const grillMe = skills.find(s => s.name === 'grill-me')
    expect(grillMe.content).not.toMatch(/^---/)
    expect(grillMe.content).toContain('Interview me relentlessly')
  })

  it('extracts name, domain, description, triggers from frontmatter', async () => {
    const skills = await parseSkills(FIXTURES_DIR)
    const grillMe = skills.find(s => s.name === 'grill-me')
    expect(grillMe.name).toBe('grill-me')
    expect(grillMe.domain).toBe('ai-engineering')
    expect(grillMe.description).toContain('stress-test an idea')
    expect(grillMe.triggers).toContain('grill me')
  })

  it('assigns "Uncategorized" to skills missing metadata.domain', async () => {
    const skills = await parseSkills(FIXTURES_DIR)
    const noDomain = skills.find(s => s.name === 'no-domain-skill')
    expect(noDomain.domain).toBe('Uncategorized')
  })

  it('finds nested plugin-namespaced skills', async () => {
    const skills = await parseSkills(FIXTURES_DIR)
    const nested = skills.find(s => s.name === 'nested-skill')
    expect(nested).toBeDefined()
    expect(nested.domain).toBe('web-dev')
  })

  it('returns an empty array when the directory has no SKILL.md files', async () => {
    const skills = await parseSkills(path.join(__dirname, 'fixtures/empty'))
    expect(skills).toEqual([])
  })
})
