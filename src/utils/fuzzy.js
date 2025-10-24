export function fuzzyIncludes(haystack, needle){
  if (!needle) return true
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

export function matchPost(post, q, category){
  const text = `${post.title}\n${post.details}\n${post.locality}`
  const okQ = fuzzyIncludes(text, q)
  const okC = !category || post.category === category
  return okQ && okC
}