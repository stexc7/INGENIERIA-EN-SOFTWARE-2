import Icon from '../atoms/Icon'
import { formatDate } from '../utils/dataHelpers'
import './PrescriptionCard.css'

function PrescriptionCard({ prescription, onOpen }) {
  const { title, doctor, date } = prescription

  return (
    <button type="button" className="prescription-card" onClick={onOpen}>
      <span className="prescription-card__icon">
        <Icon name="pill" size={22} />
      </span>
      <span className="prescription-card__body">
        <span className="prescription-card__title">{title}</span>
        <span className="prescription-card__meta">
          {doctor} · {formatDate(date)}
        </span>
      </span>
      <Icon name="chevron-right" size={20} />
    </button>
  )
}

export default PrescriptionCard
