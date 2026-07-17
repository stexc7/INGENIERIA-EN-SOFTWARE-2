import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { AuthProvider } from './context/AuthContext'
import { AppointmentsProvider } from './context/AppointmentsContext'
import { NotificationsProvider } from './context/NotificationsContext'
import { mockUsers } from './mocks/mockData'

export function loginAs(username) {
  const found = mockUsers.find((user) => user.username === username)
  const { password: _password, ...safeUser } = found
  window.localStorage.setItem('saludfamiliar.session', JSON.stringify(safeUser))
  return safeUser
}

export function renderWithProviders(ui, { route = '/inicio' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <AppointmentsProvider>
          <NotificationsProvider>{ui}</NotificationsProvider>
        </AppointmentsProvider>
      </AuthProvider>
    </MemoryRouter>,
  )
}
