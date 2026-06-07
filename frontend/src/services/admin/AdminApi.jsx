import axios from 'axios'

const API_URL = 'http://localhost:5000/api/patients'

export const admin_fetchPatientData = async (name = '') => {
    try {
        const res = await axios.get(`${API_URL}?search=${name}`)
        return res.data
    }
    catch (error) {
        console.log(error.message)
    }
}
