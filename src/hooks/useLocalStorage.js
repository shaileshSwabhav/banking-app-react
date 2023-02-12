import { useEffect, useState } from "react"

function getStorageValue(key, initialValue) {
  const value = JSON.parse(localStorage.getItem(key))

  if (value) return value

  if (initialValue instanceof Function) return initialValue()

  return initialValue
}

export default function useLocalStorage(initialValue) {
  const [value, setValue] = useState(key, () => {
    return getStorageValue(key, initialValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}