import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, X, AlertCircle, Scan, Sparkles, RefreshCw } from 'lucide-react';
import { validateImageFile } from '../utils/imageUtils';
import { CameraCaptureModal } from './CameraCaptureModal';

interface ImageDropzoneProps {
  previewUrl: string | null;
  fileName?: string;
  fileSizeBytes?: number;
  onFileSelected: (file: File) => void;
  onClear: () => void;
  disabled?: boolean;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  previewUrl,
  fileName,
  fileSizeBytes,
  onFileSelected,
  onClear,
  disabled = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setValidationError(null);
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setValidationError(validation.error || 'Invalid file uploaded');
      return;
    }
    onFileSelected(file);
  };

  return (
    <div id="image-upload-wrapper" className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        id="plant-leaf-file-input"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
        onChange={handleFileInputChange}
        disabled={disabled}
      />

      {previewUrl ? (
        // Sophisticated Scanning Frame Preview State
        <div
          id="image-preview-container"
          className="relative rounded-3xl border border-emerald-800/30 bg-[#071d15] text-white p-5 sm:p-7 overflow-hidden shadow-xl"
        >
          {/* Subtle scanner grid background */}
          <div className="absolute inset-0 scanner-grid-dark opacity-30 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Viewport Frame with Corner Brackets */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-[#030e09] border border-emerald-600/40 shadow-inner flex items-center justify-center shrink-0 group">
              <img
                src={previewUrl}
                alt="Selected plant leaf specimen"
                className="w-full h-full object-contain p-2"
              />

              {/* Targeting Reticles */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-emerald-400" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-400" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-emerald-400" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-emerald-400" />

              {/* Status Pill */}
              <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SPECIMEN LOADED</span>
              </div>
            </div>

            {/* Specimen Metadata & Diagnostic Confirmation */}
            <div className="flex-1 text-center md:text-left space-y-2.5 w-full">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-700/50">
                  <Scan className="w-3.5 h-3.5 text-emerald-400" />
                  OPTICAL INPUT VERIFIED
                </span>

                <button
                  type="button"
                  id="btn-remove-preview"
                  onClick={onClear}
                  disabled={disabled}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                  title="Remove specimen"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h4 className="font-bold text-white text-base sm:text-lg truncate max-w-md">
                  {fileName || 'leaf_specimen.jpg'}
                </h4>
                {fileSizeBytes && (
                  <p className="text-xs font-mono text-emerald-400/80 pt-0.5">
                    {(fileSizeBytes / 1024).toFixed(1)} KB • Foliar RGB Tensor Formatted
                  </p>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
                Specimen has passed optical resolution validation. Select an optional crop hint or initiate the foliar pathology analysis pipeline below.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <button
                  type="button"
                  id="btn-change-image"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled}
                  className="text-xs px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl transition font-medium flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  Change Image
                </button>

                <button
                  type="button"
                  id="btn-retake-camera"
                  onClick={() => setIsCameraOpen(true)}
                  disabled={disabled}
                  className="text-xs px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl transition font-medium inline-flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-400" />
                  Camera Retake
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Professional AI Scanner Upload Zone
        <div
          id="dropzone-box"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group cursor-pointer rounded-3xl border-2 border-dashed p-8 sm:p-14 text-center transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden ${
            isDragOver
              ? 'border-emerald-500 bg-emerald-50/70 scale-[1.008] shadow-lg'
              : 'border-slate-300/90 hover:border-emerald-500/80 bg-gradient-to-b from-slate-50/70 to-emerald-50/20 hover:bg-emerald-50/40 shadow-xs'
          }`}
        >
          {/* Subtle scanner grid */}
          <div className="absolute inset-0 scanner-grid-bg opacity-50 pointer-events-none" />

          {/* Corner targeting reticles */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-slate-400 group-hover:border-emerald-500 transition-colors" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-slate-400 group-hover:border-emerald-500 transition-colors" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-slate-400 group-hover:border-emerald-500 transition-colors" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-slate-400 group-hover:border-emerald-500 transition-colors" />

          {/* Central Diagnostic Scanning Icon */}
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#062317] to-[#0f432d] text-emerald-400 flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform border border-emerald-600/30">
            <Scan className="w-10 h-10 group-hover:rotate-6 transition-transform" />
          </div>

          <div className="relative z-10 space-y-1.5 max-w-md">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-800">
              [ SCAN PLANT ]
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Drop Leaf Image Here or Use Camera
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Supports close-up photographs of Tomato, Potato, Maize, Apple, Rice, Grape, and other field foliage (JPEG, PNG, or WebP up to 10MB).
            </p>
          </div>

          {/* Action Triggers */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-6">
            <button
              type="button"
              id="btn-browse-image"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition"
            >
              <ImageIcon className="w-4 h-4 text-emerald-300" />
              <span>Browse Image File</span>
            </button>

            <button
              type="button"
              id="btn-open-camera"
              onClick={(e) => {
                e.stopPropagation();
                setIsCameraOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition"
            >
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Capture with Camera</span>
            </button>
          </div>
        </div>
      )}

      {validationError && (
        <div
          id="upload-validation-error"
          className="rounded-2xl p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold block">Validation Error</span>
            <span>{validationError}</span>
          </div>
        </div>
      )}

      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(file) => {
          processFile(file);
        }}
      />
    </div>
  );
};
