
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Plus, Folder } from 'lucide-react';
import { ClothingItem } from '../components/ClothingCard';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  count: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would fetch from an API
    // For this demo, we'll derive categories from the closet items
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]') as ClothingItem[];
    
    // Get stored categories first
    const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]') as Category[];
    
    // Count items per category
    const categoryCounts: Record<string, number> = {};
    storedItems.forEach(item => {
      if (item.category) {
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
      }
    });
    
    // Merge stored categories with counts
    const mergedCategories = storedCategories.map(cat => ({
      ...cat,
      count: categoryCounts[cat.name] || 0
    }));
    
    // Add any categories found in items but not in stored categories
    Object.entries(categoryCounts).forEach(([name, count]) => {
      if (!mergedCategories.some(cat => cat.name === name)) {
        mergedCategories.push({
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name,
          count
        });
      }
    });
    
    setCategories(mergedCategories);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Save categories to localStorage whenever they change
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    // Check if category already exists
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.trim().toLowerCase())) {
      toast({
        title: "Category exists",
        description: "This category already exists.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new category
    const newCategoryObj = {
      id: newCategory.toLowerCase().replace(/\s+/g, '-'),
      name: newCategory.trim(),
      count: 0
    };
    
    setCategories([...categories, newCategoryObj]);
    setNewCategory('');
    
    toast({
      title: "Category added",
      description: `${newCategory.trim()} has been added to your categories.`
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Categories</h1>
        
        <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Add new category..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="h-10 flex-grow rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary text-primary-foreground px-4 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!newCategory.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </button>
        </form>
        
        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No categories yet. Add your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(category => (
              <div 
                key={category.id} 
                className="flex items-center p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Folder className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} items</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Categories;
