import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import LoginForm from '../molecules/LoginForm'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) {
    const redirectTo = location.state?.from?.pathname || '/inicio'
    return <Navigate to={redirectTo} replace />
  }

  async function handleSubmit({ username, password }) {
    setIsSubmitting(true)
    setFormError(null)
    const result = await login(username, password)
    setIsSubmitting(false)
    if (!result.ok) {
      setFormError(result.error)
      return
    }
    const redirectTo = location.state?.from?.pathname || '/inicio'
    navigate(redirectTo, { replace: true })
  }

  return (
    <main id="main-content" className="login-page">
      <div className="login-page__header">
        <h1>Salud Familiar</h1>
        <p>Ingresa con tu usuario y contraseña para ver tus citas y recetas.</p>
      </div>
      <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} formError={formError} />
      <p className="login-page__hint">
        Usuarios de prueba: <strong>priscila</strong>, <strong>fernando</strong>, <strong>augusto</strong>,{' '}
        <strong>belen</strong> — contraseña <strong>demo1234</strong>
      </p>
    </main>
  )
}

export default LoginPage
