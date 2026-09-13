import React, { useState } from 'react';
import {
  BookOpen,
  Cpu,
  Layers,
  ShieldCheck,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  Terminal,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Database
} from 'lucide-react';
import { CNN_INTEGRATION_SPEC } from '../services/cnnModelInterface';

export const AboutPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('cnn-transition');

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div id="about-page-container" className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2.5 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 shadow-2xs">
          <Cpu className="w-3.5 h-3.5 text-emerald-600" />
          <span>Platform Architecture & Specifications</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          System Purpose, Architecture & AI Specifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Comprehensive engineering documentation detailing the neural vision pipeline, explainability framework, and custom CNN transition strategy.
        </p>
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Platform Objective</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Bridge the diagnostic gap for farmers and agronomy researchers by replacing subjective visual foliar inspection with automated, explainable computer vision diagnostics.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Agronomic Impact</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mitigate catastrophic crop yield losses (estimated at 20-40% globally) caused by fungal blights, bacterial spots, and viral mosaics through early pinpoint detection.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Dual AI Architecture</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Combines multimodal vision reasoning (Gemini 3.8 Flash) with a modular microservice boundary architected for custom-trained convolutional neural networks (CNNs).
          </p>
        </div>
      </div>

      {/* System Architecture Blueprint */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <GitBranch className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">System Architecture Blueprint</h2>
            <p className="text-xs text-slate-400">End-to-end dataflow and modular separation</p>
          </div>
        </div>

        {/* Diagram Flow Box */}
        <div className="bg-[#051b12] rounded-2xl p-6 text-white font-mono text-xs overflow-x-auto border border-emerald-900/40">
          <div className="min-w-[620px] space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="bg-[#092c1e] border border-emerald-700/50 rounded-xl p-3.5 text-center w-48 shadow-xs">
                <span className="text-emerald-300 font-bold block">1. Client Layer</span>
                <span className="text-[11px] text-slate-300">React 19 + TypeScript</span>
                <span className="text-[10px] text-emerald-400/70 block mt-1">WebRTC Camera / Canvas</span>
              </div>

              <div className="text-emerald-400 font-bold">──[POST Base64]──►</div>

              <div className="bg-[#092c1e] border border-emerald-700/50 rounded-xl p-3.5 text-center w-52 shadow-xs">
                <span className="text-emerald-300 font-bold block">2. Backend Proxy</span>
                <span className="text-[11px] text-slate-300">Express + TypeScript Server</span>
                <span className="text-[10px] text-emerald-400/70 block mt-1">Image Validation / Schemas</span>
              </div>

              <div className="text-emerald-400 font-bold">──[Inference]──►</div>

              <div className="bg-[#092c1e] border border-emerald-700/50 rounded-xl p-3.5 text-center w-52 shadow-xs">
                <span className="text-emerald-300 font-bold block">3. Inference Engine</span>
                <span className="text-[11px] text-slate-300">Gemini 3.8 Flash Vision</span>
                <span className="text-[10px] text-teal-300 block mt-1">Or PyTorch CNN Microservice</span>
              </div>
            </div>

            <div className="border-t border-emerald-900/60 pt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>◄── Structured JSON (Disease, Severity Index, Treatments, Prevention) ◄──</span>
              <span className="bg-emerald-950/80 px-2.5 py-1 rounded text-emerald-300 border border-emerald-800/40">
                Repository: LocalStorage / Cloud
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Sections for Technical Specs */}
      <div className="space-y-4">
        {/* Section 1: Transitioning to Custom CNN */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleAccordion('cnn-transition')}
            className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  How to Transition to a Custom-Trained CNN Model
                </h3>
                <p className="text-xs text-slate-500">
                  Step-by-step roadmap for neural deployment using PyTorch / TensorFlow & PlantVillage
                </p>
              </div>
            </div>
            {activeAccordion === 'cnn-transition' ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {activeAccordion === 'cnn-transition' && (
            <div className="p-6 pt-0 border-t border-slate-100 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                PhytoGuard AI is engineered with an <strong>adapter pattern</strong>. You can swap the cloud-hosted Gemini Vision engine with a custom convolutional neural network trained on open datasets (such as <em>PlantVillage</em>: 54,306 images across 38 crop-disease classes):
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {CNN_INTEGRATION_SPEC.suggestedArchitectures.map((arch) => (
                  <div key={arch.name} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <strong className="text-slate-900 text-xs block mb-1">{arch.name}</strong>
                    <p className="text-[11px] text-slate-600 mb-2">{arch.useCase}</p>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Input: {arch.recommendedInputResolution} • Benchmark: {arch.typicalTop1Accuracy}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <strong className="text-slate-900 font-semibold block">
                  Python FastAPI Microservice Snippet (`model_server.py`):
                </strong>
                <pre className="bg-[#071912] text-emerald-300 p-4 rounded-2xl text-xs overflow-x-auto font-mono border border-emerald-900/50">
{`from fastapi import FastAPI, UploadFile, File
import torch
from torchvision import models, transforms
from PIL import Image
import io

app = FastAPI(title="Plant Disease CNN Inference Engine")

# Load pre-trained weights fine-tuned on PlantVillage
model = models.resnet50(pretrained=False)
num_ftrs = model.fc.in_features
model.fc = torch.nn.Linear(num_ftrs, 38) # 38 disease classes
model.load_state_dict(torch.load("weights/plant_resnet50_best.pth", map_location="cpu"))
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        outputs = model(tensor)
        probs = torch.nn.functional.softmax(outputs[0], dim=0)
        top_prob, top_class = torch.topk(probs, 1)
    return {
        "class_id": int(top_class),
        "confidence": float(top_prob),
        "severity": "Moderate" if float(top_prob) > 0.8 else "Mild"
    }`}
                </pre>
              </div>

              <p className="text-xs text-slate-500">
                To link this in your Express backend, simply update the `POST /api/analyze` route to forward the image buffer to `http://localhost:8000/predict` and map the output class ID to our structured agronomic treatment catalog.
              </p>
            </div>
          )}
        </div>

        {/* Section 2: Installation & Local Run Commands */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleAccordion('local-run')}
            className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Installation, Local Run & Environment Setup
                </h3>
                <p className="text-xs text-slate-500">
                  Commands to install dependencies, configure API keys, and launch the dev server
                </p>
              </div>
            </div>
            {activeAccordion === 'local-run' ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {activeAccordion === 'local-run' && (
            <div className="p-6 pt-0 border-t border-slate-100 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">1. Install Dependencies</h4>
                <pre className="bg-[#071912] text-slate-200 p-3.5 rounded-xl font-mono text-xs border border-emerald-950/60">
                  npm install
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">2. Environment Configuration</h4>
                <p className="text-xs text-slate-600">
                  Create a `.env` file in the project root:
                </p>
                <pre className="bg-[#071912] text-emerald-400 p-3.5 rounded-xl font-mono text-xs border border-emerald-950/60">
{`GEMINI_API_KEY="your_google_gemini_api_key_here"
NODE_ENV="development"`}
                </pre>
                <p className="text-xs text-slate-500">
                  Obtain your Gemini API key from <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-emerald-700 underline">Google AI Studio</a>.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">3. Run Full-Stack Development Server</h4>
                <pre className="bg-[#071912] text-slate-200 p-3.5 rounded-xl font-mono text-xs border border-emerald-950/60">
                  npm run dev
                </pre>
                <p className="text-xs text-slate-500">
                  The Express server starts on port 3000 with Vite middleware handling the React frontend.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Benefits & Limitations */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <button
            type="button"
            onClick={() => toggleAccordion('benefits-limitations')}
            className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Agronomic Benefits & Systemic Limitations
                </h3>
                <p className="text-xs text-slate-500">
                  Real-world application boundaries and safety critical analysis
                </p>
              </div>
            </div>
            {activeAccordion === 'benefits-limitations' ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {activeAccordion === 'benefits-limitations' && (
            <div className="p-6 pt-0 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-2">
                <h4 className="font-bold text-emerald-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Key Agronomic Benefits
                </h4>
                <ul className="space-y-2 text-slate-600 list-disc pl-4 text-xs leading-relaxed">
                  <li>Rapid field scouting without waiting days for lab incubation results.</li>
                  <li>Prevents over-application and indiscriminate spraying of high-cost synthetic fungicides.</li>
                  <li>Educates smallholders on crop rotation and hygienic prevention practices.</li>
                  <li>Explainable diagnostic rationale builds farmer confidence and trust.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-rose-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  Systemic Limitations
                </h4>
                <ul className="space-y-2 text-slate-600 list-disc pl-4 text-xs leading-relaxed">
                  <li>Foliar visual models cannot directly observe soil-borne root nematodes or vascular blockages without above-ground wilting symptoms.</li>
                  <li>Extreme shadows, blurred focus, or chemical spray residue can mimic foliar necrosis.</li>
                  <li>Multiple co-occurring diseases (e.g. Early Blight + Spider Mites) require multi-label inference.</li>
                  <li>Predictions must always be verified by an agricultural extension specialist before major crop remediation.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
