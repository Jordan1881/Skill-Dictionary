import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { useSkills } from '../src/hooks/useSkills.js'

const mockSkills = [
  { name: 'grill-me', domain: 'ai-engineering', description: 'Stress test ideas', triggers: ['grill me'], content: '...' },
  { name: 'to-prd', domain: 'ai-engineering', description: 'Write a PRD', triggers: ['write prd'], content: '...' },
  { name: 'react-expert', domain: 'web-dev', description: 'React expertise', triggers: ['react help'], content: '...' }
]

const server = setupServer(
  http.get('/api/skills', () => HttpResponse.json(mockSkills))
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('useSkills — initial state', () => {
  it('returns loading:true before the fetch resolves', () => {
    const { result } = renderHook(() => useSkills())
    expect(result.current.loading).toBe(true)
  })

  it('returns empty skills array and null error before fetch resolves', () => {
    const { result } = renderHook(() => useSkills())
    expect(result.current.skills).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('always returns all four expected properties', () => {
    const { result } = renderHook(() => useSkills())
    expect(result.current).toHaveProperty('skills')
    expect(result.current).toHaveProperty('grouped')
    expect(result.current).toHaveProperty('loading')
    expect(result.current).toHaveProperty('error')
  })

  it('returns an empty grouped object before fetch resolves', () => {
    const { result } = renderHook(() => useSkills())
    expect(result.current.grouped).toEqual({})
  })
})

describe('useSkills — successful fetch', () => {
  it('returns skills and loading:false after a successful fetch', async () => {
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.skills).toHaveLength(3)
    expect(result.current.error).toBeNull()
  })

  it('returns skills that match the API response data', async () => {
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.skills).toEqual(mockSkills)
  })

  it('handles an empty array from the API', async () => {
    server.use(http.get('/api/skills', () => HttpResponse.json([])))
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.skills).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('handles a single skill from the API', async () => {
    server.use(http.get('/api/skills', () => HttpResponse.json([mockSkills[0]])))
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.skills).toHaveLength(1)
    expect(result.current.skills[0].name).toBe('grill-me')
  })
})

describe('useSkills — error handling', () => {
  it('returns error and loading:false when the network request fails', async () => {
    server.use(http.get('/api/skills', () => HttpResponse.error()))
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).not.toBeNull()
    expect(result.current.skills).toEqual([])
  })

  it('sets error message containing the status code on a 500 response', async () => {
    server.use(http.get('/api/skills', () => new HttpResponse(null, { status: 500 })))
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toContain('500')
    expect(result.current.skills).toEqual([])
  })

  it('sets error message containing the status code on a 404 response', async () => {
    server.use(http.get('/api/skills', () => new HttpResponse(null, { status: 404 })))
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toContain('404')
  })

  it('error value is a string describing the failure', async () => {
    server.use(http.get('/api/skills', () => new HttpResponse(null, { status: 503 })))
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(typeof result.current.error).toBe('string')
    expect(result.current.error.length).toBeGreaterThan(0)
  })

  it('returns an empty grouped object when the fetch fails', async () => {
    server.use(http.get('/api/skills', () => HttpResponse.error()))
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.grouped).toEqual({})
  })
})

describe('useSkills — grouping', () => {
  it('groups skills by domain', async () => {
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.grouped['ai-engineering']).toHaveLength(2)
    expect(result.current.grouped['web-dev']).toHaveLength(1)
  })

  it('groups skills with a missing domain under "Uncategorized"', async () => {
    const withMissingDomain = [
      { name: 'orphan', description: 'no domain', triggers: [], content: '' }
    ]
    server.use(http.get('/api/skills', () => HttpResponse.json(withMissingDomain)))
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.grouped['Uncategorized']).toHaveLength(1)
    expect(result.current.grouped['Uncategorized'][0].name).toBe('orphan')
  })

  it('groups skills with an explicit undefined domain under "Uncategorized"', async () => {
    const withUndefinedDomain = [
      { name: 'no-domain', domain: undefined, description: 'test', triggers: [], content: '' }
    ]
    server.use(http.get('/api/skills', () => HttpResponse.json(withUndefinedDomain)))
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.grouped['Uncategorized']).toHaveLength(1)
  })

  it('returns an empty grouped object when the API returns an empty array', async () => {
    server.use(http.get('/api/skills', () => HttpResponse.json([])))
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.grouped).toEqual({})
  })

  it('places all skills under one key when they share the same domain', async () => {
    const sameDomain = [
      { name: 'skill-a', domain: 'tooling', description: 'a', triggers: [], content: '' },
      { name: 'skill-b', domain: 'tooling', description: 'b', triggers: [], content: '' },
      { name: 'skill-c', domain: 'tooling', description: 'c', triggers: [], content: '' }
    ]
    server.use(http.get('/api/skills', () => HttpResponse.json(sameDomain)))
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(Object.keys(result.current.grouped)).toHaveLength(1)
    expect(result.current.grouped['tooling']).toHaveLength(3)
  })

  it('preserves skill order within each domain group', async () => {
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    const aiSkills = result.current.grouped['ai-engineering']
    expect(aiSkills[0].name).toBe('grill-me')
    expect(aiSkills[1].name).toBe('to-prd')
  })
})

describe('useSkills — PROD endpoint', () => {
  afterEach(() => {
    import.meta.env.PROD = false
  })

  it('fetches from /skills.json in production mode', async () => {
    import.meta.env.PROD = true
    server.use(http.get('/skills.json', () => HttpResponse.json(mockSkills)))

    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.skills).toHaveLength(3)
    expect(result.current.error).toBeNull()
  })

  it('returns grouped data when fetched via /skills.json', async () => {
    import.meta.env.PROD = true
    server.use(http.get('/skills.json', () => HttpResponse.json(mockSkills)))

    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.grouped['ai-engineering']).toHaveLength(2)
    expect(result.current.grouped['web-dev']).toHaveLength(1)
  })
})
