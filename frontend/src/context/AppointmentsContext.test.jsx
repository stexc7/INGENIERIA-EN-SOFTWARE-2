import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useAppointments } from './AppointmentsContext'
import { renderWithProviders, loginAs } from '../test-utils'

jest.mock('../utils/apiClient')

function Probe() {
  const { appointments, addAppointment, cancelAppointment } = useAppointments()
  return (
    <div>
      <p data-testid="count">{appointments.length}</p>
      <button
        onClick={() =>
          addAppointment({
            specialty: 'Cardiología',
            doctor: 'Dra. Lucía Torres',
            date: '2026-09-01',
            time: '10:00',
            location: 'Clínica Santa Ana',
          })
        }
      >
        add
      </button>
      <button onClick={() => cancelAppointment(appointments[0]?.id)}>cancel-first</button>
    </div>
  )
}

describe('AppointmentsContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("loads the user's appointments from the API on mount", async () => {
    loginAs('priscila')
    renderWithProviders(<Probe />)

    await waitFor(() => expect(Number(screen.getByTestId('count').textContent)).toBeGreaterThan(0))
  })

  it('adds a new appointment with status pendiente', async () => {
    loginAs('priscila')
    renderWithProviders(<Probe />)
    await waitFor(() => expect(Number(screen.getByTestId('count').textContent)).toBeGreaterThan(0))
    const initialCount = Number(screen.getByTestId('count').textContent)

    await userEvent.click(screen.getByText('add'))

    await waitFor(() => expect(Number(screen.getByTestId('count').textContent)).toBe(initialCount + 1))
  })

  it('cancels an existing appointment', async () => {
    loginAs('priscila')
    renderWithProviders(<Probe />)
    await waitFor(() => expect(Number(screen.getByTestId('count').textContent)).toBeGreaterThan(0))

    await userEvent.click(screen.getByText('cancel-first'))

    await waitFor(() => {
      const stored = JSON.parse(window.localStorage.getItem('saludfamiliar.appointments.cache'))
      expect(stored[0].status).toBe('cancelada')
    })
  })
})
