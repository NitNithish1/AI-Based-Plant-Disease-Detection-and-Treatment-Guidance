import React, { useState, useEffect } from 'react';
import {
  Activity,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  Eye,
  Scan,
  RotateCw,
  Cpu
} from 'lucide-react';

interface InteractiveLeafScanProps {
  isScanning?: boolean;
  scanProgress?: number;
  interactive?: boolean;
  className?: string;
  customStats?: {
    leafArea?: string;
    diseaseProb?: string;
    severity?: string;
    healthScore?: string;
  };
}

export const InteractiveLeafScan: React.FC<InteractiveLeafScanProps> = ({
  isScanning = true,
  scanProgress,
  interactive = true,
  className = '',
  customStats
}) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);
  const [scanActive, setScanActive] = useState<boolean>(isScanning);
  const [showLesions, setShowLesions] = useState<boolean>(true);

  useEffect(() => {
    setScanActive(isScanning);
  }, [isScanning]);

  const stats = {
    leafArea: customStats?.leafArea || '48.6 cm²',
    diseaseProb: customStats?.diseaseProb || '96.8%',
    severity: customStats?.severity || '24% (Mild)',
    healthScore: customStats?.healthScore || '86 / 100'
  };

  const hotspots = [
    {
      id: 0,
      x: '38%',
      y: '44%',
      label: 'Target Spot Cluster',
      tag: 'Alternaria solani',
      type: 'lesion',
      metric: '96.8% Pathogen Probability'
    },
    {
      id: 1,
      x: '64%',
      y: '58%',
      label: 'Chlorotic Margin',
      tag: 'Halo Necrosis',
      type: 'chlorosis',
      metric: 'Mild Tissue Depletion'
    },
    {
      id: 2,
      x: '50%',
      y: '22%',
      label: 'Apical Blade Tip',
      tag: 'Healthy Margin',
      type: 'healthy',
      metric: 'Normal Chlorophyll Density'
    },
    {
      id: 3,
      x: '48%',
      y: '78%',
      label: 'Basal Petiole Node',
      tag: 'Vascular Tissue',
      type: 'healthy',
      metric: 'Intact Petiolar System'
    }
  ];

  return (
    <div
      id="interactive-leaf-scanner-container"
      className={`relative w-full rounded-3xl bg-gradient-to-b from-[#051c13] via-[#04160f] to-[#020d09] border border-emerald-600/30 p-4 sm:p-6 text-white shadow-2xl overflow-hidden select-none ${className}`}
    >
      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 scanner-grid-dark opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top HUD Control Bar */}
      <div className="relative z-20 flex items-center justify-between pb-3.5 border-b border-emerald-900/60 text-xs">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className={`w-2.5 h-2.5 rounded-full ${scanActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'} absolute`} />
            <span className={`w-2 h-2 rounded-full ${scanActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
          </div>
          <span className="font-mono font-bold tracking-wider text-emerald-300 text-[11px] sm:text-xs">
            {scanActive ? 'AI LEAF SCAN ACTIVE' : 'SCANNER IDLE'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {interactive && (
            <>
              <button
                type="button"
                onClick={() => setScanActive(!scanActive)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition border ${
                  scanActive
                    ? 'bg-emerald-900/80 text-emerald-300 border-emerald-600/60'
                    : 'bg-black/40 text-slate-400 border-slate-700 hover:text-white'
                }`}
                title="Toggle Scan Line"
              >
                {scanActive ? 'PAUSE SCAN' : 'RESUME SCAN'}
              </button>

              <button
                type="button"
                onClick={() => setShowLesions(!showLesions)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition border ${
                  showLesions
                    ? 'bg-emerald-900/80 text-emerald-300 border-emerald-600/60'
                    : 'bg-black/40 text-slate-400 border-slate-700 hover:text-white'
                }`}
                title="Toggle Lesion Overlay"
              >
                LESIONS: {showLesions ? 'ON' : 'OFF'}
              </button>
            </>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-800/40 text-[10px] font-mono text-emerald-300">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>48.2 FPS</span>
          </div>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative my-4 aspect-4/3 sm:aspect-16/10 rounded-2xl bg-[#020b07] border border-emerald-800/40 overflow-hidden flex items-center justify-center">
        {/* Optical Reticle Frame */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400 pointer-events-none z-20" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400 pointer-events-none z-20" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400 pointer-events-none z-20" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400 pointer-events-none z-20" />

        {/* Center Optical Target Crosshair */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
          <div className="w-48 h-48 rounded-full border border-dashed border-emerald-400/40 animate-radar" />
          <div className="w-32 h-32 rounded-full border border-emerald-400/30" />
        </div>

        {/* Realistic SVG Botanical Leaf Specimen */}
        <svg
          viewBox="0 0 360 260"
          className="w-full h-full max-h-[260px] relative z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
        >
          <defs>
            <linearGradient id="leafBladeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="25%" stopColor="#10b981" />
              <stop offset="65%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>

            <radialGradient id="lesionRadialGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#78350f" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#b45309" stopOpacity="0.85" />
              <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Leaf Lamina / Blade Contour with Anatomical Serration */}
          <path
            d="M 180,18 C 245,50 290,125 265,190 C 235,225 200,238 180,242 C 160,238 125,225 95,190 C 70,125 115,50 180,18 Z"
            fill="url(#leafBladeGradient)"
            stroke="#34d399"
            strokeWidth="2.2"
            opacity="0.95"
          />

          {/* Primary Central Midrib / Spine */}
          <path
            d="M 180,22 Q 181,130 180,242"
            stroke="#064e3b"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Lateral Secondary Vein Network */}
          <path d="M 180,60 Q 225,76 250,94" stroke="#047857" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 180,60 Q 135,76 110,94" stroke="#047857" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 180,105 Q 235,122 260,144" stroke="#047857" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 180,105 Q 125,122 100,144" stroke="#047857" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 180,150 Q 230,170 250,194" stroke="#047857" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 180,150 Q 130,170 110,194" stroke="#047857" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 180,190 Q 215,205 230,220" stroke="#047857" strokeWidth="1.6" fill="none" opacity="0.7" />
          <path d="M 180,190 Q 145,205 130,220" stroke="#047857" strokeWidth="1.6" fill="none" opacity="0.7" />

          {/* Pathological Lesions Overlay (Toggleable) */}
          {showLesions && (
            <g className="transition-opacity duration-300">
              {/* Primary Alternaria Target Spot (Concentric Rings) */}
              <circle cx="140" cy="118" r="30" fill="url(#lesionRadialGlow)" />
              <circle cx="140" cy="118" r="22" stroke="#451a03" strokeWidth="1.6" fill="none" strokeDasharray="3 2" />
              <circle cx="140" cy="118" r="14" stroke="#292524" strokeWidth="2" fill="#1c1917" />
              <circle cx="140" cy="118" r="6" fill="#0c0a09" />

              {/* Secondary Lesion Cluster */}
              <circle cx="225" cy="155" r="22" fill="url(#lesionRadialGlow)" />
              <circle cx="225" cy="155" r="13" stroke="#451a03" strokeWidth="1.6" fill="#292524" opacity="0.85" />
            </g>
          )}

          {/* Interactive Hotspot Targets */}
          {interactive && (
            <>
              {hotspots.map((hs) => (
                <g
                  key={hs.id}
                  className="cursor-pointer group"
                  onClick={() => setActiveHotspot(hs.id)}
                >
                  <circle
                    cx={hs.id === 0 ? 140 : hs.id === 1 ? 225 : hs.id === 2 ? 180 : 180}
                    cy={hs.id === 0 ? 118 : hs.id === 1 ? 155 : hs.id === 2 ? 55 : 210}
                    r={activeHotspot === hs.id ? 10 : 8}
                    fill={hs.type === 'lesion' ? '#ef4444' : hs.type === 'chlorosis' ? '#f59e0b' : '#10b981'}
                    fillOpacity="0.35"
                    className="animate-ping"
                  />
                  <circle
                    cx={hs.id === 0 ? 140 : hs.id === 1 ? 225 : hs.id === 2 ? 180 : 180}
                    cy={hs.id === 0 ? 118 : hs.id === 1 ? 155 : hs.id === 2 ? 55 : 210}
                    r={activeHotspot === hs.id ? 6 : 5}
                    fill={hs.type === 'lesion' ? '#ef4444' : hs.type === 'chlorosis' ? '#f59e0b' : '#10b981'}
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    className="transition-transform group-hover:scale-125"
                  />
                </g>
              ))}
            </>
          )}
        </svg>

        {/* Glowing Animated Laser Scanning Line */}
        {scanActive && (
          <div
            className="animate-scanline w-full h-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent shadow-[0_0_16px_#34d399] pointer-events-none z-30"
            style={scanProgress !== undefined ? { top: `${scanProgress}%`, animation: 'none' } : undefined}
          />
        )}

        {/* 4 FLOATING GLASSMORPHISM AI DATA POINTS AROUND THE LEAF */}
        {/* Top-Left: Leaf Area */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 backdrop-blur-md bg-black/65 border border-emerald-500/30 rounded-xl px-3 py-2 text-left shadow-lg">
          <div className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Leaf Area
          </div>
          <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
            {stats.leafArea}
          </div>
        </div>

        {/* Top-Right: Disease Probability */}
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 backdrop-blur-md bg-black/65 border border-emerald-500/30 rounded-xl px-3 py-2 text-right shadow-lg">
          <div className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-end gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Disease Probability
          </div>
          <div className="text-xs sm:text-sm font-extrabold text-rose-300 tracking-tight">
            {stats.diseaseProb}
          </div>
        </div>

        {/* Bottom-Left: Severity */}
        <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-20 backdrop-blur-md bg-black/65 border border-emerald-500/30 rounded-xl px-3 py-2 text-left shadow-lg">
          <div className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Severity
          </div>
          <div className="text-xs sm:text-sm font-extrabold text-amber-300 tracking-tight">
            {stats.severity}
          </div>
        </div>

        {/* Bottom-Right: Health Score */}
        <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 backdrop-blur-md bg-black/65 border border-emerald-500/30 rounded-xl px-3 py-2 text-right shadow-lg">
          <div className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-end gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Health Score
          </div>
          <div className="text-xs sm:text-sm font-extrabold text-emerald-300 tracking-tight">
            {stats.healthScore}
          </div>
        </div>
      </div>

      {/* Interactive Hotspot Inspector Card */}
      {interactive && activeHotspot !== null && (
        <div className="relative z-20 bg-[#08261a]/90 backdrop-blur-md rounded-2xl p-3.5 border border-emerald-700/50 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  hotspots[activeHotspot].type === 'lesion'
                    ? 'bg-rose-400'
                    : hotspots[activeHotspot].type === 'chlorosis'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
              />
              <span className="font-bold text-white text-xs sm:text-sm">
                {hotspots[activeHotspot].label}
              </span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                {hotspots[activeHotspot].tag}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono">
              {hotspots[activeHotspot].metric}
            </p>
          </div>

          <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Click any marker above to inspect</span>
          </div>
        </div>
      )}
    </div>
  );
};
