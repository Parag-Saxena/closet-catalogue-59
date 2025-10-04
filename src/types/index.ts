
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
  brand: string;
  occasion: 'casual' | 'formal'; // casual or formal wear
  image: string;
  lastWorn: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  isFavorite?: boolean;
  notes?: string;
  needsWashing?: boolean;
  imageUrl?: string; // for backward compatibility
  // T-shirt specific
  environment?: 'indoors' | 'outdoors'; // for t-shirts only
  // Optional fields
  size?: string;
  material?: string;
  tags?: string[];
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
