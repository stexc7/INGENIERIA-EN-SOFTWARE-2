import { createContext, useContext, useEffect, useState } from 'react'
import { api, TOKEN_KEY } from '../utils/apiClient'
import { readStorage, writeStorage } from '../utils/storage'

const AuthContext = createContext(null)
const SESSION_KEY = 'saludfamiliar.session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(SESSION_KEY, null))
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setIsReady(true)
      return
    }

    api
      .get('/auth/me')
      .then(({ user: freshUser }) => {
        setUser(freshUser)
        writeStorage(SESSION_KEY, freshUser)
      })
      .catch(() => {
        // Sin conexión o token vencido: seguimos con el perfil cacheado si existe.
      })
      .finally(() => setIsReady(true))
  }, [])

  async function login(username, password) {
    try {
      const { token, user: loggedUser } = await api.post('/auth/login', {
        username: username.trim().toLowerCase(),
        password,
      })
      window.localStorage.setItem(TOKEN_KEY, token)
      writeStorage(SESSION_KEY, loggedUser)
      setUser(loggedUser)
      return { ok: true }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  function logout() {
    setUser(null)
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(SESSION_KEY)
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
