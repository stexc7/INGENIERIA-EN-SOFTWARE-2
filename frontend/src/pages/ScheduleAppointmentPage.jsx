import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppointments } from '../context/AppointmentsContext'
import { api } from '../utils/apiClient'
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
  const { addAppointment } = useAppointments()
  const navigate = useNavigate()

  const [catalog, setCatalog] = useState(null)
  const [catalogError, setCatalogError] = useState(null)
  const [step, setStep] = useState(1)
  const [specialtyId, setSpecialtyId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [confirmError, setConfirmError] = useState(null)
  const [isConfirming, setIsConfirming] = useState(false)

  useEffect(() => {
    Promise.all([
      api.get('/catalog/specialties'),
      api.get('/catalog/locations'),
      api.get('/catalog/time-slots'),
    ])
      .then(([specialtiesRes, locationsRes, timeSlotsRes]) => {
        setCatalog({
          specialties: specialtiesRes.specialties,
          locations: locationsRes.locations,
          timeSlots: timeSlotsRes.timeSlots,
        })
      })
      .catch(() => {
        setCatalogError('No se pudo cargar la información para agendar. Necesitas conexión a internet.')
      })
  }, [])

  if (catalogError) {
    return (
      <div className="schedule-page">
        <p className="schedule-page__error" role="alert">
          {catalogError}
        </p>
      </div>
    )
  }

  if (!catalog) {
    return (
      <div className="schedule-page">
        <p>Cargando…</p>
      </div>
    )
  }

  const { specialties, locations, timeSlots } = catalog
  const selectedSpecialty = specialties.find((item) => item.id === specialtyId)

  const canContinueStep1 = Boolean(specialtyId)
  const canContinueStep2 = Boolean(date && time && location)

  function goNext() {
    setStep((current) => Math.min(current + 1, STEPS.length))
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 1))
  }

  async function handleConfirm() {
    setConfirmError(null)
    setIsConfirming(true)
    try {
      await addAppointment({
        specialty: selectedSpecialty.name,
        doctor: selectedSpecialty.doctor,
        date,
        time,
        location,
      })
      navigate('/citas', { state: { justScheduled: true } })
    } catch {
      setConfirmError('No se pudo agendar la cita. Revisa tu conexión e intenta de nuevo.')
    } finally {
      setIsConfirming(false)
    }
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

      {confirmError && (
        <p className="schedule-page__error" role="alert">
          {confirmError}
        </p>
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
        {step === 3 && (
          <Button onClick={handleConfirm} disabled={isConfirming}>
            {isConfirming ? 'Confirmando…' : 'Confirmar cita'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ScheduleAppointmentPage
