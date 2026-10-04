import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Bookmark, 
  ShieldCheck, 
  Calendar, 
  PlusCircle, 
  X,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';
import GigModal from '../components/GigModal';
import PostJobModal from '../components/PostJobModal';
import { useAuth } from '../App';
import { useToast } from '../components/Toast';

const CATEGORIES = [
  'All',
  'Web Development',
  'UI/UX Design',
  'AI & Data Science',
  'Mobile Apps',
  'Cloud & DevOps',
  'Content & Growth'
];

const EXPERIENCE_LEVELS = ['All', 'Entry', 'Intermediate', 'Senior', 'Expert'];

export default function Gigs({ gigs, onJobCreated, bookmarks = [], onToggleBookmark }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get('category') || 'All';
  const urlSearch = searchParams.get('q') || '';
  const urlSavedOnly = searchParams.get('saved') === 'true';

  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState(urlCategory);
  const [experience, setExperience] = useState('All');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(urlSavedOnly);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedGig, setSelectedGig] = useState(null);
  const [postJobOpen, setPostJobOpen] = useState(false);

  // Sync state if URL query param changes
  useEffect(() => {
    if (urlCategory) setCategory(urlCategory);
    if (urlSearch) setSearch(urlSearch);
    if (urlSavedOnly) setSavedOnly(true);
  }, [urlCategory, urlSearch, urlSavedOnly]);

  const filteredGigs = useMemo(() => {
    return gigs
      .filter((g) => {
        const matchesCategory = category === 'All' || g.category === category;
        const matchesExperience = experience === 'All' || g.experienceLevel === experience;
        const matchesRemote = !remoteOnly || g.isRemote;
        const matchesSaved = !savedOnly || bookmarks.includes(g.id);
        
        const q = search.toLowerCase().trim();
        const matchesSearch =
          !q ||
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.skills.some((s) => s.toLowerCase().includes(q)) ||
          (g.client?.company && g.client.company.toLowerCase().includes(q));

        return matchesCategory && matchesExperience && matchesRemote && matchesSaved && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'budget-high') return b.budget.max - a.budget.max;
        if (sortBy === 'budget-low') return a.budget.min - b.budget.min;
        if (sortBy === 'proposals') return a.proposalsCount - b.proposalsCount;
        return 0; // 'newest' default
      });
  }, [gigs, category, experience, remoteOnly, savedOnly, search, sortBy, bookmarks]);

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setExperience('All');
    setRemoteOnly(false);
    setSavedOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };

  const handleApplySuccess = (gigId) => {
    // Optionally update proposal counts
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header & Post Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Open Engineering & Design Gigs
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse {filteredGigs.length} active freelance contracts with milestone payment security.
          </p>
        </div>
        <button
          onClick={() => setPostJobOpen(true)}
          className="btn-primary text-sm py-2.5 px-4 self-start sm:self-auto flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Post a Gig
        </button>
      </div>

      {/* Main Search & Sort Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by job title, tech stack (Next.js, Python), or company..."
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

          {/* Experience Level */}
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="input-field md:w-44 text-xs font-medium"
          >
            {EXPERIENCE_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl === 'All' ? 'All Experience Levels' : `${lvl} Level`}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field md:w-44 text-xs font-medium"
          >
            <option value="newest">Newest First</option>
            <option value="budget-high">Budget: High → Low</option>
            <option value="budget-low">Budget: Low → High</option>
            <option value="proposals">Fewest Proposals</option>
          </select>
        </div>

        {/* Filters and Toggles Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 font-medium select-none">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              100% Remote Only
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 font-medium select-none">
              <input
                type="checkbox"
                checked={savedOnly}
                onChange={(e) => setSavedOnly(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Saved Bookmarks ({bookmarks.length})
            </label>
          </div>

          {(search || category !== 'All' || experience !== 'All' || remoteOnly || savedOnly) && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              category === cat
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gigs List / Empty State */}
      {filteredGigs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching gigs found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Try adjusting your search terms, changing the category, or removing remote filters.
          </p>
          <button
            onClick={clearFilters}
            className="btn-outline text-xs py-2 px-4"
          >
            Clear Search & Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => {
            const isSaved = bookmarks.includes(gig.id);

            return (
              <div
                key={gig.id}
                onClick={() => setSelectedGig(gig)}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        {gig.category}
                      </span>
                      <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {gig.experienceLevel}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(gig.id);
                      }}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-rose-50 border-rose-200 text-rose-600'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                      title={isSaved ? 'Remove bookmark' : 'Save gig'}
                    >
                      <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {gig.title}
                  </h2>

                  {/* Description snippet */}
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {gig.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {gig.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {gig.skills.length > 3 && (
                      <span className="text-[11px] font-medium text-slate-400 px-1 py-0.5">
                        +{gig.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center font-bold text-blue-700 text-sm">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>{gig.budget.min.toLocaleString()} – {gig.budget.max.toLocaleString()}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {gig.location}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-block text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                      {gig.proposalsCount} proposals
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{gig.postedAt}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Gig Modal Details & Proposals */}
      <GigModal
        gig={selectedGig}
        isOpen={Boolean(selectedGig)}
        onClose={() => setSelectedGig(null)}
        isBookmarked={selectedGig ? bookmarks.includes(selectedGig.id) : false}
        onToggleBookmark={onToggleBookmark}
        onApplySuccess={handleApplySuccess}
      />

      {/* Post a Gig Modal */}
      <PostJobModal
        isOpen={postJobOpen}
        onClose={() => setPostJobOpen(false)}
        onJobCreated={onJobCreated}
      />
    </div>
  );
}
