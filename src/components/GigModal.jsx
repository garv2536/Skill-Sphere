import { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  CheckCircle2, 
  ShieldCheck, 
  Building, 
  Clock, 
  Send, 
  Bookmark, 
  Share2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../App';
import { useToast } from './Toast';

export default function GigModal({ gig, isOpen, onClose, isBookmarked, onToggleBookmark, onApplySuccess }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'apply'
  const [bidAmount, setBidAmount] = useState(gig?.budget?.min || 25000);
  const [duration, setDuration] = useState('2 weeks');
  const [coverLetter, setCoverLetter] = useState('');
  const [milestones, setMilestones] = useState([
    { title: 'Milestone 1: Architecture setup & initial screens', amount: Math.round((gig?.budget?.min || 25000) * 0.4) },
    { title: 'Milestone 2: Core feature completion & integration', amount: Math.round((gig?.budget?.min || 25000) * 0.4) },
    { title: 'Milestone 3: Testing, handover & bug fixes', amount: Math.round((gig?.budget?.min || 25000) * 0.2) }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !gig) return null;

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/gigs');
      addToast('Gig link copied to clipboard!', 'info');
    }
  };

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    if (!coverLetter.trim() || coverLetter.length < 20) {
      addToast('Please write a brief cover note (at least 20 characters) explaining your approach.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast(`Proposal of ₹${Number(bidAmount).toLocaleString()} submitted to ${gig.client.company || gig.client.name}!`, 'success');
      if (onApplySuccess) onApplySuccess(gig.id);
      setActiveTab('overview');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                {gig.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {gig.experienceLevel} Level
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {gig.projectScope}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {gig.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark && onToggleBookmark(gig.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Save gig'}
            >
              <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Share gig"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 px-6 bg-white">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Project Details
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className={`py-3.5 px-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'apply'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            Submit Proposal
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'overview' ? (
            <>
              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Budget Range</span>
                  <div className="flex items-center text-blue-700 font-bold text-base">
                    <IndianRupee className="w-4 h-4" />
                    <span>{gig.budget.min.toLocaleString()} – {gig.budget.max.toLocaleString()}</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Target Deadline</span>
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{gig.deadline}</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Location / Work Mode</span>
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{gig.location}</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Proposals Sent</span>
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{gig.proposalsCount} proposals</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  About the Project
                </h3>
                <div className="text-slate-700 leading-relaxed text-sm whitespace-pre-line bg-white p-4 rounded-xl border border-slate-100">
                  {gig.description}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Required Skills & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {gig.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client Info Card */}
              <div className="p-5 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-sm">
                    {gig.client.company ? gig.client.company.charAt(0) : 'C'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{gig.client.company || gig.client.name}</h4>
                      {gig.client.paymentVerified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800">
                          <ShieldCheck className="w-3 h-3" /> Verified Client
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      📍 {gig.client.location} · Member since {gig.client.memberSince}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs sm:border-l sm:pl-5 border-slate-200">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{gig.client.totalSpent}</p>
                    <p className="text-slate-400 mt-0.5">Total Spent</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{gig.client.hires} hires</p>
                    <p className="text-slate-400 mt-0.5">Hire History</p>
                  </div>
                  <div>
                    <p className="font-bold text-amber-500 text-sm">★ {gig.client.rating}</p>
                    <p className="text-slate-400 mt-0.5">Client Rating</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Proposal Form */
            <form onSubmit={handleProposalSubmit} className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs text-blue-900">
                <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-blue-950 mb-0.5">Tip for a winning proposal:</p>
                  <p>Explain how you have solved similar problems previously, clarify your proposed milestones, and mention your availability to start.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Proposed Bid (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
                    <input
                      type="number"
                      min={1000}
                      step={500}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="input-field pl-8 font-semibold"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Client budget: ₹{gig.budget.min.toLocaleString()} – ₹{gig.budget.max.toLocaleString()}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Estimated Delivery
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="input-field"
                  >
                    <option value="Less than 1 week">Less than 1 week</option>
                    <option value="1 to 2 weeks">1 to 2 weeks</option>
                    <option value="2 to 4 weeks">2 to 4 weeks</option>
                    <option value="1 to 2 months">1 to 2 months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Cover Letter & Technical Approach
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Hi Karthik, I have extensive experience migrating Next.js apps to the App Router and implementing Supabase RLS policies..."
                  className="input-field leading-relaxed resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Suggested Payment Milestones
                </label>
                <div className="space-y-2.5">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 bg-white text-xs">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={m.title}
                        onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                        className="flex-1 border-none focus:outline-none text-slate-800 text-xs font-medium"
                      />
                      <div className="flex items-center gap-1 font-semibold text-slate-700 shrink-0">
                        <span>₹</span>
                        <input
                          type="number"
                          value={m.amount}
                          onChange={(e) => handleMilestoneChange(idx, 'amount', Number(e.target.value))}
                          className="w-20 text-right border rounded px-1.5 py-0.5 focus:outline-none text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="btn-outline text-sm py-2.5 px-4"
                >
                  Back to Details
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-sm py-2.5 px-6"
                >
                  {isSubmitting ? 'Sending Proposal...' : 'Send Proposal Now'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions for Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              ⚡ Escrow protection enabled for this gig.
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('apply')}
                className="btn-primary text-sm py-2.5 px-6"
              >
                Apply for this Gig
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
