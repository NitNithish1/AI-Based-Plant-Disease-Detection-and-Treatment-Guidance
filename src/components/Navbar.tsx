import React, { useState } from 'react';
import { History, Info, Menu, X, Sparkles, Activity, LayoutDashboard, Home } from 'lucide-react';

export type NavTab = 'home' | 'dashboard' | 'analyze' | 'results' | 'history' | 'about';

interface NavbarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  historyCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: NavTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="app-header"
      className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-emerald-950/5 shadow-[0_2px_16px_-4px_rgba(15,41,30,0.06)] transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-17">
          {/* Brand Logo & Identification */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3.5 text-left focus:outline-hidden group"
          >
            {/* Custom AI Botanical Mark */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#062317] to-[#0d4a32] text-emerald-400 p-0.5 shadow-md flex items-center justify-center group-hover:shadow-emerald-900/20 transition-all">
              <div className="w-full h-full rounded-[10px] bg-[#082a1d] flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 32 32" className="w-5 h-5 text-emerald-400">
                  {/* Botanical Leaf Silhouette */}
                  <path
                    d="M16 4C16 4 9 10 9 19C9 23.4 12.1 27 16 28C19.9 27 23 23.4 23 19C23 10 16 4 16 4Z"
                    fill="currentColor"
                    fillOpacity="0.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Central Spine */}
                  <path
                    d="M16 8V24"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  {/* High-Tech Neural Diagnostics Nodes */}
                  <circle cx="16" cy="11" r="1.5" fill="#34d399" />
                  <circle cx="12" cy="16" r="1.2" fill="#34d399" />
                  <circle cx="20" cy="16" r="1.2" fill="#34d399" />
                  <circle cx="13" cy="21" r="1.2" fill="#34d399" />
                  <circle cx="19" cy="21" r="1.2" fill="#34d399" />
                  <path d="M16 11L12 16M16 11L20 16M16 16L13 21M16 16L19 21" stroke="#34d399" strokeWidth="0.8" opacity="0.8" />
                </svg>
                {/* Subtle Radial Pulse */}
                <div className="absolute inset-0 bg-emerald-400/10 rounded-full blur-xs pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg group-hover:text-emerald-950 transition-colors">
                  PhytoGuard AI
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  AI-Powered Plant Health
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-normal hidden md:block">
                Plant Health Intelligence
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1.5">
            <button
              id="nav-link-home"
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'home'
                  ? 'bg-slate-100/90 text-slate-950 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Home
            </button>

            <button
              id="nav-link-dashboard"
              onClick={() => handleNav('dashboard')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-slate-100/90 text-slate-950 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              <span>Dashboard</span>
            </button>

            {/* Prominent Analyze Button */}
            <button
              id="nav-link-analyze"
              onClick={() => handleNav('analyze')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs hover:shadow-emerald-900/15 ${
                activeTab === 'analyze' || activeTab === 'results'
                  ? 'bg-[#062317] text-white ring-2 ring-emerald-600/30'
                  : 'bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Analyze Plant</span>
            </button>

            <button
              id="nav-link-history"
              onClick={() => handleNav('history')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-slate-100/90 text-slate-950 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <History className="w-4 h-4 text-slate-500" />
              <span>Diagnostic Logs</span>
              {historyCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                  {historyCount}
                </span>
              )}
            </button>

            <button
              id="nav-link-about"
              onClick={() => handleNav('about')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-slate-100/90 text-slate-950 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Info className="w-4 h-4 text-slate-500" />
              <span>Platform Specs</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="btn-mobile-analyze"
              onClick={() => handleNav('analyze')}
              className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-700 to-teal-700 text-white text-xs font-semibold rounded-lg shadow-xs inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-emerald-300" />
              Analyze
            </button>
            <button
              id="btn-toggle-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
              activeTab === 'home' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600'
            }`}
          >
            Home Overview
          </button>
          <button
            onClick={() => handleNav('dashboard')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 ${
              activeTab === 'dashboard' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-500" />
            <span>Farm & Lab Dashboard</span>
          </button>
          <button
            onClick={() => handleNav('analyze')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-[#062317] text-white flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Analyze Plant Specimen</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300">Scanner</span>
          </button>
          <button
            onClick={() => handleNav('history')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
              activeTab === 'history' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" />
              <span>Diagnostic Logs</span>
            </div>
            {historyCount > 0 && (
              <span className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-800 rounded-full font-bold">
                {historyCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 ${
              activeTab === 'about' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600'
            }`}
          >
            <Info className="w-4 h-4 text-slate-500" />
            <span>Platform Specs & AI Architecture</span>
          </button>
        </div>
      )}
    </header>
  );
};
