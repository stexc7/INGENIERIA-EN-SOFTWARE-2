import { describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RadioCard from './RadioCard'

describe('RadioCard', () => {
  it('renders the label and description', () => {
    render(
      <RadioCard
        name="specialty"
        value="cardiologia"
        checked={false}
        onChange={() => {}}
        label="Cardiología"
        description="Dra. Lucía Torres"
      />,
    )
    expect(screen.getByText('Cardiología')).toBeInTheDocument()
    expect(screen.getByText('Dra. Lucía Torres')).toBeInTheDocument()
  })

  it('calls onChange when selected', async () => {
    const handleChange = jest.fn()
    render(
      <RadioCard
        name="specialty"
        value="cardiologia"
        checked={false}
        onChange={handleChange}
        label="Cardiología"
      />,
    )
    await userEvent.click(screen.getByRole('radio'))
    expect(handleChange).toHaveBeenCalled()
  })

  it('reflects the checked state', () => {
    render(
      <RadioCard name="specialty" value="cardiologia" checked onChange={() => {}} label="Cardiología" />,
    )
    expect(screen.getByRole('radio')).toBeChecked()
  })
})
