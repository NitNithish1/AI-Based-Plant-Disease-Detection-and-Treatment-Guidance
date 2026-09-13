import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Microscope,
  Leaf,
  ChevronRight,
  Activity,
  Target,
  Eye,
  Sliders,
  PlayCircle,
  BarChart3,
  Layers,
  FileText
} from 'lucide-react';
import { SUPPORTED_CROPS } from '../data/supportedCrops';
import { InteractiveLeafScan } from '../components/InteractiveLeafScan';

interface HomePageProps {
  onStartAnalysis: () => void;
  onViewDocs: () => void;
  onOpenDashboard?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartAnalysis,
  onViewDocs,
  onOpenDashboard
}) => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home-page-container" className="space-y-20 pb-16">
      {/* Hero Section */}
      <section
        id="hero-section"
        className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-b from-[#f4f8f6] via-white to-slate-50/70 border-b border-emerald-950/5"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 scanner-grid-bg opacity-70 pointer-events-none" />
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-6 space-y-6">
              {/* Product Brand Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300/60 text-xs font-semibold text-emerald-900 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-bold">PhytoGuard AI</span>
                <span className="text-emerald-400 text-xs">•</span>
                <span className="text-emerald-700">Plant Health Intelligence</span>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Intelligent Plant Health.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
                  Powered by AI.
                </span>
              </h1>

              {/* Exact Requested Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Detect plant leaf diseases instantly, calculate canopy infection severity, and receive structured organic and chemical treatment guidance with precision computer vision.
              </p>

              {/* Action Buttons: Prominent "Analyze Plant" and "How It Works" */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  id="hero-btn-analyze-plant"
                  onClick={onStartAnalysis}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#062317] via-[#0d3f2b] to-[#073021] hover:from-[#093523] hover:to-[#0b4730] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-xl hover:shadow-emerald-950/20 transition-all transform hover:-translate-y-0.5 border border-emerald-600/30"
                >
                  <Sparkles className="w-4.5 h-4.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                  <span>Analyze Plant</span>
                  <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  id="hero-btn-how-it-works"
                  onClick={scrollToHowItWorks}
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/90 hover:bg-white text-slate-700 border border-slate-300/80 font-semibold text-sm sm:text-base rounded-xl transition-all shadow-xs hover:shadow-sm"
                >
                  <PlayCircle className="w-4 h-4 text-emerald-700" />
                  <span>How It Works</span>
                </button>

                {onOpenDashboard && (
                  <button
                    type="button"
                    onClick={onOpenDashboard}
                    className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition"
                  >
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    <span>Open Dashboard</span>
                  </button>
                )}
              </div>

              {/* Trust Metric Chips */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 max-w-xl">
                <div className="bg-white/70 backdrop-blur-xs p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">8+</div>
                  <div className="text-[11px] font-medium text-slate-500">Crop Calibrations</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xs p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 tracking-tight">3-Tier</div>
                  <div className="text-[11px] font-medium text-slate-500">Severity Metric</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xs p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-extrabold text-teal-800 tracking-tight">100%</div>
                  <div className="text-[11px] font-medium text-slate-500">Explainable AI</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Diagnostic Lab Scanner Visual with Glassmorphism Cards */}
            <div className="lg:col-span-6 relative">
              {/* Outer floating glassmorphism cards requested by user */}
              <div className="relative mx-auto max-w-lg">
                {/* FLOATING GLASSMORPHISM CARD 1: Disease Confidence */}
                <div className="hidden sm:flex absolute -top-4 -left-6 z-30 backdrop-blur-md bg-white/80 border border-emerald-200/70 rounded-2xl p-3 shadow-lg items-center gap-2.5 max-w-[210px]">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Disease Confidence</div>
                    <div className="text-xs font-extrabold text-slate-900">98.4% Confidence</div>
                  </div>
                </div>

                {/* FLOATING GLASSMORPHISM CARD 2: Plant Health Score */}
                <div className="hidden sm:flex absolute -bottom-5 -left-4 z-30 backdrop-blur-md bg-white/85 border border-emerald-200/70 rounded-2xl p-3 shadow-lg items-center gap-2.5 max-w-[210px]">
                  <div className="w-8 h-8 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Plant Health Score</div>
                    <div className="text-xs font-extrabold text-slate-900">88 / 100 Optimal</div>
                  </div>
                </div>

                {/* FLOATING GLASSMORPHISM CARD 3: Disease Severity */}
                <div className="hidden sm:flex absolute -top-4 -right-4 z-30 backdrop-blur-md bg-white/85 border border-amber-200/80 rounded-2xl p-3 shadow-lg items-center gap-2.5 max-w-[200px]">
                  <div className="w-8 h-8 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                    <Target className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Disease Severity</div>
                    <div className="text-xs font-extrabold text-amber-800">Mild Foliar Necrosis</div>
                  </div>
                </div>

                {/* FLOATING GLASSMORPHISM CARD 4: AI Vision Analysis */}
                <div className="hidden sm:flex absolute -bottom-4 -right-4 z-30 backdrop-blur-md bg-[#061e15]/90 border border-emerald-500/40 rounded-2xl p-3 shadow-lg items-center gap-2.5 text-white max-w-[210px]">
                  <div className="w-8 h-8 rounded-xl bg-emerald-900/90 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                    <Eye className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono font-bold text-emerald-300">AI Vision Analysis</div>
                    <div className="text-xs font-extrabold text-white">48.2 FPS Active</div>
                  </div>
                </div>

                {/* Centered Interactive Leaf Scan Specimen */}
                <InteractiveLeafScan
                  isScanning={true}
                  interactive={true}
                  customStats={{
                    leafArea: '48.6 cm²',
                    diseaseProb: '96.8% (Alternaria)',
                    severity: '22% (Mild)',
                    healthScore: '86 / 100'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section: 3-Stage Diagnostic Flow */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            End-to-End Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How PhytoGuard AI Diagnoses Plant Health
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            From high-resolution foliar acquisition to actionable IPM agronomic regimens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6.5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-emerald-300 space-y-3 relative group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 font-extrabold flex items-center justify-center text-sm border border-emerald-100 group-hover:scale-105 transition-transform">
              <Microscope className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider font-mono">Stage 01</div>
            <h3 className="font-bold text-slate-900 text-base">Foliar Specimen Acquisition</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upload close-up leaf photographs via live camera capture, drag-and-drop file upload, or choose from verified crop pathology specimens.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6.5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-emerald-300 space-y-3 relative group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 font-extrabold flex items-center justify-center text-sm border border-teal-100 group-hover:scale-105 transition-transform">
              <Eye className="w-5 h-5 text-teal-700" />
            </div>
            <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wider font-mono">Stage 02</div>
            <h3 className="font-bold text-slate-900 text-base">Neural Vision Pathology Scan</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Multimodal neural vision segments lesion boundaries, calculates concentric rings, detects fungal pustules, and computes severity scores.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6.5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-emerald-300 space-y-3 relative group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 font-extrabold flex items-center justify-center text-sm border border-emerald-100 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider font-mono">Stage 03</div>
            <h3 className="font-bold text-slate-900 text-base">Targeted Agronomic Guidance</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Receive structured biological remedies, calibrated fungicide chemicals, cultural canopy practices, and specialist advisory thresholds.
            </p>
          </div>
        </div>
      </section>

      {/* Core AI Capabilities: Futuristic Diagnostic Lab Card */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#072418] rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative border border-emerald-800/40 shadow-xl">
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 scanner-grid-dark opacity-30 pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Diagnostic Lab Standards</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Explainable Diagnostics & Multi-Disciplinary Pathology
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Traditional black-box models simply return a generic category label. PhytoGuard AI provides full visual evidence grounding: explaining the morphological markers, halo chlorosis, and zonation patterns that distinguish pathogens from harmless abiotic scorch.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3.5 bg-emerald-950/50 p-4 rounded-xl border border-emerald-800/40">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-white">Canopy Severity Index</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Graded quantitatively into Mild, Moderate, and Severe with numeric canopy pathology indices (0-100%).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-emerald-950/50 p-4 rounded-xl border border-emerald-800/40">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-white">Dual IPM Interventions</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Structured recommendations across bio-fungicides (e.g. neem oil, Bacillus subtilis) and synthetic chemical protocols.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-emerald-950/50 p-4 rounded-xl border border-emerald-800/40">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-white">Safety & Image Quality Rejection</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Guards against hallucinations by rejecting non-plant, blurry, or overexposed imagery before clinical inference.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-emerald-950/50 p-4 rounded-xl border border-emerald-800/40">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-white">Modular CNN Layer</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Microservice boundary ready for seamless integration with custom ResNet, EfficientNet, or MobileNet architectures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Crops Showcase */}
      <section id="supported-crops-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Agronomic Calibrations
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">Supported Agricultural Crops</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Calibrated profiles for commercial field staples, orchards, and horticultural vegetables.
            </p>
          </div>
          <button
            type="button"
            onClick={onStartAnalysis}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5 group"
          >
            <span>Launch Plant Scanner</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SUPPORTED_CROPS.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs hover:border-emerald-400 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="text-3xl mb-2.5 group-hover:scale-110 transition-transform">{crop.icon}</div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-800 transition-colors">
                {crop.name}
              </h4>
              <p className="text-[11px] italic text-slate-500 mb-2 font-mono">{crop.scientificName}</p>
              <div className="text-[10px] text-slate-600 bg-slate-50 rounded-xl p-2 border border-slate-100 line-clamp-2">
                <span className="font-bold text-slate-700">Pathogens:</span> {crop.commonDiseases.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
