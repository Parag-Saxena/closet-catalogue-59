
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
