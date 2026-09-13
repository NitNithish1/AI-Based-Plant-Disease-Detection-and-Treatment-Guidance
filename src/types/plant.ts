export type SeverityLevel = 'Mild' | 'Moderate' | 'Severe' | 'None';

export interface TreatmentPlan {
  immediateActions: string[];
  organicRemedies: string[];
  chemicalOptions: string[];
  culturalPractices: string[];
}

export interface PreventionGuide {
  irrigationAndMoisture: string;
  spacingAndAirflow: string;
  soilAndSanitation: string;
  cropRotationAndResistantVarieties: string;
}

export interface PlantAnalysisResult {
  id: string;
  timestamp: string;
  plantName: string;
  scientificName?: string;
  diseaseName: string;
  isHealthy: boolean;
  isPlant: boolean;
  isClearImage: boolean;
  clarityNotes?: string;
  severity: SeverityLevel;
  severityScore: number; // 0 to 100
  confidence: number; // 0 to 100
  symptomsDetected: string[];
  visualEvidenceDescription: string;
  reasoning: string;
  treatment: TreatmentPlan;
  prevention: PreventionGuide;
  whenToConsultExpert: string;
  imageUrl?: string;
  imageFileName?: string;
  modelSource: 'gemini-vision' | 'cnn-classifier' | 'fallback-rule-engine';
}

export interface CropInfo {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  description: string;
  commonDiseases: string[];
  icon: string;
  optimalTemperature: string;
  wateringGuideline: string;
}

export interface SampleLeaf {
  id: string;
  title: string;
  plantName: string;
  diseaseName: string;
  severity: SeverityLevel;
  confidence: number;
  description: string;
  imageUrl: string;
  badgeColor: string;
}
