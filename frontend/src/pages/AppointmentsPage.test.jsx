import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppointmentsPage from './AppointmentsPage'
import { renderWithProviders, setupApiMocks } from '../test-utils'
import { api } from '../utils/apiClient'

jest.mock('../utils/apiClient')

describe('AppointmentsPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('splits appointments into upcoming and past sections', async () => {
    window.localStorage.setItem('saludfamiliar.token', 'fake-token')
    setupApiMocks({
      username: 'priscila',
      appointments: [
        {
          id: 'a1',
          userId: 'u1',
          specialty: 'Endocrinología',
          doctor: 'Dra. Vintimilla',
          date: '2099-01-01',
          time: '09:00',
          location: 'Hospital',
          status: 'confirmada',
        },
        {
          id: 'a2',
          userId: 'u1',
          specialty: 'Oftalmología',
          doctor: 'Dr. Peralta',
          date: '2000-01-01',
          time: '09:00',
          location: 'Hospital',
          status: 'confirmada',
        },
      ],
    })

    renderWithProviders(<AppointmentsPage />, { route: '/citas' })

    expect(screen.getByText('Próximas')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Endocrinología')).toBeInTheDocument())
    expect(screen.getByText('Anteriores')).toBeInTheDocument()
    expect(screen.getByText('Oftalmología')).toBeInTheDocument()
  })

  it('shows an empty state when there are no upcoming appointments', async () => {
    window.localStorage.setItem('saludfamiliar.token', 'fake-token')
    setupApiMocks({ username: 'priscila', appointments: [] })

    renderWithProviders(<AppointmentsPage />, { route: '/citas' })

    await waitFor(() =>
      expect(screen.getByText('No tienes citas próximas agendadas.')).toBeInTheDocument(),
    )
  })

  it('cancels an appointment after the user confirms', async () => {
    window.localStorage.setItem('saludfamiliar.token', 'fake-token')
    setupApiMocks({
      username: 'priscila',
      appointments: [
        {
          id: 'a1',
          userId: 'u1',
          specialty: 'Endocrinología',
          doctor: 'Dra. Vintimilla',
          date: '2099-01-01',
          time: '09:00',
          location: 'Hospital',
          status: 'confirmada',
        },
      ],
    })
    jest.spyOn(window, 'confirm').mockReturnValue(true)

    renderWithProviders(<AppointmentsPage />, { route: '/citas' })
    const cancelButton = await screen.findByRole('button', { name: 'Cancelar cita' })
    await userEvent.click(cancelButton)

    await waitFor(() => expect(screen.getByText('Cancelada')).toBeInTheDocument())
    window.confirm.mockRestore()
  })

  it('shows an error message when cancelling fails', async () => {
    window.localStorage.setItem('saludfamiliar.token', 'fake-token')
    setupApiMocks({
      username: 'priscila',
      appointments: [
        {
          id: 'a1',
          userId: 'u1',
          specialty: 'Endocrinología',
          doctor: 'Dra. Vintimilla',
          date: '2099-01-01',
          time: '09:00',
          location: 'Hospital',
          status: 'confirmada',
        },
      ],
    })
    jest.spyOn(window, 'confirm').mockReturnValue(true)
    api.patch.mockRejectedValueOnce(new Error('Network error'))

    renderWithProviders(<AppointmentsPage />, { route: '/citas' })
    const cancelButton = await screen.findByRole('button', { name: 'Cancelar cita' })
    await userEvent.click(cancelButton)

    expect(await screen.findByRole('alert')).toHaveTextContent(/no se pudo cancelar/i)
    window.confirm.mockRestore()
  })
})
