const request = require('supertest')
const { app, loginAs } = require('./testHelpers')

describe('GET /api/prescriptions', () => {
  it("lists only the authenticated user's prescriptions", async () => {
    const token = await loginAs('priscila')
    const res = await request(app).get('/api/prescriptions').set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.prescriptions.length).toBeGreaterThan(0)
    expect(res.body.prescriptions[0].title).toBe('Metformina 850mg')
  })

  it('filters by the search query across title and doctor', async () => {
    const token = await loginAs('priscila')
    const res = await request(app)
      .get('/api/prescriptions')
      .query({ q: 'vintimilla' })
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.prescriptions.length).toBeGreaterThan(0)
    expect(res.body.prescriptions[0].doctor).toMatch(/vintimilla/i)
  })

  it('returns an empty list when the search matches nothing', async () => {
    const token = await loginAs('priscila')
    const res = await request(app)
      .get('/api/prescriptions')
      .query({ q: 'no-deberia-existir' })
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.prescriptions).toHaveLength(0)
  })
})

describe('GET /api/prescriptions/:id', () => {
  it('returns the prescription with its medications', async () => {
    const token = await loginAs('priscila')
    const list = await request(app).get('/api/prescriptions').set('Authorization', `Bearer ${token}`)
    const id = list.body.prescriptions[0].id

    const res = await request(app).get(`/api/prescriptions/${id}`).set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.prescription.medications.length).toBeGreaterThan(0)
  })

  it("returns 404 for another user's prescription", async () => {
    const ownerToken = await loginAs('priscila')
    const list = await request(app)
      .get('/api/prescriptions')
      .set('Authorization', `Bearer ${ownerToken}`)
    const id = list.body.prescriptions[0].id

    const otherToken = await loginAs('belen')
    const res = await request(app)
      .get(`/api/prescriptions/${id}`)
      .set('Authorization', `Bearer ${otherToken}`)

    expect(res.status).toBe(404)
  })

  it('returns 404 for an id that does not exist', async () => {
    const token = await loginAs('priscila')
    const res = await request(app)
      .get('/api/prescriptions/no-existe')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(404)
  })
})
