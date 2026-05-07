import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

async function findSkillFiles(dir) {
  let results = []
  let entries

  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return results
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const nested = await findSkillFiles(fullPath)
      results = results.concat(nested)
    } else if (entry.name === 'SKILL.md') {
      results.push(fullPath)
    }
  }

  return results
}

export async function parseSkills(skillsDir) {
  const files = await findSkillFiles(skillsDir)

  const skills = await Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, 'utf-8')
      const { data, content } = matter(raw)

      const triggers = data.metadata?.triggers
        ? String(data.metadata.triggers).split(',').map(t => t.trim())
        : []

      return {
        name: data.name || path.basename(path.dirname(filePath)),
        domain: data.metadata?.domain || 'Uncategorized',
        description: data.description?.trim() || '',
        triggers,
        content: content.trim()
      }
    })
  )

  return skills
}
