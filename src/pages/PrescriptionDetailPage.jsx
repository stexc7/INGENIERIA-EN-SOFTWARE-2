import { Link, Navigate, useParams } from 'react-router-dom'
import { mockPrescriptions } from '../mocks/mockData'
import { formatDate } from '../utils/dataHelpers'
import Icon from '../atoms/Icon'
import './PrescriptionDetailPage.css'

function PrescriptionDetailPage() {
  const { id } = useParams()
  const prescription = mockPrescriptions.find((rx) => rx.id === id)

  if (!prescription) {
    return <Navigate to="/recetas" replace />
  }

  const { title, doctor, date, instructions, medications } = prescription

  return (
    <div className="prescription-detail">
      <Link to="/recetas" className="prescription-detail__back">
        <Icon name="chevron-right" size={18} style={{ transform: 'rotate(180deg)' }} />
        Volver a mis recetas
      </Link>

      <div className="prescription-detail__icon">
        <Icon name="pill" size={28} />
      </div>
      <h2>{title}</h2>
      <p className="prescription-detail__meta">
        {doctor} · {formatDate(date)}
      </p>

      <section aria-labelledby="instructions-heading" className="prescription-detail__section">
        <h3 id="instructions-heading">Indicaciones</h3>
        <p>{instructions}</p>
      </section>

      <section aria-labelledby="medications-heading" className="prescription-detail__section">
        <h3 id="medications-heading">Medicamentos</h3>
        <ul className="prescription-detail__meds">
          {medications.map((med) => (
            <li key={med.name}>
              <p className="prescription-detail__med-name">{med.name}</p>
              <dl className="prescription-detail__med-grid">
                <div>
                  <dt>Dosis</dt>
                  <dd>{med.dose}</dd>
                </div>
                <div>
                  <dt>Frecuencia</dt>
                  <dd>{med.frequency}</dd>
                </div>
                <div>
                  <dt>Duración</dt>
                  <dd>{med.duration}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default PrescriptionDetailPage
