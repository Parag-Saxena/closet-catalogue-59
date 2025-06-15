
import { useState } from 'react';
import { Tag, Shirt, WashingMachine, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClothingItem } from "@/types";

interface ClothingCardProps {
  item: ClothingItem;
  onLaundryToggle?: (id: string) => void;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ item, onLaundryToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLaundryToggle = () => {
    if (onLaundryToggle) {
      onLaundryToggle(item.id);
    }
  };

  return (
    <div className="clothing-card group">
      <div className={`clothing-card-image relative ${!imageLoaded && !item.imageUrl ? 'bg-muted/30' : ''}`}>
        {item.imageUrl ? (
          <>
            <img
              src={item.image || item.imageUrl}
              alt={item.name}
              className="clothing-card-image transition-transform duration-300 group-hover:scale-110"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                setImageLoaded(false);
                e.currentTarget.style.display = 'none';
              }}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
                <Shirt className="h-12 w-12 text-muted-foreground/30" />
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/30">
            <Shirt className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        
        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="stylestack-glass-subtle px-3 py-1 rounded-full stylestack-caption font-medium text-primary">
            {item.category}
          </span>
          {item.isFavorite && (
            <span className="stylestack-glass-subtle px-3 py-1 rounded-full flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500 fill-current" />
              <span className="stylestack-caption font-medium text-rose-600">Favorite</span>
            </span>
          )}
          {item.needsWashing && (
            <span className="stylestack-glass-subtle px-3 py-1 rounded-full flex items-center gap-1">
              <WashingMachine className="w-3 h-3 text-amber-600" />
              <span className="stylestack-caption font-medium text-amber-600">Laundry</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="clothing-card-content">
        <div className="space-y-2">
          <h3 className="stylestack-body font-medium text-foreground truncate">{item.name}</h3>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: item.color }}
              aria-label={`Color: ${item.color}`}
            />
            <p className="stylestack-caption">{item.color}</p>
            {item.size && (
              <p className="stylestack-caption ml-auto">Size {item.size}</p>
            )}
          </div>
          
          {item.tags?.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3 text-muted-foreground" />
              <p className="stylestack-caption truncate">
                {item.tags.join(', ')}
              </p>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="stylestack-glass-subtle border-0 h-8 px-3 text-xs font-medium w-full mt-2"
          onClick={handleLaundryToggle}
          type="button"
        >
          <WashingMachine className="w-3 h-3 mr-1" />
          {item.needsWashing ? 'Mark Clean' : 'Add to Laundry'}
        </Button>
      </div>
    </div>
  );
};

export default ClothingCard;
