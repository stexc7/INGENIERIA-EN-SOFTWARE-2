const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const appointmentsRoutes = require('./routes/appointments.routes')
const prescriptionsRoutes = require('./routes/prescriptions.routes')
const notificationsRoutes = require('./routes/notifications.routes')
const catalogRoutes = require('./routes/catalog.routes')

function createApp() {
  const app = express()

  const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map((origin) => origin.trim())
  app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }))
  app.use(express.json())

  app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

  app.use('/api/auth', authRoutes)
  app.use('/api/appointments', appointmentsRoutes)
  app.use('/api/prescriptions', prescriptionsRoutes)
  app.use('/api/notifications', notificationsRoutes)
  app.use('/api/catalog', catalogRoutes)

  app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada.' })
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor.' })
  })

  return app
}

module.exports = { createApp }
