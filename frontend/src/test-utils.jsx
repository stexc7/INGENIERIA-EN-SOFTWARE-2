import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { ThemeProvider } from './context/ThemeContext'
import { FontSizeProvider } from './context/FontSizeContext'
import { AuthProvider } from './context/AuthContext'
import { AppointmentsProvider } from './context/AppointmentsContext'
import { NotificationsProvider } from './context/NotificationsContext'
import { PrescriptionsProvider } from './context/PrescriptionsContext'
import { api, TOKEN_KEY } from './utils/apiClient'
import { mockUsers, mockAppointments, mockPrescriptions, mockNotifications } from './mocks/mockData'

const testSpecialties = [
  { id: 'endocrinologia', name: 'Endocrinología', doctor: 'Dra. Marcela Vintimilla' },
  { id: 'cardiologia', name: 'Cardiología', doctor: 'Dra. Lucía Torres' },
]
const testLocations = ['Hospital José Carrasco Arteaga', 'Clínica Santa Ana']
const testTimeSlots = ['09:00', '10:00', '11:00']

function safeUser(rawUser) {
  const { password: _password, ...safe } = rawUser
  return safe
}

/**
 * Configura los mocks de src/utils/apiClient para que los contexts
 * (Auth/Appointments/Prescriptions/Notifications) tengan datos consistentes,
 * imitando lo que respondería el backend real. Cada test puede sobrescribir
 * api.get/post/patch después de llamar a esto para casos particulares.
 */
function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

export function setupApiMocks({ username = 'priscila', appointments, prescriptions, notifications } = {}) {
  const found = mockUsers.find((u) => u.username === username)
  const user = safeUser(found)

  const myAppointments = clone(appointments ?? mockAppointments.filter((a) => a.userId === user.id))
  const myPrescriptions = clone(prescriptions ?? mockPrescriptions.filter((p) => p.userId === user.id))
  const myNotifications = clone(notifications ?? mockNotifications.filter((n) => n.userId === user.id))

  // Cada handler devuelve datos clonados, nunca la misma referencia que ya
  // está en el estado de React, igual que haría un fetch real (JSON.parse
  // siempre crea objetos nuevos). Si se reutiliza la misma referencia, React
  // puede saltarse el re-render por igualdad de referencia en el setState.
  api.get.mockImplementation((path) => {
    if (path === '/auth/me') return Promise.resolve({ user: clone(user) })
    if (path === '/appointments') return Promise.resolve({ appointments: clone(myAppointments) })
    if (path === '/prescriptions') return Promise.resolve({ prescriptions: clone(myPrescriptions) })
    if (path.startsWith('/prescriptions/')) {
      const id = path.split('/')[2]
      const match = myPrescriptions.find((p) => p.id === id)
      return match
        ? Promise.resolve({ prescription: clone(match) })
        : Promise.reject(new Error('Receta no encontrada.'))
    }
    if (path === '/notifications') return Promise.resolve({ notifications: clone(myNotifications) })
    if (path === '/catalog/specialties') return Promise.resolve({ specialties: clone(testSpecialties) })
    if (path === '/catalog/locations') return Promise.resolve({ locations: clone(testLocations) })
    if (path === '/catalog/time-slots') return Promise.resolve({ timeSlots: clone(testTimeSlots) })
    return Promise.reject(new Error(`GET ${path} no configurado en el mock`))
  })

  api.post.mockImplementation((path, body) => {
    if (path === '/auth/login') {
      const match = mockUsers.find((u) => u.username === body.username && u.password === body.password)
      if (!match) return Promise.reject(new Error('Usuario o contraseña incorrectos.'))
      return Promise.resolve({ token: 'fake-token', user: safeUser(match) })
    }
    if (path === '/appointments') {
      const appointment = { id: `new-${Math.random().toString(36).slice(2)}`, status: 'pendiente', ...body }
      myAppointments.push(appointment)
      return Promise.resolve({ appointment: clone(appointment) })
    }
    return Promise.reject(new Error(`POST ${path} no configurado en el mock`))
  })

  api.patch.mockImplementation((path) => {
    const cancelMatch = path.match(/^\/appointments\/(.+)\/cancel$/)
    if (cancelMatch) {
      const index = myAppointments.findIndex((a) => a.id === cancelMatch[1])
      if (index === -1) return Promise.reject(new Error('Cita no encontrada.'))
      myAppointments[index] = { ...myAppointments[index], status: 'cancelada' }
      return Promise.resolve({ appointment: clone(myAppointments[index]) })
    }
    const readMatch = path.match(/^\/notifications\/(.+)\/read$/)
    if (readMatch) {
      const index = myNotifications.findIndex((n) => n.id === readMatch[1])
      if (index === -1) return Promise.reject(new Error('Notificación no encontrada.'))
      myNotifications[index] = { ...myNotifications[index], read: true }
      return Promise.resolve({ notification: clone(myNotifications[index]) })
    }
    if (path === '/notifications/read-all') {
      for (let i = 0; i < myNotifications.length; i += 1) {
        myNotifications[i] = { ...myNotifications[i], read: true }
      }
      return Promise.resolve({ notifications: clone(myNotifications) })
    }
    return Promise.reject(new Error(`PATCH ${path} no configurado en el mock`))
  })

  return { user, appointments: myAppointments, prescriptions: myPrescriptions, notifications: myNotifications }
}

export function loginAs(username) {
  window.localStorage.setItem(TOKEN_KEY, 'fake-token')
  return setupApiMocks({ username }).user
}

export function renderWithProviders(ui, { route = '/inicio' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ThemeProvider>
        <FontSizeProvider>
          <AuthProvider>
            <AppointmentsProvider>
              <NotificationsProvider>
                <PrescriptionsProvider>{ui}</PrescriptionsProvider>
              </NotificationsProvider>
            </AppointmentsProvider>
          </AuthProvider>
        </FontSizeProvider>
      </ThemeProvider>
    </MemoryRouter>,
  )
}
