const { Router } = require('express')
const { getSpecialties, getLocations, getTimeSlots } = require('../controllers/catalog.controller')

const router = Router()

router.get('/specialties', getSpecialties)
router.get('/locations', getLocations)
router.get('/time-slots', getTimeSlots)

module.exports = router
