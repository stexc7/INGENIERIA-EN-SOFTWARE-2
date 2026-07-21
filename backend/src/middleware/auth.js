const { verifyToken } = require('../utils/jwt')

function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'No autenticado.' })
  }

  try {
    const payload = verifyToken(token)
    req.userId = payload.sub
    next()
  } catch {
    return res.status(401).json({ error: 'Sesión inválida o expirada.' })
  }
}

module.exports = { requireAuth }
