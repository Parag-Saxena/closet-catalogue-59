
export interface Outfit {
  id: string;
  name: string;
  items: Array<string>;
  occasion: string;
  weather: string;
  tags: Array<string>;
  image: string;
  lastWorn: Date;
  createdAt: Date;
  updatedAt: Date;
  description?: string; // keeping for backward compatibility
}
