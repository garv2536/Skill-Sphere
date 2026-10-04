import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  PlusCircle, 
  Bell, 
  Bookmark, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  LogOut, 
  Briefcase, 
  Users, 
  HelpCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../App';
import PostJobModal from './PostJobModal';
import { useToast } from './Toast';

export default function Navbar({ onJobCreated, bookmarksCount = 0 }) {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [postJobOpen, setPostJobOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully.', 'info');
    navigate('/');
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { to: '/gigs', label: 'Find Gigs', icon: Briefcase },
    { to: '/freelancers', label: 'Hire Talent', icon: Users },
    { to: '/how-it-works', label: 'How it Works', icon: HelpCircle },
  ];

  const sampleNotifications = [
    { id: 1, title: 'Proposal viewed', text: 'Karthik Raman viewed your Next.js proposal.', time: '10m ago' },
    { id: 2, title: 'Milestone escrow secured', text: '₹35,000 funded in escrow for Mobile App UI.', time: '2h ago' },
    { id: 3, title: 'New gig matching your skills', text: '3 new contracts in React & Supabase.', time: '1d ago' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm group-hover:bg-blue-700 transition-colors">
                  S
                </div>
                <span className="font-bold text-slate-900 text-lg tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Skill<span className="text-blue-600">Sphere</span>
                </span>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map(({ to, label }) => {
                  const isActive = pathname === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Action Icons & Auth */}
            <div className="hidden md:flex items-center gap-3">
              {/* Post a Gig Button */}
              <button
                onClick={() => setPostJobOpen(true)}
                className="btn-outline text-xs sm:text-sm py-2 px-3.5 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 font-semibold flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4 text-blue-600" />
                Post a Project
              </button>

              {/* Bookmarks Link */}
              <Link
                to="/gigs?saved=true"
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative transition-colors"
                title="Saved Gigs"
              >
                <Bookmark className="w-4 h-4" />
                {bookmarksCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {bookmarksCount}
                  </span>
                )}
              </Link>

              {/* Notifications Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in-50 duration-100">
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Notifications</span>
                      <span className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
                    </div>
                    <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                      {sampleNotifications.map((n) => (
                        <div key={n.id} className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors text-xs">
                          <p className="font-semibold text-slate-800">{n.title}</p>
                          <p className="text-slate-500 mt-0.5 leading-snug">{n.text}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Account / Auth */}
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-bold text-slate-800 leading-none">{user.name}</p>
                      <p className="text-[10px] text-slate-400 capitalize mt-0.5">{user.role || 'Member'}</p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in-50 duration-100">
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      </div>
                      <div className="py-1 text-xs">
                        <Link
                          to="/gigs"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50"
                        >
                          <Briefcase className="w-4 h-4 text-slate-400" /> My Applications
                        </Link>
                        <Link
                          to="/freelancers"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50"
                        >
                          <Users className="w-4 h-4 text-slate-400" /> Direct Messages
                        </Link>
                      </div>
                      <div className="border-t border-slate-100 pt-1 text-xs">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 font-medium text-left"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="btn-outline text-xs py-2 px-3.5">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary text-xs py-2 px-3.5">
                    Join Marketplace
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setPostJobOpen(true)}
                className="btn-primary text-xs py-1.5 px-2.5 flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Post
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
            <div className="space-y-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium ${
                    pathname === to ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" /> {label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="px-4 py-2 bg-slate-50 rounded-xl text-xs">
                    <p className="font-bold text-slate-900">{user.name}</p>
                    <p className="text-slate-400">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-outline w-full justify-center text-rose-600 border-rose-200 hover:bg-rose-50 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-outline w-full justify-center text-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Post a Job Modal */}
      <PostJobModal
        isOpen={postJobOpen}
        onClose={() => setPostJobOpen(false)}
        onJobCreated={(newJob) => {
          if (onJobCreated) onJobCreated(newJob);
          navigate('/gigs');
        }}
      />
    </>
  );
}
