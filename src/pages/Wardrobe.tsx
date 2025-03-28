
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ClothingCard from '../components/ClothingCard';
import EmptyState from '../components/EmptyState';
import { ClothingItem } from '../components/ClothingCard';
import { Search, Plus, WashingMachine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Wardrobe = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [laundryFilter, setLaundryFilter] = useState<'all' | 'clean' | 'wash'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Get unique categories from items
  const categories = ['All', ...new Set(items.map(item => item.category))];

  useEffect(() => {
    // In a real app, we would fetch from an API
    // For this demo, we'll use localStorage
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]');
    setItems(storedItems);
    setFilteredItems(storedItems);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Filter items based on search query, category, and laundry status
    let filtered = [...items];
    
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    if (laundryFilter !== 'all') {
      filtered = filtered.filter(item => 
        laundryFilter === 'wash' ? item.needsWashing : !item.needsWashing
      );
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, categoryFilter, laundryFilter, items]);

  const handleLaundryToggle = (id: string) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, needsWashing: !item.needsWashing } : item
    );
    setItems(updatedItems);
    
    // Update localStorage
    localStorage.setItem('closetItems', JSON.stringify(updatedItems));
    
    // Show confirmation toast
    const item = items.find(item => item.id === id);
    if (item) {
      toast({
        title: item.needsWashing ? "Marked as clean" : "Added to laundry",
        description: `${item.name} has been ${item.needsWashing ? "removed from" : "added to"} your laundry list.`
      });
    }
  };

  const laundryCount = items.filter(item => item.needsWashing).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">My Wardrobe</h1>
          <Link
            to="/add"
            className="inline-flex items-center justify-center rounded-full h-10 px-4 py-2 bg-closet-blue text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95 dark:bg-blue-600"
            aria-label="Add new item"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Add Item</span>
          </Link>
        </div>
        
        {items.length === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search your wardrobe..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-10 rounded-full border border-input bg-background px-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant={laundryFilter === 'all' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setLaundryFilter('all')}
                  className="rounded-full"
                >
                  All Items
                </Button>
                <Button 
                  variant={laundryFilter === 'clean' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setLaundryFilter('clean')}
                  className="rounded-full"
                >
                  Clean Items
                </Button>
                <Button 
                  variant={laundryFilter === 'wash' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setLaundryFilter('wash')}
                  className="rounded-full flex items-center gap-1"
                >
                  <WashingMachine className="h-4 w-4" />
                  Laundry ({laundryCount})
                </Button>
              </div>
            </div>
            
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No items found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
                {filteredItems.map(item => (
                  <ClothingCard 
                    key={item.id} 
                    item={item} 
                    onLaundryToggle={handleLaundryToggle}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Wardrobe;
