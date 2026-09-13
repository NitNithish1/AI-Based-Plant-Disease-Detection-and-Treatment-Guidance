# AI-Based Plant Disease Detection and Treatment Guidance

**Final-Year Computer Science & Engineering (CSE) Capstone Project**  
*Domain:* Artificial Intelligence • Computer Vision • Agricultural Technology (AgTech)

---

## 📌 1. Project Abstract & Objective
Crop diseases represent a significant threat to global food security and farmer livelihoods, causing 20–40% in annual agricultural losses worldwide. Traditional field diagnosis relies heavily on human visual examination, which is subjective, prone to misidentification between lookalike pathogens, and often inaccessible to remote smallholders.

**"AI-Based Plant Disease Detection and Treatment Guidance"** is a full-stack, production-grade agricultural decision support system. Users upload or capture photographs of plant leaves in the field. The multimodal vision pipeline analyzes the image, identifies the crop species and specific pathogen, calculates a quantitative **Severity Index (Mild, Moderate, Severe)**, provides **Explainable AI (XAI)** reasoning based on observable foliar symptoms (e.g., concentric target rings, chlorotic halos, sporulation margins), and formulates tailored treatment and long-term prevention protocols.

---

## 🚀 2. System Architecture

```
┌────────────────────────────────────────────────────────┐
│               1. Presentation Layer (SPA)              │
│       React 19 + TypeScript + Tailwind CSS + Lucide     │
│   - Live Camera Capture (WebRTC getUserMedia API)      │
│   - Interactive Dropzone & Instant Specimen Presets    │
│   - Multi-stage Diagnostic Scan Progress Animation     │
│   - Visual Pathology Index & Severity Gauge (0-100%)   │
└──────────────────────────┬─────────────────────────────┘
                           │
                 HTTP POST (JSON Base64)
                           │
┌──────────────────────────▼─────────────────────────────┐
│             2. Full-Stack API Layer (Express)          │
│            server.ts (Proxy on port 3000)              │
│   - Payload Size Guard & Image MIME Verification       │
│   - Gemini Multimodal Vision Client (@google/genai)    │
│   - Strict Structured JSON Schema Output Enforcer      │
│   - Resilient Fallback Rule Engine for Offline Demo    │
└──────────────────────────┬─────────────────────────────┘
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│  3A. Active AI Vision Model  │ │  3B. Future CNN Engine (XAI) │
│     gemini-3.8-flash         │ │   PyTorch / FastAPI Service  │
│ - Zero-shot foliar diagnosis │ │ - ResNet-50 / MobileNetV3    │
│ - Rejects blurry/non-plant   │ │ - PlantVillage 38-class fine │
│ - Agronomic treatment logic  │ │ - Grad-CAM visual heatmap    │
└──────────────────────────────┘ └──────────────────────────────┘
```

---

## 🛠️ 3. Technologies & Dependencies

| Layer | Technologies Used |
|---|---|
| **Frontend** | React 19, TypeScript 5.8, Tailwind CSS v4, Motion |
| **Icons & UI** | Lucide React |
| **Backend & Proxy** | Node.js, Express 4.21, `tsx`, `esbuild` |
| **AI / Vision SDK** | `@google/genai` (SDK 2.4+), Model: `gemini-3.8-flash` |
| **Persistence** | LocalStorage with modular `IAnalysisRepository` interface (Firebase Firestore ready) |

---

## 💻 4. Installation & Local Setup

### Step 1: Clone or Open the Repository
```bash
git clone <repository-url>
cd plant-disease-detection
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Variable Setup
Create a `.env` file in the root directory:
```env
# Gemini API Key from Google AI Studio (https://aistudio.google.com)
GEMINI_API_KEY="AIzaSyYourGeminiApiKeyHere"

