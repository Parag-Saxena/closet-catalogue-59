
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Plus, Folder, Edit, Trash2 } from 'lucide-react';
import { ClothingItem } from '../components/ClothingCard';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Category {
  id: string;
  name: string;
  count: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleOpenEditDialog = (category: Category) => {
    setEditingCategory(category);
    setNewCategory(category.name);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditingCategory(null);
    setNewCategory('');
    setIsDialogOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim() || !editingCategory) return;

    // Check if the new name already exists (excluding the current category)
    if (categories.some(cat => 
      cat.id !== editingCategory.id && 
      cat.name.toLowerCase() === newCategory.trim().toLowerCase()
    )) {
      toast({
        title: "Category exists",
        description: "A category with this name already exists.",
        variant: "destructive"
      });
      return;
    }

    // Update the category's name
    const updatedCategory = {
      ...editingCategory,
      name: newCategory.trim(),
      id: newCategory.trim().toLowerCase().replace(/\s+/g, '-')
    };

    // Also update any clothing items that use this category
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]') as ClothingItem[];
    const updatedItems = storedItems.map(item => {
      if (item.category === editingCategory.name) {
        return { ...item, category: newCategory.trim() };
      }
      return item;
    });

    localStorage.setItem('closetItems', JSON.stringify(updatedItems));

    // Update categories
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id ? updatedCategory : cat
    ));

    toast({
      title: "Category updated",
      description: `Category has been renamed to "${newCategory.trim()}".`
    });

    handleCloseDialog();
  };

  const handleDeleteCategory = (categoryId: string) => {
    const categoryToDelete = categories.find(cat => cat.id === categoryId);
    if (!categoryToDelete) return;

    // Check if category is in use
    if (categoryToDelete.count > 0) {
      toast({
        title: "Cannot delete category",
        description: `This category is used by ${categoryToDelete.count} items. Remove or reassign these items first.`,
        variant: "destructive"
      });
      return;
    }

    // Delete the category
    setCategories(categories.filter(cat => cat.id !== categoryId));

    toast({
      title: "Category deleted",
      description: `${categoryToDelete.name} has been deleted.`
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
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Folder className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleOpenEditDialog(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteCategory(category.id)}
                    disabled={category.count > 0}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Change the name of this category. This will update all items using this category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="category-name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Category name"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={!newCategory.trim()}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Categories;
