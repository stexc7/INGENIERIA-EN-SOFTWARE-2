import { createContext, useContext, useEffect, useState } from 'react'
import { mockUsers } from '../mocks/mockData'

const AuthContext = createContext(null)
const STORAGE_KEY = 'saludfamiliar.session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsReady(true)
  }, [])

  function login(username, password) {
    const found = mockUsers.find(
      (candidate) => candidate.username === username.trim().toLowerCase() && candidate.password === password,
    )
    if (!found) {
      return { ok: false, error: 'Usuario o contraseña incorrectos.' }
    }
    const { password: _password, ...safeUser } = found
    setUser(safeUser)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    return { ok: true }
  }

  function logout() {
    setUser(null)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
