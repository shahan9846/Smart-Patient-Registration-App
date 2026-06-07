import { useEffect, useState } from 'react'
import { fetchPatientData } from '../../services/patient/PatientApi'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckIcon, User, Building2, Ticket, CalendarClock, Printer, House, Users } from 'lucide-react'
import { toast } from 'sonner'
import Navbar from '../components/Navbar'
import './TokenScreen.css'


const TokenScreen = () => {

    const { id } = useParams()
    const [patientData, setPatientData] = useState({})
    const navigate = useNavigate()

    const printSlip = () => {
        window.print()
        toast.success('Shortly Redirect to Home page..')
        setTimeout(() => { navigate('/') }, 3000)
    }

    const formatDate = (raw_date) => {
        if (!raw_date) return ''
        try {
            const latest_date = new Date(raw_date)
            return latest_date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + ' • ' + latest_date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        } catch {
            return raw_date
        }
    }

    useEffect(() => {
        const loadfetchPatientData = async () => {
            const fetchPatient_data = await fetchPatientData(id)
            console.log(fetchPatient_data)
            setPatientData(fetchPatient_data)
        }
        loadfetchPatientData()
    }, [id])

    return (
        <div className="token-page">

            <Navbar />

            <div className="topbar-divider" />

            <div className="token-body">
                <div className="success-area">
                    <div className="success-icon">
                        <CheckIcon size={52} color="#39B66D" strokeWidth={3} />
                    </div>
                </div>

                <h1 className="success-title">Registration Successful!</h1>
                <p className="success-sub">Your token has been generated</p>

                <div className="info-card">
                    <div className="info-left">
                        <div className="info-row">
                            <div className="info-icon-wrap"><User size={20} color="#39B66D" /></div>
                            <div className="info-text">
                                <span className="info-label">Patient Name</span>
                                <strong className="info-value">{patientData.name}</strong>
                            </div>
                        </div>
                        <div className="info-divider" />
                        <div className="info-row">
                            <div className="info-icon-wrap"><Building2 size={20} color="#39B66D" /></div>
                            <div className="info-text">
                                <span className="info-label">Department</span>
                                <strong className="info-value">{patientData.department}</strong>
                            </div>
                        </div>
                        <div className="info-divider" />
                        <div className="info-row">
                            <div className="info-icon-wrap"><Ticket size={20} color="#39B66D" /></div>
                            <div className="info-text">
                                <span className="info-label">Token Number</span>
                                <strong className="info-value token-green">{patientData.token}</strong>
                            </div>
                        </div>
                        <div className="info-divider" />
                        <div className="info-row">
                            <div className="info-icon-wrap"><CalendarClock size={20} color="#39B66D" /></div>
                            <div className="info-text">
                                <span className="info-label">Registration Time</span>
                                <strong className="info-value">{formatDate(patientData.created_at)}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="token-display">
                        <div className="token-display-header">
                            <span className="td-line" />
                            <span className="td-label">YOUR TOKEN</span>
                            <span className="td-line" />
                        </div>
                        <div className="token-big">{patientData.token}</div>
                        <div className="td-divider">
                            <svg viewBox="0 0 60 14" fill="none" className="td-pulse">
                                <polyline points="0,7 10,7 14,2 18,12 22,2 26,12 30,7 40,7 60,7"
                                    stroke="#39B66D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="waiting-icon">
                            <Users size={42} color="#39B66D" strokeWidth={1.4} />
                        </div>
                        <p className="waiting-text">Please wait for your<br />token to be called</p>
                    </div>

                </div>

                <div className="token-actions">
                    <button className="print-btn" onClick={printSlip}>
                        <span className="btn-icon-wrap"><Printer size={20} color="#39B66D" /></span>
                        <span className="btn-text-col">
                            <span className="btn-main">Print Token</span>
                            <span className="btn-sub">Get a printed copy</span>
                        </span>
                    </button>

                    <button className="home-btn" onClick={() => navigate('/')}>
                        <span className="btn-icon-wrap btn-icon-white"><House size={20} color="white" /></span>
                        <span className="btn-text-col">
                            <span className="btn-main">Back to Home</span>
                            <span className="btn-sub">Start new registration</span>
                        </span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default TokenScreen