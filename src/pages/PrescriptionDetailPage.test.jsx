import { describe, expect, it, beforeEach } from '@jest/globals'
import { Routes, Route } from 'react-router-dom'
import { screen } from '@testing-library/react'
import PrescriptionDetailPage from './PrescriptionDetailPage'
import { renderWithProviders, loginAs } from '../test-utils'

describe('PrescriptionDetailPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
    loginAs('priscila')
  })

  it('renders the medication details for a valid id', () => {
    renderWithProviders(
      <Routes>
        <Route path="/recetas/:id" element={<PrescriptionDetailPage />} />
      </Routes>,
      { route: '/recetas/r1' },
    )

    expect(screen.getByText('Metformina 850mg', { selector: 'h2' })).toBeInTheDocument()
    expect(screen.getByText('Cada 12 horas')).toBeInTheDocument()
  })
})
