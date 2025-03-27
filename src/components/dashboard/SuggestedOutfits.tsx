
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface OutfitSuggestion {
  id: string;
  name: string;
  description: string;
  image?: string;
}

interface SuggestedOutfitsProps {
  suggestions: OutfitSuggestion[];
}

const SuggestedOutfits = ({ suggestions }: SuggestedOutfitsProps) => {
  if (suggestions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-closet-blue" />
            Suggested Outfits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No outfit suggestions available.</p>
            <p className="text-sm text-muted-foreground mt-1">Add more items to your wardrobe to get suggestions.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-closet-blue" />
          Suggested Outfits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((outfit) => (
            <div key={outfit.id} className="border rounded-lg overflow-hidden">
              <div className="h-40 bg-muted flex items-center justify-center">
                {outfit.image ? (
                  <img src={outfit.image} alt={outfit.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="text-muted-foreground text-sm">No image</div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium">{outfit.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-3">{outfit.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="w-full">Try It</Button>
                  <Button size="sm" className="w-full">Save</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedOutfits;
