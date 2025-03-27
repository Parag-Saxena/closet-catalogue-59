
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ClothingCard from '../components/ClothingCard';
import EmptyState from '../components/EmptyState';
import { ClothingItem } from '../components/ClothingCard';
import { Search } from 'lucide-react';

const Index = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

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
    // Filter items based on search query and category
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
    
    setFilteredItems(filtered);
  }, [searchQuery, categoryFilter, items]);

  return (
    <Layout>
      {items.length === 0 && !isLoading ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold text-closet-gray-dark">Your Closet</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search your closet..."
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
          
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-closet-gray-medium">No items found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
              {filteredItems.map(item => (
                <ClothingCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Index;
