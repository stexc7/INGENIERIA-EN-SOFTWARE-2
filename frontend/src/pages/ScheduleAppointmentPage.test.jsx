import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScheduleAppointmentPage from './ScheduleAppointmentPage'
import { renderWithProviders, loginAs } from '../test-utils'

jest.mock('../utils/apiClient')

describe('ScheduleAppointmentPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
    loginAs('priscila')
  })

  it('walks through the 3 steps and creates an appointment', async () => {
    renderWithProviders(<ScheduleAppointmentPage />, { route: '/agendar' })

    // Paso 1: especialidad
    await screen.findByText('Cardiología')
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

    await waitFor(() => {
      const stored = JSON.parse(window.localStorage.getItem('saludfamiliar.appointments.cache'))
      const created = stored.find((appt) => appt.specialty === 'Cardiología')
      expect(created).toBeDefined()
      expect(created.status).toBe('pendiente')
    })
  })

  it('keeps the continue button disabled until a specialty is chosen', async () => {
    renderWithProviders(<ScheduleAppointmentPage />, { route: '/agendar' })
    await screen.findByText('Cardiología')
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled()
  })
})
