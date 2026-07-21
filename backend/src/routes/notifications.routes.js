const { Router } = require('express')
const { requireAuth } = require('../middleware/auth')
const { list, markRead, markAllRead } = require('../controllers/notifications.controller')

const router = Router()

router.use(requireAuth)
router.get('/', list)
router.patch('/read-all', markAllRead)
router.patch('/:id/read', markRead)

module.exports = router
