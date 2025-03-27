
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Shirt } from 'lucide-react';

const AddOutfit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        items: [],
        created: new Date().toISOString()
      };

      outfits.push(newOutfit);
      localStorage.setItem('outfits', JSON.stringify(outfits));

      toast({
        title: "Success!",
        description: "Your outfit has been created",
      });

      navigate('/outfits');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error creating your outfit",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-closet-gray-dark">Create New Outfit</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
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

            <div className="flex flex-col space-y-4">
              <div className="rounded-lg border border-dashed p-10 text-center">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
                  <div className="mb-4 rounded-full bg-closet-blue/10 p-4">
                    <Shirt className="h-8 w-8 text-closet-blue" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium">Select Wardrobe Items</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Choose items from your wardrobe to build this outfit
                  </p>
                  <Button type="button" variant="outline" className="mt-2">
                    Browse Wardrobe
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !name.trim()}
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
