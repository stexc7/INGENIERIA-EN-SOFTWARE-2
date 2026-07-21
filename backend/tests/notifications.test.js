const request = require('supertest')
const { app, loginAs } = require('./testHelpers')

describe('GET /api/notifications', () => {
  it("lists only the authenticated user's notifications", async () => {
    const token = await loginAs('priscila')
    const res = await request(app).get('/api/notifications').set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.notifications.every((n) => n.userId === 'u1')).toBe(true)
  })
})

describe('PATCH /api/notifications/:id/read', () => {
  it('marks a single notification as read', async () => {
    const token = await loginAs('priscila')
    const list = await request(app).get('/api/notifications').set('Authorization', `Bearer ${token}`)
    const unread = list.body.notifications.find((n) => !n.read)

    const res = await request(app)
      .patch(`/api/notifications/${unread.id}/read`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.notification.read).toBe(true)
  })

  it("returns 404 for another user's notification", async () => {
    const ownerToken = await loginAs('fernando')
    const list = await request(app)
      .get('/api/notifications')
      .set('Authorization', `Bearer ${ownerToken}`)

    const otherToken = await loginAs('priscila')
    const res = await request(app)
      .patch(`/api/notifications/${list.body.notifications[0].id}/read`)
      .set('Authorization', `Bearer ${otherToken}`)

    expect(res.status).toBe(404)
  })
})

describe('PATCH /api/notifications/read-all', () => {
  it('marks every notification of the user as read', async () => {
    const token = await loginAs('priscila')

    const res = await request(app)
      .patch('/api/notifications/read-all')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.notifications.every((n) => n.read)).toBe(true)
  })
})
