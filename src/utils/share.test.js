import { describe, it, expect } from 'vitest'
import { encodeBase64, decodeBase64, safeFromJson } from './share'

describe('share utils', () => {
  it('roundtrips base64 encode/decode', () => {
    const obj = { a: 1, b: 'x', nested: { y: '✓' } }
    const b64 = encodeBase64(obj)
    const dec = decodeBase64(b64)
    expect(dec.ok).toBe(true)
    expect(dec.value).toEqual(obj)
  })

  it('validates JSON shape via safeFromJson', () => {
    const valid = safeFromJson(JSON.stringify({
      id: 'x', title: 't', category: 'tech', details: 'd',
      locality: 'Irving, TX', contact_hint: 'admin', created_at: '2025-01-01T00:00:00Z'
    }))
    expect(valid.ok).toBe(true)

    const invalid = safeFromJson('{"title":"t"}')
    expect(invalid.ok).toBe(false)
  })
})