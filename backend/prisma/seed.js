const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const users = [
  {
    id: 'u1',
    username: 'priscila',
    name: 'Priscila del Rocío Ordóñez León',
    age: 63,
    conditions: ['Diabetes'],
    accessibility: ['Usa lentes'],
    avatarInitials: 'PO',
  },
  {
    id: 'u2',
    username: 'fernando',
    name: 'José Fernando Gómez',
    age: 66,
    conditions: ['Diabetes'],
    accessibility: ['Usa lentes'],
    avatarInitials: 'JG',
  },
  {
    id: 'u3',
    username: 'augusto',
    name: 'Augusto De La A.',
    age: 70,
    conditions: ['Artritis', 'Hígado graso'],
    accessibility: [],
    avatarInitials: 'AA',
  },
  {
    id: 'u4',
    username: 'belen',
    name: 'Belén Sharay Gómez Ordóñez',
    age: 71,
    conditions: ['Diabetes', 'Azúcar elevada'],
    accessibility: ['Aparato auditivo'],
    avatarInitials: 'BG',
  },
]

const appointments = [
  {
    userId: 'u1',
    specialty: 'Endocrinología',
    doctor: 'Dra. Marcela Vintimilla',
    date: '2026-07-22',
    time: '09:30',
    location: 'Hospital José Carrasco Arteaga',
    status: 'confirmada',
  },
  {
    userId: 'u1',
    specialty: 'Oftalmología',
    doctor: 'Dr. Iván Peralta',
    date: '2026-08-05',
    time: '11:00',
    location: 'Centro de Especialidades Sur',
    status: 'pendiente',
  },
  {
    userId: 'u2',
    specialty: 'Endocrinología',
    doctor: 'Dra. Marcela Vintimilla',
    date: '2026-07-25',
    time: '10:15',
    location: 'Hospital José Carrasco Arteaga',
    status: 'confirmada',
  },
  {
    userId: 'u3',
    specialty: 'Reumatología',
    doctor: 'Dr. Patricio Cárdenas',
    date: '2026-07-30',
    time: '15:00',
    location: 'Clínica Santa Ana',
    status: 'confirmada',
  },
  {
    userId: 'u4',
    specialty: 'Otorrinolaringología',
    doctor: 'Dra. Gabriela Muñoz',
    date: '2026-08-01',
    time: '08:45',
    location: 'Hospital Vicente Corral Moscoso',
    status: 'pendiente',
  },
]

const prescriptions = [
  {
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
    userId: 'u3',
    title: 'Diclofenaco 50mg',
    doctor: 'Dr. Patricio Cárdenas',
    date: '2026-06-20',
    instructions: 'Tomar solo en caso de dolor articular, máximo 2 al día.',
    medications: [
      {
        name: 'Diclofenaco 50mg',
        dose: '1 tableta',
        frequency: 'Cada 12 horas (si hay dolor)',
        duration: '10 días',
      },
    ],
  },
  {
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

const notifications = [
  {
    userId: 'u1',
    title: 'Recordatorio de cita',
    message: 'Tu cita de Endocrinología es mañana a las 09:30.',
    date: '2026-07-21',
    read: false,
  },
  {
    userId: 'u1',
    title: 'Receta actualizada',
    message: 'La Dra. Vintimilla actualizó tu receta de Metformina.',
    date: '2026-06-10',
    read: true,
  },
  {
    userId: 'u2',
    title: 'Recordatorio de cita',
    message: 'Tu cita de Endocrinología es en 3 días.',
    date: '2026-07-22',
    read: false,
  },
]

async function main() {
  const passwordHash = await bcrypt.hash('demo1234', 10)

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        username: user.username,
        passwordHash,
        name: user.name,
        age: user.age,
        avatarInitials: user.avatarInitials,
        conditionsJson: JSON.stringify(user.conditions),
        accessibilityJson: JSON.stringify(user.accessibility),
      },
    })
  }

  for (const appointment of appointments) {
    await prisma.appointment.create({ data: appointment })
  }

  for (const prescription of prescriptions) {
    const { medications, ...rest } = prescription
    await prisma.prescription.create({
      data: {
        ...rest,
        medications: { create: medications },
      },
    })
  }

  for (const notification of notifications) {
    await prisma.notification.create({ data: notification })
  }

  console.log('Base de datos sembrada con las 4 personas, citas, recetas y notificaciones.')
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
