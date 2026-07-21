import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { Routes, Route } from 'react-router-dom'
import { screen } from '@testing-library/react'
import PrescriptionDetailPage from './PrescriptionDetailPage'
import { renderWithProviders, loginAs } from '../test-utils'

jest.mock('../utils/apiClient')

describe('PrescriptionDetailPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
    loginAs('priscila')
  })

  it('renders the medication details for a valid id', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/recetas/:id" element={<PrescriptionDetailPage />} />
      </Routes>,
      { route: '/recetas/r1' },
    )

    expect(await screen.findByText('Metformina 850mg', { selector: 'h2' })).toBeInTheDocument()
    expect(screen.getByText('Cada 12 horas')).toBeInTheDocument()
  })

  it('redirects to /recetas when the prescription does not exist', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/recetas/:id" element={<PrescriptionDetailPage />} />
        <Route path="/recetas" element={<p>Mis recetas</p>} />
      </Routes>,
      { route: '/recetas/no-existe' },
    )

    expect(await screen.findByText('Mis recetas')).toBeInTheDocument()
  })
})
