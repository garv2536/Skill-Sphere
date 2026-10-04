import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: '🤖', title: 'AI Job Matching',     desc: 'Smart algorithm connects clients with the best-fit freelancers using skill similarity scoring.' },
  { icon: '🔒', title: 'Secure Payments',     desc: 'Escrow-based milestone payments via Razorpay/Stripe with automatic freelancer payout.' },
  { icon: '💬', title: 'Real-Time Chat',       desc: 'Built-in messaging, file sharing, and collaboration tools powered by Socket.IO.' },
  { icon: '⭐', title: 'Reputation System',   desc: 'Weighted review scores with fraud detection keep the marketplace trustworthy.' },
  { icon: '📍', title: 'Hyperlocal Search',   desc: 'Discover verified professionals near you with location-based filtering.' },
  { icon: '📊', title: 'Analytics Dashboard', desc: 'Freelancers track earnings, profile views, and client feedback in real time.' },
]

const STATS = [
  { value: '12,400+', label: 'Freelancers' },
  { value: '3,800+',  label: 'Active Gigs' },
  { value: '98%',     label: 'Success Rate' },
  { value: '₹2.4Cr+', label: 'Paid Out' },
]

const CATEGORIES = [
  { name: 'Web Development',  gigs: 340, color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { name: 'UI/UX Design',     gigs: 218, color: 'bg-purple-50 text-purple-700 border-purple-100' },
  { name: 'Mobile Apps',      gigs: 192, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { name: 'Data Science',     gigs: 156, color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { name: 'Digital Marketing',gigs: 134, color: 'bg-rose-50 text-rose-700 border-rose-100' },
  { name: 'Content Writing',  gigs: 112, color: 'bg-teal-50 text-teal-700 border-teal-100' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/20 text-sm font-medium tracking-wide">
            🚀 India's Hyperlocal Freelance Ecosystem
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Hire Smart.<br />
            <span className="text-blue-200">Work Local.</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            SkillSphere connects clients with verified local freelancers using AI-powered matching, secure escrow payments, and real-time collaboration.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/gigs"        className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3.5 rounded-xl transition shadow-lg">
              Browse Gigs
            </Link>
            <Link to="/register"    className="bg-blue-500/30 hover:bg-blue-500/50 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl transition backdrop-blur-sm">
              Join as Freelancer
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold text-blue-600" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</p>
                <p className="text-slate-500 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Browse by Category</h2>
          <p className="text-slate-500">Find experts in the skills you need most</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map(({ name, gigs, color }) => (
            <Link
              key={name}
              to={`/gigs?category=${encodeURIComponent(name)}`}
              className={`card border p-5 flex items-center justify-between group cursor-pointer ${color}`}
            >
              <div>
                <p className="font-semibold text-base">{name}</p>
                <p className="text-sm opacity-70 mt-0.5">{gigs} gigs</p>
              </div>
              <svg className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              Everything you need to succeed
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">A professional ecosystem built for India's growing freelance economy</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-colors">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h2 className="section-title mb-4">Ready to get started?</h2>
        <p className="text-slate-500 mb-8 text-lg">Join thousands of clients and freelancers already on SkillSphere.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/register" className="btn-primary text-base px-8 py-3.5">Create Free Account</Link>
          <Link to="/freelancers" className="btn-outline text-base px-8 py-3.5">Explore Freelancers</Link>
        </div>
      </section>
    </div>
  )
}
