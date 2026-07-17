import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RequireAuth({ children }) {
  const { user, isReady } = useAuth()
  const location = useLocation()

  if (!isReady) return null

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default RequireAuth
