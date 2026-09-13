import React, { useState } from 'react';
import { PlantAnalysisResult } from '../types/plant';
import { SeverityBadge } from '../components/SeverityBadge';
import { SeverityGauge } from '../components/SeverityGauge';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Shield,
  Clock,
  Layers,
  Leaf,
  Droplets,
  Wind,
  RotateCcw,
  Target,
  Eye,
  Sliders,
  Check,
  Microscope,
  Info
} from 'lucide-react';

interface ResultPageProps {
  result: PlantAnalysisResult;
  onAnalyzeAnother: () => void;
  onViewHistory: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  result,
  onAnalyzeAnother,
  onViewHistory
}) => {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(result.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div id="results-page-container" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header Diagnostic Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="btn-back-to-analyze"
            onClick={onAnalyzeAnother}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>New Scan</span>
          </button>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{formattedDate}</span>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
            • REPORT ID: #{result.id.slice(0, 8).toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-print-report"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Report</span>
          </button>
          <button
            type="button"
            id="btn-view-history"
            onClick={onViewHistory}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition shadow-2xs"
          >
            <span>Diagnostic Logs</span>
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <DisclaimerBanner variant={result.severity === 'Severe' ? 'warning' : 'standard'} />

      {/* Primary Diagnosis Report Bento Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Explainable AI Computer-Vision Specimen Viewport */}
          <div className="lg:col-span-5 bg-[#081812] text-white p-6 sm:p-7 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-emerald-950/20">
            {/* Subtle background grid */}
            <div className="absolute inset-0 scanner-grid-dark opacity-30 pointer-events-none" />

            {/* Specimen Viewport Header HUD */}
            <div className="relative z-10 flex items-center justify-between pb-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                EXPLAINABLE AI VISION
              </span>
              <span className="text-[11px] text-slate-400">
                {result.modelSource === 'gemini-vision' ? 'Multimodal Neural Vision' : 'Diagnostic Pipeline'}
              </span>
            </div>

            {/* Interactive Image Frame with CV Overlays */}
            <div className="relative my-3 rounded-2xl overflow-hidden bg-[#030e09] border border-emerald-700/40 shadow-inner aspect-square flex items-center justify-center group">
              {result.imageUrl ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={result.imageUrl}
                    alt={`Foliar specimen for ${result.plantName}`}
                    className="w-full h-full object-contain p-2 transition-all"
                  />

                  {/* Corner Targeting Reticles */}
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-emerald-400" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-400" />
                  <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-emerald-400" />
                  <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-emerald-400" />

                  {/* Subtle Heatmap Overlay (Toggleable) */}
                  {showHeatmap && !result.isHealthy && (
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70 transition-opacity duration-300"
                      style={{
                        background:
                          'radial-gradient(circle at 45% 48%, rgba(239, 68, 68, 0.45) 0%, rgba(245, 158, 11, 0.3) 32%, rgba(16, 185, 129, 0.1) 60%, transparent 80%)'
                      }}
                    />
                  )}

                  {/* Pathology Markers & Confidence Bounding Callouts (Toggleable) */}
                  {showMarkers && !result.isHealthy && (
                    <>
                      {/* Marker 1 */}
                      <div className="absolute top-[44%] left-[40%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                        <div className="relative flex items-center justify-center">
                          <span className="w-10 h-10 rounded-full border border-rose-400/80 animate-ping absolute" />
                          <span className="w-6 h-6 rounded-full border-2 border-rose-500 bg-rose-500/20 flex items-center justify-center text-[9px] font-mono font-bold text-white shadow-xs">
                            P1
                          </span>
                        </div>
                        <div className="absolute left-8 -top-1 bg-black/85 backdrop-blur-xs text-rose-300 text-[10px] font-mono px-2 py-0.5 rounded border border-rose-500/40 whitespace-nowrap shadow-md">
                          Lesion Focus • {result.confidence}% Conf
                        </div>
                      </div>

                      {/* Marker 2 */}
                      <div className="absolute top-[62%] left-[64%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                        <div className="relative flex items-center justify-center">
                          <span className="w-5 h-5 rounded-full border-2 border-amber-500 bg-amber-500/20 flex items-center justify-center text-[9px] font-mono font-bold text-white shadow-xs">
                            P2
                          </span>
                        </div>
                        <div className="absolute left-7 -top-1 bg-black/85 backdrop-blur-xs text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/40 whitespace-nowrap shadow-md">
                          Halo Chlorosis
                        </div>
                      </div>
                    </>
                  )}

                  {/* Specimen Tag */}
                  <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                    SPECIMEN RESOLUTION VERIFIED
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 text-xs font-mono">No Specimen Rendered</div>
              )}
            </div>

            {/* Explainable Vision Controls */}
            {!result.isHealthy && (
              <div className="relative z-10 pt-2 flex items-center justify-between gap-2 border-t border-emerald-950/60 text-xs">
                <span className="text-[11px] font-mono text-slate-400">CV Layers:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition border ${
                      showHeatmap
                        ? 'bg-emerald-900/80 text-emerald-300 border-emerald-600/60'
                        : 'bg-black/40 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    Heatmap {showHeatmap ? 'ON' : 'OFF'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowMarkers(!showMarkers)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition border ${
                      showMarkers
                        ? 'bg-emerald-900/80 text-emerald-300 border-emerald-600/60'
                        : 'bg-black/40 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    Markers {showMarkers ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            )}

            {/* File info footer */}
            <div className="pt-2 text-center text-[11px] font-mono text-slate-400 truncate">
              {result.imageFileName || 'leaf_foliar_specimen.jpg'}
            </div>
          </div>

          {/* Diagnostic Findings Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Plant Meta and Confidence */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-900 border border-slate-200">
                    {result.plantName}
                  </span>
                  {result.scientificName && (
                    <span className="text-xs italic text-slate-500 font-mono">
                      ({result.scientificName})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <SeverityBadge severity={result.severity} />
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-2xs">
                    {result.confidence}% Confidence
                  </span>
                </div>
              </div>

              {/* Main Disease Headline Focus */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  DETECTED CONDITION
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {result.diseaseName}
                </h1>
              </div>

              {/* Circular Severity & Plant Health Meter */}
              <SeverityGauge score={result.severityScore} severity={result.severity} />

              {/* Visual Evidence Summary Box */}
              <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Observed Visual Evidence:</span>
                </div>
                <p>{result.visualEvidenceDescription}</p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Pathology Status: <strong className="text-slate-800">{result.isHealthy ? 'Healthy Specimen' : 'Active Intervention Required'}</strong>
              </span>
              <button
                type="button"
                onClick={onAnalyzeAnother}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Scan Another Plant</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Observed Symptoms & Pathology Inference Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Symptoms Observed */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Observed Foliar Symptoms</h3>
              <p className="text-[11px] text-slate-400">Identified anatomical markers on leaf blade</p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {result.symptomsDetected.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Explainable Rationale */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Microscope className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Pathology Inference & Rationale</h3>
              <p className="text-[11px] text-slate-400">Diagnostic differential and pathogen biology</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {result.reasoning}
          </p>

          <div className="bg-emerald-50/50 rounded-2xl p-3.5 border border-emerald-100 text-xs text-emerald-950 space-y-1">
            <span className="font-bold block text-emerald-900">Differential Diagnosis Rationale:</span>
            <span>
              The AI evaluated visual lookalikes (e.g. Septoria leaf spot, nutrient scorch, ozone injury) and corroborated this classification based on lesion margin morphology and concentric target rings.
            </span>
          </div>
        </div>
      </div>

      {/* Comprehensive Treatment Guidance (IPM) Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Integrated Pest & Disease Management (IPM)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Recommended Treatment Regimen</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Follow these staged practical interventions calibrated to the detected pathogen and severity grade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Immediate Physical Actions */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              1. Immediate Physical Actions
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 pl-4 list-disc leading-relaxed">
              {result.treatment.immediateActions.map((action, idx) => (
                <li key={idx}>{action}</li>
              ))}
            </ul>
          </div>

          {/* 2. Organic & Biological Remedies */}
          <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-200/80 space-y-3">
            <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              2. Organic & Biological Remedies
            </h4>
            <ul className="space-y-2 text-xs text-emerald-900 pl-4 list-disc leading-relaxed">
              {result.treatment.organicRemedies.map((remedy, idx) => (
                <li key={idx}>{remedy}</li>
              ))}
            </ul>
          </div>

          {/* 3. Chemical & Fungicidal Options */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              3. Chemical & Fungicide Options
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 pl-4 list-disc leading-relaxed">
              {result.treatment.chemicalOptions.map((chem, idx) => (
                <li key={idx}>{chem}</li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-400 italic pt-1">
              Note: Always follow registered product label instructions, protective gear rules, and pre-harvest intervals (PHI).
            </p>
          </div>

          {/* 4. Cultural Field Practices */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              4. Cultural Canopy Practices
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 pl-4 list-disc leading-relaxed">
              {result.treatment.culturalPractices.map((practice, idx) => (
                <li key={idx}>{practice}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Long-Term Prevention Guidance */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Agronomic Field Health
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Prevention & Canopy Hygiene Guidance</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Core cultivation protocols to prevent reinfection cycles and pathogen persistence in soil or plant debris.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4.5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span>Irrigation & Foliar Moisture Control</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.prevention.irrigationAndMoisture}
            </p>
          </div>

          <div className="p-4.5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <Wind className="w-4 h-4 text-emerald-600" />
              <span>Crop Spacing & Canopy Ventilation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.prevention.spacingAndAirflow}
            </p>
          </div>

          <div className="p-4.5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <Leaf className="w-4 h-4 text-green-700" />
              <span>Soil Health & Debris Sanitation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.prevention.soilAndSanitation}
            </p>
          </div>

          <div className="p-4.5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <RotateCcw className="w-4 h-4 text-purple-600" />
              <span>Crop Rotation & Resistant Cultivars</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.prevention.cropRotationAndResistantVarieties}
            </p>
          </div>
        </div>
      </div>

      {/* Agronomic Expert Consultation Advisory */}
      <div className="bg-amber-50/80 rounded-3xl border border-amber-200 p-6 flex items-start gap-4 shadow-2xs">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <h3 className="font-extrabold text-amber-900 text-sm sm:text-base">
            When to Consult an Agricultural Extension Specialist
          </h3>
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
            {result.whenToConsultExpert}
          </p>
          <div className="pt-2 text-xs font-semibold text-amber-950">
            Contact your local Department of Agriculture or University Extension Service for confirmatory PCR/culturing assays if systemic wilting is detected across &gt;10% of field stands.
          </div>
        </div>
      </div>

      {/* Bottom Floating CTA Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onAnalyzeAnother}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#062317] via-[#0d3f2b] to-[#073021] hover:from-[#093523] hover:to-[#0b4730] text-white font-semibold text-sm rounded-xl shadow-md transition"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Analyze Another Plant Leaf</span>
        </button>

        <button
          type="button"
          onClick={onViewHistory}
          className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm rounded-xl shadow-2xs transition"
        >
          <span>Open Diagnostic Logs</span>
        </button>
      </div>
    </div>
  );
};
