import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Star, 
  MapPin, 
  IndianRupee, 
  CheckCircle2, 
  Briefcase, 
  Code, 
  Palette, 
  Cpu, 
  Smartphone, 
  Server, 
  PenTool,
  Sparkles,
  Lock
} from 'lucide-react';
import { INITIAL_GIGS, INITIAL_FREELANCERS, CATEGORIES_LIST } from '../data/mockData';
import GigModal from '../components/GigModal';
import FreelancerModal from '../components/FreelancerModal';

export default function Home({ gigs = INITIAL_GIGS, bookmarks = [], onToggleBookmark }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGig, setSelectedGig] = useState(null);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const iconMap = {
    Code: Code,
    Palette: Palette,
    Cpu: Cpu,
    Smartphone: Smartphone,
    Server: Server,
    PenTool: PenTool
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/gigs?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/gigs');
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-blue-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Trusted by 1,400+ Indian Startups & Tech Teams</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto" style={{ fontFamily: 'Syne, sans-serif' }}>
            Hire top Indian freelance engineers & designers, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300">on demand.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Skip recruiter spam. Connect directly with verified full-stack developers, UI/UX designers, and AI specialists with milestone-protected contracts.
          </p>

          {/* Search Box */}
          <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-2xl shadow-xl border border-slate-200">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search skills e.g. Next.js, Figma, PyTorch, React Native..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto px-7 py-3 text-sm rounded-xl shrink-0 justify-center"
              >
                Find Work
              </button>
            </div>
          </form>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800 text-slate-400 text-xs sm:text-sm">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Razorpay Escrow Protected</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Identity & Code Vetted</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <IndianRupee className="w-4 h-4 text-amber-400" />
              <span>Zero Upfront Platform Fees</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>RBI-Compliant Payouts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
              Skill Domains
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
              Explore High-Demand Categories
            </h2>
          </div>
          <Link to="/gigs" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Browse all gigs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES_LIST.map((cat) => {
            const Icon = iconMap[cat.iconName] || Code;
            return (
              <Link
                key={cat.id}
                to={`/gigs?category=${encodeURIComponent(cat.name)}`}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{cat.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Gigs Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
              Fresh Opportunities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
              Latest Featured Projects & Contracts
            </h2>
          </div>
          <Link to="/gigs" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all {gigs.length} open gigs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.slice(0, 3).map((gig) => (
            <div
              key={gig.id}
              onClick={() => setSelectedGig(gig)}
              className="card p-6 flex flex-col justify-between cursor-pointer group hover:border-blue-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    {gig.category}
                  </span>
                  <span className="text-xs text-slate-400">{gig.postedAt}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
                  {gig.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {gig.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {gig.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                      {skill}
                    </span>
                  ))}
                  {gig.skills.length > 3 && (
                    <span className="text-[11px] text-slate-400 px-1 py-0.5">+{gig.skills.length - 3}</span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-blue-700 text-sm">
                    ₹{gig.budget.min.toLocaleString()} – ₹{gig.budget.max.toLocaleString()}
                  </p>
                  <p className="text-slate-400 mt-0.5">📍 {gig.location}</p>
                </div>
                <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Freelancers Spotlight */}
      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
                Vetted Professionals
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                Hire Top-Rated Independent Talent
              </h2>
            </div>
            <Link to="/freelancers" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Explore all talent <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_FREELANCERS.slice(0, 3).map((f) => (
              <div
                key={f.id}
                onClick={() => setSelectedFreelancer(f)}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${f.avatarBg} text-white font-bold text-xl flex items-center justify-center shrink-0`}>
                      {f.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-base">{f.name}</h3>
                        {f.verified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{f.headline}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">📍 {f.location}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {f.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {f.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">₹{f.hourlyRate.toLocaleString()}/hr</span>
                    <div className="flex items-center gap-1 text-amber-500 font-semibold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {f.rating} ({f.reviewsCount})
                    </div>
                  </div>
                  <button className="btn-outline text-xs py-1.5 px-3">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
            Founder Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
            What Indian Tech Leaders Say About Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "We needed a Next.js App Router specialist for our fintech dashboard. Within 48 hours, we hired Aarav on SkillSphere and closed our sprint ahead of schedule."
            </p>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-900">Karthik Raman</p>
              <p className="text-[11px] text-slate-400">Founder, OrbitPay Technologies</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "The milestone escrow protection gave us the confidence to hire remote designers across Pune and Kochi. No invoicing arguments, just crisp Figma deliverables."
            </p>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-900">Pooja Agarwal</p>
              <p className="text-[11px] text-slate-400">VP Product, KwikKart</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "Finding applied ML specialists who actually understand Indian regulatory data was tough until SkillSphere. Found an IIT-M engineer in 3 days."
            </p>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-900">Adv. Suresh Mehta</p>
              <p className="text-[11px] text-slate-400">Director, NyayaAI Labs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              Ready to build your next milestone?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Join thousands of founders and freelance specialists collaborating with verified contracts and guaranteed payouts.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link to="/register" className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-xl transition shadow-md">
                Create Free Account
              </Link>
              <Link to="/gigs" className="bg-blue-600/60 hover:bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition">
                Browse Open Gigs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <GigModal
        gig={selectedGig}
        isOpen={Boolean(selectedGig)}
        onClose={() => setSelectedGig(null)}
        isBookmarked={selectedGig ? bookmarks.includes(selectedGig.id) : false}
        onToggleBookmark={onToggleBookmark}
      />

      <FreelancerModal
        freelancer={selectedFreelancer}
        isOpen={Boolean(selectedFreelancer)}
        onClose={() => setSelectedFreelancer(null)}
      />
    </div>
  );
}
