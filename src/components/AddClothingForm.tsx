
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useWardrobe } from '@/context/WardrobeContext';
import { v4 as uuidv4 } from 'uuid';
import { clothingService } from '@/services/clothingService';

// Import our new components
import BasicInfoFields from './clothing-form/BasicInfoFields';
import ColorPicker from './clothing-form/ColorPicker';
import ApparelFields from './clothing-form/ApparelFields';
import FootwearFields from './clothing-form/FootwearFields';
import AccessoryFields from './clothing-form/AccessoryFields';
import AdditionalFields from './clothing-form/AdditionalFields';

// Define item types for conditional form rendering
type ItemType = 'apparel' | 'footwear' | 'accessory';

const AddClothingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setClothingItems, refreshClothing } = useWardrobe();
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    category: '',
    color: '#000000',
    size: '',
    brand: '',
    material: '',
    tags: '',
    notes: '',
    // Apparel specific fields
    fabric: '',
    fit: '',
    season: '',
    // Footwear specific fields
    shoeSize: '',
    heelHeight: '',
    footwearStyle: '',
  });
  
  const [image, setImage] = useState<string>('');
  const [selectedItemType, setSelectedItemType] = useState<ItemType>('apparel');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle file upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTypeChange = (type: string) => {
    // Set item type for conditional rendering
    if (type === 'Shoes' || type === 'Boots' || type === 'Sandals') {
      setSelectedItemType('footwear');
    } else if (type === 'Bag' || type === 'Hat' || type === 'Jewelry' || type === 'Scarf' || type === 'Belt') {
      setSelectedItemType('accessory');
    } else {
      setSelectedItemType('apparel');
    }
    
    setFormData(prev => ({ ...prev, type }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const currentDate = new Date().toISOString();
      
      const newItem = {
        name: formData.name,
        type: formData.type,
        category: formData.category,
        color: formData.color,
        size: formData.size,
        brand: formData.brand,
        material: formData.material,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        image: image || '/placeholder.svg',
        notes: formData.notes,
        lastWorn: '',
        createdAt: currentDate,
        updatedAt: currentDate,
        // Add conditional fields based on item type
        ...(selectedItemType === 'apparel' && {
          fabric: formData.fabric,
          fit: formData.fit,
          season: formData.season,
        }),
        ...(selectedItemType === 'footwear' && {
          shoeSize: formData.shoeSize,
          heelHeight: formData.heelHeight,
          footwearStyle: formData.footwearStyle,
        }),
      };
      
      await clothingService.createClothingItem(newItem);
      
      // Refresh the clothing items
      await refreshClothing();
      
      toast({
        title: "Success",
        description: "New item added to your wardrobe!",
        variant: "success"
      });
      
      navigate('/wardrobe');
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Left column: Basic fields */}
          <BasicInfoFields
            name={formData.name}
            brand={formData.brand}
            material={formData.material}
            onNameChange={(value) => handleInputChange('name', value)}
            onBrandChange={(value) => handleInputChange('brand', value)}
            onMaterialChange={(value) => handleInputChange('material', value)}
            type={formData.type}
            category={formData.category}
            onTypeChange={handleTypeChange}
            onCategoryChange={(value) => handleInputChange('category', value)}
          />
          
          <ColorPicker
            color={formData.color}
            onChange={(value) => handleInputChange('color', value)}
          />
        </div>
        
        <div className="space-y-4">
          {/* Right column: Conditional fields based on item type */}
          {selectedItemType === 'apparel' && (
            <ApparelFields
              size={formData.size}
              fabric={formData.fabric}
              fit={formData.fit}
              season={formData.season}
              onSizeChange={(value) => handleInputChange('size', value)}
              onFabricChange={(value) => handleInputChange('fabric', value)}
              onFitChange={(value) => handleInputChange('fit', value)}
              onSeasonChange={(value) => handleInputChange('season', value)}
            />
          )}
          
          {selectedItemType === 'footwear' && (
            <FootwearFields
              shoeSize={formData.shoeSize}
              heelHeight={formData.heelHeight}
              footwearStyle={formData.footwearStyle}
              onShoeSizeChange={(value) => handleInputChange('shoeSize', value)}
              onHeelHeightChange={(value) => handleInputChange('heelHeight', value)}
              onFootwearStyleChange={(value) => handleInputChange('footwearStyle', value)}
            />
          )}
          
          {selectedItemType === 'accessory' && (
            <AccessoryFields
              size={formData.size}
              onSizeChange={(value) => handleInputChange('size', value)}
            />
          )}
          
          <AdditionalFields
            tags={formData.tags}
            notes={formData.notes}
            onTagsChange={(value) => handleInputChange('tags', value)}
            onNotesChange={(value) => handleInputChange('notes', value)}
            image={image}
            onImageChange={handleImageChange}
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/wardrobe')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add to Wardrobe'}
        </Button>
      </div>
    </form>
  );
};

export default AddClothingForm;
