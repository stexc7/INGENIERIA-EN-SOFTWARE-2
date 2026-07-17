import { describe, expect, it, beforeEach } from '@jest/globals'
import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScheduleAppointmentPage from './ScheduleAppointmentPage'
import { renderWithProviders, loginAs } from '../test-utils'

describe('ScheduleAppointmentPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
    loginAs('priscila')
  })

  it('walks through the 3 steps and creates an appointment', async () => {
    renderWithProviders(<ScheduleAppointmentPage />, { route: '/agendar' })

    // Paso 1: especialidad
    await userEvent.click(screen.getByText('Cardiología'))
    await userEvent.click(screen.getByRole('button', { name: 'Continuar' }))

    // Paso 2: fecha, hora y lugar
    fireEvent.change(screen.getByLabelText(/^Fecha/), { target: { value: '2099-01-09' } })
    await userEvent.selectOptions(screen.getByLabelText(/^Hora/), '10:00')
    await userEvent.selectOptions(screen.getByLabelText(/^Lugar/), 'Clínica Santa Ana')
    await userEvent.click(screen.getByRole('button', { name: 'Continuar' }))

    // Paso 3: confirmar
    expect(screen.getByText('Revisa tu cita')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Confirmar cita' }))

    const stored = JSON.parse(window.localStorage.getItem('saludfamiliar.appointments'))
    const created = stored.find((appt) => appt.specialty === 'Cardiología')
    expect(created).toBeDefined()
    expect(created.status).toBe('pendiente')
  })

  it('keeps the continue button disabled until a specialty is chosen', () => {
    renderWithProviders(<ScheduleAppointmentPage />, { route: '/agendar' })
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled()
  })
})
