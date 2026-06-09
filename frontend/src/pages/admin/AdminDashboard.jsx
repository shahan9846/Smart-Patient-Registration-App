import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { admin_fetchPatientData } from "../../services/admin/AdminApi";
import { LayoutDashboard, LogOut, Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import "./AdminDashboard.css";
import { toast } from "sonner";

const AdminDashboard = () => {

    const [patientsData, setPatientsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [dept, setDept] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");
    const navigate = useNavigate();


    const itemsPerPage = 6;

    const filtered = patientsData.filter(p => p.department === dept || dept === "all");
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                // Added a 1.5 second artificial delay so you can see the spinner!
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const data = await admin_fetchPatientData();
                setPatientsData(data);
            } catch (error) {
                console.error(error?.message);
                toast.error("Failed to connect to the server. Is the backend running?");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleChange = async (e) => {
        const patient_name = e.target.value
        setSearch(patient_name)
        setCurrentPage(1)
        try {
            const data =
                await admin_fetchPatientData(patient_name)
            setPatientsData(data)
        }
        catch (error) {
            console.error(error.message)
            toast.error("Failed to search patients. Please try again.");
        }
    }

    const formatDate = (raw_formated_date_time) => {
        if (!raw_formated_date_time) return "";
        try {
            const date = new Date(raw_formated_date_time);
            return date.toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            });
        } catch {
            return raw_formated_date_time;
        }
    };

    return (
        <div className="admin-page">
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner" />
                    <p>Loading Patients...</p>
                </div>
            )}

            {menuOpen && <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />}

            {/* Sidebar */}
            <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
                <div className="logo">
                    <div className="logo-icon-wrap">
                        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                            <path d="M18 6C13 6 9 10 9 15c0 6 9 15 9 15s9-9 9-15c0-5-4-9-9-9z" fill="#39B66D" />
                            <path d="M15 15h6M18 12v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <path d="M10 20 Q18 28 26 20" stroke="#7FEFB0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <div className="logo-name">City Hospital</div>
                        <div className="logo-sub">Admin Dashboard</div>
                    </div>
                </div>

                <div className="sidebar-admin-profile">
                    <div className="admin-avatar">A</div>
                    <div className="admin-info">
                        <span className="admin-name">Admin User</span>
                        <span className="admin-role">Administrator</span>
                    </div>
                </div>

                <nav>
                    <ul>
                        <li
                            className={activeTab === "dashboard" ? "active" : ""}
                            onClick={() => { setActiveTab("dashboard"); setMenuOpen(false); }}
                        >
                            <span className="nav-icon"><LayoutDashboard size={18} /></span>Dashboard
                        </li>
                        <li
                            className="logout-nav-btn"
                            onClick={() => {
                                localStorage.removeItem('adminToken');
                                navigate('/admin-login');
                            }}
                            style={{ cursor: "pointer", color: "#e74c3c" }}
                        >
                            <span className="nav-icon"><LogOut size={18} color="#e74c3c" /></span>Logout
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="content">
                {/* Hamburger menu */}
                <div className="content-topbar">
                    <button className={`hamburger-btn ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>

                    <div className="topbar-admin">
                        <span className="admin-label">Admin</span>
                        <div className="admin-avatar">A</div>
                    </div>
                </div>

                <div className="content-topbar-divider" />

                <div className="page-header">
                    <div>
                        <h1>Patients</h1>
                        <p>View and manage all registered patients</p>
                    </div>
                </div>

                {/* Filter */}
                <div className="toolbar">
                    <div className="search-wrap">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by patient name, mobile, or token..."
                            value={search}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="select-wrap">
                        <select value={dept} onChange={(e) => { setDept(e.target.value); setCurrentPage(1); }}>
                            <option value="all">All Departments</option>
                            <option value="General Medicine">General Medicine</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Pediatrics">Pediatrics</option>
                        </select>
                        <ChevronDown size={15} className="sel-chevron" />
                    </div>
                </div>

                {/* Table */}
                <div className="table-card">
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Token</th>
                                    <th>Patient Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Mobile</th>
                                    <th>Department</th>
                                    <th>Registered On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="empty-row">No patients found.</td>
                                    </tr>
                                ) : currentItems.map((p, i) => (
                                    <tr key={p.id}>
                                        <td className="td-num">{indexOfFirstItem + i + 1}</td>
                                        <td><span className="token-badge">{p.token}</span></td>
                                        <td className="td-name">{p.name}</td>
                                        <td>{p.age}</td>
                                        <td>{p.gender}</td>
                                        <td className="td-mobile">{p.mobile}</td>
                                        <td>{p.department}</td>
                                        <td className="td-date">{formatDate(p.created_at)}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="pagination">
                        <span className="pg-info">
                            Showing {filtered.length === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filtered.length)} of {filtered.length} entries
                        </span>
                        <div className="pg-controls">
                            <button
                                className="pg-btn"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={15} />
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    className={`pg-btn ${currentPage === i + 1 ? 'pg-active' : ''}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="pg-btn"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;