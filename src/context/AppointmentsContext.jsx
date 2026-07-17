import { createContext, useContext, useEffect, useState } from 'react'
import { mockAppointments } from '../mocks/mockData'
import { readStorage, writeStorage } from '../utils/storage'

const AppointmentsContext = createContext(null)
const STORAGE_KEY = 'saludfamiliar.appointments'

export function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState(() => readStorage(STORAGE_KEY, mockAppointments))

  useEffect(() => {
    writeStorage(STORAGE_KEY, appointments)
  }, [appointments])

  function addAppointment(newAppointment) {
    const appointment = {
      id: `a${Date.now()}`,
      status: 'pendiente',
      ...newAppointment,
    }
    setAppointments((prev) => [...prev, appointment])
    return appointment
  }

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment }}>
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
