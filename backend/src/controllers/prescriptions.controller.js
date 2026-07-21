const { prisma } = require('../db')
const { serializePrescription } = require('../utils/serialize')

async function list(req, res) {
  const { q } = req.query

  const prescriptions = await prisma.prescription.findMany({
    where: {
      userId: req.userId,
      ...(q
        ? {
            OR: [
              { title: { contains: String(q) } },
              { doctor: { contains: String(q) } },
            ],
          }
        : {}),
    },
    include: { medications: true },
    orderBy: { date: 'desc' },
  })

  return res.json({ prescriptions: prescriptions.map(serializePrescription) })
}

async function detail(req, res) {
  const { id } = req.params

  const prescription = await prisma.prescription.findUnique({
    where: { id },
    include: { medications: true },
  })

  if (!prescription || prescription.userId !== req.userId) {
    return res.status(404).json({ error: 'Receta no encontrada.' })
  }

  return res.json({ prescription: serializePrescription(prescription) })
}

module.exports = { list, detail }
