import { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Briefcase, 
  IndianRupee, 
  Clock, 
  Filter, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { INITIAL_FREELANCERS } from '../data/mockData';
import FreelancerModal from '../components/FreelancerModal';

const SKILL_PILLS = ['All', 'Next.js', 'React', 'TypeScript', 'Figma', 'Python', 'PyTorch', 'Flutter', 'AWS', 'SEO Strategy'];

export default function Freelancers() {
  const [freelancers] = useState(INITIAL_FREELANCERS);
  const [search, setSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const filteredFreelancers = useMemo(() => {
    return freelancers
      .filter((f) => {
        const matchesSkill = selectedSkill === 'All' || f.skills.includes(selectedSkill);
        const matchesVerified = !onlyVerified || f.verified;
        const matchesAvailable = !onlyAvailable || f.availability.toLowerCase().includes('available');

        const q = search.toLowerCase().trim();
        const matchesSearch =
          !q ||
          f.name.toLowerCase().includes(q) ||
          f.headline.toLowerCase().includes(q) ||
          f.location.toLowerCase().includes(q) ||
          f.skills.some((s) => s.toLowerCase().includes(q));

        return matchesSkill && matchesVerified && matchesAvailable && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'rate-low') return a.hourlyRate - b.hourlyRate;
        if (sortBy === 'rate-high') return b.hourlyRate - a.hourlyRate;
        if (sortBy === 'projects') return b.completedProjects - a.completedProjects;
        return 0;
      });
  }, [freelancers, selectedSkill, onlyVerified, onlyAvailable, search, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedSkill('All');
    setOnlyVerified(false);
    setOnlyAvailable(false);
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Hire Verified Freelance Talent
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Work with {filteredFreelancers.length} vetted Indian software architects, designers, and AI specialists.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by engineer name, domain (e.g. LLMs, Design Systems), or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9.5 text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field md:w-48 text-xs font-medium"
          >
            <option value="rating">Highest Rated</option>
            <option value="projects">Most Completed Jobs</option>
            <option value="rate-low">Hourly Rate: Low → High</option>
            <option value="rate-high">Hourly Rate: High → Low</option>
          </select>
        </div>

        {/* Checkboxes Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 font-medium select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Verified Pro Only
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 font-medium select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Available Now
            </label>
          </div>

          {(search || selectedSkill !== 'All' || onlyVerified || onlyAvailable) && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Skill Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SKILL_PILLS.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSkill(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              selectedSkill === s
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Freelancers Grid */}
      {filteredFreelancers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No freelancers matched</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Try resetting your filters or searching for different technical skills.
          </p>
          <button onClick={clearFilters} className="btn-outline text-xs py-2 px-4">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.map((f) => (
            <div
              key={f.id}
              onClick={() => setSelectedFreelancer(f)}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div className={`w-14 h-14 rounded-2xl ${f.avatarBg} text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-sm`}>
                    {f.avatarInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h2 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {f.name}
                      </h2>
                      {f.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Pro" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-1 font-medium">{f.headline}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {f.location}
                    </p>
                  </div>
                </div>

                {/* Rating & Availability Pill */}
                <div className="flex items-center justify-between text-xs py-2 mb-3 border-y border-slate-100">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{f.rating}</span>
                    <span className="text-slate-400 font-normal text-[11px]">({f.reviewsCount} reviews)</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {f.availability}
                  </span>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {f.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {f.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {f.skills.length > 3 && (
                    <span className="text-[11px] font-medium text-slate-400 px-1 py-0.5">
                      +{f.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="text-[11px] text-slate-400">Starting from</p>
                  <p className="font-bold text-slate-900 text-sm flex items-center gap-0.5">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {f.hourlyRate.toLocaleString()} <span className="text-xs font-normal text-slate-500">/hr</span>
                  </p>
                </div>

                <button className="btn-outline text-xs py-1.5 px-3.5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Freelancer Full Profile Modal */}
      <FreelancerModal
        freelancer={selectedFreelancer}
        isOpen={Boolean(selectedFreelancer)}
        onClose={() => setSelectedFreelancer(null)}
      />
    </div>
  );
}
