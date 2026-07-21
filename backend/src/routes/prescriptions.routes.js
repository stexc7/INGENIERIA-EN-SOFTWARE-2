const { Router } = require('express')
const { requireAuth } = require('../middleware/auth')
const { list, detail } = require('../controllers/prescriptions.controller')

const router = Router()

router.use(requireAuth)
router.get('/', list)
router.get('/:id', detail)

module.exports = router
