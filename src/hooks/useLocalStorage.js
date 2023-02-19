import { useEffect, useState } from "react"

function getStoredValue(key, initialValue) {
  const value = JSON.parse(localStorage.getItem(key))
  console.log("initialValue in getStoredValue ->", key, value);
  // return value || initialValue

  if (value) return value
  if (initialValue instanceof Function) return initialValue()
  return initialValue
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getStoredValue(key, initialValue)
  })

  useEffect(() => {
    console.log("value in use effect -> ", value);
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}