import { describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('shows validation errors when submitted empty', async () => {
    const handleSubmit = jest.fn()
    render(<LoginForm onSubmit={handleSubmit} isSubmitting={false} formError={null} />)

    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(screen.getByText('Ingresa tu usuario.')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu contraseña.')).toBeInTheDocument()
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with the entered credentials', async () => {
    const handleSubmit = jest.fn()
    render(<LoginForm onSubmit={handleSubmit} isSubmitting={false} formError={null} />)

    await userEvent.type(screen.getByLabelText(/^Usuario/), 'priscila')
    await userEvent.type(screen.getByLabelText(/^Contraseña/), 'demo1234')
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(handleSubmit).toHaveBeenCalledWith({ username: 'priscila', password: 'demo1234' })
  })

  it('shows the server-side form error', () => {
    render(<LoginForm onSubmit={() => {}} isSubmitting={false} formError="Credenciales inválidas" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Credenciales inválidas')
  })

  it('disables the submit button while submitting', () => {
    render(<LoginForm onSubmit={() => {}} isSubmitting formError={null} />)
    expect(screen.getByRole('button', { name: /ingresando/i })).toBeDisabled()
  })
})
