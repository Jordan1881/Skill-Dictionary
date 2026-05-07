/**
 * export-skills.js
 * Reads ~/.claude/skills/ and writes public/skills.json for Vercel static deployment.
 *
 * Run:  npm run export-skills
 * Then: git add public/skills.json && git commit -m "Update skills snapshot"
 *       git push  (Vercel auto-deploys)
 */

import { writeFile, mkdir } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { homedir } from 'os'
import { parseSkills } from '../server/skillsParser.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')
const outputPath  = resolve(projectRoot, 'public', 'skills.json')
const skillsDir   = resolve(homedir(), '.claude', 'skills')

async function main() {
  console.log(`Reading skills from: ${skillsDir}`)
  const skills = await parseSkills(skillsDir)
  console.log(`Found ${skills.length} skills`)

  await mkdir(resolve(projectRoot, 'public'), { recursive: true })
  await writeFile(outputPath, JSON.stringify(skills, null, 2), 'utf-8')
  console.log(`Written to: ${outputPath}`)
}

main().catch(err => { console.error(err); process.exit(1) })
