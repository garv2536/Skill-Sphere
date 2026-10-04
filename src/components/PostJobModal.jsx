import { useState } from 'react';
import { X, Plus, Sparkles, Building, MapPin, IndianRupee, Layers } from 'lucide-react';
import { useAuth } from '../App';
import { useToast } from './Toast';

const CATEGORIES = [
  'Web Development',
  'UI/UX Design',
  'AI & Data Science',
  'Mobile Apps',
  'Cloud & DevOps',
  'Content & Growth'
];

export default function PostJobModal({ isOpen, onClose, onJobCreated }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [form, setForm] = useState({
    title: '',
    category: 'Web Development',
    minBudget: 25000,
    maxBudget: 50000,
    experienceLevel: 'Intermediate',
    projectScope: 'Medium (2-4 weeks)',
    location: 'Bengaluru (Remote OK)',
    isRemote: true,
    skillsInput: '',
    skills: ['React', 'Node.js', 'Tailwind CSS'],
    deadline: '2026-07-15',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddSkill = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && form.skillsInput.trim()) {
      e.preventDefault();
      const newSkill = form.skillsInput.trim().replace(',', '');
      if (!form.skills.includes(newSkill)) {
        setForm({
          ...form,
          skills: [...form.skills, newSkill],
          skillsInput: ''
        });
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setForm({
      ...form,
      skills: form.skills.filter((s) => s !== skillToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || form.title.length < 10) {
      addToast('Please enter a descriptive project title (at least 10 characters).', 'error');
      return;
    }
    if (!form.description.trim() || form.description.length < 30) {
      addToast('Please provide a detailed project description (at least 30 characters).', 'error');
      return;
    }
    if (Number(form.minBudget) > Number(form.maxBudget)) {
      addToast('Minimum budget cannot exceed maximum budget.', 'error');
      return;
    }

    setIsSubmitting(true);

    const newGig = {
      id: 'gig-' + Date.now(),
      title: form.title,
      category: form.category,
      subcategory: form.category,
      budget: {
        min: Number(form.minBudget),
        max: Number(form.maxBudget),
        type: 'fixed'
      },
      deadline: form.deadline,
      experienceLevel: form.experienceLevel,
      projectScope: form.projectScope,
      location: form.location,
      isRemote: form.isRemote,
      skills: form.skills.length > 0 ? form.skills : ['Full Stack', 'Engineering'],
      proposalsCount: 0,
      featured: true,
      client: {
        name: user?.name || 'Verified Client',
        company: user?.company || (user?.name ? `${user.name}'s Studio` : 'TechVentures India'),
        rating: 5.0,
        totalSpent: '₹1.2 Lakhs',
        hires: 1,
        location: form.location,
        paymentVerified: true,
        memberSince: 'Just now'
      },
      description: form.description,
      postedAt: 'Just now'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onJobCreated(newGig);
      addToast('Gig published successfully! Talent will start bidding shortly.', 'success');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Post a Project or Contract
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish your requirements to thousands of verified freelance developers and designers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Build a Responsive Web Application with Next.js & Stripe Payments"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field font-medium"
              required
            />
          </div>

          {/* Category & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="input-field"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Experience Level
              </label>
              <select
                value={form.experienceLevel}
                onChange={(e) => setForm({ ...form, experienceLevel: e.target.value })}
                className="input-field"
              >
                <option value="Entry">Entry Level</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Senior">Senior / Architect</option>
                <option value="Expert">Expert Specialist</option>
              </select>
            </div>
          </div>

          {/* Budget Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Min Budget (INR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
                <input
                  type="number"
                  step={1000}
                  min={1000}
                  value={form.minBudget}
                  onChange={(e) => setForm({ ...form, minBudget: e.target.value })}
                  className="input-field pl-8"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Max Budget (INR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
                <input
                  type="number"
                  step={1000}
                  min={1000}
                  value={form.maxBudget}
                  onChange={(e) => setForm({ ...form, maxBudget: e.target.value })}
                  className="input-field pl-8"
                  required
                />
              </div>
            </div>
          </div>

          {/* Scope & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Project Scope & Duration
              </label>
              <select
                value={form.projectScope}
                onChange={(e) => setForm({ ...form, projectScope: e.target.value })}
                className="input-field"
              >
                <option value="Small (< 2 weeks)">Small (&lt; 2 weeks)</option>
                <option value="Medium (2-4 weeks)">Medium (2-4 weeks)</option>
                <option value="Large (1-2 months)">Large (1-2 months)</option>
                <option value="Ongoing Retainer">Ongoing Retainer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Target Deadline
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Location & Remote */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Preferred Location / Hub
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Bengaluru, NCR, Mumbai, or 100% Remote"
              className="input-field"
            />
          </div>

          {/* Skills Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Required Skills (Press Enter or Comma to add)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type a skill (e.g. TypeScript, Figma, GraphQL) and press Enter..."
              value={form.skillsInput}
              onChange={(e) => setForm({ ...form, skillsInput: e.target.value })}
              onKeyDown={handleAddSkill}
              className="input-field"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Detailed Deliverables & Requirements *
            </label>
            <textarea
              rows={5}
              placeholder="Describe the problem you are solving, key features needed, existing tech stack, and any milestone expectations..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-field resize-none leading-relaxed"
              required
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline text-sm py-2.5 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary text-sm py-2.5 px-6"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Gig Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
