import { useState } from 'react'
import { createPatient } from '../../services/patient/PatientApi'
import { useNavigate } from 'react-router-dom'
import { User, Phone, CalendarDays, MapPin, Building2, ArrowRight, ChevronDown, ClipboardPlus } from 'lucide-react'
import Navbar from '../components/Navbar'
import './Register.css'

const Register = () => {
    
    const [inputData, setInputData] = useState({
        name: '',
        age: '',
        gender: '',
        mobile: '',
        address: '',
        department: '',
    })

    const [error, setError] = useState({
        name: '',
        age: '',
        gender: '',
        mobile: '',
        address: '',
        department: '',
    })

    const inputValue = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            if (inputData.name.length < 3) {
                setError({ name: '*Name is too short*' })
                return
            }

            if (inputData.mobile !== inputData.mobile.replace(/\D/g, '') || inputData.mobile.length !== 10) {
                setError({
                    mobile: '*Enter exactly 10 Digits*'
                })
                return
            }

            if (inputData.age === '' || inputData.age > 120) {
                setError({
                    age: '*Enter age between 1 to 120*'
                })
                return
            }

            if (inputData.gender === '') {
                setError({
                    gender: '*Choose one option*'
                })
                return
            }

            if (inputData.department === '') {
                setError({
                    department: '*Choose one option*'
                })
                return
            }

            const data = await createPatient(inputData)

            setInputData({
                name: '',
                age: '',
                gender: '',
                mobile: '',
                address: '',
                department: '',
            })
            navigate(`/token-screen/${data.id}`)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />

            <div className="register-page">
                <div className="register-header">
                    <div className="header-left">
                        <div className="register-icon">
                            <ClipboardPlus size={52} color="#39B66D" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h1>Patient Registration</h1>
                            <p>Please fill in the details below to register and get your token</p>
                        </div>
                    </div>

                </div>

                <form className="register-card" onSubmit={onSubmitForm}>
                    <div className="input-grid">

                        <div className="field">
                            <label>Full Name <span className="req">*</span></label>
                            <div className="input-wrap">
                                <User size={18} className="input-icon" />
                                <input type="text" onChange={inputValue} value={inputData.name} name="name" placeholder="Enter full name" />
                            </div>
                            {error.name && <small>{error.name}</small>}
                        </div>

                        <div className="field">
                            <label>Mobile Number (10 digits) <span className="req">*</span></label>
                            <div className="input-wrap">
                                <Phone size={18} className="input-icon" />
                                <input type="text" maxLength={10} onChange={inputValue} value={inputData.mobile} name="mobile" placeholder="Enter 10 digit mobile number" />
                            </div>
                            {error.mobile && <small>{error.mobile}</small>}
                        </div>

                        <div className="field">
                            <label>Age <span className="req">*</span></label>
                            <div className="input-wrap">
                                <CalendarDays size={18} className="input-icon" />
                                <input type="number" min="1" max="120" onChange={inputValue} value={inputData.age} name="age" placeholder="Enter age" />
                            </div>
                            {error.age && <small>{error.age}</small>}
                        </div>

                        <div className="field">
                            <label>Address <span className="optional">(Optional)</span></label>
                            <div className="input-wrap">
                                <MapPin size={18} className="input-icon" />
                                <input type="text" onChange={inputValue} value={inputData.address} name="address" placeholder="Enter address" />
                            </div>
                        </div>

                    </div>

                    <div className="gender-dept-row">
                        <div className="gender-area">

                            <label>Gender *</label>
                            <div className="gender-box">
                                <label className={`radio-card ${inputData.gender === "male" ? "selected" : ""}`}>
                                    <input type="radio" value="male" name="gender" onChange={inputValue} checked={inputData.gender === "male"} />   Male
                                </label>
                                <label className={`radio-card ${inputData.gender === "female" ? "selected" : ""}`}>
                                    <input type="radio" value="female" name="gender" onChange={inputValue} checked={inputData.gender === "female"} /> Female
                                </label>
                            </div>
                            {error.gender && <small>{error.gender}</small>}
                        </div>

                        <div className="field dept-field">
                            
                            <label>Department <span className="req">*</span></label>
                            <div className="input-wrap select-wrap">
                                <Building2 size={18} className="input-icon" />
                                <select onChange={inputValue} value={inputData.department} name="department" >
                                    <option value="" disabled>Select Department</option>
                                    <option value="General Medicine">General Medicine</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Orthopedics">Orthopedics</option>
                                    <option value="Dermatology">Dermatology</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                </select>
                                <ChevronDown size={16} className="select-chevron" />
                            </div>
                            {error.department && <small>{error.department}</small>}
                        </div>

                    </div>
                    <button type="submit" className="submit-btn" >Submit <ArrowRight size={18} /></button>

                </form>
            </div>
        </>

    )
}

export default Register