# Port is fixed to 3000
PORT=3000
NODE_ENV=development
```

> **Note:** An example file is provided at `.env.example`.

### Step 4: Launch the Full-Stack Application
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to interact with the application.

---

## 🧠 5. How the AI Analysis Works

1. **Specimen Image Preprocessing:**
   - The user selects an image from disk, takes a photo with the live camera, or picks a curated specimen preset.
   - The client compresses high-resolution photographs to 1200px max dimension using an HTML5 Canvas pipeline, converting the image to base64 JPEG format.
2. **Quality & Foliar Authenticity Check:**
   - The AI first inspects whether the image contains a recognizable plant leaf.
   - If the photo is out-of-focus, dark, or does not contain foliage, the AI returns `isPlant: false` or `isClearImage: false` with constructive guidance instead of hallucinating an arbitrary disease.
3. **Multimodal Pathological Inference:**
   - The image is analyzed using `gemini-3.8-flash` via the `@google/genai` SDK on the server side.
   - The model evaluates lesion geometry, concentric target rings (Alternaria), water-soaked margins (Phytophthora), pustules (Puccinia), and chlorotic halos.
4. **Structured JSON Output:**
   - Structured JSON schemas enforce strict typing for plant name, disease name, severity score (0–100), symptoms detected, explainability rationale, biological remedies, and registered chemical treatments.

---

## 🔬 6. How to Replace Gemini with a Trained CNN Model

The project is structured with an **Adapter Pattern** located at `src/services/cnnModelInterface.ts`. 

To transition from the cloud LLM to a local, edge-deployable Convolutional Neural Network (such as ResNet-50 or MobileNetV3 trained on the PlantVillage dataset):

### Step 1: Train the CNN
Use PyTorch or TensorFlow to train on the PlantVillage dataset (54,306 images across 38 crop-disease classes):
```python
import torch
import torchvision.models as models

# Transfer learning with ResNet-50
model = models.resnet50(weights='DEFAULT')
num_ftrs = model.fc.in_features
model.fc = torch.nn.Linear(num_ftrs, 38) # 38 plant-disease categories
```

### Step 2: Deploy as a Microservice (FastAPI)
Create a Python endpoint (`POST /predict`):
```python
from fastapi import FastAPI, UploadFile, File
import torch
from torchvision import transforms
from PIL import Image
import io

app = FastAPI()

@app.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read())).convert("RGB")
    # Execute inference
    # Return class label, confidence, and Grad-CAM activation heatmap
    return {"plant": "Tomato", "disease": "Early Blight", "confidence": 0.94}
```

### Step 3: Wire into `server.ts`
In `server.ts`, simply forward the image payload to `http://localhost:8000/predict` and map the output to our `PlantAnalysisResult` schema.

---

## 🛡️ 7. Agricultural Safety Disclaimer
Predictions provided by this software are probabilistic estimates generated by deep neural networks for decision support and agricultural extension scouting. They do **not** replace certified phytosanitary laboratory testing. Always inspect multiple leaves in a field canopy and consult a local agricultural extension specialist before applying chemical pesticides.

---

## 📂 8. Project Directory Structure
```
├── server.ts                    # Express + Vite backend server & Gemini API proxy
├── package.json                 # Project dependencies & build scripts
├── .env.example                 # Environment variables specification
├── metadata.json                # Project identity & frame permissions
├── src/
│   ├── App.tsx                  # Top-level view router & state manager
│   ├── main.tsx                 # React DOM mount entrypoint
│   ├── index.css                # Global Tailwind CSS imports
│   ├── components/              # Modular UI components
│   │   ├── Navbar.tsx           # Navigation header & mobile drawer
│   │   ├── Footer.tsx           # Academic credits & quick links
│   │   ├── ImageDropzone.tsx    # Drag-and-drop & browse upload container
│   │   ├── CameraCaptureModal.tsx # WebRTC live camera capture
│   │   ├── SampleLeafSelector.tsx # Presets for instant live demonstration
│   │   ├── SeverityBadge.tsx    # Visual color-coded severity tag
│   │   ├── SeverityGauge.tsx    # Animated 0-100% pathology meter
│   │   ├── AnalysisLoader.tsx   # 4-stage neural diagnostic scanner
│   │   └── DisclaimerBanner.tsx # Agricultural safety advisory notice
│   ├── pages/                   # Primary application views
│   │   ├── HomePage.tsx         # Overview, Hero visual, How it Works
│   │   ├── AnalysisPage.tsx     # Specimen upload, camera, & inference trigger
│   │   ├── ResultPage.tsx       # Diagnosis, XAI reasoning, Treatment plan
│   │   ├── HistoryPage.tsx      # LocalStorage historical analysis repository
│   │   └── AboutPage.tsx        # CSE Capstone specifications & CNN guide
│   ├── services/
│   │   ├── api.ts               # Client-side API fetch client
│   │   ├── historyService.ts    # Repository pattern for local/cloud persistence
│   │   └── cnnModelInterface.ts # Architectural contract for custom CNNs
│   ├── types/
│   │   └── plant.ts             # TypeScript interfaces for diseases & treatments
│   ├── data/
│   │   ├── sampleLeaves.ts      # Vector SVG specimens for instant testing
│   │   └── supportedCrops.ts    # 8+ supported crop pathology catalog
│   └── utils/
│       └── imageUtils.ts        # Image validation, resizing, & base64 encoding
```
