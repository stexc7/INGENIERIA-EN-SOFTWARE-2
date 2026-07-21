import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PrescriptionsPage from './PrescriptionsPage'
import { renderWithProviders, loginAs } from '../test-utils'

jest.mock('../utils/apiClient')

describe('PrescriptionsPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("lists the user's prescriptions", async () => {
    loginAs('priscila')
    renderWithProviders(<PrescriptionsPage />, { route: '/recetas' })
    expect(await screen.findByText('Metformina 850mg')).toBeInTheDocument()
  })

  it('shows a different prescription for another user', async () => {
    loginAs('belen')
    renderWithProviders(<PrescriptionsPage />, { route: '/recetas' })
    expect(await screen.findByText('Losartán 50mg')).toBeInTheDocument()
  })

  it('is clickable and does not throw when opening a prescription', async () => {
    loginAs('priscila')
    renderWithProviders(<PrescriptionsPage />, { route: '/recetas' })
    const item = await screen.findByRole('button', { name: /Metformina/i })
    await userEvent.click(item)
  })

  it('filters the list as the user types in the search box', async () => {
    loginAs('priscila')
    renderWithProviders(<PrescriptionsPage />, { route: '/recetas' })

    await screen.findByText('Metformina 850mg')
    await userEvent.type(screen.getByLabelText('Buscar receta'), 'metformina')
    expect(screen.getByText('Metformina 850mg')).toBeInTheDocument()
  })

  it('shows a no-results message when the search does not match anything', async () => {
    loginAs('priscila')
    renderWithProviders(<PrescriptionsPage />, { route: '/recetas' })

    await screen.findByText('Metformina 850mg')
    await userEvent.type(screen.getByLabelText('Buscar receta'), 'algo-que-no-existe')
    expect(screen.getByText('No se encontraron recetas con esa búsqueda.')).toBeInTheDocument()
  })
})
