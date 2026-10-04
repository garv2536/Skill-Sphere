import { useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Gigs from './pages/Gigs'
import Freelancers from './pages/Freelancers'

// ── Auth Context ──────────────────────────────────────────────
export const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const stored = localStorage.getItem('ss_user')
  const [user, setUser] = useState(stored ? JSON.parse(stored) : null)

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('ss_user', JSON.stringify(userData))
    if (userData.token) localStorage.setItem('token', userData.token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ss_user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <main className="page-enter">
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/login"       element={<Login />} />
              <Route path="/register"    element={<Register />} />
              <Route path="/gigs"        element={<Gigs />} />
              <Route path="/freelancers" element={<Freelancers />} />
              <Route path="*"            element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
