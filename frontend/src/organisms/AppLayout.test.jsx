import { describe, expect, it, beforeEach } from '@jest/globals'
import { Routes, Route } from 'react-router-dom'
import { screen } from '@testing-library/react'
import AppLayout from './AppLayout'
import { renderWithProviders, loginAs } from '../test-utils'

describe('AppLayout', () => {
  beforeEach(() => {
    window.localStorage.clear()
    loginAs('priscila')
  })

  it('renders the header, the nested route content and the bottom navigation', () => {
    renderWithProviders(
      <Routes>
        <Route path="/inicio" element={<AppLayout />}>
          <Route index element={<p>Contenido de inicio</p>} />
        </Route>
      </Routes>,
      { route: '/inicio' },
    )

    expect(screen.getByText('Priscila')).toBeInTheDocument()
    expect(screen.getByText('Contenido de inicio')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /navegación principal/i })).toBeInTheDocument()
  })
})
