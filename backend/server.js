const express = require('express')
const cors = require('cors')

const app = express()

require("./models/patientModel")

const patientRoutes = require('./routes/patientRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/patients', patientRoutes)

app.listen(5000, () => {
    console.log('Server Runnig...')
})