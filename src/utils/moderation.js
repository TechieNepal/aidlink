// Lightweight, transparent checks. Non-blocking: just nudge users toward safer sharing.

const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
const PHONE = /\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/
const ADDRESSISH = /\b\d{2,5}\s+[A-Za-z0-9'.\-]+\s+(Ave|Avenue|St|Street|Rd|Road|Blvd|Drive|Dr|Ln|Lane)\b/i
const URLISH = /\bhttps?:\/\/\S+/i

// Very small, obvious scammy keywords (explainable + easy to maintain)
const SCAM_WORDS = [
  'gift card', 'gift cards', 'prepay', 'pre-payment', 'wire transfer',
  'western union', 'moneygram', 'crypto', 'bitcoin', 'verification code',
  'code from your phone', 'cashapp', 'cash app', 'venmo only', 'upfront fee'
]

export function detectPII(text) {
  const flags = []
  if (EMAIL.test(text)) flags.push('Contains an email address')
  if (PHONE.test(text)) flags.push('Contains a phone number')
  if (ADDRESSISH.test(text)) flags.push('Contains a street address')
  if (URLISH.test(text)) flags.push('Contains a URL')
  return flags
}

export function detectScam(text) {
  const lower = text.toLowerCase()
  const hits = SCAM_WORDS.filter(w => lower.includes(w))
  return hits.length ? [`Possible scam language: ${hits.join(', ')}`] : []
}

/**
 * Compute a tiny “risk score” (0–100) for nudge UI. Purely heuristic.
 * PII = +25 each (max 75), scam = +25 (capped to 100).
 */
export function riskScore(piiFlags, scamFlags) {
  const base = Math.min(piiFlags.length * 25, 75)
  const scam = scamFlags.length ? 25 : 0
  return Math.min(base + scam, 100)
}

/** One-stop analysis for form text fields. */
export function analyzeSafety({ title, details, contact_hint }) {
  const text = `${title || ''}\n${details || ''}\n${contact_hint || ''}`
  const pii = detectPII(text)
  const scam = detectScam(text)
  const score = riskScore(pii, scam)
  return { pii, scam, score }
}

/** Human label for score band. */
export function scoreLabel(score) {
  if (score >= 75) return 'High risk'
  if (score >= 40) return 'Medium risk'
  return 'Low risk'
}