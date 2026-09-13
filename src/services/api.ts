import { PlantAnalysisResult } from '../types/plant';

export interface AnalyzePayload {
  imageBase64: string;
  mimeType: string;
  fileName?: string;
  cropHint?: string;
}

export async function analyzePlantImage(payload: AnalyzePayload): Promise<PlantAnalysisResult> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let errorMessage = `Server error (${response.status})`;
    try {
      const errorData = await response.json();
      if (errorData?.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  const result: PlantAnalysisResult = await response.json();
  return result;
}
