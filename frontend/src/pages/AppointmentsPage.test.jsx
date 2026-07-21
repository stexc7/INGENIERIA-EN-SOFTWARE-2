import { describe, expect, it, beforeEach } from '@jest/globals'
import { screen } from '@testing-library/react'
import AppointmentsPage from './AppointmentsPage'
import { renderWithProviders, loginAs } from '../test-utils'

describe('AppointmentsPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('splits appointments into upcoming and past sections', () => {
    loginAs('priscila')
    window.localStorage.setItem(
      'saludfamiliar.appointments',
      JSON.stringify([
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
      ]),
    )

    renderWithProviders(<AppointmentsPage />, { route: '/citas' })

    expect(screen.getByText('Próximas')).toBeInTheDocument()
    expect(screen.getByText('Endocrinología')).toBeInTheDocument()
    expect(screen.getByText('Anteriores')).toBeInTheDocument()
    expect(screen.getByText('Oftalmología')).toBeInTheDocument()
  })

  it('shows an empty state when there are no upcoming appointments', () => {
    loginAs('priscila')
    window.localStorage.setItem('saludfamiliar.appointments', JSON.stringify([]))

    renderWithProviders(<AppointmentsPage />, { route: '/citas' })

    expect(screen.getByText('No tienes citas próximas agendadas.')).toBeInTheDocument()
  })
})
