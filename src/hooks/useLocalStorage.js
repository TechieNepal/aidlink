import { useEffect, useState } from 'react'

/**
 * useLocalStorage - JSON-safe localStorage state
 * @param {string} key
 * @param {any} initial
 */
export default function useLocalStorage(key, initial){
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial }
    catch { return initial }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  }, [key, value])
  return [value, setValue]
}