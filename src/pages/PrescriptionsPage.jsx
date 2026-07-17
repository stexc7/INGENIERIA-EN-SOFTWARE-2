import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { mockPrescriptions } from '../mocks/mockData'
import PrescriptionCard from '../molecules/PrescriptionCard'
import './PrescriptionsPage.css'

function PrescriptionsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const mine = mockPrescriptions
    .filter((rx) => rx.userId === user?.id)
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="prescriptions-page">
      <h2 className="visually-hidden">Mis recetas</h2>
      {mine.length > 0 ? (
        <ul className="prescriptions-page__list">
          {mine.map((rx) => (
            <li key={rx.id}>
              <PrescriptionCard prescription={rx} onOpen={() => navigate(`/recetas/${rx.id}`)} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="prescriptions-page__empty">Aún no tienes recetas registradas.</p>
      )}
    </div>
  )
}

export default PrescriptionsPage
