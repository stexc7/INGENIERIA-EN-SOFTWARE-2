import { describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Ingresar</Button>)
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Continuar</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Continuar' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const handleClick = jest.fn()
    render(
      <Button onClick={handleClick} disabled>
        Continuar
      </Button>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Continuar' }))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
