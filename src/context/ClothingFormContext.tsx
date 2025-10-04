import React, { createContext, useContext, ReactNode } from 'react';

export interface ClothingOption {
  value: string;
  label: string;
}

export interface ClothingOptionGroup {
  label: string;
  options: ClothingOption[];
}

export interface ClothingFormOptions {
  types: ClothingOptionGroup[];
  categories: ClothingOption[];
  fits: ClothingOption[];
  seasons: ClothingOption[];
  heelHeights: ClothingOption[];
  footwearStyles: ClothingOption[];
}

const defaultOptions: ClothingFormOptions = {
  types: [
    {
      label: "Apparel",
      options: [
        { value: "Shirt", label: "Shirt" },
        { value: "T-Shirt", label: "T-Shirt" },
        { value: "Pants", label: "Pants" },
        { value: "Jeans", label: "Jeans" },
        { value: "Dress", label: "Dress" },
        { value: "Skirt", label: "Skirt" },
        { value: "Jacket", label: "Jacket" },
        { value: "Sweater", label: "Sweater" },
        { value: "Coat", label: "Coat" },
      ]
    },
    {
      label: "Footwear",
      options: [
        { value: "Shoes", label: "Shoes" },
        { value: "Boots", label: "Boots" },
        { value: "Sandals", label: "Sandals" },
      ]
    },
    {
      label: "Accessories",
      options: [
        { value: "Bag", label: "Bag" },
        { value: "Hat", label: "Hat" },
        { value: "Jewelry", label: "Jewelry" },
        { value: "Scarf", label: "Scarf" },
        { value: "Belt", label: "Belt" },
      ]
    }
  ],
  categories: [
    { value: "Casual", label: "Casual" },
    { value: "Formal", label: "Formal" },
    { value: "Business", label: "Business" },
    { value: "Athletic", label: "Athletic" },
    { value: "Loungewear", label: "Loungewear" },
    { value: "Outerwear", label: "Outerwear" },
    { value: "Sleepwear", label: "Sleepwear" },
  ],
  fits: [
    { value: "Slim", label: "Slim" },
    { value: "Regular", label: "Regular" },
    { value: "Loose", label: "Loose" },
    { value: "Oversized", label: "Oversized" },
  ],
  seasons: [
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Fall", label: "Fall" },
    { value: "Winter", label: "Winter" },
    { value: "All Seasons", label: "All Seasons" },
  ],
  heelHeights: [
    { value: "Flat", label: "Flat" },
    { value: "Low", label: "Low (0.5-1.5\")" },
    { value: "Medium", label: "Medium (2-3\")" },
    { value: "High", label: "High (3.5\"+)" },
  ],
  footwearStyles: [
    { value: "Casual", label: "Casual" },
    { value: "Athletic", label: "Athletic" },
    { value: "Dress", label: "Dress" },
    { value: "Boot", label: "Boot" },
    { value: "Sandal", label: "Sandal" },
  ],
};

const ClothingFormContext = createContext<ClothingFormOptions | undefined>(undefined);

export const useClothingForm = () => {
  const context = useContext(ClothingFormContext);
  if (!context) {
    throw new Error('useClothingForm must be used within a ClothingFormProvider');
  }
  return context;
};

interface ClothingFormProviderProps {
  children: ReactNode;
  options?: Partial<ClothingFormOptions>;
}

export const ClothingFormProvider: React.FC<ClothingFormProviderProps> = ({
  children,
  options = {}
}) => {
  const mergedOptions: ClothingFormOptions = {
    types: options.types || defaultOptions.types,
    categories: options.categories || defaultOptions.categories,
    fits: options.fits || defaultOptions.fits,
    seasons: options.seasons || defaultOptions.seasons,
    heelHeights: options.heelHeights || defaultOptions.heelHeights,
    footwearStyles: options.footwearStyles || defaultOptions.footwearStyles,
  };

  return (
    <ClothingFormContext.Provider value={mergedOptions}>
      {children}
    </ClothingFormContext.Provider>
  );
};