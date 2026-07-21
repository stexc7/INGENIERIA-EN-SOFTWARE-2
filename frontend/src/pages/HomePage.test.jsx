import { describe, expect, it, beforeEach } from '@jest/globals'
import { screen } from '@testing-library/react'
import HomePage from './HomePage'
import { renderWithProviders, loginAs } from '../test-utils'

describe('HomePage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("shows the logged-in user's next appointment", () => {
    loginAs('priscila')
    renderWithProviders(<HomePage />)
    expect(screen.getByText('Tu próxima cita')).toBeInTheDocument()
    expect(screen.getByText('Endocrinología')).toBeInTheDocument()
  })

  it('shows an empty state when the user has no prescriptions', () => {
    loginAs('augusto')
    window.localStorage.setItem(
      'saludfamiliar.appointments',
      JSON.stringify([]),
    )
    renderWithProviders(<HomePage />)
    expect(screen.getByText('No tienes citas próximas.')).toBeInTheDocument()
  })
})
