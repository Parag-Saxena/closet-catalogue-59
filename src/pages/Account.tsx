
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { User, ShoppingBag, Save, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

interface ImportedOutfit {
  id: string;
  name: string;
  source: string;
  url: string;
  description: string;
  items: {
    name: string;
    category: string;
    color: string;
    description: string;
  }[];
}

const Account = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Guest User',
    email: 'guest@example.com',
    bio: 'Fashion enthusiast',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [recentImports, setRecentImports] = useState<ImportedOutfit[]>([]);
  
  // Form for profile editing
  const form = useForm({
    defaultValues: profile
  });
  
  useEffect(() => {
    // Load user profile from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setProfile(userData);
      form.reset(userData);
    }
    
    // Load recent imports
    const savedImports = localStorage.getItem('importedOutfits');
    if (savedImports) {
      setRecentImports(JSON.parse(savedImports));
    }
  }, []);
  
  const handleProfileSubmit = (data: UserProfile) => {
    // In a real app, we would call an API
    // For this demo, we'll save to localStorage
    localStorage.setItem('user', JSON.stringify(data));
    setProfile(data);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!importUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsImporting(true);
    
    // Simulate an import process
    setTimeout(() => {
      // In a real app, we would call an API to scrape the website
      // For this demo, we'll create a mock imported outfit
      
      const mockOutfit: ImportedOutfit = {
        id: Date.now().toString(),
        name: "Summer Collection " + new Date().toLocaleDateString(),
        source: new URL(importUrl).hostname,
        url: importUrl,
        description: "Imported outfit collection with multiple items",
        items: [
          {
            name: "Cotton T-Shirt",
            category: "Tops",
            color: "White",
            description: "Lightweight cotton t-shirt, perfect for summer"
          },
          {
            name: "Chino Shorts",
            category: "Bottoms",
            color: "Beige",
            description: "Classic fit chino shorts"
          }
        ]
      };
      
      // Save to localStorage
      const updatedImports = [mockOutfit, ...recentImports].slice(0, 5);
      localStorage.setItem('importedOutfits', JSON.stringify(updatedImports));
      setRecentImports(updatedImports);
      
      // Add to wardrobe if purchased
      const closetItems = JSON.parse(localStorage.getItem('closetItems') || '[]');
      const newItems = mockOutfit.items.map(item => ({
        id: Date.now() + Math.random().toString(),
        name: item.name,
        category: item.category,
        color: item.color,
        description: item.description,
        brand: mockOutfit.source,
        price: "",
        purchaseDate: new Date().toISOString(),
        isFavorite: false,
        needsWashing: false,
        source: importUrl
      }));
      
      localStorage.setItem('closetItems', JSON.stringify([...closetItems, ...newItems]));
      
      // Add to outfits
      const outfits = JSON.parse(localStorage.getItem('outfits') || '[]');
      const newOutfit = {
        id: mockOutfit.id,
        name: mockOutfit.name,
        description: mockOutfit.description,
        occasion: "Casual",
        items: newItems.map(item => item.id),
        created: new Date().toISOString(),
        source: importUrl
      };
      
      localStorage.setItem('outfits', JSON.stringify([...outfits, newOutfit]));
      
      setImportUrl('');
      setIsImporting(false);
      
      toast({
        title: "Import Successful",
        description: `Successfully imported "${mockOutfit.name}" with ${mockOutfit.items.length} items`,
      });
    }, 1500);
  };
  
  const saveItem = (outfit: ImportedOutfit) => {
    // Logic to save an item to wardrobe and/or outfit collection
    toast({
      title: "Added to Wardrobe",
      description: `"${outfit.name}" has been added to your wardrobe.`,
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Account</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="import">Import Outfits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="bg-closet-blue/10">
                        <User className="h-8 w-8 text-closet-blue" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{profile.name}</CardTitle>
                      <CardDescription>{profile.email}</CardDescription>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {isEditing ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleProfileSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Tell us about your style" 
                                className="min-h-[100px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-foreground">Bio</h3>
                      <p className="text-muted-foreground">{profile.bio || "No bio provided"}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground">Storage</h3>
                      <p className="text-muted-foreground">Using local storage to save your data</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="import" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Import from Shopping Sites
                </CardTitle>
                <CardDescription>
                  Add outfits from your favorite shopping sites to your wardrobe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleImportSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="import-url">Shopping Site URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="import-url"
                        placeholder="https://example.com/outfit/123"
                        value={importUrl}
                        onChange={(e) => setImportUrl(e.target.value)}
                        required
                      />
                      <Button type="submit" disabled={isImporting}>
                        {isImporting ? "Importing..." : "Import"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Paste a link to an outfit or item from a shopping website
                    </p>
                  </div>
                </form>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Recently Imported</h3>
                  
                  {recentImports.length === 0 ? (
                    <div className="text-center p-6 border border-dashed rounded-md">
                      <p className="text-muted-foreground">No imports yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentImports.map((outfit) => (
                        <Card key={outfit.id} className="overflow-hidden">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h4 className="font-medium">{outfit.name}</h4>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <LinkIcon className="h-3 w-3 mr-1" />
                                  <span>{outfit.source}</span>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                                onClick={() => saveItem(outfit)}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Again
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium">Auto-save to wardrobe</span>
                  <Switch defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically add items to your wardrobe when imported
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Account;
