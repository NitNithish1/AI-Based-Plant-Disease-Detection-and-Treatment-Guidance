import React from 'react';
import { ShieldCheck, Cpu, Code2, Sparkles } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="app-footer" className="bg-[#051a11] text-slate-300 border-t border-emerald-950/40 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Platform Summary */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-emerald-300 flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-white font-extrabold text-base tracking-tight">
                PhytoGuard AI
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              A modern foliar pathology intelligence platform utilizing multimodal vision models and convolutional neural network paradigms to empower farmers, agronomists, and researchers with rapid foliar pathogen diagnostics.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1.5 bg-[#08261a] px-2.5 py-1 rounded-lg border border-emerald-800/40 text-emerald-300 font-mono">
                <Cpu className="w-3 h-3 text-emerald-400" />
                Multimodal Neural Vision
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#08261a] px-2.5 py-1 rounded-lg border border-emerald-800/40 text-emerald-300 font-mono">
                <Code2 className="w-3 h-3 text-emerald-400" />
                IPM Agronomic Regimens
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Platform Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-400 transition-colors">
                  Farm & Lab Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analyze')} className="hover:text-emerald-400 transition-colors">
                  Analyze Leaf Specimen
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history')} className="hover:text-emerald-400 transition-colors">
                  Diagnostic Logs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors">
                  Platform Architecture & Specs
                </button>
              </li>
            </ul>
          </div>

          {/* Agronomic Safety Notice */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Agronomic Safety
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Diagnostic outputs are probabilistic evaluations intended for scouting assistance and field decision support. Always inspect multiple specimens and consult registered agronomic extension personnel before applying chemical treatments.
            </p>
          </div>
        </div>

        <div className="border-t border-emerald-950/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} PhytoGuard AI • AI-Based Plant Disease Detection and Treatment Guidance.</p>
          <p>Precision foliar diagnostics and sustainable crop health intelligence.</p>
        </div>
      </div>
    </footer>
  );
};
