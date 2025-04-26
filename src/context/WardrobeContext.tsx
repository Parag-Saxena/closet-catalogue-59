
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ClothingItem, Outfit } from '@/types';
import { clothingService } from '@/services/clothingService';
import { outfitService } from '@/services/outfitService';

interface WardrobeContextProps {
  clothingItems: ClothingItem[];
  setClothingItems: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
  outfits: Outfit[];
  setOutfits: React.Dispatch<React.SetStateAction<Outfit[]>>;
  loading: boolean;
  refreshClothing: () => Promise<void>;
  refreshOutfits: () => Promise<void>;
}

interface WardrobeProviderProps {
  children: ReactNode;
}

const WardrobeContext = createContext<WardrobeContextProps | undefined>(undefined);

export const WardrobeProvider: React.FC<WardrobeProviderProps> = ({ children }) => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshClothing = async () => {
    try {
      setLoading(true);
      const items = await clothingService.getAllClothingItems();
      setClothingItems(items);
    } catch (error) {
      console.error('Failed to fetch clothing items:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshOutfits = async () => {
    try {
      setLoading(true);
      const fetchedOutfits = await outfitService.getAllOutfits();
      setOutfits(fetchedOutfits);
    } catch (error) {
      console.error('Failed to fetch outfits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      await Promise.all([refreshClothing(), refreshOutfits()]);
    };

    fetchData();
  }, []);

  return (
    <WardrobeContext.Provider value={{
      clothingItems,
      setClothingItems,
      outfits,
      setOutfits,
      loading,
      refreshClothing,
      refreshOutfits
    }}>
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = (): WardrobeContextProps => {
  const context = useContext(WardrobeContext);
  if (context === undefined) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
};
