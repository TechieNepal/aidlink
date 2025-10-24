import { describe, it, expect } from 'vitest'
import { validatePostFields, makeIdFromTitle } from './validators'

describe('validatePostFields', () => {
  it('flags missing required fields', () => {
    const { errors } = validatePostFields({})
    expect(Object.keys(errors).sort()).toEqual(
      ['title','category','details','locality','contact_hint'].sort()
    )
  })

  it('accepts valid fields', () => {
    const { errors } = validatePostFields({
      title: 'Offer: tutoring', category: 'education',
      details: 'Algebra basics at library', locality: 'Irving, TX',
      contact_hint: 'Coordinate via admin'
    })
    expect(errors).toEqual({})
  })
})

describe('makeIdFromTitle', () => {
  it('generates a slug-like id', () => {
    const id = makeIdFromTitle('Ride to Clinic on Tuesday!')
    expect(id).toMatch(/^ride-to-clinic-on-tuesday-[a-z0-9]+$/)
  })
})