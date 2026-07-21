import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import App from './App'
import { loginAs } from './test-utils'

jest.mock('./utils/apiClient')

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

  it('redirects an authenticated user from / to inicio', async () => {
    loginAs('priscila')
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByText('Tu próxima cita')).toBeInTheDocument()
  })
})
