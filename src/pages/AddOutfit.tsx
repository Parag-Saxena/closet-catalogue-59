
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Shirt, BookHeart, Star, CloudSun, Tag } from 'lucide-react';
import Layout from '../components/Layout';
import { ClothingItem } from '@/types';
import { Outfit } from '@/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

const AddOutfit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [weather, setWeather] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [availableItems, setAvailableItems] = useState<ClothingItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  useEffect(() => {
    // Load clothing items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]');
    setAvailableItems(storedItems);
  }, []);

  const handleItemToggle = useCallback((itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  }, []);

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags(prev => [...prev, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, we would upload the image to a server
    // For this demo, we'll use a placeholder URL
    setImage('https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?auto=format&fit=crop&q=80&w=400');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!name.trim() || selectedItems.length === 0) {
      toast.error("Please provide an outfit name and select at least one item");
      setIsSubmitting(false);
      return;
    }

    // In a real app, we would save to a database
    // For this demo, we'll save to localStorage
    try {
      const outfits = JSON.parse(localStorage.getItem('outfits') || '[]');
      const now = new Date();
      
      const newOutfit: Outfit = {
        id: Date.now().toString(),
        name,
        description: description || '',
        items: selectedItems,
        occasion,
        weather,
        tags,
        image: image || '',
        lastWorn: now.toISOString(),
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
      };

      outfits.push(newOutfit);
      localStorage.setItem('outfits', JSON.stringify(outfits));

      toast.success("Your outfit has been created");
      navigate('/outfits');
    } catch (error) {
      toast.error("There was an error creating your outfit");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Group items by category
  const itemsByCategory: Record<string, ClothingItem[]> = {};
  availableItems.forEach(item => {
    if (!itemsByCategory[item.category]) {
      itemsByCategory[item.category] = [];
    }
    itemsByCategory[item.category].push(item);
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center">
          <BookHeart className="mr-2 h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Create New Outfit</h1>
        </div>

        <div className="bg-card rounded-lg shadow-sm border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Outfit Image</Label>
                <div className="relative mt-1 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg p-6 cursor-pointer hover:border-primary/60 transition-colors">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                  {image ? (
                    <div className="relative w-full max-w-xs mx-auto">
                      <img 
                        src={image} 
                        alt="Outfit preview" 
                        className="w-full h-auto rounded-md object-cover" 
                      />
                      <button 
                        type="button"
                        className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm"
                        onClick={() => setImage('')}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Shirt className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4 flex text-sm text-muted-foreground">
                        <span className="font-medium text-primary">Upload an image</span>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Outfit Name <span className="text-destructive">*</span></Label>
                <Input 
                  id="name" 
                  placeholder="Summer Casual" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="occasion">Occasion</Label>
                <Input 
                  id="occasion" 
                  placeholder="Casual, Work, Formal, etc." 
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weather">Weather</Label>
                <div className="flex items-center gap-2">
                  <CloudSun className="h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="weather" 
                    placeholder="Sunny, Rainy, Cold, etc." 
                    value={weather}
                    onChange={(e) => setWeather(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
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
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="tagInput" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagAdd}
                    placeholder="Add tags (press Enter to add)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Light and comfortable outfit for warm days" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg text-foreground">Select Items for This Outfit <span className="text-destructive">*</span></h3>
              
              {Object.keys(itemsByCategory).length === 0 ? (
                <div className="rounded-lg border border-dashed p-10 text-center">
                  <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-4">
                      <Shirt className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-1 text-lg font-medium text-foreground">No Wardrobe Items</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Add some items to your wardrobe first
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-2" 
                      onClick={() => navigate('/add')}
                      type="button"
                    >
                      Add Wardrobe Items
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(itemsByCategory).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">{category}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {items.map(item => (
                          <Card 
                            key={item.id} 
                            className={`cursor-pointer hover:bg-accent transition-colors ${
                              selectedItems.includes(item.id) ? 'border-primary ring-1 ring-primary' : ''
                            }`}
                          >
                            <CardContent className="p-3 flex items-center space-x-3">
                              <Checkbox 
                                checked={selectedItems.includes(item.id)}
                                onCheckedChange={() => handleItemToggle(item.id)}
                                id={`item-${item.id}`}
                              />
                              <div className="flex-grow">
                                <Label htmlFor={`item-${item.id}`} className="text-sm font-medium cursor-pointer">
                                  {item.name}
                                </Label>
                                <p className="text-xs text-muted-foreground">{item.color}</p>
                              </div>
                              {item.isFavorite && <Star className="h-4 w-4 text-amber-500" />}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !name.trim() || selectedItems.length === 0}
                  className="min-w-24"
                >
                  {isSubmitting ? "Creating..." : "Create Outfit"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddOutfit;
