import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from '../utils/apiClient'
import { readStorage, writeStorage } from '../utils/storage'
import { useAuth } from './AuthContext'

const AppointmentsContext = createContext(null)
const STORAGE_KEY = 'saludfamiliar.appointments.cache'

export function AppointmentsProvider({ children }) {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState(() => readStorage(STORAGE_KEY, []))

  const refresh = useCallback(async () => {
    try {
      const { appointments: fresh } = await api.get('/appointments')
      setAppointments(fresh)
      writeStorage(STORAGE_KEY, fresh)
    } catch {
      // Sin conexión: se conserva lo último cacheado en localStorage.
    }
  }, [])

  useEffect(() => {
    if (user) refresh()
  }, [user, refresh])

  async function addAppointment(newAppointment) {
    const { appointment } = await api.post('/appointments', newAppointment)
    setAppointments((prev) => {
      const next = [...prev, appointment]
      writeStorage(STORAGE_KEY, next)
      return next
    })
    return appointment
  }

  async function cancelAppointment(id) {
    const { appointment } = await api.patch(`/appointments/${id}/cancel`)
    setAppointments((prev) => {
      const next = prev.map((item) => (item.id === id ? appointment : item))
      writeStorage(STORAGE_KEY, next)
      return next
    })
    return appointment
  }

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, cancelAppointment, refresh }}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentsContext)
  if (!context) {
    throw new Error('useAppointments debe usarse dentro de un AppointmentsProvider')
  }
  return context
}
