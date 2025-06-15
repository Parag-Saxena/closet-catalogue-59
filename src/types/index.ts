
import { ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  provider?: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  type: string;
  category: string;
  color: string;
  size: string;
  brand: string;
  material: string;
  tags: string[];
  image: string;
  lastWorn: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  isFavorite?: boolean;
  notes?: string;
  needsWashing?: boolean;
  imageUrl?: string; // for backward compatibility
  // Extended properties for different item types
  fabric?: string; // for apparel
  fit?: string; // for apparel
  season?: string; // for apparel
  shoeSize?: string; // for footwear
  heelHeight?: string; // for footwear
  footwearStyle?: string; // for footwear
}

export interface Outfit {
  id: string;
  name: string;
  items: string[];
  occasion: string;
  weather: string;
  tags: string[];
  image: string;
  lastWorn?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  description?: string;
  isFavorite?: boolean;
  scheduled?: Date | string;
}

export interface LayoutProps {
  children: React.ReactNode;
  excludeSidebar?: boolean;
}

export interface SidebarProviderProps {
  defaultOpen?: boolean;
  children: ReactNode;
}
