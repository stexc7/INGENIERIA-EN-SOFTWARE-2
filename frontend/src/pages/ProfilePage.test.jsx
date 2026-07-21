import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfilePage from './ProfilePage'
import { renderWithProviders, loginAs } from '../test-utils'

jest.mock('../utils/apiClient')

describe('ProfilePage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("shows the logged-in user's info", async () => {
    loginAs('belen')
    renderWithProviders(<ProfilePage />, { route: '/perfil' })
    expect(await screen.findByText('Belén Sharay Gómez Ordóñez')).toBeInTheDocument()
    expect(screen.getByText('Diabetes')).toBeInTheDocument()
    expect(screen.getByText('Aparato auditivo')).toBeInTheDocument()
  })

  it('logs the user out when clicking cerrar sesión', async () => {
    loginAs('belen')
    renderWithProviders(<ProfilePage />, { route: '/perfil' })

    const logoutButton = await screen.findByRole('button', { name: /cerrar sesión/i })
    await userEvent.click(logoutButton)

    expect(window.localStorage.getItem('saludfamiliar.session')).toBeNull()
    expect(window.localStorage.getItem('saludfamiliar.token')).toBeNull()
  })
})
