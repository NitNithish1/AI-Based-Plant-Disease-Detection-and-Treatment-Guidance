import React, { useState, useEffect } from 'react';
import { PlantAnalysisResult } from '../types/plant';
import { historyRepository } from '../services/historyService';
import { SeverityBadge } from '../components/SeverityBadge';
import {
  Activity,
  Plus,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Leaf,
  Calendar,
  Clock,
  ChevronRight,
  CheckCircle2,
  BarChart3,
  Search,
  Sparkles,
  Layers,
  Droplets,
  Microscope,
  RotateCw
} from 'lucide-react';

interface DashboardPageProps {
  onStartAnalysis: () => void;
  onSelectResult: (result: PlantAnalysisResult) => void;
}

interface MonitoredPlant {
  id: string;
  name: string;
  variety: string;
  scientificName: string;
  healthScore: number;
  status: 'Optimal' | 'Recovering' | 'Under Treatment' | 'Critical';
  lastScanDate: string;
  lastDiagnosis: string;
  icon: string;
}

const DEFAULT_MONITORED_PLANTS: MonitoredPlant[] = [
  {
    id: 'p-1',
    name: 'Field Tomato',
    variety: 'Roma VF',
    scientificName: 'Solanum lycopersicum',
    healthScore: 78,
    status: 'Recovering',
    lastScanDate: 'Today, 10:14 AM',
    lastDiagnosis: 'Early Blight (Mild)',
    icon: '🍅'
  },
  {
    id: 'p-2',
    name: 'Greenhouse Bell Pepper',
    variety: 'California Wonder',
    scientificName: 'Capsicum annuum',
    healthScore: 94,
    status: 'Optimal',
    lastScanDate: 'Yesterday',
    lastDiagnosis: 'Healthy Foliage',
    icon: '🫑'
  },
  {
    id: 'p-3',
    name: 'Potato Plot A',
    variety: 'Russet Burbank',
    scientificName: 'Solanum tuberosum',
    healthScore: 62,
    status: 'Under Treatment',
    lastScanDate: '2 days ago',
    lastDiagnosis: 'Late Blight (Moderate)',
    icon: '🥔'
  },
  {
    id: 'p-4',
    name: 'Orchard Apple Block',
    variety: 'Honeycrisp',
    scientificName: 'Malus domestica',
    healthScore: 89,
    status: 'Optimal',
    lastScanDate: '3 days ago',
    lastDiagnosis: 'Healthy Foliage',
    icon: '🍏'
  }
];

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onStartAnalysis,
  onSelectResult
}) => {
  const [historyItems, setHistoryItems] = useState<PlantAnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [plants] = useState<MonitoredPlant[]>(DEFAULT_MONITORED_PLANTS);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const items = await historyRepository.getAll();
        setHistoryItems(items);
      } catch (err) {
        console.error('Failed to load history for dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Compute aggregate statistics
  const totalScans = historyItems.length > 0 ? historyItems.length : 12;
  const healthyCount = historyItems.filter((i) => i.isHealthy).length;
  const healthyRatio =
    historyItems.length > 0
      ? Math.round((healthyCount / historyItems.length) * 100)
      : 75;

  const averageHealthScore =
    historyItems.length > 0
      ? Math.round(
          historyItems.reduce((acc, curr) => acc + (100 - curr.severityScore), 0) /
            historyItems.length
        )
      : 82;

  const filteredDiagnoses = historyItems.filter((item) =>
    item.plantName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.diseaseName.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div id="dashboard-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Farm & Lab Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Plant Health Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time canopy status, aggregate health metrics, and automated diagnostic timelines.
          </p>
        </div>

        {/* Quick Analyze Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="btn-dashboard-quick-analyze"
            onClick={onStartAnalysis}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#062317] via-[#0b3c29] to-[#062317] hover:from-[#093523] hover:to-[#0f4e34] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-emerald-600/30"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Quick Analyze Leaf</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </button>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Average Health Score */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Average Health Score</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {averageHealthScore}
            </span>
            <span className="text-xs font-mono text-slate-400">/ 100</span>
            <span className="ml-auto text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              +4.2% wk
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${averageHealthScore}%` }}
            />
          </div>
        </div>

        {/* Card 2: Total Scans Performed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Specimens Scanned</span>
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Microscope className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {totalScans}
            </span>
            <span className="text-xs text-slate-400">specimens</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Multimodal neural vision scans logged
          </p>
        </div>

        {/* Card 3: Healthy Ratio */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Healthy Foliage Ratio</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Leaf className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {healthyRatio}%
            </span>
            <span className="text-xs text-emerald-600 font-medium">Clear of Pathogen</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${healthyRatio}%` }}
            />
          </div>
        </div>

        {/* Card 4: Active Pathogen Alerts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Monitored Crops</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {plants.length}
            </span>
            <span className="text-xs text-slate-400">active plots</span>
          </div>
          <p className="text-[11px] text-slate-500">
            2 plots under active IPM treatment
          </p>
        </div>
      </div>

      {/* Main Grid: My Plants + Disease History & Health Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): My Plants & Health Timeline */}
        <div className="lg:col-span-8 space-y-8">
          {/* My Plants Section */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  My Monitored Plants
                </h2>
                <p className="text-xs text-slate-500">
                  Active field and greenhouse specimens tracked for pathology symptoms.
                </p>
              </div>

              <button
                type="button"
                onClick={onStartAnalysis}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Crop / Scan Leaf</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plants.map((plant) => (
                <div
                  key={plant.id}
                  className="rounded-2xl border border-slate-200/80 p-4.5 hover:border-emerald-300 hover:shadow-xs transition-all space-y-3 bg-slate-50/40"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
                        {plant.icon}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{plant.name}</h4>
                        <p className="text-[11px] text-slate-500 italic font-mono">
                          {plant.scientificName}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        plant.status === 'Optimal'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : plant.status === 'Recovering'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {plant.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Health Index:</span>
                      <span className="font-mono font-bold text-slate-900">{plant.healthScore}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          plant.healthScore > 80
                            ? 'bg-emerald-500'
                            : plant.healthScore > 65
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${plant.healthScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate max-w-[170px]">Diagnosis: <strong className="text-slate-700">{plant.lastDiagnosis}</strong></span>
                    <button
                      type="button"
                      onClick={onStartAnalysis}
                      className="text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Scan</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Timeline Section */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Crop Pathology Progress</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                Foliar Health Timeline
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Chronological diagnostic events, lesion containment checks, and treatment milestones.
              </p>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Timeline Item 1 */}
              <div className="relative space-y-1">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-white" />
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>Today, 10:14 AM</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                    Scout Verified
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Tomato Early Blight Treated with Copper Hydroxide
                </h4>
                <p className="text-xs text-slate-600">
                  Followed staged organic cultural regimen: pruned infected lower canopy foliage 15cm above soil bed. Lesion margin stabilized.
                </p>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative space-y-1">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white" />
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>2 Days Ago</span>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                    Pathogen Identified
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Potato Late Blight Detected • 64% Severity Index
                </h4>
                <p className="text-xs text-slate-600">
                  AI neural vision verified water-soaked lesions and halo chlorosis on Solanum tuberosum specimen. Immediate fungicide application triggered.
                </p>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative space-y-1">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-white" />
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>5 Days Ago</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                    Clean Canopy
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Greenhouse Bell Pepper Cleared • 96% Healthy Foliage
                </h4>
                <p className="text-xs text-slate-600">
                  Optimal chlorophyll density, uniform vein morphology, and zero bacterial pustules observed across leaf blade.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Recent Diagnoses & Disease History Stats */}
        <div className="lg:col-span-4 space-y-8">
          {/* Recent Diagnoses Box */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Recent Diagnoses</h3>
                <p className="text-[11px] text-slate-500">Live feed of AI inspection reports</p>
              </div>
              <button
                type="button"
                onClick={onStartAnalysis}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-bold"
              >
                Scan Leaf
              </button>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading diagnostic records...</div>
            ) : historyItems.length === 0 ? (
              <div className="py-8 text-center space-y-3">
                <Leaf className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">No recent diagnoses yet.</p>
                <button
                  type="button"
                  onClick={onStartAnalysis}
                  className="px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold hover:bg-emerald-100"
                >
                  Analyze First Specimen
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {historyItems.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectResult(item)}
                    className="p-3 rounded-2xl border border-slate-200/80 hover:border-emerald-400 hover:bg-emerald-50/30 transition cursor-pointer flex items-center gap-3 group"
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.plantName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                        {item.plantName.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-slate-900 text-xs truncate">
                          {item.plantName}
                        </span>
                        <SeverityBadge severity={item.severity} />
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.diseaseName}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>{item.confidence}% Conf</span>
                        <span className="text-emerald-700 group-hover:translate-x-0.5 transition-transform font-bold">
                          View →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Disease History Breakdown */}
          <div className="bg-[#071e16] rounded-3xl p-5 sm:p-6 text-white border border-emerald-800/40 shadow-md space-y-4 relative overflow-hidden">
            <div className="absolute inset-0 scanner-grid-dark opacity-30 pointer-events-none" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Epidemiological Profile
              </span>
              <h3 className="font-extrabold text-white text-base">Disease History Breakdown</h3>
              <p className="text-xs text-slate-300">
                Frequency distribution of pathological pathogens identified.
              </p>
            </div>

            <div className="relative z-10 space-y-3 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Fungal Pathogens (Blight/Rust)</span>
                  <span className="font-mono text-emerald-300 font-bold">58%</span>
                </div>
                <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '58%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Bacterial Spots & Xanthomonas</span>
                  <span className="font-mono text-amber-300 font-bold">24%</span>
                </div>
                <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '24%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Viral Mosaics & Curling</span>
                  <span className="font-mono text-purple-300 font-bold">12%</span>
                </div>
                <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: '12%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Abiotic / Nutrient Deficiencies</span>
                  <span className="font-mono text-blue-300 font-bold">6%</span>
                </div>
                <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: '6%' }} />
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-3 border-t border-emerald-900/60 text-[11px] font-mono text-emerald-400/90 flex items-center justify-between">
              <span>PATHOGEN INDEX: STABLE</span>
              <span className="text-white">IPM GRADE A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
