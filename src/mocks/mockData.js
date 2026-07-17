// Datos simulados basados en los personas reales documentados en la Fase 1
// (investigación de usuarios). Sirven como "backend" mock para esta entrega.

export const mockUsers = [
  {
    id: 'u1',
    username: 'priscila',
    password: 'demo1234',
    name: 'Priscila del Rocío Ordóñez León',
    age: 63,
    conditions: ['Diabetes'],
    accessibility: ['Usa lentes'],
    avatarInitials: 'PO',
  },
  {
    id: 'u2',
    username: 'fernando',
    password: 'demo1234',
    name: 'José Fernando Gómez',
    age: 66,
    conditions: ['Diabetes'],
    accessibility: ['Usa lentes'],
    avatarInitials: 'JG',
  },
  {
    id: 'u3',
    username: 'augusto',
    password: 'demo1234',
    name: 'Augusto De La A.',
    age: 70,
    conditions: ['Artritis', 'Hígado graso'],
    accessibility: [],
    avatarInitials: 'AA',
  },
  {
    id: 'u4',
    username: 'belen',
    password: 'demo1234',
    name: 'Belén Sharay Gómez Ordóñez',
    age: 71,
    conditions: ['Diabetes', 'Azúcar elevada'],
    accessibility: ['Aparato auditivo'],
    avatarInitials: 'BG',
  },
]

export const mockAppointments = [
  {
    id: 'a1',
    userId: 'u1',
    specialty: 'Endocrinología',
    doctor: 'Dra. Marcela Vintimilla',
    date: '2026-07-22',
    time: '09:30',
    location: 'Hospital José Carrasco Arteaga',
    status: 'confirmada',
  },
  {
    id: 'a2',
    userId: 'u1',
    specialty: 'Oftalmología',
    doctor: 'Dr. Iván Peralta',
    date: '2026-08-05',
    time: '11:00',
    location: 'Centro de Especialidades Sur',
    status: 'pendiente',
  },
  {
    id: 'a3',
    userId: 'u2',
    specialty: 'Endocrinología',
    doctor: 'Dra. Marcela Vintimilla',
    date: '2026-07-25',
    time: '10:15',
    location: 'Hospital José Carrasco Arteaga',
    status: 'confirmada',
  },
  {
    id: 'a4',
    userId: 'u3',
    specialty: 'Reumatología',
    doctor: 'Dr. Patricio Cárdenas',
    date: '2026-07-30',
    time: '15:00',
    location: 'Clínica Santa Ana',
    status: 'confirmada',
  },
  {
    id: 'a5',
    userId: 'u4',
    specialty: 'Otorrinolaringología',
    doctor: 'Dra. Gabriela Muñoz',
    date: '2026-08-01',
    time: '08:45',
    location: 'Hospital Vicente Corral Moscoso',
    status: 'pendiente',
  },
]

export const mockPrescriptions = [
  {
    id: 'r1',
    userId: 'u1',
    title: 'Metformina 850mg',
    doctor: 'Dra. Marcela Vintimilla',
    date: '2026-06-10',
    instructions: 'Tomar 1 tableta cada 12 horas, junto con alimentos.',
    medications: [
      { name: 'Metformina 850mg', dose: '1 tableta', frequency: 'Cada 12 horas', duration: '30 días' },
    ],
  },
  {
    id: 'r2',
    userId: 'u2',
    title: 'Glibenclamida 5mg',
    doctor: 'Dra. Marcela Vintimilla',
    date: '2026-06-15',
    instructions: 'Tomar 1 tableta antes del desayuno.',
    medications: [
      { name: 'Glibenclamida 5mg', dose: '1 tableta', frequency: 'Una vez al día', duration: '30 días' },
    ],
  },
  {
    id: 'r3',
    userId: 'u3',
    title: 'Diclofenaco 50mg',
    doctor: 'Dr. Patricio Cárdenas',
    date: '2026-06-20',
    instructions: 'Tomar solo en caso de dolor articular, máximo 2 al día.',
    medications: [
      { name: 'Diclofenaco 50mg', dose: '1 tableta', frequency: 'Cada 12 horas (si hay dolor)', duration: '10 días' },
    ],
  },
  {
    id: 'r4',
    userId: 'u4',
    title: 'Losartán 50mg',
    doctor: 'Dra. Gabriela Muñoz',
    date: '2026-06-18',
    instructions: 'Tomar 1 tableta en la mañana, con un vaso de agua.',
    medications: [
      { name: 'Losartán 50mg', dose: '1 tableta', frequency: 'Una vez al día', duration: '30 días' },
    ],
  },
]

export const mockNotifications = [
  {
    id: 'n1',
    userId: 'u1',
    title: 'Recordatorio de cita',
    message: 'Tu cita de Endocrinología es mañana a las 09:30.',
    date: '2026-07-21',
    read: false,
  },
  {
    id: 'n2',
    userId: 'u1',
    title: 'Receta actualizada',
    message: 'La Dra. Vintimilla actualizó tu receta de Metformina.',
    date: '2026-06-10',
    read: true,
  },
  {
    id: 'n3',
    userId: 'u2',
    title: 'Recordatorio de cita',
    message: 'Tu cita de Endocrinología es en 3 días.',
    date: '2026-07-22',
    read: false,
  },
]
