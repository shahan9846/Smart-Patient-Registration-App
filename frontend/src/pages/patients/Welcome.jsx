import { Link } from 'react-router-dom'
import { ClipboardPlus, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import './Welcome.css'

const Welcome = () => {
    return (
    <>
        <Navbar />
        
        <div className="welcome-page">
            {/* Decorative Plus Signs */}
            <span className="plus plus-1">+</span>
            <span className="plus plus-2">+</span>
            <span className="plus plus-3">+</span>
            <span className="plus plus-4">+</span>

            <div className="welcome-center">
                <div className="welcome-icon-wrap">
                    <ClipboardPlus size={64} color="#39B66D" strokeWidth={1.5} />
                </div>

                <h1 className="welcome-title">Welcome</h1>
                <p className="welcome-subtitle">Patient Self Check-in Kiosk</p>

                {/* Heartbeat Divider */}
                <div className="heartbeat-divider">
                    <span className="divider-line" />
                    <svg className="heartbeat-svg" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline
                            points="0,10 10,10 15,3 20,17 25,3 30,17 35,10 45,10 50,10 60,10"
                            stroke="#39B66D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="divider-line" />
                </div>

                <p className="welcome-body">
                    Please check in to get your token for<br />faster service
                </p>

                <Link to="/register" className="start-btn">
                    <span className="start-arrow"><ArrowRight size={14} color="#fff" /></span> TAP TO START
                </Link>
            </div>
        </div>
    </>
    )

}

export default Welcome