
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Plus, BookHeart, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ClothingItem } from '../components/ClothingCard';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Outfit {
  id: string;
  name: string;
  description?: string;
  occasion?: string;
  items: string[]; // Array of item IDs
  created: string;
}

const Outfits = () => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load outfits and clothing items from localStorage
    const storedOutfits = JSON.parse(localStorage.getItem('outfits') || '[]');
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]');
    
    setOutfits(storedOutfits);
    setClothingItems(storedItems);
    setIsLoading(false);
  }, []);

  // Function to get clothing items for an outfit
  const getOutfitItems = (outfit: Outfit) => {
    return outfit.items.map(id => clothingItems.find(item => item.id === id)).filter(Boolean) as ClothingItem[];
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">My Outfits</h1>
          <Link 
            to="/add-outfit"
            className="inline-flex items-center justify-center rounded-full h-10 px-4 py-2 bg-closet-blue text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95 dark:bg-blue-600"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Create Outfit</span>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Loading outfits...</p>
          </div>
        ) : outfits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <BookHeart className="h-16 w-16 text-muted-foreground mb-4 opacity-30" />
            <h2 className="text-xl font-medium text-foreground mb-2">No outfits yet</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Create your first outfit by combining items from your wardrobe into a curated style.
            </p>
            <Link
              to="/add-outfit"
              className="inline-flex h-10 items-center justify-center rounded-full bg-closet-blue px-6 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95 dark:bg-blue-600"
            >
              Create Your First Outfit
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outfits.map(outfit => (
              <Card key={outfit.id} className="overflow-hidden dark:bg-gray-800 border-border">
                <CardContent className="p-0">
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-foreground">{outfit.name}</h3>
                    {outfit.occasion && (
                      <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {outfit.occasion}
                      </span>
                    )}
                    {outfit.description && (
                      <p className="mt-2 text-sm text-muted-foreground">{outfit.description}</p>
                    )}
                  </div>
                  
                  {getOutfitItems(outfit).length > 0 ? (
                    <div className="border-t border-border p-4">
                      <h4 className="text-sm font-medium mb-2 text-foreground">Items in this outfit:</h4>
                      <div className="flex flex-wrap gap-2">
                        {getOutfitItems(outfit).map(item => (
                          <span 
                            key={item.id} 
                            className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-border p-4">
                      <p className="text-sm text-muted-foreground">No items added yet</p>
                    </div>
                  )}
                  
                  <div className="border-t border-border p-4 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Created: {new Date(outfit.created).toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Scissors className="h-3.5 w-3.5" />
                      Try On
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Outfits;
