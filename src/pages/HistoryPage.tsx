import React, { useState, useEffect } from 'react';
import { PlantAnalysisResult, SeverityLevel } from '../types/plant';
import { historyRepository } from '../services/historyService';
import { SeverityBadge } from '../components/SeverityBadge';
import {
  History,
  Search,
  Trash2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  X,
  Microscope,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';

interface HistoryPageProps {
  onSelectResult: (result: PlantAnalysisResult) => void;
  onNavigateToAnalyze: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  onSelectResult,
  onNavigateToAnalyze
}) => {
  const [historyItems, setHistoryItems] = useState<PlantAnalysisResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    const items = await historyRepository.getAll();
    setHistoryItems(items);
    setIsLoading(false);
  };

  const handleDeleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this diagnostic record from local history?')) {
      await historyRepository.delete(id);
      loadHistory();
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear all analysis history records?')) {
      await historyRepository.clearAll();
      loadHistory();
    }
  };

  // Filter items
  const filteredItems = historyItems.filter((item) => {
    const matchesSearch =
      item.plantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.diseaseName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (severityFilter === 'all') return true;
    if (severityFilter === 'healthy') return item.isHealthy;
    return item.severity.toLowerCase() === severityFilter.toLowerCase();
  });

  return (
    <div id="history-page-container" className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200/60 shadow-2xs">
            <History className="w-3.5 h-3.5 text-emerald-600" />
            <span>Foliar Diagnostic Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Diagnostic History & Visual Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review past foliar scan records, detected pathogens, confidence metrics, and generated IPM treatments.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            type="button"
            id="btn-clear-history"
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition self-start sm:self-auto border border-rose-200 shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Archive ({historyItems.length})</span>
          </button>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by crop, pathogen, or lesion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 font-medium"
          />
        </div>

        {/* Severity Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mr-1 flex items-center gap-1 font-mono">
            <Filter className="w-3 h-3" /> Severity:
          </span>
          {[
            { id: 'all', label: 'All Records' },
            { id: 'healthy', label: 'Healthy' },
            { id: 'mild', label: 'Mild' },
            { id: 'moderate', label: 'Moderate' },
            { id: 'severe', label: 'Severe' }
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setSeverityFilter(chip.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition ${
                severityFilter === chip.id
                  ? 'bg-[#062317] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diagnostic Timeline / Cards View */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400 text-sm font-mono flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 animate-spin text-emerald-600" />
          Loading foliar diagnostic archive...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-100">
            <Microscope className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">No Diagnostic Records Found</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {historyItems.length === 0
                ? 'You have not analyzed any plant specimens yet. Run your first foliar diagnosis to start generating clinical records!'
                : 'No diagnostic records match your active search and severity filters.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToAnalyze}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Scan Specimen Now</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredItems.map((item) => {
            const dateStr = new Date(item.timestamp).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            const timeStr = new Date(item.timestamp).toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={item.id}
                onClick={() => onSelectResult(item)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200/90 p-4 hover:border-emerald-500/80 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-2xs relative"
              >
                <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                  {/* Thumbnail with Reticle Styling */}
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#071912] shrink-0 border border-emerald-900/40 relative">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.plantName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-emerald-400 text-[10px] font-mono">
                        SPECIMEN
                      </div>
                    )}
                    <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-emerald-400" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-emerald-400" />
                  </div>

                  {/* Details */}
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm truncate">
                        {item.plantName}
                      </span>
                      {item.scientificName && (
                        <span className="text-[11px] italic text-slate-400 font-mono hidden md:inline">
                          ({item.scientificName})
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-emerald-950 truncate group-hover:text-emerald-700 transition-colors">
                      {item.diseaseName}
                    </h4>

                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <SeverityBadge severity={item.severity} />
                      <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        {item.confidence}% CONF
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        SCORE: {item.severityScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right font-mono text-[11px] text-slate-400">
                    <div className="flex items-center sm:justify-end gap-1 font-semibold text-slate-600">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{dateStr}</span>
                    </div>
                    <div>{timeStr}</div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleDeleteItem(item.id, e)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Delete diagnostic record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-700 transition-colors">
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
