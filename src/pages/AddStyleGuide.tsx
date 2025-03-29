
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenText, PlusCircle, Tag, XCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StyleElement {
  id: string;
  type: string;
  value: string;
}

const AddStyleGuide = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inspiration, setInspiration] = useState('');
  const [elements, setElements] = useState<StyleElement[]>([]);
  const [isAddingElement, setIsAddingElement] = useState(false);
  const [elementType, setElementType] = useState('color');
  const [elementValue, setElementValue] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleAddElement = () => {
    if (!elementValue.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a value for the element",
      });
      return;
    }

    const newElement: StyleElement = {
      id: Date.now().toString(),
      type: elementType,
      value: elementValue
    };

    setElements(prev => [...prev, newElement]);
    setElementType('color');
    setElementValue('');
    setIsAddingElement(false);
  };

  const removeElement = (id: string) => {
    setElements(prev => prev.filter(element => element.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a title for your style guide",
      });
      setIsSubmitting(false);
      return;
    }

    // In a real app, we would save to a database
    // For this demo, we'll save to localStorage
    try {
      const styleGuides = JSON.parse(localStorage.getItem('styleGuides') || '[]');
      const newStyleGuide = {
        id: Date.now().toString(),
        title,
        description,
        inspiration,
        elements,
        tags,
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

  const renderElementPreview = (element: StyleElement) => {
    switch (element.type) {
      case 'color':
        return (
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded-full border" 
              style={{ backgroundColor: element.value }}
            ></div>
            <span>{element.value}</span>
          </div>
        );
      case 'fabric':
        return <span>{element.value}</span>;
      case 'pattern':
        return <span>{element.value}</span>;
      default:
        return <span>{element.value}</span>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-foreground">Create Style Guide</h1>
        </div>

        <div className="bg-card rounded-lg shadow-sm border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Style Title <span className="text-destructive">*</span></Label>
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
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <div key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full flex items-center gap-1 text-sm">
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(tag)}
                        className="bg-secondary-foreground/20 rounded-full h-4 w-4 flex items-center justify-center hover:bg-secondary-foreground/30"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="tagInput" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagAdd}
                    placeholder="Add tags (press Enter to add)"
                  />
                </div>
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
              <div className="rounded-lg border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Style Elements</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddingElement(true)}
                    disabled={isAddingElement}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Element
                  </Button>
                </div>

                {isAddingElement && (
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle>New Style Element</CardTitle>
                      <CardDescription>
                        Add a color, fabric type, or pattern to your style guide
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="elementType">Element Type</Label>
                          <div className="flex">
                            <select
                              id="elementType"
                              value={elementType}
                              onChange={(e) => setElementType(e.target.value)}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="color">Color</option>
                              <option value="fabric">Fabric</option>
                              <option value="pattern">Pattern</option>
                              <option value="silhouette">Silhouette</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="elementValue">Value</Label>
                          <Input 
                            id="elementValue" 
                            type={elementType === 'color' ? 'color' : 'text'}
                            value={elementValue}
                            onChange={(e) => setElementValue(e.target.value)}
                            placeholder={
                              elementType === 'color' ? '#000000' : 
                              elementType === 'fabric' ? 'Cotton, Linen, etc.' : 
                              elementType === 'pattern' ? 'Solid, Striped, etc.' : 
                              'Loose, Fitted, etc.'
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline"
                        type="button"
                        onClick={() => {
                          setIsAddingElement(false);
                          setElementType('color');
                          setElementValue('');
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="button" onClick={handleAddElement}>Add</Button>
                    </CardFooter>
                  </Card>
                )}

                {elements.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {elements.map((element) => (
                      <div key={element.id} className="flex justify-between items-center border rounded-md p-3">
                        <div className="flex items-center gap-2">
                          <div className="capitalize text-sm font-medium text-muted-foreground">
                            {element.type}:
                          </div>
                          {renderElementPreview(element)}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeElement(element.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : !isAddingElement ? (
                  <div className="text-center py-10">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
                      <div className="mb-4 rounded-full bg-primary/10 p-4">
                        <BookOpenText className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-1 text-lg font-medium">Style Elements</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Add color palette, fabric preferences, and signature pieces
                      </p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsAddingElement(true)}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Element
                      </Button>
                    </div>
                  </div>
                ) : null}
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
