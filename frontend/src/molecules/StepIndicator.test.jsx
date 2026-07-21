import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import StepIndicator from './StepIndicator'

describe('StepIndicator', () => {
  const steps = ['Especialidad', 'Fecha y hora', 'Confirmar']

  it('marks the current step with aria-current', () => {
    render(<StepIndicator steps={steps} currentStep={2} />)
    const current = screen.getByText('Fecha y hora').closest('li')
    expect(current).toHaveAttribute('aria-current', 'step')
  })

  it('marks previous steps as done with a checkmark', () => {
    render(<StepIndicator steps={steps} currentStep={2} />)
    const done = screen.getByText('Especialidad').closest('li')
    expect(done).toHaveTextContent('✓')
  })

  it('shows the step number for upcoming steps', () => {
    render(<StepIndicator steps={steps} currentStep={1} />)
    const upcoming = screen.getByText('Confirmar').closest('li')
    expect(upcoming).toHaveTextContent('3')
  })
})
