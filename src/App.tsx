import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ResultPage } from './pages/ResultPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { PlantAnalysisResult } from './types/plant';
import { historyRepository } from './services/historyService';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [currentResult, setCurrentResult] = useState<PlantAnalysisResult | null>(null);
  const [historyCount, setHistoryCount] = useState<number>(0);

  const refreshHistoryCount = async () => {
    try {
      const items = await historyRepository.getAll();
      setHistoryCount(items.length);
    } catch (err) {
      console.error('Failed to load history count:', err);
    }
  };

  useEffect(() => {
    refreshHistoryCount();
  }, [activeTab]);

  const handleAnalysisComplete = (result: PlantAnalysisResult) => {
    setCurrentResult(result);
    setActiveTab('results');
    refreshHistoryCount();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryResult = (result: PlantAnalysisResult) => {
    setCurrentResult(result);
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfdfc] font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        historyCount={historyCount}
      />

      {/* Main Content View with Smooth Motion Fade */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <HomePage
                onStartAnalysis={() => handleNavigate('analyze')}
                onViewDocs={() => handleNavigate('about')}
                onOpenDashboard={() => handleNavigate('dashboard')}
              />
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <DashboardPage
                onStartAnalysis={() => handleNavigate('analyze')}
                onSelectResult={handleSelectHistoryResult}
              />
            </motion.div>
          )}

          {activeTab === 'analyze' && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <AnalysisPage onAnalysisComplete={handleAnalysisComplete} />
            </motion.div>
          )}

          {activeTab === 'results' && currentResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ResultPage
                result={currentResult}
                onAnalyzeAnother={() => handleNavigate('analyze')}
                onViewHistory={() => handleNavigate('history')}
              />
            </motion.div>
          )}

          {/* Fallback if user navigates to results without an active result */}
          {activeTab === 'results' && !currentResult && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto px-4 py-20 text-center space-y-4"
            >
              <h3 className="font-extrabold text-slate-900 text-xl">No Active Diagnosis Loaded</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Please upload a plant leaf image or load an existing record from diagnostic history.
              </p>
              <button
                onClick={() => handleNavigate('analyze')}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white text-xs font-semibold rounded-xl shadow-xs"
              >
                Scan a Plant Specimen
              </button>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <HistoryPage
                onSelectResult={handleSelectHistoryResult}
                onNavigateToAnalyze={() => handleNavigate('analyze')}
              />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <AboutPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => handleNavigate(tab as NavTab)} />
    </div>
  );
}
