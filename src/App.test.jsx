import { describe, expect, it, beforeEach } from '@jest/globals'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import App from './App'
import { loginAs } from './test-utils'

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows the login screen when there is no session', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: 'Salud Familiar' })).toBeInTheDocument()
  })

  it('redirects an authenticated user from / to inicio', () => {
    loginAs('priscila')
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText('Tu próxima cita')).toBeInTheDocument()
  })
})
