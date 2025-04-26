
import { Outfit } from '@/types';
import { api } from './api';

// Mock data for development
const mockOutfits: Outfit[] = [
  // Add some sample outfits here
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const outfitService = {
  getAllOutfits: async (): Promise<Outfit[]> => {
    try {
      // In production, this would use the API client
      // return api.get('/outfits');
      
      // For development, we'll simulate an API call
      await delay(500);
      const storedOutfits = localStorage.getItem('outfits');
      return storedOutfits ? JSON.parse(storedOutfits) : mockOutfits;
    } catch (error) {
      console.error('Error fetching outfits:', error);
      return [];
    }
  },
  
  getOutfitById: async (id: string): Promise<Outfit | null> => {
    try {
      // In production: return api.get(`/outfits/${id}`);
      await delay(300);
      const outfits = await outfitService.getAllOutfits();
      return outfits.find(outfit => outfit.id === id) || null;
    } catch (error) {
      console.error(`Error fetching outfit ${id}:`, error);
      return null;
    }
  },
  
  createOutfit: async (outfit: Omit<Outfit, 'id'>): Promise<Outfit> => {
    try {
      // In production: return api.post('/outfits', outfit);
      await delay(500);
      const newOutfit = { 
        ...outfit, 
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Outfit;
      
      const outfits = await outfitService.getAllOutfits();
      const updatedOutfits = [...outfits, newOutfit];
      localStorage.setItem('outfits', JSON.stringify(updatedOutfits));
      
      return newOutfit;
    } catch (error) {
      console.error('Error creating outfit:', error);
      throw error;
    }
  },
  
  updateOutfit: async (id: string, updates: Partial<Outfit>): Promise<Outfit> => {
    try {
      // In production: return api.put(`/outfits/${id}`, updates);
      await delay(400);
      const outfits = await outfitService.getAllOutfits();
      const index = outfits.findIndex(outfit => outfit.id === id);
      
      if (index === -1) throw new Error(`Outfit ${id} not found`);
      
      const updatedOutfit = {
        ...outfits[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      outfits[index] = updatedOutfit;
      localStorage.setItem('outfits', JSON.stringify(outfits));
      
      return updatedOutfit;
    } catch (error) {
      console.error(`Error updating outfit ${id}:`, error);
      throw error;
    }
  },
  
  deleteOutfit: async (id: string): Promise<boolean> => {
    try {
      // In production: return api.delete(`/outfits/${id}`);
      await delay(300);
      const outfits = await outfitService.getAllOutfits();
      const filteredOutfits = outfits.filter(outfit => outfit.id !== id);
      
      localStorage.setItem('outfits', JSON.stringify(filteredOutfits));
      return true;
    } catch (error) {
      console.error(`Error deleting outfit ${id}:`, error);
      return false;
    }
  }
};
