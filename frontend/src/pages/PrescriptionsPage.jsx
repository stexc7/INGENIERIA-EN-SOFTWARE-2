import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePrescriptions } from '../context/PrescriptionsContext'
import PrescriptionCard from '../molecules/PrescriptionCard'
import Input from '../atoms/Input'
import './PrescriptionsPage.css'

function PrescriptionsPage() {
  const navigate = useNavigate()
  const { prescriptions } = usePrescriptions()
  const [query, setQuery] = useState('')

  const mine = [...prescriptions].sort((a, b) => b.date.localeCompare(a.date))

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = normalizedQuery
    ? mine.filter(
        (rx) =>
          rx.title.toLowerCase().includes(normalizedQuery) ||
          rx.doctor.toLowerCase().includes(normalizedQuery),
      )
    : mine

  return (
    <div className="prescriptions-page">
      <h2 className="visually-hidden">Mis recetas</h2>
      {mine.length > 0 && (
        <Input
          id="prescriptions-search"
          label="Buscar receta"
          placeholder="Nombre del medicamento o doctor"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      )}
      {filtered.length > 0 ? (
        <ul className="prescriptions-page__list">
          {filtered.map((rx) => (
            <li key={rx.id}>
              <PrescriptionCard prescription={rx} onOpen={() => navigate(`/recetas/${rx.id}`)} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="prescriptions-page__empty">
          {mine.length > 0
            ? 'No se encontraron recetas con esa búsqueda.'
            : 'Aún no tienes recetas registradas.'}
        </p>
      )}
    </div>
  )
}

export default PrescriptionsPage
