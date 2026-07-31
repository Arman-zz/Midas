import { useState } from 'react'
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initialValue } catch { return initialValue }
  })
  const update = (nextValue) => {
    const resolved = typeof nextValue === 'function' ? nextValue(value) : nextValue
    setValue(resolved)
    localStorage.setItem(key, JSON.stringify(resolved))
  }
  return [value, update]
}
