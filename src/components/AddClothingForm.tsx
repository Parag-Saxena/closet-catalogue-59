
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useWardrobe } from '@/context/WardrobeContext';
import { clothingService } from '@/services/clothingService';
import { Upload } from 'lucide-react';

const AddClothingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { refreshClothing } = useWardrobe();

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    category: '',
    brand: '',
    size: '',
    color: '#000000',
    occasion: 'casual' as 'casual' | 'formal',
    environment: 'indoors' as 'indoors' | 'outdoors',
  });

  const [image, setImage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.type || !formData.category || !formData.brand || !formData.color) {
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
        brand: formData.brand,
        size: formData.size,
        color: formData.color,
        occasion: formData.occasion,
        image: image || '/placeholder.svg',
        lastWorn: '',
        createdAt: currentDate,
        updatedAt: currentDate,
        // Add environment only for t-shirts
        ...(formData.type.toLowerCase().includes('shirt') && {
          environment: formData.environment,
        }),
      };

      await clothingService.createClothingItem(newItem);
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

  const isTShirt = formData.type.toLowerCase().includes('shirt');

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      {/* Main Details Section */}
      <div className="space-y-6 stylestack-glass p-6 rounded-lg">
        <div className="border-b pb-2">
          <h2 className="text-xl font-semibold text-foreground">Main Details</h2>
          <p className="text-sm text-muted-foreground">Essential information about your item</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Blue Denim Shirt"
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-foreground">
              Type <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="T-Shirt">T-Shirt</SelectItem>
                <SelectItem value="Shirt">Shirt</SelectItem>
                <SelectItem value="Polo Shirt">Polo Shirt</SelectItem>
                <SelectItem value="Pants">Pants</SelectItem>
                <SelectItem value="Jeans">Jeans</SelectItem>
                <SelectItem value="Shorts">Shorts</SelectItem>
                <SelectItem value="Jacket">Jacket</SelectItem>
                <SelectItem value="Sweater">Sweater</SelectItem>
                <SelectItem value="Hoodie">Hoodie</SelectItem>
                <SelectItem value="Dress">Dress</SelectItem>
                <SelectItem value="Skirt">Skirt</SelectItem>
                <SelectItem value="Shoes">Shoes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <Label htmlFor="brand" className="text-foreground">
              Brand <span className="text-destructive">*</span>
            </Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => handleInputChange('brand', e.target.value)}
              placeholder="e.g., Nike, Zara, H&M"
              required
            />
          </div>

          {/* Size */}
          <div className="space-y-2">
            <Label htmlFor="size" className="text-foreground">
              Size <span className="text-destructive">*</span>
            </Label>
            <Input
              id="size"
              value={formData.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
              placeholder="e.g., S, M, L, XL, 32, 42"
              required
            />
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="color" className="text-foreground">
              Color <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-3 items-center">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-20 h-10 cursor-pointer"
                required
              />
              <Input
                type="text"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>

          {/* Occasion */}
          <div className="space-y-2">
            <Label className="text-foreground">
              Occasion <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={formData.occasion}
              onValueChange={(value: 'casual' | 'formal') => handleInputChange('occasion', value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="casual" id="casual" />
                <Label htmlFor="casual" className="cursor-pointer font-normal">Casual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="formal" id="formal" />
                <Label htmlFor="formal" className="cursor-pointer font-normal">Formal</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Other Details Section */}
      <div className="space-y-6 stylestack-glass p-6 rounded-lg">
        <div className="border-b pb-2">
          <h2 className="text-xl font-semibold text-foreground">Other Details</h2>
          <p className="text-sm text-muted-foreground">Additional information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">
              Category <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tops">Tops</SelectItem>
                <SelectItem value="Bottoms">Bottoms</SelectItem>
                <SelectItem value="Outerwear">Outerwear</SelectItem>
                <SelectItem value="Dresses">Dresses</SelectItem>
                <SelectItem value="Footwear">Footwear</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Environment - Only for T-Shirts */}
          {isTShirt && (
            <div className="space-y-2">
              <Label className="text-foreground">
                Best Worn <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={formData.environment}
                onValueChange={(value: 'indoors' | 'outdoors') => handleInputChange('environment', value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="indoors" id="indoors" />
                  <Label htmlFor="indoors" className="cursor-pointer font-normal">Indoors</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outdoors" id="outdoors" />
                  <Label htmlFor="outdoors" className="cursor-pointer font-normal">Outdoors</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="image" className="text-foreground">Item Image</Label>
          <div className="flex items-center gap-4">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            {image && (
              <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-primary">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
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
