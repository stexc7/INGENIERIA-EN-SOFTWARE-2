import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { Routes, Route } from 'react-router-dom'
import { screen } from '@testing-library/react'
import AppLayout from './AppLayout'
import { renderWithProviders, loginAs } from '../test-utils'

jest.mock('../utils/apiClient')

describe('AppLayout', () => {
  beforeEach(() => {
    window.localStorage.clear()
    loginAs('priscila')
  })

  it('renders the header, the nested route content and the bottom navigation', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/inicio" element={<AppLayout />}>
          <Route index element={<p>Contenido de inicio</p>} />
        </Route>
      </Routes>,
      { route: '/inicio' },
    )

    expect(await screen.findByText('Priscila')).toBeInTheDocument()
    expect(screen.getByText('Contenido de inicio')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /navegación principal/i })).toBeInTheDocument()
  })
})
