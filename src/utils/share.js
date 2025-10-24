import { validatePost } from '../data/schema'

/** base64 encode with unicode safety */
export function encodeBase64(obj){
  const json = JSON.stringify(obj)
  return btoa(unescape(encodeURIComponent(json)))
}

/** base64 decode with unicode safety; returns {ok, value?, reason?} */
export function decodeBase64(b64){
  try {
    const json = decodeURIComponent(escape(atob(b64)))
    const value = JSON.parse(json)
    return { ok: true, value }
  } catch (e) {
    return { ok: false, reason: 'Invalid encoded payload' }
  }
}

/** Build a shareable URL like /discover?p=<base64> */
export function buildShareUrl(origin, post){
  const encoded = encodeBase64(post)
  const url = new URL('/discover', origin)
  url.searchParams.set('p', encoded)
  return url.toString()
}

/** Validate a post before importing/using */
export function safeFromJson(text){
  try {
    const obj = JSON.parse(text)
    const v = validatePost(obj)
    if (!v.ok) return { ok:false, reason: `Invalid post: ${v.reason}` }
    return { ok:true, value: obj }
  } catch {
    return { ok:false, reason: 'Not valid JSON' }
  }
}

/** Trigger a browser download of JSON */
export function downloadJson(filename, obj){
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/** Copy text to clipboard with fallback */
export async function copyText(text){
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {}
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.focus()
  ta.select()
  try {
    const ok = document.execCommand('copy')
    return !!ok
  } finally {
    ta.remove()
  }
}