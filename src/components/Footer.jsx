import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Heart, Globe, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
                S
              </div>
              <span className="font-bold text-white text-xl tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                Skill<span className="text-blue-400">Sphere</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India’s trusted marketplace connecting ambitious founders and engineering teams with verified freelance architects, designers, and developers.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors" title="X (Twitter)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors" title="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors" title="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* For Clients */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              For Clients
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/freelancers" className="hover:text-white transition-colors">Find Freelancers</Link></li>
              <li><Link to="/gigs" className="hover:text-white transition-colors">Explore Projects</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Milestone Escrow</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise Talent</a></li>
            </ul>
          </div>

          {/* For Talent */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              For Freelancers
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/gigs" className="hover:text-white transition-colors">Browse Open Gigs</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Join as Talent</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Payment Protection</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Direct Payouts</a></li>
            </ul>
          </div>

          {/* Company & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How SkillSphere Works</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GST & Tax Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Razorpay Secured Escrow
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-4 h-4 text-blue-400" /> 256-bit Encrypted
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Globe className="w-4 h-4 text-amber-400" /> GST Compliant (India)
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>SkillSphere Ecosystem © {new Date().getFullYear()}. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Indian Builders.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
