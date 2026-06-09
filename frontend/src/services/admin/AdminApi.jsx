import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const adminLogin =
    async (
        email,
        password
    ) => {

        try {

            const res =
                await axios.post(
                    "http://localhost:5000/api/admin/login",
                    {
                        email,
                        password
                    }
                );

            return res.data;

        }
        catch (error) {

           throw error

        }

    }

export const admin_fetchPatientData = async (name = '') => {
    try {
        const token = localStorage.getItem('adminToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const res = await axios.get(`${API_URL}?search=${name}`, config)
        return res.data
    }
    catch (error) {
        throw new Error(error.response?.data?.message || error.message)
    }
}
