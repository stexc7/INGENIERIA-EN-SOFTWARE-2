import { describe, expect, it, beforeEach } from '@jest/globals'
import { Routes, Route } from 'react-router-dom'
import { screen } from '@testing-library/react'
import RequireAuth from './RequireAuth'
import { renderWithProviders, loginAs } from '../test-utils'

function Protected() {
  return <p>Contenido protegido</p>
}

describe('RequireAuth', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('redirects to /login when there is no session', () => {
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
    expect(screen.getByText('Pantalla de login')).toBeInTheDocument()
  })

  it('renders the protected content when a session exists', () => {
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
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })
})
