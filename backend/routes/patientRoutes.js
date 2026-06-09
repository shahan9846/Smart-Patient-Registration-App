const express = require('express')

const router = express.Router()

const { createPatient, fetchPatient, admin_fetchPatient } = require('../controllers/patientController')
const { authMiddleware } = require('../middleware/authMiddleware')

router.route('/').post(createPatient).get(authMiddleware, admin_fetchPatient)

router.get('/:id', fetchPatient)

module.exports = router