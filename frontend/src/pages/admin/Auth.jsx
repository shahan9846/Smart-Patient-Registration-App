import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Mail, Lock, EyeOff, Eye, ArrowRight, ShieldCheck, ShieldUser, UserRoundCheck, } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { adminLogin } from '../../services/admin/AdminApi'
import './Auth.css'


const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate()
    const location = useLocation()


    const handleLogin =
        async (e) => {
            e.preventDefault();
            try {
                const data = await adminLogin(email, password);
                localStorage.setItem("adminToken", data.token);
                toast.success("Login Successful");
                navigate("/admin-dashboard");
            }
            catch (error) {
                const errorMessage = error?.response?.data?.message || 'Login failed';
                if (errorMessage === 'Invalid email or password') {
                    return toast.error('Invalid email or password');
                }
                toast.error(errorMessage);
            }
        };

    useEffect(() => {
        const toastData = location.state?.toast;
        if (toastData) {
            toast.error(
                toastData.message,
                { id: toastData.id }
            );
            navigate(
                location.pathname,
                {
                    replace: true,
                    state: null
                }
            );
        }
    }, []);

    return (
        <div className="auth-page">

            <Navbar />

            {/* ── Main ── */}
            <main className="auth-main">
                <div className="auth-split">
                    {/* Left */}
                    <div className="auth-left">
                        <ShieldUser className="shield-icon" size={90} color="#2d8c55" />
                        <h1>Admin Login</h1>
                        <p>Sign in to access the admin dashboard and manage patient registrations</p>
                    </div>

                    {/* Right Card */}
                    <div className="auth-card">
                        <div className="card-avatar">
                            <UserRoundCheck size={40} color="#2d8c55" />
                        </div>
                        <h2 className="card-title">Welcome Back!</h2>
                        <p className="card-subtitle">Please enter your credentials to continue</p>


                        <form onSubmit={handleLogin}>
                            <div className="field-group">
                                <label className="field-label">
                                    Email Address <span className="req">*</span>
                                </label>
                                <div className="field-input-wrap">
                                    <Mail className="field-icon" size={18} />
                                    <input
                                        type="email"
                                        placeholder="Enter admin email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field-group">
                                <label className="field-label">
                                    Password <span className="req">*</span>
                                </label>
                                <div className="field-input-wrap">
                                    <Lock className="field-icon" size={18} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(v => !v)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button type="submit" className="login-btn">
                                Login
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="or-divider"><span>or</span></div>

                        <div className="secure-badge">
                            <ShieldCheck size={18} />
                            Secure access for authorized administrators only
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Auth