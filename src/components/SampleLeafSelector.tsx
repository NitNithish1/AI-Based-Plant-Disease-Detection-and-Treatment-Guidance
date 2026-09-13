import React from 'react';
import { SAMPLE_LEAVES } from '../data/sampleLeaves';
import { SampleLeaf } from '../types/plant';
import { Sparkles, Database, Check } from 'lucide-react';

interface SampleLeafSelectorProps {
  onSelectSample: (sample: SampleLeaf) => void;
  selectedSampleId?: string;
}

export const SampleLeafSelector: React.FC<SampleLeafSelectorProps> = ({
  onSelectSample,
  selectedSampleId
}) => {
  return (
    <div id="sample-leaves-container" className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Database className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified Foliar Specimen Archive</span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">Select specimen for instant test run</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {SAMPLE_LEAVES.map((sample) => {
          const isSelected = selectedSampleId === sample.id;
          return (
            <button
              type="button"
              key={sample.id}
              id={`sample-btn-${sample.id}`}
              onClick={() => onSelectSample(sample)}
              className={`group text-left relative flex flex-col p-2.5 rounded-2xl border transition-all duration-200 bg-white shadow-2xs hover:shadow-md ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-500/30 bg-emerald-50/20'
                  : 'border-slate-200/90 hover:border-emerald-400'
              }`}
            >
              {/* Image Thumbnail */}
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-900 mb-2 border border-slate-100 flex items-center justify-center relative">
                <img
                  src={sample.imageUrl}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {isSelected ? (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3" />
                  </div>
                ) : (
                  <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-[9px] font-mono text-white/90 px-1.5 py-0.5 rounded">
                    {sample.plantName}
                  </div>
                )}
              </div>

              {/* Title & Disease */}
              <span className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-emerald-800 transition-colors">
                {sample.plantName}
              </span>
              <span className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                {sample.diseaseName.split('(')[0]}
              </span>

              {/* Severity Pill */}
              <div className="mt-auto">
                <span
                  className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold border ${sample.badgeColor}`}
                >
                  {sample.severity === 'None' ? 'Healthy Specimen' : sample.severity}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
