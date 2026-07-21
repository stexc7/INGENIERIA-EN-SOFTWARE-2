import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../utils/apiClient'
import { readStorage, writeStorage } from '../utils/storage'
import { useAuth } from './AuthContext'

const PrescriptionsContext = createContext(null)
const STORAGE_KEY = 'saludfamiliar.prescriptions.cache'

export function PrescriptionsProvider({ children }) {
  const { user } = useAuth()
  const [prescriptions, setPrescriptions] = useState(() => readStorage(STORAGE_KEY, []))

  useEffect(() => {
    if (!user) return
    api
      .get('/prescriptions')
      .then(({ prescriptions: fresh }) => {
        setPrescriptions(fresh)
        writeStorage(STORAGE_KEY, fresh)
      })
      .catch(() => {
        // Sin conexión: se conserva lo último cacheado en localStorage.
      })
  }, [user])

  return (
    <PrescriptionsContext.Provider value={{ prescriptions }}>{children}</PrescriptionsContext.Provider>
  )
}

export function usePrescriptions() {
  const context = useContext(PrescriptionsContext)
  if (!context) {
    throw new Error('usePrescriptions debe usarse dentro de un PrescriptionsProvider')
  }
  return context
}
