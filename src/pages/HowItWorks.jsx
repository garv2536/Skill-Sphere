import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Users, 
  Lock, 
  Award, 
  Zap, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';

export default function HowItWorks() {
  const [roleTab, setRoleTab] = useState('client'); // 'client' | 'freelancer'

  const steps = roleTab === 'client' ? HOW_IT_WORKS_STEPS.client : HOW_IT_WORKS_STEPS.freelancer;

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5" /> Transparent & Milestone Protected
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
            How SkillSphere Works
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether you are hiring high-caliber technical talent or finding high-paying engineering contracts, our milestone escrow protects your time and money.
          </p>

          {/* Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/70 mt-8">
            <button
              onClick={() => setRoleTab('client')}
              className={`py-2 px-6 rounded-lg text-sm font-semibold transition-all ${
                roleTab === 'client'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Clients & Founders
            </button>
            <button
              onClick={() => setRoleTab('freelancer')}
              className={`py-2 px-6 rounded-lg text-sm font-semibold transition-all ${
                roleTab === 'freelancer'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Freelancers & Agencies
            </button>
          </div>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm relative overflow-hidden group hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="text-4xl font-extrabold text-blue-600/20 mb-4 font-mono">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Security & Escrow Breakdown */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-blue-400 font-semibold text-xs uppercase tracking-wider">
                Peace of Mind Guarantee
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                Milestone Escrow Powered by Razorpay
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Never worry about unpaid invoices or incomplete deliverables. Funds stay safely held in RBI-compliant escrow until milestone acceptance criteria are satisfied.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Milestone funds are pre-funded before work begins</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Client has 14 days to review and request revisions</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Dispute mediation handled by senior engineering arbiters</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <span className="text-xs font-semibold text-slate-400">Escrow Milestone Tracker</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">Active Contract</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Milestone 1: Backend API</p>
                  <p className="text-xs text-slate-400">Approved & Released</p>
                </div>
                <span className="text-sm font-bold text-emerald-400">₹35,000 ✓</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Milestone 2: Frontend Integration</p>
                  <p className="text-xs text-amber-400">In Review (Escrow Secured)</p>
                </div>
                <span className="text-sm font-bold text-amber-400">₹40,000 🔒</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm mt-2">Everything you need to know about billing and contracts</p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <h4 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                What are the platform commission fees?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                SkillSphere charges a flat 5% platform fee for clients and an 8% service fee for freelancers on completed milestone payouts. No hidden charges or subscription gates.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <h4 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                How are freelancers vetted and verified?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Freelancers undergo identity verification (Aadhaar/PAN/GST), GitHub/Portfolio code reviews, and past client reference checks before receiving a "Verified Pro" badge.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <h4 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                Can I hire for full-time retainers or remote contracts?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes! Many companies on SkillSphere hire on ongoing monthly retainers (e.g., 20 hrs/week) with automated monthly milestone releases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
