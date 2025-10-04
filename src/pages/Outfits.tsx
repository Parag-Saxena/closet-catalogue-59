
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
import { ClothingItem } from '@/types';
import { BookHeart, Shirt, Plus, Edit, Trash2, Calendar, Filter, Clock, Star, Briefcase, Sparkles, Users, Palmtree, PartyPopper, Home, Sun, CloudRain, CloudSnow } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { useApp } from '@/context/AppContext';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Outfit } from '@/types';

const OCCASIONS = [
  { id: 'work', label: 'Work / Office', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'casual', label: 'Casual', icon: <Shirt className="h-4 w-4" /> },
  { id: 'date', label: 'Date Night', icon: <Users className="h-4 w-4" /> },
  { id: 'vacation', label: 'Vacation', icon: <Palmtree className="h-4 w-4" /> },
  { id: 'festive', label: 'Wedding / Festive', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'party', label: 'Party', icon: <PartyPopper className="h-4 w-4" /> },
  { id: 'lounge', label: 'Lounge', icon: <Home className="h-4 w-4" /> },
];

const WEATHER_CONDITIONS = [
  { type: 'sunny', icon: <Sun className="h-4 w-4 text-amber-500" />, label: 'Sunny' },
  { type: 'rainy', icon: <CloudRain className="h-4 w-4 text-blue-500" />, label: 'Rainy' },
  { type: 'snowy', icon: <CloudSnow className="h-4 w-4 text-blue-300" />, label: 'Snowy' },
];

// Mock trending styles data
const TRENDING_STYLES = [
  {
    id: '1',
    name: 'Casual Chic',
    description: 'Effortlessly stylish for everyday wear',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=720',
    items: ['White t-shirt', 'Blue jeans', 'Canvas sneakers']
  },
  {
    id: '2',
    name: 'Office Power',
    description: 'Professional look with a modern twist',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=720',
    items: ['Blazer', 'Button-up shirt', 'Tailored pants', 'Leather shoes']
  },
  {
    id: '3',
    name: 'Weekend Vibes',
    description: 'Comfortable yet stylish for your days off',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=720',
    items: ['Hoodie', 'Sweatpants', 'Comfortable sneakers']
  }
];

