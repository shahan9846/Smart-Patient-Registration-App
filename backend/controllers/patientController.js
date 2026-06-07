const db = require('../database/db')

const createPatient = (req, res) => {
    const { name, age, gender, mobile, address, department } = req.body

    const token = "P" + Math.floor(1000 + Math.random() * 9000)

    const isoString = new Date().toISOString()

    const created_at = isoString.slice(0, 10)

    db.run(`
        INSERT INTO patients(
        name,
        age,
        gender,
        mobile,
        address,
        department,
        token,
        created_at
        )
        
        VALUES(?,?,?,?,?,?,?,?)`,

        [name, age, gender, mobile, address, department, token, created_at],

        function (err) {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Err in Patient save.."
                })
            }
            res.status(201).json({
                id: this.lastID,
                name, department, token, created_at,
                message: "Patient Saved"
            })
        }
    )
}

const fetchPatient = (req, res) => {
    db.get(
        `SELECT * FROM patients WHERE id=?`,
        [req.params.id],
        (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Err in Patient fetch'
                })
            }
            res.json(data)
        }
    )
}


const admin_fetchPatient = (req, res) => {

    const search = req.query.search

    let query = `SELECT * FROM patients`

    let values = []

    if (search) {
        query = `SELECT *FROM patientsWHERE nameLIKE ?`
        values = [`%${search}%`]
    }

    db.all(
        query,
        values,
        (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching patients' })
            }
            res.json(data)
        }
    )
}

module.exports = { createPatient, fetchPatient, admin_fetchPatient } 