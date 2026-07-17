import { describe, expect, it, beforeEach } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from './AuthContext'

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
  })

  it('starts with no user session', async () => {
    renderWithProvider()
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('anonimo'))
  })

  it('logs in with valid credentials and persists to localStorage', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText('login-ok'))

    expect(screen.getByTestId('user')).toHaveTextContent('Priscila del Rocío Ordóñez León')
    expect(window.localStorage.getItem('saludfamiliar.session')).toContain('priscila')
  })

  it('rejects invalid credentials', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText('login-bad'))
    expect(screen.getByTestId('user')).toHaveTextContent('anonimo')
  })

  it('clears the session on logout', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText('login-ok'))
    await userEvent.click(screen.getByText('logout'))

    expect(screen.getByTestId('user')).toHaveTextContent('anonimo')
    expect(window.localStorage.getItem('saludfamiliar.session')).toBeNull()
  })
})
