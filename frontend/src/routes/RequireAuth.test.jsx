import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { Routes, Route } from 'react-router-dom'
import { screen } from '@testing-library/react'
import RequireAuth from './RequireAuth'
import { renderWithProviders, loginAs } from '../test-utils'

jest.mock('../utils/apiClient')

function Protected() {
  return <p>Contenido protegido</p>
}

describe('RequireAuth', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('redirects to /login when there is no session', async () => {
    renderWithProviders(
      <Routes>
        <Route
          path="/inicio"
          element={
            <RequireAuth>
              <Protected />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<p>Pantalla de login</p>} />
      </Routes>,
      { route: '/inicio' },
    )
    expect(await screen.findByText('Pantalla de login')).toBeInTheDocument()
  })

  it('renders the protected content when a session exists', async () => {
    loginAs('priscila')
    renderWithProviders(
      <Routes>
        <Route
          path="/inicio"
          element={
            <RequireAuth>
              <Protected />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<p>Pantalla de login</p>} />
      </Routes>,
      { route: '/inicio' },
    )
    expect(await screen.findByText('Contenido protegido')).toBeInTheDocument()
  })
})
