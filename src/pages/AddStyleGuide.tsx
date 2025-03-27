
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { BookOpenText, PlusCircle } from 'lucide-react';

const AddStyleGuide = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inspiration, setInspiration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, we would save to a database
    // For this demo, we'll save to localStorage
    try {
      const styleGuides = JSON.parse(localStorage.getItem('styleGuides') || '[]');
      const newStyleGuide = {
        id: Date.now().toString(),
        title,
        description,
        inspiration,
        created: new Date().toISOString()
      };

      styleGuides.push(newStyleGuide);
      localStorage.setItem('styleGuides', JSON.stringify(styleGuides));

      toast({
        title: "Success!",
        description: "Your style guide has been created",
      });

      navigate('/style');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error creating your style guide",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-closet-gray-dark">Create Style Guide</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Style Title</Label>
                <Input 
                  id="title" 
                  placeholder="Minimalist Wardrobe" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Focus on a neutral color palette with clean lines and simple silhouettes." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspiration">Inspiration & Notes</Label>
                <Textarea 
                  id="inspiration" 
                  placeholder="Influences, favorite styles, shopping sources, etc." 
                  value={inspiration}
                  onChange={(e) => setInspiration(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="rounded-lg border border-dashed p-10 text-center">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
                  <div className="mb-4 rounded-full bg-closet-blue/10 p-4">
                    <BookOpenText className="h-8 w-8 text-closet-blue" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium">Style Elements</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Add color palette, fabric preferences, and signature pieces
                  </p>
                  <Button type="button" variant="outline" className="mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Element
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !title.trim()}
                  className="min-w-24"
                >
                  {isSubmitting ? "Creating..." : "Create Style Guide"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddStyleGuide;
