import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, X, Check, AlertCircle, Scan } from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedDataUrl, setCapturedDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    stopStream();
    setError(null);
    setIsLoading(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsLoading(false);
    } catch (err: any) {
      console.error('Camera initialization error:', err);
      setError(err.message || 'Unable to access camera sensor. Please ensure camera permissions are granted.');
      setIsLoading(false);
    }
  }, [facingMode, stopStream]);

  useEffect(() => {
    if (isOpen && !capturedDataUrl) {
      startCamera();
    } else {
      stopStream();
    }
    return () => {
      stopStream();
    };
  }, [isOpen, capturedDataUrl, startCamera, stopStream]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedDataUrl(dataUrl);
    stopStream();
  };

  const handleRetake = () => {
    setCapturedDataUrl(null);
    startCamera();
  };

  const handleConfirm = () => {
    if (!capturedDataUrl) return;

    // Convert dataUrl to File
    const arr = capturedDataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], `plant_leaf_camera_${Date.now()}.jpg`, { type: mime });

    onCapture(file);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="camera-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <div
        id="camera-modal-content"
        className="bg-[#081b13] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-emerald-700/50 flex flex-col text-white"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-900/60 bg-[#05140e]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-700/50">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Foliar Optical Camera</h3>
              <p className="text-[10px] font-mono text-emerald-400">SENSOR CALIBRATION ACTIVE</p>
            </div>
          </div>
          <button
            id="btn-close-camera"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera View / Preview Area */}
        <div className="relative bg-[#020a06] min-h-[300px] sm:min-h-[360px] flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-rose-200 flex flex-col items-center max-w-xs space-y-3">
              <AlertCircle className="w-10 h-10 text-rose-400 mb-1" />
              <p className="text-xs font-medium leading-relaxed">{error}</p>
              <button
                onClick={startCamera}
                className="text-xs px-4 py-2 bg-rose-900/60 hover:bg-rose-800 text-white rounded-xl transition font-medium border border-rose-700"
              >
                Retry Camera Initialization
              </button>
            </div>
          ) : capturedDataUrl ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={capturedDataUrl}
                alt="Captured leaf snapshot"
                className="w-full h-full object-contain max-h-[400px]"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                SNAPSHOT ACQUIRED
              </div>
            </div>
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 bg-black/60 z-10 space-y-2">
                  <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
                  <span className="text-xs font-mono text-emerald-300">CALIBRATING OPTICAL SENSOR...</span>
                </div>
              )}
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className="w-full h-full object-cover max-h-[400px]"
              />

              {/* Target Aim Reticle Guide for Leaf Framing */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-56 h-56 border-2 border-emerald-400/80 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.45)] flex items-center justify-center relative">
                  {/* Targeting Brackets */}
                  <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-emerald-400" />
                  <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-400" />
                  <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-emerald-400" />
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-emerald-400" />

                  <span className="text-[10px] text-emerald-300 bg-black/80 px-2.5 py-1 rounded-full backdrop-blur-xs font-mono border border-emerald-500/40">
                    ALIGN LEAF SPECIMEN HERE
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Controls */}
        <div className="p-4 bg-[#05140e] border-t border-emerald-900/60 flex items-center justify-between">
          {!capturedDataUrl ? (
            <>
              <button
                type="button"
                id="btn-switch-camera"
                onClick={toggleCamera}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Switch Lens ({facingMode === 'environment' ? 'Rear' : 'Front'})</span>
              </button>

              <button
                type="button"
                id="btn-capture-snapshot"
                onClick={takeSnapshot}
                disabled={Boolean(error) || isLoading}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Frame</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                id="btn-retake-photo"
                onClick={handleRetake}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-300 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>

              <button
                type="button"
                id="btn-confirm-photo"
                onClick={handleConfirm}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition"
              >
                <Check className="w-4 h-4" />
                <span>Use This Specimen</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
