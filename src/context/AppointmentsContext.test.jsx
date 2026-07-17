import { describe, expect, it, beforeEach } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppointmentsProvider, useAppointments } from './AppointmentsContext'

function Probe() {
  const { appointments, addAppointment } = useAppointments()
  return (
    <div>
      <p data-testid="count">{appointments.length}</p>
      <button
        onClick={() =>
          addAppointment({
            userId: 'u1',
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
    </div>
  )
}

describe('AppointmentsContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('seeds appointments from mock data on first load', () => {
    render(
      <AppointmentsProvider>
        <Probe />
      </AppointmentsProvider>,
    )
    expect(Number(screen.getByTestId('count').textContent)).toBeGreaterThan(0)
  })

  it('adds a new appointment with a pendiente status and persists it', async () => {
    render(
      <AppointmentsProvider>
        <Probe />
      </AppointmentsProvider>,
    )
    const initialCount = Number(screen.getByTestId('count').textContent)

    await userEvent.click(screen.getByText('add'))

    expect(Number(screen.getByTestId('count').textContent)).toBe(initialCount + 1)
    const stored = JSON.parse(window.localStorage.getItem('saludfamiliar.appointments'))
    const created = stored.find((appt) => appt.specialty === 'Cardiología')
    expect(created.status).toBe('pendiente')
  })
})
