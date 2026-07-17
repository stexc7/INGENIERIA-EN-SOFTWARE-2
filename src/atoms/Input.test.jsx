import { describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input', () => {
  it('associates the label with the input', () => {
    render(<Input label="Usuario" value="" onChange={() => {}} />)
    expect(screen.getByLabelText('Usuario')).toBeInTheDocument()
  })

  it('calls onChange as the user types', async () => {
    const handleChange = jest.fn()
    render(<Input label="Usuario" value="" onChange={handleChange} />)
    await userEvent.type(screen.getByLabelText('Usuario'), 'a')
    expect(handleChange).toHaveBeenCalled()
  })

  it('shows an error message with role alert', () => {
    render(<Input label="Usuario" value="" onChange={() => {}} error="Campo requerido" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Campo requerido')
    expect(screen.getByLabelText('Usuario')).toHaveAttribute('aria-invalid', 'true')
  })
})
