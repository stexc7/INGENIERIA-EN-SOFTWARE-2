import Icon from '../atoms/Icon'
import Badge from '../atoms/Badge'
import Button from '../atoms/Button'
import { formatDate } from '../utils/dataHelpers'
import './AppointmentCard.css'

const STATUS_TONE = {
  confirmada: 'success',
  pendiente: 'warning',
  cancelada: 'danger',
}

const STATUS_LABEL = {
  confirmada: 'Confirmada',
  pendiente: 'Pendiente',
  cancelada: 'Cancelada',
}

function AppointmentCard({ appointment, onCancel }) {
  const { specialty, doctor, date, time, location, status } = appointment

  return (
    <article className="appointment-card">
      <div className="appointment-card__top">
        <h3 className="appointment-card__title">{specialty}</h3>
        <Badge tone={STATUS_TONE[status] || 'info'}>{STATUS_LABEL[status] || status}</Badge>
      </div>
      <p className="appointment-card__doctor">{doctor}</p>
      <ul className="appointment-card__meta">
        <li>
          <Icon name="calendar" size={20} />
          <span>{formatDate(date)}</span>
        </li>
        <li>
          <Icon name="clock" size={20} />
          <span>{time}</span>
        </li>
        <li>
          <Icon name="location" size={20} />
          <span>{location}</span>
        </li>
      </ul>
      {onCancel && status !== 'cancelada' && (
        <Button variant="danger" fullWidth onClick={onCancel}>
          Cancelar cita
        </Button>
      )}
    </article>
  )
}

export default AppointmentCard