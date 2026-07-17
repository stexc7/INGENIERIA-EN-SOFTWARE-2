import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../context/AppointmentsContext'
import { specialties, locations, timeSlots } from '../mocks/catalog'
import { formatDate } from '../utils/dataHelpers'
import StepIndicator from '../molecules/StepIndicator'
import RadioCard from '../atoms/RadioCard'
import Select from '../atoms/Select'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import './ScheduleAppointmentPage.css'

const STEPS = ['Especialidad', 'Fecha y hora', 'Confirmar']
const today = new Date().toISOString().slice(0, 10)

function ScheduleAppointmentPage() {
  const { user } = useAuth()
  const { addAppointment } = useAppointments()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [specialtyId, setSpecialtyId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')

  const selectedSpecialty = specialties.find((item) => item.id === specialtyId)

  const canContinueStep1 = Boolean(specialtyId)
  const canContinueStep2 = Boolean(date && time && location)

  function goNext() {
    setStep((current) => Math.min(current + 1, STEPS.length))
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 1))
  }

  function handleConfirm() {
    addAppointment({
      userId: user.id,
      specialty: selectedSpecialty.name,
      doctor: selectedSpecialty.doctor,
      date,
      time,
      location,
    })
    navigate('/citas', { state: { justScheduled: true } })
  }

  return (
    <div className="schedule-page">
      <StepIndicator steps={STEPS} currentStep={step} />

      {step === 1 && (
        <fieldset className="schedule-page__fieldset">
          <legend>¿Con qué especialidad quieres agendar?</legend>
          <div className="schedule-page__options">
            {specialties.map((item) => (
              <RadioCard
                key={item.id}
                name="specialty"
                value={item.id}
                checked={specialtyId === item.id}
                onChange={() => setSpecialtyId(item.id)}
                label={item.name}
                description={item.doctor}
              />
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="schedule-page__fieldset">
          <legend>Elige fecha, hora y lugar</legend>
          <Input
            id="appointment-date"
            label="Fecha"
            type="date"
            min={today}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
          <Select
            id="appointment-time"
            label="Hora"
            placeholder="Selecciona una hora"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            options={timeSlots.map((slot) => ({ value: slot, label: slot }))}
            required
          />
          <Select
            id="appointment-location"
            label="Lugar"
            placeholder="Selecciona un lugar"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            options={locations.map((place) => ({ value: place, label: place }))}
            required
          />
        </fieldset>
      )}

      {step === 3 && selectedSpecialty && (
        <div className="schedule-page__summary">
          <h2>Revisa tu cita</h2>
          <dl>
            <div>
              <dt>Especialidad</dt>
              <dd>{selectedSpecialty.name}</dd>
            </div>
            <div>
              <dt>Médico</dt>
              <dd>{selectedSpecialty.doctor}</dd>
            </div>
            <div>
              <dt>Fecha</dt>
              <dd>{formatDate(date)}</dd>
            </div>
            <div>
              <dt>Hora</dt>
              <dd>{time}</dd>
            </div>
            <div>
              <dt>Lugar</dt>
              <dd>{location}</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="schedule-page__actions">
        {step > 1 && (
          <Button variant="secondary" onClick={goBack}>
            Atrás
          </Button>
        )}
        {step < 3 && (
          <Button
            onClick={goNext}
            disabled={step === 1 ? !canContinueStep1 : !canContinueStep2}
            fullWidth={step === 1}
          >
            Continuar
          </Button>
        )}
        {step === 3 && <Button onClick={handleConfirm}>Confirmar cita</Button>}
      </div>
    </div>
  )
}

export default ScheduleAppointmentPage
