import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from './AuthContext'
import { setupApiMocks } from '../test-utils'

jest.mock('../utils/apiClient')

function Probe() {
  const { user, login, logout } = useAuth()
  return (
    <div>
      <p data-testid="user">{user ? user.name : 'anonimo'}</p>
      <button onClick={() => login('priscila', 'demo1234')}>login-ok</button>
      <button onClick={() => login('priscila', 'wrong')}>login-bad</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

function renderWithProvider() {
  return render(
    <AuthProvider>
      <Probe />
    </AuthProvider>,
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
    setupApiMocks({ username: 'priscila' })
  })

  it('starts with no user session', async () => {
    renderWithProvider()
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('anonimo'))
  })

  it('logs in with valid credentials and persists the token', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText('login-ok'))

    await waitFor(() =>
      expect(screen.getByTestId('user')).toHaveTextContent('Priscila del Rocío Ordóñez León'),
    )
    expect(window.localStorage.getItem('saludfamiliar.token')).toBe('fake-token')
  })

  it('rejects invalid credentials', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText('login-bad'))
    expect(screen.getByTestId('user')).toHaveTextContent('anonimo')
  })

  it('clears the session on logout', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText('login-ok'))
    await waitFor(() => expect(screen.getByTestId('user')).not.toHaveTextContent('anonimo'))

    await userEvent.click(screen.getByText('logout'))

    expect(screen.getByTestId('user')).toHaveTextContent('anonimo')
    expect(window.localStorage.getItem('saludfamiliar.token')).toBeNull()
  })

  it('restores the cached user when /auth/me is unreachable (offline)', async () => {
    window.localStorage.setItem('saludfamiliar.token', 'fake-token')
    window.localStorage.setItem(
      'saludfamiliar.session',
      JSON.stringify({ id: 'u1', name: 'Priscila del Rocío Ordóñez León' }),
    )
    const { api } = require('../utils/apiClient')
    api.get.mockRejectedValueOnce(new Error('Network error'))

    renderWithProvider()

    await waitFor(() =>
      expect(screen.getByTestId('user')).toHaveTextContent('Priscila del Rocío Ordóñez León'),
    )
  })
})
