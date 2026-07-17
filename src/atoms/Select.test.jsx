import { describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Select from './Select'

describe('Select', () => {
  const options = [
    { value: 'a', label: 'Opción A' },
    { value: 'b', label: 'Opción B' },
  ]

  it('renders the placeholder and options', () => {
    render(<Select label="Elige" value="" onChange={() => {}} options={options} placeholder="Elige una" />)
    expect(screen.getByLabelText('Elige')).toBeInTheDocument()
    expect(screen.getByText('Opción A')).toBeInTheDocument()
  })

  it('calls onChange when a new option is selected', async () => {
    const handleChange = jest.fn()
    render(<Select label="Elige" value="" onChange={handleChange} options={options} />)
    await userEvent.selectOptions(screen.getByLabelText('Elige'), 'b')
    expect(handleChange).toHaveBeenCalled()
  })
})
