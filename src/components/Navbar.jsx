import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../App'

const NAV_LINKS = [
  { to: '/gigs',        label: 'Find Gigs' },
  { to: '/freelancers', label: 'Freelancers' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const roleColor = {
    client:     'bg-emerald-100 text-emerald-700',
    freelancer: 'bg-blue-100 text-blue-700',
    admin:      'bg-purple-100 text-purple-700',
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
              <span className="text-white font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>S</span>
            </div>
            <span className="font-bold text-slate-900 text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>
              Skill<span className="text-blue-600">Sphere</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === to
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800 leading-none">{user.name}</p>
                    <span className={`badge text-xs mt-0.5 inline-block ${roleColor[user.role] || 'bg-slate-100 text-slate-600'}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn-outline text-sm py-1.5 px-3">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login"    className="btn-outline text-sm py-2 px-4">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2 space-y-1">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                pathname === to ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <button onClick={handleLogout} className="btn-outline w-full justify-center text-sm">
                Logout ({user.name})
              </button>
            ) : (
              <>
                <Link to="/login"    onClick={() => setMenuOpen(false)} className="btn-outline text-sm justify-center">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm justify-center">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
