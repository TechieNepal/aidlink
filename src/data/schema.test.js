import { describe, it, expect } from 'vitest'
import { validatePost, CATEGORIES } from './schema'

describe('schema', () => {
  it('accepts valid post', () => {
    const ok = validatePost({
      id: 'abc', title: 'Need: ride', category: 'mobility',
      details: 'to clinic', locality: 'Irving, TX', contact_hint: 'via admin'
    })
    expect(ok.ok).toBe(true)
  })

  it('rejects invalid category', () => {
    const bad = validatePost({
      id: 'x', title: 't', category: 'bad',
      details: 'd', locality: 'x', contact_hint: 'y'
    })
    expect(bad.ok).toBe(false)
  })

  it('categories list has expected entries', () => {
    expect(CATEGORIES).toContain('education')
    expect(CATEGORIES).toContain('mobility')
  })
})