import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import HomePage from './HomePage'
import { renderWithProviders, loginAs, setupApiMocks } from '../test-utils'

jest.mock('../utils/apiClient')

describe('HomePage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("shows the logged-in user's next appointment", async () => {
    loginAs('priscila')
    renderWithProviders(<HomePage />)

    expect(screen.getByText('Tu próxima cita')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Endocrinología')).toBeInTheDocument())
  })

  it('shows an empty state when the user has no upcoming appointments', async () => {
    window.localStorage.setItem('saludfamiliar.token', 'fake-token')
    setupApiMocks({ username: 'augusto', appointments: [] })

    renderWithProviders(<HomePage />)

    await waitFor(() => expect(screen.getByText('No tienes citas próximas.')).toBeInTheDocument())
  })
})
