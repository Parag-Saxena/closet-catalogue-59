
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormField } from '../ui/form';

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
          <optgroup label="Apparel">
            <option value="Shirt">Shirt</option>
            <option value="T-Shirt">T-Shirt</option>
            <option value="Pants">Pants</option>
            <option value="Jeans">Jeans</option>
            <option value="Dress">Dress</option>
            <option value="Skirt">Skirt</option>
            <option value="Jacket">Jacket</option>
            <option value="Sweater">Sweater</option>
            <option value="Coat">Coat</option>
          </optgroup>
          <optgroup label="Footwear">
            <option value="Shoes">Shoes</option>
            <option value="Boots">Boots</option>
            <option value="Sandals">Sandals</option>
          </optgroup>
          <optgroup label="Accessories">
            <option value="Bag">Bag</option>
            <option value="Hat">Hat</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Scarf">Scarf</option>
            <option value="Belt">Belt</option>
          </optgroup>
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
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Business">Business</option>
          <option value="Athletic">Athletic</option>
          <option value="Loungewear">Loungewear</option>
          <option value="Outerwear">Outerwear</option>
          <option value="Sleepwear">Sleepwear</option>
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
