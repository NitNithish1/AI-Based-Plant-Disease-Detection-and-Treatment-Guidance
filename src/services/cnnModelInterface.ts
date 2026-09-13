/**
 * PhytoGuard AI: Model Abstraction Layer
 *
 * This file specifies the architectural contract for transitioning from
 * Google Gemini Multimodal Vision to a custom-trained Convolutional Neural Network (CNN)
 * such as ResNet-50, EfficientNet-B4, MobileNetV3, or Vision Transformer (ViT)
 * trained on agricultural datasets like PlantVillage or PlantDoc.
 */

import { PlantAnalysisResult } from '../types/plant';

export interface InferenceRequest {
  imageBase64: string;
  mimeType: string;
  cropHint?: string;
}

export interface IPlantDiseaseInferenceEngine {
  engineName: string;
  version: string;
  analyzeImage(request: InferenceRequest): Promise<PlantAnalysisResult>;
}

/**
 * Example payload structure when deploying a Python/PyTorch/FastAPI microservice:
 *
 * POST /api/v1/predict-cnn
 * Request: { "image_base64": "<base64>", "crop_type": "tomato" }
 * Response:
 * {
 *   "predicted_class": "Tomato___Early_blight",
 *   "plant": "Tomato",
 *   "disease": "Early Blight",
 *   "confidence": 0.942,
 *   "severity_grade": "Moderate",
 *   "grad_cam_heatmap_url": "/static/heatmaps/cam_104.png",
 *   "feature_map_activations": [ ... ]
 * }
 */

export const CNN_INTEGRATION_SPEC = {
  suggestedArchitectures: [
    {
      name: 'ResNet-50 (Residual Networks)',
      useCase: 'Deep residual skip-connections prevent vanishing gradient; best for high diagnostic precision.',
      recommendedInputResolution: '224x224x3',
      typicalTop1Accuracy: '98.2% on PlantVillage'
    },
    {
      name: 'MobileNetV3 / EfficientNet-B0',
      useCase: 'Depthwise separable convolutions; ideal for edge devices and offline farmer mobile apps.',
      recommendedInputResolution: '224x224x3',
      typicalTop1Accuracy: '96.5%'
    },
    {
      name: 'Vision Transformer (ViT-Base/16)',
      useCase: 'Self-attention mechanism captures global leaf context and distant necrotic spots.',
      recommendedInputResolution: '384x384x3',
      typicalTop1Accuracy: '98.9%'
    }
  ],
  gradCamExplainability: 'Grad-CAM (Gradient-weighted Class Activation Mapping) produces visual heatmaps highlighting which leaf regions triggered the classification.'
};
