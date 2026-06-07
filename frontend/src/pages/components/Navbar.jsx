import { Globe, ChevronDown } from 'lucide-react'
import './Navbar.css'


const Navbar = () => {
    return (
        <div>
            <div className="token-topbar">
                <div className="topbar-logo">
                    <div className="logo-icon">
                        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                            <path d="M18 6C13 6 9 10 9 15c0 6 9 15 9 15s9-9 9-15c0-5-4-9-9-9z" fill="#39B66D" />
                            <path d="M15 15h6M18 12v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <path d="M10 20 Q18 28 26 20" stroke="#2aff8a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="logo-text">
                        <span className="logo-name">City Hospital</span>
                        <span className="logo-tagline">Compassionate Care, Always</span>
                    </div>
                </div>

                <button className="lang-btn">
                    <Globe size={15} color="#39B66D" />
                    <span>English</span>
                    <ChevronDown size={13} color="#555" />
                </button>
            </div>
        </div>
    )
}

export default Navbar