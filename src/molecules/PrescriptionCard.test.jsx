import { describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PrescriptionCard from './PrescriptionCard'

const prescription = {
  title: 'Losartán 50mg',
  doctor: 'Dra. Gabriela Muñoz',
  date: '2026-06-18',
}

describe('PrescriptionCard', () => {
  it('renders the prescription title and doctor', () => {
    render(<PrescriptionCard prescription={prescription} onOpen={() => {}} />)
    expect(screen.getByText('Losartán 50mg')).toBeInTheDocument()
    expect(screen.getByText(/Dra. Gabriela Muñoz/)).toBeInTheDocument()
  })

  it('calls onOpen when clicked', async () => {
    const handleOpen = jest.fn()
    render(<PrescriptionCard prescription={prescription} onOpen={handleOpen} />)
    await userEvent.click(screen.getByRole('button'))
    expect(handleOpen).toHaveBeenCalledTimes(1)
  })
})
