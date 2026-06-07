import axios from 'axios'

const API_URL = 'http://localhost:5000/api/patients'

export const createPatient = async (fetchPatientData) => {
    try {
        const res = await axios.post(API_URL,fetchPatientData)
        return res.data
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchPatientData = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`)
        return res.data
    } catch (error) {
        console.log(error.message)
    }
}