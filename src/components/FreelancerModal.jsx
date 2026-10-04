import { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Star, 
  ShieldCheck, 
  Briefcase, 
  ExternalLink, 
  MessageSquare, 
  CheckCircle2, 
  IndianRupee,
  Award,
  Sparkles
} from 'lucide-react';
import { useToast } from './Toast';

export default function FreelancerModal({ freelancer, isOpen, onClose }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' | 'reviews' | 'contact'
  const [contactMessage, setContactMessage] = useState('');
  const [projectBudget, setProjectBudget] = useState(50000);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen || !freelancer) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) {
      addToast('Please include a brief message about your project requirements.', 'error');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      addToast(`Direct inquiry sent to ${freelancer.name}! They typically respond within ${freelancer.responseTime}.`, 'success');
      setContactMessage('');
      setActiveTab('portfolio');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Profile Summary */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-2xl ${freelancer.avatarBg} text-white font-extrabold text-2xl flex items-center justify-center shadow-md shrink-0`}>
                {freelancer.avatarInitials}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {freelancer.name}
                  </h2>
                  {freelancer.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Pro
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {freelancer.badge}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600 mt-1 leading-snug">
                  {freelancer.headline}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {freelancer.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Responds {freelancer.responseTime}
                  </span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    {freelancer.availability}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-3 mt-5 p-3.5 bg-white rounded-xl border border-slate-200/80 text-center text-xs">
            <div>
              <p className="font-bold text-slate-900 text-sm flex items-center justify-center gap-0.5">
                <IndianRupee className="w-3.5 h-3.5" />
                {freelancer.hourlyRate.toLocaleString()}
              </p>
              <p className="text-slate-400 mt-0.5">Hourly Rate</p>
            </div>
            <div>
              <p className="font-bold text-amber-500 text-sm flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {freelancer.rating}
              </p>
              <p className="text-slate-400 mt-0.5">({freelancer.reviewsCount} reviews)</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">{freelancer.completedProjects}</p>
              <p className="text-slate-400 mt-0.5">Jobs Completed</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">{freelancer.experienceYears}+ Yrs</p>
              <p className="text-slate-400 mt-0.5">Experience</p>
            </div>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-slate-100 px-6 bg-white">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'portfolio'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            About & Portfolio
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Client Reviews ({freelancer.reviews?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'contact'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Hire / Inquire
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'portfolio' ? (
            <>
              {/* Bio */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Professional Summary
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {freelancer.bio}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Core Skills & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portfolio Samples */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Featured Case Studies & Projects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {freelancer.portfolio.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all group"
                    >
                      <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block mb-2">
                        {item.tag}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 group-hover:text-slate-600">
                        View Project Scope <ExternalLink className="w-3 h-3" />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : activeTab === 'reviews' ? (
            /* Reviews List */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-800">
                  Verified Client Feedback
                </span>
                <span className="text-xs text-slate-400">
                  100% Verified Contract Reviews
                </span>
              </div>
              {freelancer.reviews?.map((review, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{review.author}</p>
                      <p className="text-xs text-slate-400">{review.company} · {review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            /* Contact Form */
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm mb-0.5">Direct Invitation</p>
                  <p>Send an invitation to {freelancer.name}. They will receive an email & SMS alert to review your project brief.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Approximate Project Budget (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
                  <input
                    type="number"
                    min={1000}
                    step={1000}
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(e.target.value)}
                    className="input-field pl-8 font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Project Scope & Message
                </label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder={`Hi ${freelancer.name}, I came across your profile and would love to discuss a project involving...`}
                  className="input-field leading-relaxed resize-none"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('portfolio')}
                  className="btn-outline text-sm py-2.5 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-primary text-sm py-2.5 px-6"
                >
                  {isSending ? 'Sending Inquiry...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer for Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              ⚡ Guaranteed response within {freelancer.responseTime}
            </div>
            <button
              onClick={() => setActiveTab('contact')}
              className="btn-primary text-sm py-2.5 px-6"
            >
              Hire {freelancer.name.split(' ')[0]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
