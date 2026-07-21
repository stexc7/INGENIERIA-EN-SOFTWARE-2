import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from './LoginPage'
import { renderWithProviders, setupApiMocks } from '../test-utils'

jest.mock('../utils/apiClient')

describe('LoginPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
    setupApiMocks({ username: 'priscila' })
  })

  it('logs in with valid credentials and redirects', async () => {
    renderWithProviders(<LoginPage />, { route: '/login' })

    await userEvent.type(screen.getByLabelText(/^Usuario/), 'priscila')
    await userEvent.type(screen.getByLabelText(/^Contraseña/), 'demo1234')
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    await waitFor(() => expect(window.localStorage.getItem('saludfamiliar.session')).toContain('priscila'))
  })

  it('shows an error with invalid credentials', async () => {
    renderWithProviders(<LoginPage />, { route: '/login' })

    await userEvent.type(screen.getByLabelText(/^Usuario/), 'priscila')
    await userEvent.type(screen.getByLabelText(/^Contraseña/), 'incorrecta')
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/incorrectos/i)
  })
})
