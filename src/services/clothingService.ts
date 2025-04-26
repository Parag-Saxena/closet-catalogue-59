
import { ClothingItem } from '@/types';
import { api } from './api';

// Mock data for development
const mockClothingItems: ClothingItem[] = [
  // Add some sample clothing items here
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const clothingService = {
  getAllClothingItems: async (): Promise<ClothingItem[]> => {
    try {
      // In production, this would use the API client
      // return api.get('/clothing');
      
      // For development, we'll simulate an API call
      await delay(500);
      const storedItems = localStorage.getItem('closetItems');
      return storedItems ? JSON.parse(storedItems) : mockClothingItems;
    } catch (error) {
      console.error('Error fetching clothing items:', error);
      return [];
    }
  },
  
  getClothingItemById: async (id: string): Promise<ClothingItem | null> => {
    try {
      // In production: return api.get(`/clothing/${id}`);
      await delay(300);
      const items = await clothingService.getAllClothingItems();
      return items.find(item => item.id === id) || null;
    } catch (error) {
      console.error(`Error fetching clothing item ${id}:`, error);
      return null;
    }
  },
  
  createClothingItem: async (item: Omit<ClothingItem, 'id'>): Promise<ClothingItem> => {
    try {
      // In production: return api.post('/clothing', item);
      await delay(500);
      const newItem = { 
        ...item, 
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as ClothingItem;
      
      const items = await clothingService.getAllClothingItems();
      const updatedItems = [...items, newItem];
      localStorage.setItem('closetItems', JSON.stringify(updatedItems));
      
      return newItem;
    } catch (error) {
      console.error('Error creating clothing item:', error);
      throw error;
    }
  },
  
  updateClothingItem: async (id: string, updates: Partial<ClothingItem>): Promise<ClothingItem> => {
    try {
      // In production: return api.put(`/clothing/${id}`, updates);
      await delay(400);
      const items = await clothingService.getAllClothingItems();
      const index = items.findIndex(item => item.id === id);
      
      if (index === -1) throw new Error(`Clothing item ${id} not found`);
      
      const updatedItem = {
        ...items[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      items[index] = updatedItem;
      localStorage.setItem('closetItems', JSON.stringify(items));
      
      return updatedItem;
    } catch (error) {
      console.error(`Error updating clothing item ${id}:`, error);
      throw error;
    }
  },
  
  deleteClothingItem: async (id: string): Promise<boolean> => {
    try {
      // In production: return api.delete(`/clothing/${id}`);
      await delay(300);
      const items = await clothingService.getAllClothingItems();
      const filteredItems = items.filter(item => item.id !== id);
      
      localStorage.setItem('closetItems', JSON.stringify(filteredItems));
      return true;
    } catch (error) {
      console.error(`Error deleting clothing item ${id}:`, error);
      return false;
    }
  }
};
