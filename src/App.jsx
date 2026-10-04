import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gigs from './pages/Gigs';
import Freelancers from './pages/Freelancers';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastProvider, useToast } from './components/Toast';
import { INITIAL_GIGS } from './data/mockData';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainApp() {
  const { addToast } = useToast();

  // Auth State
  const storedUser = localStorage.getItem('skillsphere_user');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  // Gigs State (with newly posted jobs)
  const [gigs, setGigs] = useState(() => {
    const saved = localStorage.getItem('skillsphere_gigs');
    return saved ? JSON.parse(saved) : INITIAL_GIGS;
  });

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('skillsphere_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('skillsphere_user', JSON.stringify(userData));
    if (userData.token) localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillsphere_user');
    localStorage.removeItem('token');
  };

  const handleJobCreated = (newJob) => {
    const updated = [newJob, ...gigs];
    setGigs(updated);
    localStorage.setItem('skillsphere_gigs', JSON.stringify(updated));
  };

  const handleToggleBookmark = (gigId) => {
    setBookmarks((prev) => {
      let updated;
      if (prev.includes(gigId)) {
        updated = prev.filter((id) => id !== gigId);
        addToast('Removed from saved bookmarks.', 'info');
      } else {
        updated = [...prev, gigId];
        addToast('Saved to your bookmarks!', 'success');
      }
      localStorage.setItem('skillsphere_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
          <Navbar 
            onJobCreated={handleJobCreated} 
            bookmarksCount={bookmarks.length} 
          />
          <main className="flex-1">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    gigs={gigs} 
                    bookmarks={bookmarks} 
                    onToggleBookmark={handleToggleBookmark} 
                  />
                } 
              />
              <Route 
                path="/gigs" 
                element={
                  <Gigs 
                    gigs={gigs} 
                    onJobCreated={handleJobCreated} 
                    bookmarks={bookmarks} 
                    onToggleBookmark={handleToggleBookmark} 
                  />
                } 
              />
              <Route path="/freelancers" element={<Freelancers />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
