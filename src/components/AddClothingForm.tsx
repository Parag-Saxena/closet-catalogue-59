
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/context/AppContext';
import { v4 as uuidv4 } from 'uuid';

// Define item types for conditional form rendering
type ItemType = 'apparel' | 'footwear' | 'accessory';

const AddClothingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clothingItems, setClothingItems } = useApp();
  
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const newItem = {
      id: uuidv4(),
      name: formData.name,
      type: formData.type,
      category: formData.category,
      color: formData.color,
      size: formData.size,
      brand: formData.brand,
      material: formData.material,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      image: image || '/placeholder.svg',
      lastWorn: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: formData.notes,
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
    
    setClothingItems([...clothingItems, newItem]);
    
    toast({
      title: "Success",
      description: "New item added to your wardrobe!",
      variant: "success"
    });
    
    navigate('/wardrobe');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Item Name*</Label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
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
              value={formData.type}
              onChange={handleTypeChange}
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
              value={formData.category}
              onChange={handleInputChange}
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
            <Label htmlFor="color">Color</Label>
            <div className="flex items-center mt-1 gap-2">
              <input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <Input
                type="text"
                value={formData.color}
                onChange={handleInputChange}
                name="color"
                className="flex-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="Brand name"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="material">Material</Label>
            <Input
              id="material"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              placeholder="Cotton, Polyester, etc."
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Conditional form fields based on item type */}
          {selectedItemType === 'apparel' && (
            <>
              <div>
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="S, M, L, XL, etc."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="fabric">Fabric</Label>
                <Input
                  id="fabric"
                  name="fabric"
                  value={formData.fabric}
                  onChange={handleInputChange}
                  placeholder="Denim, Cotton, etc."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="fit">Fit</Label>
                <select
                  id="fit"
                  name="fit"
                  value={formData.fit}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
                >
                  <option value="">Select Fit</option>
                  <option value="Slim">Slim</option>
                  <option value="Regular">Regular</option>
                  <option value="Loose">Loose</option>
                  <option value="Oversized">Oversized</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="season">Season</Label>
                <select
                  id="season"
                  name="season"
                  value={formData.season}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
                >
                  <option value="">Select Season</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                  <option value="All Seasons">All Seasons</option>
                </select>
              </div>
            </>
          )}
          
          {selectedItemType === 'footwear' && (
            <>
              <div>
                <Label htmlFor="shoeSize">Shoe Size</Label>
                <Input
                  id="shoeSize"
                  name="shoeSize"
                  value={formData.shoeSize}
                  onChange={handleInputChange}
                  placeholder="US 9, EU 42, etc."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="heelHeight">Heel Height</Label>
                <select
                  id="heelHeight"
                  name="heelHeight"
                  value={formData.heelHeight}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
                >
                  <option value="">Select Heel Height</option>
                  <option value="Flat">Flat</option>
                  <option value="Low">Low (0.5-1.5")</option>
                  <option value="Medium">Medium (2-3")</option>
                  <option value="High">High (3.5"+)</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="footwearStyle">Style</Label>
                <select
                  id="footwearStyle"
                  name="footwearStyle"
                  value={formData.footwearStyle}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
                >
                  <option value="">Select Style</option>
                  <option value="Casual">Casual</option>
                  <option value="Athletic">Athletic</option>
                  <option value="Dress">Dress</option>
                  <option value="Boot">Boot</option>
                  <option value="Sandal">Sandal</option>
                </select>
              </div>
            </>
          )}
          
          {selectedItemType === 'accessory' && (
            <div>
              <Label htmlFor="size">Size (if applicable)</Label>
              <Input
                id="size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="One Size, S, M, L, etc."
                className="mt-1"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="summer, favorite, denim"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any additional details about this item"
              className="mt-1 min-h-[80px]"
            />
          </div>
          
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1"
            />
            
            {image && (
              <div className="mt-2 relative rounded-md overflow-hidden w-40 h-40">
                <img
                  src={image}
                  alt="Item preview"
                  className="w-full h-full object-cover"
                />
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
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-thulian_pink-500 to-tiffany_blue-500 text-white"
        >
          Add to Wardrobe
        </Button>
      </div>
    </form>
  );
};

export default AddClothingForm;
