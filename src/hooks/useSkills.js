import { useState, useEffect, useMemo } from 'react'

export function useSkills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // In production (Vercel static deploy) skills are pre-exported to /skills.json.
    // In development the Express API serves them dynamically.
    const endpoint = import.meta.env.PROD ? '/skills.json' : '/api/skills'
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch skills: ${res.status}`)
        return res.json()
      })
      .then(data => {
        setSkills(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setSkills([])
        setLoading(false)
      })
  }, [])

  const grouped = useMemo(() => {
    return skills.reduce((acc, skill) => {
      const domain = skill.domain || 'Uncategorized'
      if (!acc[domain]) acc[domain] = []
      acc[domain].push(skill)
      return acc
    }, {})
  }, [skills])

  return { skills, grouped, loading, error }
}
