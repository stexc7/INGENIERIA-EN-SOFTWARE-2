const request = require('supertest')
const { app, loginAs } = require('./testHelpers')

describe('GET /api/appointments', () => {
  it("lists only the authenticated user's appointments", async () => {
    const token = await loginAs('priscila')
    const res = await request(app).get('/api/appointments').set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.appointments.length).toBeGreaterThan(0)
    expect(res.body.appointments.every((appt) => appt.userId === 'u1')).toBe(true)
  })

  it('rejects the request without authentication', async () => {
    const res = await request(app).get('/api/appointments')
    expect(res.status).toBe(401)
  })
})

describe('POST /api/appointments', () => {
  it('creates a new appointment with status pendiente', async () => {
    const token = await loginAs('fernando')
    const res = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        specialty: 'Cardiología',
        doctor: 'Dra. Lucía Torres',
        date: '2026-09-01',
        time: '10:00',
        location: 'Clínica Santa Ana',
      })

    expect(res.status).toBe(201)
    expect(res.body.appointment.status).toBe('pendiente')
    expect(res.body.appointment.specialty).toBe('Cardiología')
  })

  it('rejects an incomplete payload', async () => {
    const token = await loginAs('fernando')
    const res = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send({ specialty: 'Cardiología' })

    expect(res.status).toBe(400)
  })
})

describe('PATCH /api/appointments/:id/cancel', () => {
  it('cancels an appointment owned by the user', async () => {
    const token = await loginAs('augusto')
    const created = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        specialty: 'Medicina General',
        doctor: 'Dr. Andrés Salinas',
        date: '2026-09-10',
        time: '09:00',
        location: 'Clínica Santa Ana',
      })

    const cancelRes = await request(app)
      .patch(`/api/appointments/${created.body.appointment.id}/cancel`)
      .set('Authorization', `Bearer ${token}`)

    expect(cancelRes.status).toBe(200)
    expect(cancelRes.body.appointment.status).toBe('cancelada')
  })

  it("returns 404 when trying to cancel another user's appointment", async () => {
    const ownerToken = await loginAs('priscila')
    const created = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        specialty: 'Oftalmología',
        doctor: 'Dr. Iván Peralta',
        date: '2026-09-15',
        time: '09:00',
        location: 'Centro de Especialidades Sur',
      })

    const otherToken = await loginAs('belen')
    const res = await request(app)
      .patch(`/api/appointments/${created.body.appointment.id}/cancel`)
      .set('Authorization', `Bearer ${otherToken}`)

    expect(res.status).toBe(404)
  })
})
