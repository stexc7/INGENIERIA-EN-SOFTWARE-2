const specialties = [
  { id: 'endocrinologia', name: 'Endocrinología', doctor: 'Dra. Marcela Vintimilla' },
  { id: 'oftalmologia', name: 'Oftalmología', doctor: 'Dr. Iván Peralta' },
  { id: 'reumatologia', name: 'Reumatología', doctor: 'Dr. Patricio Cárdenas' },
  { id: 'otorrino', name: 'Otorrinolaringología', doctor: 'Dra. Gabriela Muñoz' },
  { id: 'medicina-general', name: 'Medicina General', doctor: 'Dr. Andrés Salinas' },
  { id: 'cardiologia', name: 'Cardiología', doctor: 'Dra. Lucía Torres' },
]

const locations = [
  'Hospital José Carrasco Arteaga',
  'Hospital Vicente Corral Moscoso',
  'Centro de Especialidades Sur',
  'Clínica Santa Ana',
]

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
]

function getSpecialties(req, res) {
  return res.json({ specialties })
}

function getLocations(req, res) {
  return res.json({ locations })
}

function getTimeSlots(req, res) {
  return res.json({ timeSlots })
}

module.exports = { getSpecialties, getLocations, getTimeSlots }
