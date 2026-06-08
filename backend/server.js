require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

require("./models/patientModel")

const patientRoutes = require('./routes/patientRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/patients', patientRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}...`)
})