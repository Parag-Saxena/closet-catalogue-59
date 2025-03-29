
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, ClothingItem, Outfit } from '@/types';
import { getCurrentUser } from '@/services/authService';

interface AppContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  clothingItems: ClothingItem[];
  setClothingItems: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
  outfits: Outfit[];
  setOutfits: React.Dispatch<React.SetStateAction<Outfit[]>>;
  loading: boolean;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user from localStorage
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    // Load clothing items and outfits from localStorage
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]');
    const storedOutfits = JSON.parse(localStorage.getItem('outfits') || '[]');
    
    setClothingItems(storedItems);
    setOutfits(storedOutfits);
    setLoading(false);
  }, []);

  // Save clothing items to localStorage when they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('closetItems', JSON.stringify(clothingItems));
    }
  }, [clothingItems, loading]);

  // Save outfits to localStorage when they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('outfits', JSON.stringify(outfits));
    }
  }, [outfits, loading]);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      clothingItems,
      setClothingItems,
      outfits, 
      setOutfits,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
