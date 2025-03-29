
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Shirt, BookHeart, Star } from 'lucide-react';
import { ClothingItem } from '../components/ClothingCard';
import { Card, CardContent } from "@/components/ui/card";

const AddOutfit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [availableItems, setAvailableItems] = useState<ClothingItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Use useEffect with an empty dependency array to only load items once
  useEffect(() => {
    // Load clothing items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]');
    setAvailableItems(storedItems);
  }, []);

  // Move handleItemToggle to useCallback to prevent recreation on every render
  const handleItemToggle = useCallback((itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, we would save to a database
    // For this demo, we'll save to localStorage
    try {
      const outfits = JSON.parse(localStorage.getItem('outfits') || '[]');
      const newOutfit = {
        id: Date.now().toString(),
        name,
        description,
        occasion,
        items: selectedItems,
        created: new Date().toISOString()
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

        <div className="bg-card rounded-lg shadow-sm border p-6 dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Outfit Name</Label>
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
              <h3 className="font-medium text-lg text-foreground">Select Items for This Outfit</h3>
              
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
