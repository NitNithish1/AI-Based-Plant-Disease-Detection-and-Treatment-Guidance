import { PlantAnalysisResult } from '../types/plant';

export interface IAnalysisRepository {
  getAll(): Promise<PlantAnalysisResult[]>;
  getById(id: string): Promise<PlantAnalysisResult | null>;
  save(result: PlantAnalysisResult): Promise<void>;
  delete(id: string): Promise<void>;
  clearAll(): Promise<void>;
}

const STORAGE_KEY = 'cropguard_plant_disease_history_v1';

class LocalStorageAnalysisRepository implements IAnalysisRepository {
  async getAll(): Promise<PlantAnalysisResult[]> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (err) {
      console.error('Failed to read analysis history from localStorage:', err);
      return [];
    }
  }

  async getById(id: string): Promise<PlantAnalysisResult | null> {
    const list = await this.getAll();
    return list.find((item) => item.id === id) || null;
  }

  async save(result: PlantAnalysisResult): Promise<void> {
    try {
      const list = await this.getAll();
      // Prepend so latest appears first, limit to last 50
      const filtered = list.filter((item) => item.id !== result.id);
      const updated = [result, ...filtered].slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save analysis record:', err);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const list = await this.getAll();
      const updated = list.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to delete analysis record:', err);
    }
  }

  async clearAll(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear analysis history:', err);
    }
  }
}

/**
 * Single instance of active repository.
 * Can be replaced by FirebaseFirestoreRepository when configured.
 */
export const historyRepository: IAnalysisRepository = new LocalStorageAnalysisRepository();
