const request = require('supertest')
const { app, loginAs } = require('./testHelpers')

describe('POST /api/auth/login', () => {
  it('returns a token and the user profile for valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'priscila', password: 'demo1234' })

    expect(res.status).toBe(200)
    expect(res.body.token).toEqual(expect.any(String))
    expect(res.body.user).toMatchObject({
      username: 'priscila',
      name: 'Priscila del Rocío Ordóñez León',
      conditions: ['Diabetes'],
    })
    expect(res.body.user.passwordHash).toBeUndefined()
  })

  it('rejects an incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'priscila', password: 'incorrecta' })

    expect(res.status).toBe(401)
    expect(res.body.error).toMatch(/incorrectos/i)
  })

  it('rejects a username that does not exist', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'no-existe', password: 'demo1234' })

    expect(res.status).toBe(401)
  })

  it('rejects a request missing credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({ username: 'priscila' })
    expect(res.status).toBe(400)
  })
})

describe('GET /api/auth/me', () => {
  it('returns the profile for a valid token', async () => {
    const token = await loginAs('belen')
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.user.username).toBe('belen')
    expect(res.body.user.accessibility).toContain('Aparato auditivo')
  })

  it('rejects a request without a token', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
  })

  it('rejects a malformed token', async () => {
    const res = await request(app).get('/api/auth/me').set('Authorization', 'Bearer not-a-real-token')
    expect(res.status).toBe(401)
  })
})
