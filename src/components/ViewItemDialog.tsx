import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ClothingItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Heart, WashingMachine, Shirt } from "lucide-react";

interface ViewItemDialogProps {
  item: ClothingItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewItemDialog = ({ item, isOpen, onClose }: ViewItemDialogProps) => {
  if (!item) return null;

  const colors = typeof item.color === 'string' 
    ? item.color.split(',').map(c => c.trim()).filter(Boolean) 
    : [item.color];
  
  const tags = item.tags || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Section */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted/30">
            {item.imageUrl ? (
              <img
                src={item.image || item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Shirt className="h-24 w-24 text-muted-foreground/30" />
              </div>
            )}
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{item.category}</Badge>
            {item.isFavorite && (
              <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-200">
                <Heart className="w-3 h-3 mr-1 fill-current" />
                Favorite
              </Badge>
            )}
            {item.needsWashing && (
              <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
                <WashingMachine className="w-3 h-3 mr-1" />
                Needs Washing
              </Badge>
            )}
          </div>

          {/* Main Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {item.brand && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Brand</p>
                <p className="text-base">{item.brand}</p>
              </div>
            )}

            {item.size && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Size</p>
                <p className="text-base">{item.size}</p>
              </div>
            )}

            {colors.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Colors</p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-border shadow-sm"
                        style={{ backgroundColor: color }}
                        aria-label={`Color: ${color}`}
                      />
                      <span className="text-sm">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.occasion && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Occasion</p>
                <p className="text-base capitalize">{item.occasion}</p>
              </div>
            )}

            {item.fabric && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Fabric</p>
                <p className="text-base capitalize">{item.fabric}</p>
              </div>
            )}

            {item.fit && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Fit</p>
                <p className="text-base capitalize">{item.fit}</p>
              </div>
            )}

            {item.season && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Season</p>
                <p className="text-base capitalize">{item.season}</p>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {item.notes && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Notes</p>
              <p className="text-base whitespace-pre-wrap">{item.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewItemDialog;