const Outfits = () => {
  const { outfits, setOutfits, clothingItems } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [editingOutfit, setEditingOutfit] = useState<Outfit | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTrendingStyle, setSelectedTrendingStyle] = useState<any | null>(null);
  const [isTrendingDialogOpen, setIsTrendingDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form fields for editing
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [weather, setWeather] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);

  useEffect(() => {
    // Data is now loaded via AppContext
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
    setWeather(outfit.weather || '');
    setTags(outfit.tags || []);
    setSelectedItems(outfit.items || []);
    setSelectedOccasions(outfit.occasion ? [outfit.occasion] : []);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditingOutfit(null);
    setName('');
    setDescription('');
    setOccasion('');
    setWeather('');
    setTags([]);
    setSelectedItems([]);
    setSelectedOccasions([]);
    setIsEditDialogOpen(false);
  };

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

  const handleOccasionToggle = (occasionId: string) => {
    setSelectedOccasions(prev => {
      if (prev.includes(occasionId)) {
        return prev.filter(id => id !== occasionId);
      } else {
        return [...prev, occasionId];
      }
    });
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

    const occasionValue = selectedOccasions.length > 0
      ? OCCASIONS.find(o => o.id === selectedOccasions[0])?.label || ''
      : '';

    const updatedOutfit: Outfit = {
      ...editingOutfit,
      name: name.trim(),
      description: description.trim() || undefined,
      occasion: occasionValue,
      weather: weather.trim() || '',
      tags: tags,
      items: selectedItems
    };

    const updatedOutfits = outfits.map(outfit =>
      outfit.id === editingOutfit.id ? updatedOutfit : outfit
    );

    setOutfits(updatedOutfits);

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

    toast({
      title: "Outfit deleted",
      description: `${outfitToDelete.name} has been removed from your outfits.`
    });
  };

  const toggleFavorite = (outfitId: string) => {
    const updatedOutfits = outfits.map(outfit => {
      if (outfit.id === outfitId) {
        return { ...outfit, isFavorite: !outfit.isFavorite };
      }
      return outfit;
    });

    setOutfits(updatedOutfits);

    const outfitName = outfits.find(o => o.id === outfitId)?.name;
    const isFavorite = outfits.find(o => o.id === outfitId)?.isFavorite;

    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${outfitName} has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`
    });
  };

  const handleOpenTrendingDialog = (style: any) => {
    setSelectedTrendingStyle(style);
    setIsTrendingDialogOpen(true);
  };

  const handleCloseTrendingDialog = () => {
    setSelectedTrendingStyle(null);
    setIsTrendingDialogOpen(false);
  };

  // Filter outfits based on active tab
  const filteredOutfits = outfits.filter(outfit => {
    if (activeTab === 'all') return true;
    if (activeTab === 'favorites') return outfit.isFavorite;
    return outfit.occasion?.toLowerCase().includes(activeTab);
  });

  // Group items by category for the edit dialog
  const itemsByCategory: Record<string, ClothingItem[]> = {};
  clothingItems.forEach(item => {
    if (!itemsByCategory[item.category]) {
      itemsByCategory[item.category] = [];
    }
    itemsByCategory[item.category].push(item);
  });

  // Generate a mock weather suggestion based on simple conditions
  const getWeatherSuggestion = () => {
    const now = new Date();
    const month = now.getMonth(); // 0-11

    // Simple season-based suggestion
    if (month >= 2 && month <= 4) { // Spring
      return {
        condition: 'rainy',
        temperature: '15°C',
        suggestion: 'Light layers with a raincoat'
      };
    } else if (month >= 5 && month <= 7) { // Summer
      return {
        condition: 'sunny',
        temperature: '27°C',
        suggestion: 'Light, breathable clothing'
      };
    } else if (month >= 8 && month <= 10) { // Fall
      return {
        condition: 'cloudy',
        temperature: '12°C',
        suggestion: 'Layered outfits with a light jacket'
      };
    } else { // Winter
      return {
        condition: 'snowy',
        temperature: '0°C',
        suggestion: 'Warm layers with a heavy coat'
      };
    }
  };

  const weatherSuggestion = getWeatherSuggestion();
  const weatherIcon = weatherSuggestion.condition === 'sunny' ?
    <Sun className="h-5 w-5 text-amber-500" /> :
    weatherSuggestion.condition === 'rainy' ?
    <CloudRain className="h-5 w-5 text-blue-500" /> :
    <CloudSnow className="h-5 w-5 text-blue-300" />;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <BookHeart className="mr-2 h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">My Outfits</h1>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setActiveTab('all')}>
                  All Outfits
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('favorites')}>
                  <Star className="h-4 w-4 mr-2 text-amber-500" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {OCCASIONS.map(occasion => (
                  <DropdownMenuItem
                    key={occasion.id}
                    onClick={() => setActiveTab(occasion.id)}
                    className="flex items-center"
                  >
                    <span className="mr-2">{occasion.icon}</span>
                    {occasion.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/outfits/add-outfit">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Outfit
              </Button>
            </Link>
          </div>
        </div>

        {/* Weather-based suggestion */}
        <Card className="bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-950/20 dark:to-amber-950/20 overflow-hidden border-none shadow-md">
          <div className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-amber-500/10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-amber-500/10 rounded-full transform -translate-x-12 translate-y-12"></div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  {weatherIcon}
                  <div>
                    <h3 className="font-medium text-lg">{weatherSuggestion.condition.charAt(0).toUpperCase() + weatherSuggestion.condition.slice(1)} • {weatherSuggestion.temperature}</h3>
                    <p className="text-muted-foreground text-sm">Today's suggestion: {weatherSuggestion.suggestion}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="self-start md:self-auto">
                  View Suggested Outfits
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Trending Styles Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
              Trending Styles
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TRENDING_STYLES.map(style => (
              <Card key={style.id} className="overflow-hidden group">
                <div className="relative h-48">
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-medium text-lg text-white">{style.name}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">{style.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleOpenTrendingDialog(style)}
                  >
                    Recreate This Look
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tab navigation for outfit categories */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:inline-flex lg:w-auto">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <BookHeart className="h-4 w-4" />
              <span className="hidden md:inline">All Outfits</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span className="hidden md:inline">Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="hidden md:inline">Recent</span>
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Scheduled</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">Loading outfits...</p>
              </div>
            ) : filteredOutfits.length === 0 ? (
              <div className="py-12 text-center border border-dashed rounded-lg">
                <BookHeart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-medium mb-2">No Outfits Yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create your first outfit by combining items from your wardrobe.
                </p>
                <Link to="/outfits/add-outfit">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Outfit
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOutfits.map(outfit => {
                  const outfitItems = getItemsForOutfit(outfit.items);
                  return (
                    <Card key={outfit.id} className="group relative overflow-hidden hover:shadow-md transition-all duration-300">
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
                          onClick={() => toggleFavorite(outfit.id)}
                        >
                          <Star className={`h-4 w-4 ${outfit.isFavorite ? 'text-amber-500 fill-amber-500' : ''}`} />
                        </Button>
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

                      {outfit.isFavorite && (
                        <div className="absolute top-2 left-2 z-10">
                          <Badge variant="secondary" className="bg-white/80 text-amber-600">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
                            Favorite
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="pb-2">
                        <CardTitle>{outfit.name}</CardTitle>
                        {outfit.occasion && (
                          <CardDescription className="flex items-center gap-1">
                            {OCCASIONS.find(o => o.label === outfit.occasion)?.icon || <Briefcase className="h-3 w-3" />}
                            {outfit.occasion}
                          </CardDescription>
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
                          Created {formatDate(outfit.createdAt.toString())}
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {['favorites', 'recent', 'scheduled'].map(tab => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              <div className="py-12 text-center border border-dashed rounded-lg">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    {tab === 'favorites' ? (
                      <Star className="h-8 w-8 text-primary" />
                    ) : tab === 'recent' ? (
                      <Clock className="h-8 w-8 text-primary" />
                    ) : (
                      <Calendar className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <h3 className="mb-1 text-lg font-medium text-foreground">
                    {tab === 'favorites' ? 'No Favorited Outfits' :
                     tab === 'recent' ? 'No Recent Outfits' :
                     'No Scheduled Outfits'}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {tab === 'favorites' ? 'Add outfits to your favorites for quick access.' :
                     tab === 'recent' ? 'Your recently created or worn outfits will appear here.' :
                     'Schedule outfits for upcoming events to see them here.'}
                  </p>
                  <Link to="/outfits/add-outfit">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Outfit
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
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
                <Label>Occasion</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {OCCASIONS.map(occasion => (
                    <Button
                      key={occasion.id}
                      type="button"
                      variant={selectedOccasions.includes(occasion.id) ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleOccasionToggle(occasion.id)}
                    >
                      <span className="mr-2">{occasion.icon}</span>
                      {occasion.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Weather</Label>
                <div className="grid grid-cols-3 gap-2">
                  {WEATHER_CONDITIONS.map(condition => (
                    <Button
                      key={condition.type}
                      type="button"
                      variant={weather === condition.type ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setWeather(condition.type)}
                    >
                      <span className="mr-2">{condition.icon}</span>
                      {condition.label}
                    </Button>
                  ))}
                </div>
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

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 h-3 w-3 rounded-full hover:bg-background/20 inline-flex items-center justify-center"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  id="tagInput"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagAdd}
                  placeholder="Add tags (press Enter to add)"
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

      {/* Trending Style Recreation Dialog */}
      <Dialog open={isTrendingDialogOpen} onOpenChange={setIsTrendingDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Recreate This Look</DialogTitle>
            <DialogDescription>
              Create an outfit inspired by this trending style using your wardrobe items.
            </DialogDescription>
          </DialogHeader>

          {selectedTrendingStyle && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img
                  src={selectedTrendingStyle.image}
                  alt={selectedTrendingStyle.name}
                  className="rounded-lg object-cover w-full aspect-square"
                />
                <div className="mt-4">
                  <h3 className="font-medium mb-1">{selectedTrendingStyle.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{selectedTrendingStyle.description}</p>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Items in this look:</Label>
                    <ul className="space-y-1">
                      {selectedTrendingStyle.items.map((item: string, index: number) => (
                        <li key={index} className="text-sm flex items-center">
                          <Shirt className="h-3 w-3 mr-2 text-muted-foreground" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Select matching items from your wardrobe:</Label>
                  {Object.keys(itemsByCategory).length === 0 ? (
                    <div className="rounded-lg border border-dashed p-10 text-center mt-2">
                      <p className="text-muted-foreground">
                        Add some items to your wardrobe first
                      </p>
                    </div>
                  ) : (
                    <div className="mt-2 space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {Object.entries(itemsByCategory).map(([category, items]) => (
                        <div key={category}>
                          <h4 className="text-xs font-medium uppercase text-muted-foreground mb-1">{category}</h4>
                          <div className="space-y-1">
                            {items.map(item => (
                              <Card
                                key={item.id}
                                className={`cursor-pointer hover:bg-accent transition-colors ${
                                  selectedItems.includes(item.id) ? 'border-primary ring-1 ring-primary' : ''
                                }`}
                                onClick={() => handleItemToggle(item.id)}
                              >
                                <CardContent className="p-2 flex items-center space-x-3">
                                  <Checkbox
                                    checked={selectedItems.includes(item.id)}
                                    onCheckedChange={() => handleItemToggle(item.id)}
                                    id={`trend-item-${item.id}`}
                                  />
                                  <div>
                                    <Label htmlFor={`trend-item-${item.id}`} className="text-sm font-medium cursor-pointer">
                                      {item.name}
                                    </Label>
                                    <p className="text-xs text-muted-foreground">{item.color}</p>
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

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Missing items for this look:</h4>
                  <div className="space-y-2">
                    {selectedTrendingStyle.items
                      .filter((item: string) => {
                        // Simple check if user has anything similar
                        return !clothingItems.some(closetItem =>
                          closetItem.name.toLowerCase().includes(item.toLowerCase())
                        );
                      })
                      .map((item: string, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm flex items-center">
                            <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                            {item}
                          </span>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Add to Shopping List
                          </Button>
                        </div>
                      ))}

                    {!selectedTrendingStyle.items.some((item: string) =>
                      !clothingItems.some(closetItem =>
                        closetItem.name.toLowerCase().includes(item.toLowerCase())
                      )
                    ) && (
                      <p className="text-sm text-muted-foreground">
                        You have all items needed for this look!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCloseTrendingDialog}>
              Cancel
            </Button>
            <Link to="/outfits/add-outfit">
              <Button disabled={selectedItems.length === 0}>
                Create This Outfit
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Outfits;
