import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { AppointmentsProvider } from './context/AppointmentsContext'
import { NotificationsProvider } from './context/NotificationsContext'
import RequireAuth from './routes/RequireAuth'
import AppLayout from './organisms/AppLayout'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AppointmentsPage from './pages/AppointmentsPage'
import ScheduleAppointmentPage from './pages/ScheduleAppointmentPage'
import PrescriptionsPage from './pages/PrescriptionsPage'
import PrescriptionDetailPage from './pages/PrescriptionDetailPage'
import NotificationsPage from './pages/NotificationsPage'
import ProfilePage from './pages/ProfilePage'
import OfflinePage from './pages/OfflinePage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppointmentsProvider>
          <NotificationsProvider>
            <a href="#main-content" className="skip-link">
              Saltar al contenido principal
            </a>
            <Routes>
              <Route path="/" element={<Navigate to="/inicio" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/offline" element={<OfflinePage />} />
              <Route
                element={
                  <RequireAuth>
                    <AppLayout />
                  </RequireAuth>
                }
              >
                <Route path="/inicio" element={<HomePage />} />
                <Route path="/citas" element={<AppointmentsPage />} />
                <Route path="/agendar" element={<ScheduleAppointmentPage />} />
                <Route path="/recetas" element={<PrescriptionsPage />} />
                <Route path="/recetas/:id" element={<PrescriptionDetailPage />} />
                <Route path="/notificaciones" element={<NotificationsPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </NotificationsProvider>
        </AppointmentsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
