const express = require('express')

const router = express.Router()

const { createPatient, fetchPatient, admin_fetchPatient } = require('../controllers/patientController')

router.route('/').post(createPatient).get(admin_fetchPatient)

router.get('/:id', fetchPatient)

module.exports = router