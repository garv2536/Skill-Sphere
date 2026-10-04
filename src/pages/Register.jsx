import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Building, Briefcase, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../App';
import { useToast } from '../components/Toast';
import { registerUser } from '../services/api';

const ROLES = [
  {
    value: 'client',
    label: 'I am a Client / Founder',
    desc: 'I want to post contracts and hire verified freelance engineers.',
    icon: Building
  },
  {
    value: 'freelancer',
    label: 'I am a Freelancer / Pro',
    desc: 'I want to find high-paying contracts and submit milestone proposals.',
    icon: Briefcase
  }
];

export default function Register() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
    company: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(form);
      login(data.user || data);
      addToast(`Account created! Welcome to SkillSphere, ${form.name}.`, 'success');
      navigate('/gigs');
    } catch (err) {
      // Demo fallback
      const fallbackUser = {
        name: form.name,
        email: form.email,
        role: form.role,
        company: form.company || `${form.name}'s Studio`,
        token: 'demo-reg-jwt-123'
      };
      login(fallbackUser);
      addToast(`Account created! Welcome to SkillSphere, ${form.name}.`, 'success');
      navigate('/gigs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl mx-auto shadow-md shadow-blue-600/20">
              S
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              Create your SkillSphere account
            </h1>
            <p className="text-xs text-slate-500">
              Join India’s premier marketplace for high-signal engineering and design talent.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Join SkillSphere As
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROLES.map(({ value, label, desc, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm({ ...form, role: value })}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      form.role === value
                        ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                      form.role === value ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className={`text-xs font-bold ${form.role === value ? 'text-blue-900' : 'text-slate-800'}`}>
                      {label}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      {desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  className="input-field pl-9.5 text-sm"
                  required
                />
              </div>
            </div>

            {/* Company (if client) */}
            {form.role === 'client' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Company / Organization Name (Optional)
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="e.g. ZetaHealth Labs"
                    className="input-field pl-9.5 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Work Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="input-field pl-9.5 text-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password (min 6 characters) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field pl-9.5 pr-10 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-sm font-semibold rounded-xl mt-2"
            >
              {loading ? 'Creating account...' : 'Create Free Account'}
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            By signing up, you agree to SkillSphere's Terms of Service and Escrow Protection Policy.
          </p>

          {/* Footer Note */}
          <p className="text-xs text-center text-slate-500 pt-3 border-t border-slate-100">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
