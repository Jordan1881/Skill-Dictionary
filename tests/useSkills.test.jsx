import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
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

describe('useSkills', () => {
  it('returns loading:true before the fetch resolves', () => {
    const { result } = renderHook(() => useSkills())
    expect(result.current.loading).toBe(true)
  })

  it('returns skills and loading:false after a successful fetch', async () => {
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.skills).toHaveLength(3)
    expect(result.current.error).toBeNull()
  })

  it('returns error and loading:false when the fetch fails', async () => {
    server.use(
      http.get('/api/skills', () => HttpResponse.error())
    )
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).not.toBeNull()
    expect(result.current.skills).toEqual([])
  })

  it('groups skills by domain', async () => {
    const { result } = renderHook(() => useSkills())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.grouped['ai-engineering']).toHaveLength(2)
    expect(result.current.grouped['web-dev']).toHaveLength(1)
  })
})
