import React from 'react';
import { SeverityLevel } from '../types/plant';
import { Activity, Heart, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SeverityGaugeProps {
  score: number;
  severity: SeverityLevel;
}

export const SeverityGauge: React.FC<SeverityGaugeProps> = ({ score, severity }) => {
  const clampedScore = Math.max(0, Math.min(100, score));
  const healthScore = Math.max(0, 100 - clampedScore);

  // SVG circular arc calculations (radius 48, circumference ~301.6)
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  let strokeColor = '#10b981'; // emerald
  let badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  let levelLabel = 'Minimal / Normal Tissue';

  if (clampedScore > 70 || severity === 'Severe') {
    strokeColor = '#f43f5e'; // rose-500
    badgeBg = 'bg-rose-50 text-rose-800 border-rose-200';
    levelLabel = 'Critical Foliar Necrosis (>70%)';
  } else if (clampedScore > 35 || severity === 'Moderate') {
    strokeColor = '#f97316'; // orange-500
    badgeBg = 'bg-orange-50 text-orange-800 border-orange-200';
    levelLabel = 'Moderate Canopy Lesions (35% - 70%)';
  } else if (clampedScore > 0 || severity === 'Mild') {
    strokeColor = '#eab308'; // amber-500
    badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
    levelLabel = 'Localized Initial Infection (<35%)';
  }

  return (
    <div id="severity-gauge-card" className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Circular Visualization */}
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
              {/* Background circle track */}
              <circle
                cx="55"
                cy="55"
                r={radius}
                stroke="#e2e8f0"
                strokeWidth="9"
                fill="none"
              />
              {/* Animated Progress Arc */}
              <circle
                cx="55"
                cy="55"
                r={radius}
                stroke={strokeColor}
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Center Label */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-base font-extrabold text-slate-900 tracking-tight leading-none font-mono">
                {clampedScore}%
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                Severity
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              CANOPY SEVERITY INDEX
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">
                {severity === 'None' ? 'HEALTHY' : severity}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${badgeBg}`}>
                {levelLabel.split('(')[0]}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Calculated from necrotic lesion surface area ratio and halo chlorosis spread.
            </p>
          </div>
        </div>

        {/* Plant Health Score Companion Metric */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 min-w-[150px] space-y-1 shadow-2xs text-center sm:text-left">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold justify-center sm:justify-start">
            <Heart className="w-3.5 h-3.5 text-emerald-600" />
            <span>Plant Health Score</span>
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight">
            {healthScore}
            <span className="text-xs text-slate-400 font-sans font-normal"> / 100</span>
          </div>
          <div className="text-[10px] text-slate-400">
            {healthScore >= 70 ? 'Good Vitality' : healthScore >= 40 ? 'Compromised' : 'Critical Intervention'}
          </div>
        </div>
      </div>
    </div>
  );
};
