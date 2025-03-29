
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Image, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ClothingItem } from '@/types';

const categories = [
  'Tops',
  'Bottoms',
  'Outerwear',
  'Dresses',
  'Shoes',
  'Accessories'
];

const types = [
  'Casual',
  'Formal',
  'Athletic',
  'Lounge',
  'Business',
  'Evening'
];

const sizes = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  'One Size'
];

const colors = [
  'Black',
  'White',
  'Gray',
  'Blue',
  'Green',
  'Red',
  'Yellow',
  'Purple',
  'Pink',
  'Brown',
  'Orange',
  'Beige',
  'Navy',
  'Multicolor'
];

const materials = [
  'Cotton',
  'Polyester',
  'Wool',
  'Linen',
  'Silk',
  'Leather',
  'Denim',
  'Synthetic',
  'Canvas',
  'Suede',
  'Cashmere',
  'Nylon'
];

const AddClothingForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState<Partial<ClothingItem>>({
    name: '',
    type: '',
    category: '',
    color: '',
    size: '',
    brand: '',
    material: '',
    tags: [],
    image: '',
    notes: '',
    isFavorite: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!formData.tags?.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...(prev.tags || []), newTag]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, we would upload the image to a server
    // For this demo, we'll use a placeholder URL
    setFormData(prev => ({ 
      ...prev, 
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=400' 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.category || !formData.color) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Prepare data with dates and ID
    const now = new Date();
    const completeItem: ClothingItem = {
      ...(formData as Partial<ClothingItem>),
      id: Date.now().toString(),
      lastWorn: now.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      name: formData.name || '',
      type: formData.type || '',
      category: formData.category || '',
      color: formData.color || '',
      size: formData.size || '',
      brand: formData.brand || '',
      material: formData.material || '',
      tags: formData.tags || [],
      image: formData.image || '',
    };

    // In a real app, we would save to a database
    // For this demo, we'll save to localStorage
    try {
      const existingItems = JSON.parse(localStorage.getItem('closetItems') || '[]');
      localStorage.setItem('closetItems', JSON.stringify([...existingItems, completeItem]));
      
      // Show success message
      toast.success('Item added to your closet');
      
      // Redirect to home page
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      toast.error('Failed to add item to your closet');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-1.5">
        <Label htmlFor="imageUpload" className="block text-sm font-medium">
          Image
        </Label>
        <div className="relative mt-1 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg p-6 cursor-pointer hover:border-primary/60 transition-colors">
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleImageUpload}
          />
          {formData.image ? (
            <div className="relative w-full max-w-xs mx-auto">
              <img 
                src={formData.image} 
                alt="Clothing preview" 
                className="w-full h-auto rounded-md object-cover" 
              />
              <button 
                type="button"
                className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm"
                onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4 flex text-sm text-muted-foreground">
                <span className="font-medium text-primary">Upload an image</span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleInputChange}
          placeholder="White T-shirt"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="type">
            Type
          </Label>
          <Select 
            value={formData.type} 
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="category">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => handleSelectChange('category', value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="color">
            Color <span className="text-destructive">*</span>
          </Label>
          <Select 
            value={formData.color} 
            onValueChange={(value) => handleSelectChange('color', value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {colors.map(color => (
                <SelectItem key={color} value={color}>{color}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="size">
            Size
          </Label>
          <Select 
            value={formData.size} 
            onValueChange={(value) => handleSelectChange('size', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {sizes.map(size => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="brand">
            Brand
          </Label>
          <Input
            id="brand"
            name="brand"
            type="text"
            value={formData.brand}
            onChange={handleInputChange}
            placeholder="Nike, Zara, etc."
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="material">
            Material
          </Label>
          <Select 
            value={formData.material} 
            onValueChange={(value) => handleSelectChange('material', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a material" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {materials.map(material => (
                <SelectItem key={material} value={material}>{material}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags?.map(tag => (
            <div key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full flex items-center gap-1 text-sm">
              {tag}
              <button 
                type="button" 
                onClick={() => removeTag(tag)}
                className="bg-secondary-foreground/20 rounded-full h-4 w-4 flex items-center justify-center hover:bg-secondary-foreground/30"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <Input
          id="tagInput"
          name="tagInput"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagAdd}
          placeholder="Add tags (press Enter to add)"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">
          Notes
        </Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Add any additional details about this item..."
          className="resize-none"
        />
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <Checkbox 
          id="isFavorite" 
          checked={formData.isFavorite} 
          onCheckedChange={(checked) => handleCheckboxChange('isFavorite', checked as boolean)}
        />
        <Label htmlFor="isFavorite" className="cursor-pointer">
          Mark as favorite
        </Label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full"
      >
        {isSubmitting ? 'Adding...' : 'Add to Closet'}
      </Button>
    </form>
  );
};

export default AddClothingForm;
