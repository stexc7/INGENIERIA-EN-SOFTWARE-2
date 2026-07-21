const { prisma } = require('../db')

async function list(req, res) {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.userId },
    orderBy: { date: 'desc' },
  })
  return res.json({ notifications })
}

async function markRead(req, res) {
  const { id } = req.params

  const notification = await prisma.notification.findUnique({ where: { id } })
  if (!notification || notification.userId !== req.userId) {
    return res.status(404).json({ error: 'Notificación no encontrada.' })
  }

  const updated = await prisma.notification.update({
    where: { id },
    data: { read: true },
  })

  return res.json({ notification: updated })
}

async function markAllRead(req, res) {
  await prisma.notification.updateMany({
    where: { userId: req.userId, read: false },
    data: { read: true },
  })

  const notifications = await prisma.notification.findMany({
    where: { userId: req.userId },
    orderBy: { date: 'desc' },
  })

  return res.json({ notifications })
}

module.exports = { list, markRead, markAllRead }
