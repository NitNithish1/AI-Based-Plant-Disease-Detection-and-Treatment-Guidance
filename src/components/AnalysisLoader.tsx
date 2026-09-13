import React, { useEffect, useState } from 'react';
import { Scan, Sparkles, Microscope, Activity, CheckCircle2 } from 'lucide-react';
import { InteractiveLeafScan } from './InteractiveLeafScan';

const ANALYSIS_STAGES = [
  {
    code: 'OPTICAL VERIFICATION',
    title: 'Validating Optical Quality & Blade Resolution',
    detail: 'Checking focus clarity, ambient illumination balance, and verifying plant tissue...',
    progress: 25
  },
  {
    code: 'FOLIAR MORPHOLOGY',
    title: 'Foliar Segmentation & Morphology Analysis',
    detail: 'Segmenting lamina margins, chlorotic zones, and leaf blade geometry...',
    progress: 55
  },
  {
    code: 'PATHOGEN DIFFERENTIAL',
    title: 'Neural Pattern Recognition & Pathogen Differential',
    detail: 'Examining concentric rings, pustules, target spots, and comparing pathogen profiles...',
    progress: 80
  },
  {
    code: 'IPM SYNTHESIS',
    title: 'Computing Pathology Index & IPM Formulation',
    detail: 'Calculating foliar damage percentage and formulating organic & chemical recommendations...',
    progress: 95
  }
];

export const AnalysisLoader: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev < ANALYSIS_STAGES.length - 1 ? prev + 1 : prev));
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  const activeStage = ANALYSIS_STAGES[currentStageIndex];

  return (
    <div
      id="analysis-loading-view"
      className="bg-[#051a12] rounded-3xl border border-emerald-700/40 shadow-2xl p-6 sm:p-10 text-center max-w-2xl mx-auto space-y-7 text-white relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 scanner-grid-dark opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Active Stage Technical Status Readout */}
      <div className="space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-600/50 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>STATUS: {activeStage.code}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {activeStage.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          {activeStage.detail}
        </p>
      </div>

      {/* Center AI Leaf Scan Visualization with Glowing Scanning Line */}
      <div className="relative z-10 max-w-md mx-auto">
        <InteractiveLeafScan
          isScanning={true}
          interactive={false}
          customStats={{
            leafArea: 'Extracting...',
            diseaseProb: 'Analyzing...',
            severity: 'Estimating...',
            healthScore: `${activeStage.progress}% Complete`
          }}
        />
      </div>

      {/* 4 Status Steppers & Progress Bar */}
      <div className="space-y-3 relative z-10">
        <div className="w-full bg-emerald-950/80 h-2 rounded-full overflow-hidden border border-emerald-800/40">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 shadow-[0_0_12px_#34d399]"
            style={{ width: `${activeStage.progress}%` }}
          />
        </div>

        <div className="grid grid-cols-4 gap-2 pt-1">
          {ANALYSIS_STAGES.map((stage, idx) => {
            const isDone = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div key={stage.code} className="space-y-1">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    isDone
                      ? 'bg-emerald-400'
                      : isCurrent
                      ? 'bg-emerald-300 shadow-[0_0_8px_#34d399]'
                      : 'bg-emerald-950/80 border border-emerald-800/30'
                  }`}
                />
                <div className="text-[9px] font-mono truncate text-left">
                  <span
                    className={
                      isCurrent
                        ? 'text-emerald-300 font-bold'
                        : isDone
                        ? 'text-emerald-500'
                        : 'text-slate-500'
                    }
                  >
                    {stage.code}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Technical Telemetry */}
      <div className="pt-2 border-t border-emerald-900/50 flex items-center justify-between text-[11px] font-mono text-emerald-400/70">
        <span className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          MULTIMODAL NEURAL VISION CO-PROCESSOR
        </span>
        <span>LATENCY: ~1.8s</span>
      </div>
    </div>
  );
};
