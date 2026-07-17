import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import AppointmentCard from './AppointmentCard'

const appointment = {
  specialty: 'Endocrinología',
  doctor: 'Dra. Marcela Vintimilla',
  date: '2026-07-22',
  time: '09:30',
  location: 'Hospital José Carrasco Arteaga',
  status: 'confirmada',
}

describe('AppointmentCard', () => {
  it('renders the appointment details', () => {
    render(<AppointmentCard appointment={appointment} />)
    expect(screen.getByText('Endocrinología')).toBeInTheDocument()
    expect(screen.getByText('Dra. Marcela Vintimilla')).toBeInTheDocument()
    expect(screen.getByText('09:30')).toBeInTheDocument()
    expect(screen.getByText('Hospital José Carrasco Arteaga')).toBeInTheDocument()
  })

  it('shows the human-readable status label', () => {
    render(<AppointmentCard appointment={appointment} />)
    expect(screen.getByText('Confirmada')).toBeInTheDocument()
  })

  it('falls back to the raw status for an unknown value', () => {
    render(<AppointmentCard appointment={{ ...appointment, status: 'reprogramada' }} />)
    expect(screen.getByText('reprogramada')).toBeInTheDocument()
  })
})
