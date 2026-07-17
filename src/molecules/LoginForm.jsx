import { useState } from 'react'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import './LoginForm.css'

function LoginForm({ onSubmit, isSubmitting, formError }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)

  const usernameError = touched && !username.trim() ? 'Ingresa tu usuario.' : null
  const passwordError = touched && !password ? 'Ingresa tu contraseña.' : null

  function handleSubmit(event) {
    event.preventDefault()
    setTouched(true)
    if (!username.trim() || !password) return
    onSubmit({ username, password })
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <Input
        id="username"
        label="Usuario"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        autoComplete="username"
        error={usernameError}
        required
      />
      <Input
        id="password"
        label="Contraseña"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="current-password"
        error={passwordError}
        required
      />
      {formError && (
        <p className="login-form__error" role="alert">
          {formError}
        </p>
      )}
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Ingresando…' : 'Ingresar'}
      </Button>
    </form>
  )
}

export default LoginForm
