import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../context/AppointmentsContext'
import AppointmentCard from '../molecules/AppointmentCard'
import Icon from '../atoms/Icon'
import './AppointmentsPage.css'

function AppointmentsPage() {
  const { user } = useAuth()
  const { appointments, cancelAppointment } = useAppointments()
  const location = useLocation()

  const today = new Date().toISOString().slice(0, 10)
  const mine = appointments.filter((appt) => appt.userId === user?.id)
  const upcoming = mine
    .filter((appt) => appt.date >= today)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  const past = mine
    .filter((appt) => appt.date < today)
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))

  function handleCancel(appointment) {
    const confirmed = window.confirm(
      `¿Seguro que deseas cancelar tu cita de ${appointment.specialty} del ${appointment.date}?`,
    )
    if (confirmed) {
      cancelAppointment(appointment.id)
    }
  }

  return (
    <div className="appointments-page">
      {location.state?.justScheduled && (
        <p className="appointments-page__success" role="status">
          <Icon name="check" size={20} />
          Tu cita fue agendada correctamente.
        </p>
      )}

      <Link to="/agendar" className="appointments-page__cta">
        <Icon name="calendar" size={22} />
        Agendar nueva cita
      </Link>

      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading">Próximas</h2>
        {upcoming.length > 0 ? (
          <ul className="appointments-page__list">
            {upcoming.map((appt) => (
              <li key={appt.id}>
                <AppointmentCard appointment={appt} onCancel={() => handleCancel(appt)} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="appointments-page__empty">No tienes citas próximas agendadas.</p>
        )}
      </section>

      {past.length > 0 && (
        <section aria-labelledby="past-heading">
          <h2 id="past-heading">Anteriores</h2>
          <ul className="appointments-page__list">
            {past.map((appt) => (
              <li key={appt.id}>
                <AppointmentCard appointment={appt} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default AppointmentsPage