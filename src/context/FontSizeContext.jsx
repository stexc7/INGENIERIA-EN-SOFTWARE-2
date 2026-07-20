import { createContext, useContext, useEffect, useState } from 'react'

const FontSizeContext = createContext(null)
const STORAGE_KEY = 'saludfamiliar.fontScale'
const MIN_SCALE = 0.85
const MAX_SCALE = 1.4
const STEP = 0.15

export function FontSizeProvider({ children }) {
  const [scale, setScale] = useState(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? Number(stored) : 1
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', scale)
    window.localStorage.setItem(STORAGE_KEY, String(scale))
  }, [scale])

  function increaseFontSize() {
    setScale((current) => Math.min(MAX_SCALE, Number((current + STEP).toFixed(2))))
  }

  function decreaseFontSize() {
    setScale((current) => Math.max(MIN_SCALE, Number((current - STEP).toFixed(2))))
  }

  function resetFontSize() {
    setScale(1)
  }

  return (
    <FontSizeContext.Provider value={{ scale, increaseFontSize, decreaseFontSize, resetFontSize }}>
      {children}
    </FontSizeContext.Provider>
  )
}

export function useFontSize() {
  const context = useContext(FontSizeContext)
  if (!context) {
    throw new Error('useFontSize debe usarse dentro de un FontSizeProvider')
  }
  return context
}