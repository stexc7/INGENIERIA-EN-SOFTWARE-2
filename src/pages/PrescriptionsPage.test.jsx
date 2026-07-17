import { describe, expect, it, beforeEach } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PrescriptionsPage from './PrescriptionsPage'
import { renderWithProviders, loginAs } from '../test-utils'

describe('PrescriptionsPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("lists the user's prescriptions", () => {
    loginAs('priscila')
    renderWithProviders(<PrescriptionsPage />, { route: '/recetas' })
    expect(screen.getByText('Metformina 850mg')).toBeInTheDocument()
  })

  it('shows a different prescription for another user', () => {
    loginAs('belen')
    renderWithProviders(<PrescriptionsPage />, { route: '/recetas' })
    expect(screen.getByText('Losartán 50mg')).toBeInTheDocument()
  })

  it('is clickable and does not throw when opening a prescription', async () => {
    loginAs('priscila')
    renderWithProviders(<PrescriptionsPage />, { route: '/recetas' })
    await userEvent.click(screen.getByRole('button', { name: /Metformina/i }))
  })
})
