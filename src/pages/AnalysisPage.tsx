import React, { useState } from 'react';
import { ImageDropzone } from '../components/ImageDropzone';
import { SampleLeafSelector } from '../components/SampleLeafSelector';
import { AnalysisLoader } from '../components/AnalysisLoader';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { ProcessedImage, processImageFile, processDataUri } from '../utils/imageUtils';
import { analyzePlantImage } from '../services/api';
import { historyRepository } from '../services/historyService';
import { PlantAnalysisResult, SampleLeaf } from '../types/plant';
import { Sparkles, AlertCircle, HelpCircle, Filter, Cpu, ShieldAlert, ArrowRight } from 'lucide-react';
import { SUPPORTED_CROPS } from '../data/supportedCrops';

interface AnalysisPageProps {
  onAnalysisComplete: (result: PlantAnalysisResult) => void;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({ onAnalysisComplete }) => {
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [selectedSampleId, setSelectedSampleId] = useState<string | undefined>(undefined);
  const [cropHint, setCropHint] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file selected from dropzone or camera
  const handleFileSelected = async (file: File) => {
    try {
      setError(null);
      setSelectedSampleId(undefined);
      const processed = await processImageFile(file);
      setProcessedImage(processed);
    } catch (err: any) {
      setError(err.message || 'Failed to process selected file.');
    }
  };

  // Handle sample preset selected
  const handleSelectSample = async (sample: SampleLeaf) => {
    try {
      setError(null);
      setSelectedSampleId(sample.id);
      setCropHint(sample.plantName);
      const processed = await processDataUri(sample.imageUrl, `${sample.id}.jpg`);
      setProcessedImage(processed);
    } catch (err: any) {
      setError(err.message || 'Failed to load sample image.');
    }
  };

  const handleClearImage = () => {
    setProcessedImage(null);
    setSelectedSampleId(undefined);
    setError(null);
  };

  const handleRunAnalysis = async () => {
    if (!processedImage) {
      setError('Please upload or select a plant leaf image first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzePlantImage({
        imageBase64: processedImage.base64,
        mimeType: processedImage.mimeType,
        fileName: processedImage.fileName,
        cropHint: cropHint || undefined
      });

      // Attach image data URL so it displays in results and history
      result.imageUrl = processedImage.dataUrl;

      // Check if image was rejected for poor clarity or non-plant
      if (!result.isPlant || !result.isClearImage) {
        setIsAnalyzing(false);
        setError(
          result.clarityNotes ||
            'The AI could not recognize a plant leaf or the image is too blurry. Please upload a clear, well-lit close-up of a leaf.'
        );
        return;
      }

      // Persist to history repository
      await historyRepository.save(result);

      setIsAnalyzing(false);
      onAnalysisComplete(result);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setIsAnalyzing(false);
      setError(
        err.message ||
          'Analysis failed. Please check your network connection and try again.'
      );
    }
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <AnalysisLoader />
      </div>
    );
  }

  return (
    <div id="analysis-page-container" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2.5 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Foliar Pathology Diagnostic Suite</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Plant Disease Analysis & Severity Assessment
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Upload an image of a single affected crop leaf or load a verified specimen from our library to initiate neural foliar inspection.
        </p>
      </div>

      <DisclaimerBanner />

      {/* Main Analysis Scanner Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-7">
        {/* Dropzone / Preview */}
        <ImageDropzone
          previewUrl={processedImage ? processedImage.dataUrl : null}
          fileName={processedImage?.fileName}
          fileSizeBytes={processedImage?.fileSizeBytes}
          onFileSelected={handleFileSelected}
          onClear={handleClearImage}
          disabled={isAnalyzing}
        />

        {/* Optional Crop Hint Selector & Execute Action */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4 border-t border-slate-100 items-end">
          <div className="sm:col-span-6">
            <label
              htmlFor="crop-hint-select"
              className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Crop Category Calibration (Optional)</span>
            </label>
            <select
              id="crop-hint-select"
              value={cropHint}
              onChange={(e) => setCropHint(e.target.value)}
              className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-3 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
            >
              <option value="">Auto-Detect from Leaf Morphology</option>
              {SUPPORTED_CROPS.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.icon} {c.name} ({c.scientificName})
                </option>
              ))}
              <option value="Other">Other Horticultural / Field Crop</option>
            </select>
          </div>

          <div className="sm:col-span-6">
            <button
              type="button"
              id="btn-run-ai-analysis"
              onClick={handleRunAnalysis}
              disabled={!processedImage || isAnalyzing}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#062317] via-[#0d3f2b] to-[#082a1d] hover:from-[#093523] hover:to-[#0f4e34] disabled:opacity-40 disabled:pointer-events-none text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-emerald-600/30"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Run AI Pathology Analysis</span>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </button>
          </div>
        </div>

        {/* Error message alert */}
        {error && (
          <div
            id="analysis-error-banner"
            className="rounded-2xl p-4.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold block">Specimen Quality & Diagnostic Safety Notice</strong>
              <p className="leading-relaxed">{error}</p>
              <p className="text-[11px] text-rose-700 pt-0.5">
                Recommendation: Place leaf flat on a clean background, ensure uniform illumination without glare, and frame the leaf blade sharply.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Test Presets Archive */}
      <div className="bg-slate-50/80 rounded-3xl border border-slate-200/80 p-6">
        <SampleLeafSelector
          onSelectSample={handleSelectSample}
          selectedSampleId={selectedSampleId}
        />
      </div>

      {/* Photography Guide Tips */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 text-xs text-slate-600 flex items-start gap-3.5 shadow-2xs">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
          <HelpCircle className="w-4.5 h-4.5" />
        </div>
        <div className="space-y-1">
          <span className="font-bold text-slate-900 text-sm">Best Practices for Foliar Imaging:</span>
          <p className="text-slate-500 leading-relaxed text-xs">
            Position the camera perpendicular to the leaf blade filling approximately 70% of the frame. Ensure lesion borders and concentric rings are in sharp focus. If inspecting for downy mildew or rust pustules, photograph both the upper (adaxial) and lower (abaxial) surfaces.
          </p>
        </div>
      </div>
    </div>
  );
};
