import axios from 'axios'

const API_URL= import.meta.env.VITE_API_URL 

export const createPatient = async (fetchPatientData) => {
    try {
        const res = await axios.post(API_URL, fetchPatientData)
        console.log(res.data)
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