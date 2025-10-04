
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormField } from '../ui/form';
import { useClothingForm } from '@/context/ClothingFormContext';

interface BasicInfoFieldsProps {
  name: string;
  brand: string;
  material: string;
  onNameChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onMaterialChange: (value: string) => void;
  type: string;
  category: string;
  onTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  name,
  brand,
  material,
  onNameChange,
  onBrandChange,
  onMaterialChange,
  type,
  category,
  onTypeChange,
  onCategoryChange
}) => {
  const { types, categories } = useClothingForm();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Item Name*</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Blue Denim Jacket"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="type">Type*</Label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
        >
          <option value="">Select Type</option>
          {types.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="category">Category*</Label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
        >
          <option value="">Select Category</option>
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          name="brand"
          value={brand}
          onChange={(e) => onBrandChange(e.target.value)}
          placeholder="Brand name"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="material">Material</Label>
        <Input
          id="material"
          name="material"
          value={material}
          onChange={(e) => onMaterialChange(e.target.value)}
          placeholder="Cotton, Polyester, etc."
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default BasicInfoFields;
