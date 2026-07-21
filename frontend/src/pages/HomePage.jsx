import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../context/AppointmentsContext'
import { usePrescriptions } from '../context/PrescriptionsContext'
import { getUpcomingAppointment, getLatestPrescription } from '../utils/dataHelpers'
import AppointmentCard from '../molecules/AppointmentCard'
import PrescriptionCard from '../molecules/PrescriptionCard'
import Icon from '../atoms/Icon'
import './HomePage.css'

function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { appointments } = useAppointments()
  const { prescriptions } = usePrescriptions()
  const nextAppointment = getUpcomingAppointment(appointments, user?.id)
  const latestPrescription = getLatestPrescription(prescriptions, user?.id)

  return (
    <div className="home-page">
      <section className="home-page__section" aria-labelledby="next-appt-heading">
        <div className="home-page__section-head">
          <h2 id="next-appt-heading">Tu próxima cita</h2>
          <Link to="/citas" className="home-page__link">
            Ver todas
          </Link>
        </div>
        {nextAppointment ? (
          <AppointmentCard appointment={nextAppointment} />
        ) : (
          <p className="home-page__empty">No tienes citas próximas.</p>
        )}
      </section>

      <Link to="/agendar" className="home-page__cta">
        <Icon name="calendar" size={22} />
        Agendar nueva cita
      </Link>

      <section className="home-page__section" aria-labelledby="latest-rx-heading">
        <div className="home-page__section-head">
          <h2 id="latest-rx-heading">Última receta</h2>
          <Link to="/recetas" className="home-page__link">
            Ver todas
          </Link>
        </div>
        {latestPrescription ? (
          <PrescriptionCard
            prescription={latestPrescription}
            onOpen={() => navigate(`/recetas/${latestPrescription.id}`)}
          />
        ) : (
          <p className="home-page__empty">Aún no tienes recetas registradas.</p>
        )}
      </section>
    </div>
  )
}

export default HomePage
