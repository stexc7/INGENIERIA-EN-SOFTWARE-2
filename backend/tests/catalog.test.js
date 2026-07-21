const request = require('supertest')
const { app } = require('./testHelpers')

describe('GET /api/catalog/*', () => {
  it('returns the list of specialties with their doctor', async () => {
    const res = await request(app).get('/api/catalog/specialties')
    expect(res.status).toBe(200)
    expect(res.body.specialties.length).toBeGreaterThan(0)
    expect(res.body.specialties[0]).toHaveProperty('doctor')
  })

  it('returns the list of locations', async () => {
    const res = await request(app).get('/api/catalog/locations')
    expect(res.status).toBe(200)
    expect(res.body.locations).toEqual(expect.arrayContaining(['Clínica Santa Ana']))
  })

  it('returns the list of time slots', async () => {
    const res = await request(app).get('/api/catalog/time-slots')
    expect(res.status).toBe(200)
    expect(res.body.timeSlots).toContain('09:00')
  })
})

describe('GET /api/health', () => {
  it('responds with ok status', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})

describe('unknown route', () => {
  it('returns 404', async () => {
    const res = await request(app).get('/api/no-existe')
    expect(res.status).toBe(404)
  })
})
