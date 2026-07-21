const { prisma } = require('../db')

async function list(req, res) {
  const appointments = await prisma.appointment.findMany({
    where: { userId: req.userId },
    orderBy: [{ date: 'asc' }, { time: 'asc' }],
  })
  return res.json({ appointments })
}

async function create(req, res) {
  const { specialty, doctor, date, time, location } = req.body

  if (!specialty || !doctor || !date || !time || !location) {
    return res.status(400).json({ error: 'Faltan datos de la cita.' })
  }

  const appointment = await prisma.appointment.create({
    data: {
      userId: req.userId,
      specialty,
      doctor,
      date,
      time,
      location,
      status: 'pendiente',
    },
  })

  return res.status(201).json({ appointment })
}

async function cancel(req, res) {
  const { id } = req.params

  const appointment = await prisma.appointment.findUnique({ where: { id } })
  if (!appointment || appointment.userId !== req.userId) {
    return res.status(404).json({ error: 'Cita no encontrada.' })
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: { status: 'cancelada' },
  })

  return res.json({ appointment: updated })
}

module.exports = { list, create, cancel }
