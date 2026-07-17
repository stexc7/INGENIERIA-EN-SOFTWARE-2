import { describe, expect, it, beforeEach } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfilePage from './ProfilePage'
import { renderWithProviders, loginAs } from '../test-utils'

describe('ProfilePage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("shows the logged-in user's info", () => {
    loginAs('belen')
    renderWithProviders(<ProfilePage />, { route: '/perfil' })
    expect(screen.getByText('Belén Sharay Gómez Ordóñez')).toBeInTheDocument()
    expect(screen.getByText('Diabetes')).toBeInTheDocument()
    expect(screen.getByText('Aparato auditivo')).toBeInTheDocument()
  })

  it('logs the user out when clicking cerrar sesión', async () => {
    loginAs('belen')
    renderWithProviders(<ProfilePage />, { route: '/perfil' })

    await userEvent.click(screen.getByRole('button', { name: /cerrar sesión/i }))

    expect(window.localStorage.getItem('saludfamiliar.session')).toBeNull()
  })
})
