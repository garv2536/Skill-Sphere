import { useState } from 'react'
import { Link } from 'react-router-dom'

// ── Demo data ─────────────────────────────────────────────────
const DEMO_FREELANCERS = [
  { _id: '1', name: 'Arjun Kapoor',   role: 'Full Stack Developer',   location: 'Bangalore', rating: 4.9, reviews: 47, hourlyRate: 1800, skills: ['React', 'Node.js', 'MongoDB', 'AWS'], completedJobs: 61, verified: true,  availability: 'Available',  avatar: 'AK', color: 'bg-blue-500' },
  { _id: '2', name: 'Diya Nair',      role: 'UI/UX Designer',         location: 'Kochi',     rating: 4.8, reviews: 33, hourlyRate: 1200, skills: ['Figma', 'Adobe XD', 'Prototyping'], completedJobs: 44, verified: true,  availability: 'Available',  avatar: 'DN', color: 'bg-purple-500' },
  { _id: '3', name: 'Ravi Shankar',   role: 'Data Scientist',          location: 'Hyderabad', rating: 4.7, reviews: 28, hourlyRate: 2200, skills: ['Python', 'ML', 'TensorFlow', 'SQL'], completedJobs: 35, verified: true,  availability: 'Busy',       avatar: 'RS', color: 'bg-amber-500' },
  { _id: '4', name: 'Meera Pillai',   role: 'Mobile Developer',        location: 'Chennai',   rating: 4.9, reviews: 52, hourlyRate: 1600, skills: ['Flutter', 'React Native', 'Firebase'], completedJobs: 68, verified: true,  availability: 'Available',  avatar: 'MP', color: 'bg-emerald-500' },
  { _id: '5', name: 'Karan Malhotra', role: 'DevOps Engineer',         location: 'Delhi',     rating: 4.6, reviews: 21, hourlyRate: 2500, skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'], completedJobs: 29, verified: false, availability: 'Available',  avatar: 'KM', color: 'bg-slate-500' },
  { _id: '6', name: 'Ananya Singh',   role: 'Content Strategist',      location: 'Mumbai',    rating: 4.8, reviews: 39, hourlyRate: 800,  skills: ['SEO', 'Copywriting', 'Content Strategy'], completedJobs: 53, verified: true,  availability: 'Available',  avatar: 'AS', color: 'bg-rose-500' },
  { _id: '7', name: 'Siddharth Rao',  role: 'Blockchain Developer',    location: 'Pune',      rating: 4.5, reviews: 15, hourlyRate: 3000, skills: ['Solidity', 'Ethereum', 'Web3.js'], completedJobs: 18, verified: true,  availability: 'Busy',       avatar: 'SR', color: 'bg-teal-500' },
  { _id: '8', name: 'Lakshmi Devi',   role: 'Graphic Designer',        location: 'Mysore',    rating: 4.7, reviews: 41, hourlyRate: 900,  skills: ['Illustrator', 'Photoshop', 'Branding'], completedJobs: 57, verified: true,  availability: 'Available',  avatar: 'LD', color: 'bg-pink-500' },
]

const SKILLS_FILTER = ['All', 'React', 'Node.js', 'Python', 'Flutter', 'Figma', 'AWS', 'SEO']

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating}</span>
    </div>
  )
}

function FreelancerCard({ f }) {
  const [contacted, setContacted] = useState(false)

  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className={`${f.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0`}>
          {f.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>{f.name}</h3>
            {f.verified && (
              <span title="Verified" className="text-blue-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-0.5">{f.role}</p>
          <p className="text-xs text-slate-400 mt-0.5">📍 {f.location}</p>
        </div>
        <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${
          f.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
        }`}>
          {f.availability}
        </span>
      </div>

      <StarRating rating={f.rating} />

      <div className="flex flex-wrap gap-1.5">
        {f.skills.slice(0, 4).map(skill => (
          <span key={skill} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg font-medium">{skill}</span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100">
        {[
          { label: 'Rate/hr', value: `₹${f.hourlyRate.toLocaleString()}` },
          { label: 'Jobs done', value: f.completedJobs },
          { label: 'Reviews', value: f.reviews },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="font-semibold text-slate-800 text-sm">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setContacted(true)}
        disabled={contacted}
        className={`w-full justify-center text-sm py-2.5 rounded-xl font-medium transition-all ${
          contacted
            ? 'bg-green-100 text-green-700 cursor-default'
            : 'btn-primary'
        }`}
      >
        {contacted ? '✓ Request Sent' : 'Contact Freelancer'}
      </button>
    </div>
  )
}

export default function Freelancers() {
  const [search, setSearch]   = useState('')
  const [skill, setSkill]     = useState('All')
  const [onlyAvail, setOnlyAvail] = useState(false)
  const [sortBy, setSortBy]   = useState('rating')

  const filtered = DEMO_FREELANCERS
    .filter(f =>
      (skill === 'All' || f.skills.includes(skill)) &&
      (!onlyAvail || f.availability === 'Available') &&
      (f.name.toLowerCase().includes(search.toLowerCase()) ||
       f.role.toLowerCase().includes(search.toLowerCase()) ||
       f.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
    )
    .sort((a, b) => {
      if (sortBy === 'rating')      return b.rating - a.rating
      if (sortBy === 'rate-low')    return a.hourlyRate - b.hourlyRate
      if (sortBy === 'rate-high')   return b.hourlyRate - a.hourlyRate
      if (sortBy === 'jobs')        return b.completedJobs - a.completedJobs
      return 0
    })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="section-title mb-2">Find Freelancers</h1>
        <p className="text-slate-500">{filtered.length} verified professionals ready to work</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, role, or skill…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="input-field sm:w-48"
        >
          <option value="rating">Top Rated</option>
          <option value="jobs">Most Jobs Done</option>
          <option value="rate-low">Rate: Low → High</option>
          <option value="rate-high">Rate: High → Low</option>
        </select>
        <label className="flex items-center gap-2 cursor-pointer px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 hover:border-blue-300 transition-colors">
          <input
            type="checkbox"
            checked={onlyAvail}
            onChange={e => setOnlyAvail(e.target.checked)}
            className="rounded text-blue-600"
          />
          Available only
        </label>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SKILLS_FILTER.map(s => (
          <button
            key={s}
            onClick={() => setSkill(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              skill === s
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-4">👤</div>
          <p className="font-medium text-slate-600">No freelancers found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(f => <FreelancerCard key={f._id} f={f} />)}
        </div>
      )}
    </div>
  )
}
