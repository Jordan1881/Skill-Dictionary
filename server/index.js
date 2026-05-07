import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import os from 'os'
import { parseSkills } from './skillsParser.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3001
const SKILLS_DIR = path.join(os.homedir(), '.claude', 'skills')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/api/skills', async (req, res) => {
  try {
    const skills = await parseSkills(SKILLS_DIR)
    res.json(skills)
  } catch (err) {
    console.error('Error parsing skills:', err)
    res.status(500).json({ error: `Could not read ${SKILLS_DIR}: ${err.message}` })
  }
})

const distPath = path.join(__dirname, '../dist')
app.use(express.static(distPath))
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`\n📖  Skill Dictionary API  →  http://localhost:${PORT}`)
  console.log(`    Reading skills from: ${SKILLS_DIR}\n`)
})
