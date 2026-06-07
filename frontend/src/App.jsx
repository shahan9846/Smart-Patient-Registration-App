import AdminDashboard from "./pages/admin/AdminDashboard"
import Register from "./pages/patients/Register"
import TokenScreen from "./pages/patients/TokenScreen"
import Welcome from "./pages/patients/Welcome"
import { Route, Routes } from 'react-router-dom'
import './styles/Variable.css'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/token-screen/:id' element={<TokenScreen />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
