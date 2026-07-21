const request = require('supertest')
const { createApp } = require('../src/app')

const app = createApp()

async function loginAs(username, password = 'demo1234') {
  const response = await request(app).post('/api/auth/login').send({ username, password })
  return response.body.token
}

module.exports = { app, loginAs }
