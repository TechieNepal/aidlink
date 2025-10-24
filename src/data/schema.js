/**
 * @typedef {(
 *  'food' | 'education' | 'mobility' | 'tech' | 'health' | 'housing' | 'translation' | 'other'
 * )} Category
 */

/**
 * @typedef Need
 * @property {string} id
 * @property {string} title
 * @property {Category} category
 * @property {string} details
 * @property {string} locality
 * @property {string} contact_hint
 * @property {string=} created_at
 */

/**
 * @typedef Offer
 * @property {string} id
 * @property {string} title
 * @property {Category} category
 * @property {string} details
 * @property {string} locality
 * @property {string} contact_hint
 * @property {string=} created_at
 */

export const CATEGORIES = /** @type {Category[]} */([
  'food', 'education', 'mobility', 'tech', 'health', 'housing', 'translation', 'other'
])

/**
 * Tiny runtime validator (non-throwing).
 * @param {any} obj
 * @returns {{ok:boolean, reason?:string}}
 */
export function validatePost(obj) {
  if (!obj || typeof obj !== 'object') return { ok:false, reason:'not an object' }
  const base = ['id','title','category','details','locality','contact_hint']
  for (const k of base) {
    if (!(k in obj)) return { ok:false, reason:`missing ${k}` }
    if (typeof obj[k] !== 'string') return { ok:false, reason:`${k} must be string` }
    if (!obj[k].trim()) return { ok:false, reason:`${k} empty` }
  }
  if (!CATEGORIES.includes(obj.category)) return { ok:false, reason:'invalid category' }
  return { ok:true }
}