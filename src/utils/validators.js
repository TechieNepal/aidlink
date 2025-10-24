import { CATEGORIES } from '../data/schema'

/**
 * Very small validator & red-flag detector (privacy-first).
 * Returns { errors: Record<string,string>, flags: string[] }
 */
export function validatePostFields(fields){
  const errors = {}
  const flags = []

  const required = ['title','category','details','locality','contact_hint']
  for (const k of required){
    const v = (fields[k] ?? '').trim()
    if (!v) errors[k] = 'Required'
  }

  if (fields.category && !CATEGORIES.includes(fields.category)){
    errors.category = 'Invalid category'
  }

  // rudimentary PII / risky content heuristics
  const text = `${fields.title || ''}\n${fields.details || ''}\n${fields.contact_hint || ''}`

  // e-mail pattern
  const email = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
  if (email.test(text)) flags.push('Contains an email address. Consider removing for public privacy.')

  // phone-ish pattern (US-leaning)
  const phone = /\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/
  if (phone.test(text)) flags.push('Contains a phone number. Consider removing for public privacy.')

  // exact addresses (very naive)
  const addressish = /\b\d{2,5}\s+[A-Za-z0-9'.\-]+\s+(Ave|Avenue|St|Street|Rd|Road|Blvd|Drive|Dr|Ln|Lane)\b/i
  if (addressish.test(text)) flags.push('Contains a street address. Share specifics only after trust is established.')

  // links
  const urlish = /\bhttps?:\/\/\S+/i
  if (urlish.test(text)) flags.push('Contains a URL. Be careful with public links.')

  return { errors, flags }
}

/** Build a stable id/slug from title + time */
export function makeIdFromTitle(title){
  const slug = (title || 'untitled')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${slug}-${Date.now().toString(36)}`
}