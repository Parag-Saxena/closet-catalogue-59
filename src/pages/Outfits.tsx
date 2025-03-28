
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter,

  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ClothingItem } from '../components/ClothingCard';
import { BookHeart, Shirt, Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Outfit {
  id: string;
  name: string;
  description?: string;
  occasion?: string;
  items: string[];
  created: string;
}

const Outfits = () => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingOutfit, setEditingOutfit] = useState<Outfit | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form fields for editing
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    // In a real app, we would fetch from an API
    // For this demo, we'll use localStorage
    const storedOutfits = JSON.parse(localStorage.getItem('outfits') || '[]');
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]');
    
    setOutfits(storedOutfits);
    setClothingItems(storedItems);
    setIsLoading(false);
  }, []);

  const getItemsForOutfit = (outfitItemIds: string[]) => {
    return clothingItems.filter(item => outfitItemIds.includes(item.id));
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleOpenEditDialog = (outfit: Outfit) => {
    setEditingOutfit(outfit);
    setName(outfit.name);
    setDescription(outfit.description || '');
    setOccasion(outfit.occasion || '');
    setSelectedItems(outfit.items);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditingOutfit(null);
    setName('');
    setDescription('');
    setOccasion('');
    setSelectedItems([]);
    setIsEditDialogOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || selectedItems.length === 0 || !editingOutfit) {
      toast({
        title: "Missing fields",
        description: "Name and at least one item are required",
        variant: "destructive"
      });
      return;
    }
    
    const updatedOutfit: Outfit = {
      ...editingOutfit,
      name: name.trim(),
      description: description.trim() || undefined,
      occasion: occasion.trim() || undefined,
      items: selectedItems
    };
    
    const updatedOutfits = outfits.map(outfit => 
      outfit.id === editingOutfit.id ? updatedOutfit : outfit
    );
    
    setOutfits(updatedOutfits);
    localStorage.setItem('outfits', JSON.stringify(updatedOutfits));
    
    toast({
      title: "Outfit updated",
      description: `${name} has been updated successfully.`
    });
    
    handleCloseEditDialog();
  };

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleDeleteOutfit = (id: string) => {
    const outfitToDelete = outfits.find(outfit => outfit.id === id);
    if (!outfitToDelete) return;
    
    const updatedOutfits = outfits.filter(outfit => outfit.id !== id);
    setOutfits(updatedOutfits);
    localStorage.setItem('outfits', JSON.stringify(updatedOutfits));
    
    toast({
      title: "Outfit deleted",
      description: `${outfitToDelete.name} has been removed from your outfits.`
    });
  };

  // Group items by category for the edit dialog
  const itemsByCategory: Record<string, ClothingItem[]> = {};
  clothingItems.forEach(item => {
    if (!itemsByCategory[item.category]) {
      itemsByCategory[item.category] = [];
    }
    itemsByCategory[item.category].push(item);
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BookHeart className="mr-2 h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">My Outfits</h1>
          </div>
          <Link to="/add-outfit">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Outfit
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Loading outfits...</p>
          </div>
        ) : outfits.length === 0 ? (
          <div className="py-12 text-center border border-dashed rounded-lg">
            <BookHeart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No Outfits Yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Create your first outfit by combining items from your wardrobe.
            </p>
            <Link to="/add-outfit">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create First Outfit
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.map(outfit => {
              const outfitItems = getItemsForOutfit(outfit.items);
              return (
                <Card key={outfit.id} className="group relative">
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={() => handleOpenEditDialog(outfit)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the outfit "{outfit.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDeleteOutfit(outfit.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{outfit.name}</CardTitle>
                    {outfit.occasion && (
                      <CardDescription>{outfit.occasion}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {outfit.description && (
                      <p className="text-sm text-muted-foreground mb-4">{outfit.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {outfitItems.slice(0, 4).map(item => (
                        <div key={item.id} className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs">
                          <Shirt className="h-3 w-3" />
                          <span>{item.name}</span>
                        </div>
                      ))}
                      {outfitItems.length > 4 && (
                        <div className="px-2 py-1 bg-muted rounded-full text-xs">
                          +{outfitItems.length - 4} more
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      Created {formatDate(outfit.created)}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Outfit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Outfit</DialogTitle>
            <DialogDescription>
              Update your outfit details and items.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-6">
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
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg text-foreground">Select Items for This Outfit</h3>
              
              {Object.keys(itemsByCategory).length === 0 ? (
                <div className="rounded-lg border border-dashed p-10 text-center">
                  <p className="text-muted-foreground">
                    Add some items to your wardrobe first
                  </p>
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
                            onClick={() => handleItemToggle(item.id)}
                          >
                            <CardContent className="p-3 flex items-center space-x-3">
                              <Checkbox 
                                checked={selectedItems.includes(item.id)}
                                onCheckedChange={() => handleItemToggle(item.id)}
                                id={`item-${item.id}`}
                              />
                              <div>
                                <Label htmlFor={`item-${item.id}`} className="text-sm font-medium cursor-pointer">
                                  {item.name}
                                </Label>
                                {item.color && (
                                  <p className="text-xs text-muted-foreground">{item.color}</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={handleCloseEditDialog}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!name.trim() || selectedItems.length === 0}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Outfits;
