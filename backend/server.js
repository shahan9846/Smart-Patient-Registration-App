require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

require("./models/patientModel")

const patientRoutes = require('./routes/patientRoutes')
const adminRoutes = require('./routes/adminRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/patients', patientRoutes)
app.use('/api/admin', adminRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}...`)
})