const { Router } = require('express')
const { requireAuth } = require('../middleware/auth')
const { list, create, cancel } = require('../controllers/appointments.controller')

const router = Router()

router.use(requireAuth)
router.get('/', list)
router.post('/', create)
router.patch('/:id/cancel', cancel)

module.exports = router
