import axios from 'axios'

const API_URL= import.meta.env.VITE_API_URL 

export const admin_fetchPatientData = async (name = '') => {
    try {
        const res = await axios.get(`${API_URL}?search=${name}`)
        return res.data
    }
    catch (error) {
        console.log(error.message)
    }
}
