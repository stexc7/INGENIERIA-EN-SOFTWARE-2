const bcrypt = require('bcryptjs')
const { prisma } = require('../db')
const { signToken } = require('../utils/jwt')
const { serializeUser } = require('../utils/serialize')

async function login(req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos.' })
  }

  const user = await prisma.user.findUnique({
    where: { username: username.trim().toLowerCase() },
  })

  if (!user) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' })
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash)
  if (!passwordMatches) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' })
  }

  const token = signToken(user.id)
  return res.json({ token, user: serializeUser(user) })
}

async function me(req, res) {
  const user = await prisma.user.findUnique({ where: { id: req.userId } })
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado.' })
  }
  return res.json({ user: serializeUser(user) })
}

module.exports = { login, me }
