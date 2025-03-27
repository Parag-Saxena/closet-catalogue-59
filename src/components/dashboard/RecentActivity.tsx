
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar } from "lucide-react";

interface OutfitEvent {
  id: string;
  name: string;
  date: string;
  items: string[];
  image?: string;
}

interface RecentActivityProps {
  recentOutfits: OutfitEvent[];
}

const RecentActivity = ({ recentOutfits }: RecentActivityProps) => {
  if (recentOutfits.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-closet-blue" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No recent outfit activity yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Your recently worn outfits will appear here.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-closet-blue" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {recentOutfits.map((outfit) => (
              <CarouselItem key={outfit.id} className="basis-full sm:basis-1/2 md:basis-1/3">
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg bg-muted/50 border border-border">
                    <div className="h-32 bg-muted/70 flex items-center justify-center">
                      {outfit.image ? (
                        <img src={outfit.image} alt={outfit.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="text-muted-foreground text-sm">No image</div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{outfit.name}</h3>
                      <p className="text-xs text-muted-foreground">{outfit.date}</p>
                      <p className="text-xs text-muted-foreground mt-1">{outfit.items.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-1 mt-2">
            <CarouselPrevious className="static translate-y-0 h-8 w-8" />
            <CarouselNext className="static translate-y-0 h-8 w-8" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
