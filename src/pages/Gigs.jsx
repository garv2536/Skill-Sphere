import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../App'

// ── Demo data ─────────────────────────────────────────────────
const DEMO_GIGS = [
  { _id: '1', title: 'Build a MERN Stack E-Commerce App', category: 'Web Development', budget: { min: 15000, max: 30000 }, deadline: '2026-06-20', skills: ['React', 'Node.js', 'MongoDB'], proposals: 4, status: 'open', client: { name: 'Rahul Gupta', location: 'Delhi' }, description: 'Looking for an experienced MERN developer to build a full-featured e-commerce platform with payment integration.' },
  { _id: '2', title: 'Design Mobile App UI for HealthTech Startup', category: 'UI/UX Design', budget: { min: 8000, max: 15000 }, deadline: '2026-06-15', skills: ['Figma', 'Prototyping', 'Mobile UI'], proposals: 7, status: 'open', client: { name: 'Sneha Rao', location: 'Bangalore' }, description: 'We need a talented UI/UX designer to create beautiful, intuitive designs for our health tracking mobile application.' },
  { _id: '3', title: 'Data Analysis & ML Model for Sales Prediction', category: 'Data Science', budget: { min: 20000, max: 45000 }, deadline: '2026-07-01', skills: ['Python', 'ML', 'Pandas', 'Scikit-learn'], proposals: 2, status: 'open', client: { name: 'Amit Shah', location: 'Mumbai' }, description: 'Seeking a data scientist to analyze 2 years of sales data and build a predictive model for Q3 2026.' },
  { _id: '4', title: 'Flutter App for Grocery Delivery Service', category: 'Mobile Apps', budget: { min: 25000, max: 50000 }, deadline: '2026-06-30', skills: ['Flutter', 'Dart', 'Firebase'], proposals: 5, status: 'open', client: { name: 'Priya Mehta', location: 'Pune' }, description: 'Build a cross-platform mobile app for our local grocery delivery startup with real-time tracking.' },
  { _id: '5', title: 'SEO & Content Strategy for SaaS Product', category: 'Digital Marketing', budget: { min: 5000, max: 12000 }, deadline: '2026-06-18', skills: ['SEO', 'Content Writing', 'Analytics'], proposals: 9, status: 'open', client: { name: 'Vikram Joshi', location: 'Hyderabad' }, description: 'We need a digital marketing expert to improve our SaaS product SEO and create a 3-month content roadmap.' },
  { _id: '6', title: 'WordPress Website for Architecture Firm', category: 'Web Development', budget: { min: 6000, max: 10000 }, deadline: '2026-06-12', skills: ['WordPress', 'CSS', 'WooCommerce'], proposals: 11, status: 'open', client: { name: 'Anita Verma', location: 'Chennai' }, description: 'Create a modern portfolio website for our architecture firm showcasing projects and enabling client enquiries.' },
]

const CATEGORIES = ['All', 'Web Development', 'UI/UX Design', 'Mobile Apps', 'Data Science', 'Digital Marketing', 'Content Writing']

const categoryColors = {
  'Web Development':   'bg-blue-100 text-blue-700',
  'UI/UX Design':      'bg-purple-100 text-purple-700',
  'Mobile Apps':       'bg-emerald-100 text-emerald-700',
  'Data Science':      'bg-amber-100 text-amber-700',
  'Digital Marketing': 'bg-rose-100 text-rose-700',
  'Content Writing':   'bg-teal-100 text-teal-700',
}

function GigCard({ gig }) {
  const [applied, setApplied] = useState(false)
  const { user } = useAuth()
  const daysLeft = Math.max(0, Math.ceil((new Date(gig.deadline) - new Date()) / 86400000))

  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <span className={`badge ${categoryColors[gig.category] || 'bg-slate-100 text-slate-600'} mb-2 inline-block`}>
            {gig.category}
          </span>
          <h3 className="font-semibold text-slate-900 text-base leading-snug" style={{ fontFamily: 'Syne, sans-serif' }}>
            {gig.title}
          </h3>
        </div>
        <div className={`shrink-0 text-xs px-2 py-1 rounded-lg font-medium ${daysLeft <= 5 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
          {daysLeft}d left
        </div>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{gig.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {gig.skills.slice(0, 4).map(skill => (
          <span key={skill} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">{skill}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div>
          <p className="text-blue-600 font-semibold text-sm">
            ₹{gig.budget.min.toLocaleString()} – ₹{gig.budget.max.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            📍 {gig.client.location} · {gig.proposals} proposals
          </p>
        </div>
        {user?.role === 'freelancer' ? (
          <button
            onClick={() => setApplied(true)}
            disabled={applied}
            className={`text-sm px-4 py-2 rounded-xl font-medium transition-all ${
              applied
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'btn-primary py-2 px-4'
            }`}
          >
            {applied ? '✓ Applied' : 'Apply Now'}
          </button>
        ) : (
          <Link to="/login" className="btn-outline text-sm py-2 px-4">Apply</Link>
        )}
      </div>
    </div>
  )
}

export default function Gigs() {
  const [gigs, setGigs]             = useState(DEMO_GIGS)
  const [search, setSearch]         = useState('')
  const [category, setCategory]     = useState('All')
  const [sortBy, setSortBy]         = useState('newest')
  const [loading, setLoading]       = useState(false)

  const filtered = gigs
    .filter(g =>
      (category === 'All' || g.category === category) &&
      (g.title.toLowerCase().includes(search.toLowerCase()) ||
       g.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
    )
    .sort((a, b) => {
      if (sortBy === 'budget-high') return b.budget.max - a.budget.max
      if (sortBy === 'budget-low')  return a.budget.min - b.budget.min
      if (sortBy === 'proposals')   return a.proposals - b.proposals
      return 0
    })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title mb-2">Find Gigs</h1>
        <p className="text-slate-500">{filtered.length} open projects matching your search</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search gigs or skills…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="input-field sm:w-44"
        >
          <option value="newest">Newest first</option>
          <option value="budget-high">Budget: High→Low</option>
          <option value="budget-low">Budget: Low→High</option>
          <option value="proposals">Fewest proposals</option>
        </select>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              category === cat
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gig grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-medium text-slate-600">No gigs found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(gig => <GigCard key={gig._id} gig={gig} />)}
        </div>
      )}
    </div>
  )
}
