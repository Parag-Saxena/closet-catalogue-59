
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

  const colors = typeof item.color === 'string'
    ? item.color.split(',').map(c => c.trim()).filter(Boolean)
    : [item.color];

  return (
    <div className="clothing-card group h-full flex flex-col">
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
          <span className="stylestack-glass px-3 py-1 rounded-full stylestack-caption font-medium text-primary">
            {item.category}
          </span>
          {item.isFavorite && (
            <span className="stylestack-glass px-3 py-1 rounded-full flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500 fill-current" />
              <span className="stylestack-caption font-medium text-rose-600">Favorite</span>
            </span>
          )}
          {item.needsWashing && (
            <span className="stylestack-glass px-3 py-1 rounded-full flex items-center gap-1">
              <WashingMachine className="w-3 h-3 text-amber-600" />
              <span className="stylestack-caption font-medium text-amber-600">Laundry</span>
            </span>
          )}
        </div>
      </div>

      <div className="clothing-card-content flex-1 flex flex-col">
        <div className="flex-1 space-y-2">
          <h3 className="stylestack-body font-medium text-foreground line-clamp-2" title={item.name}>
            {item.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              {colors.slice(0, 3).map((color, idx) => (
                <div
                  key={idx}
                  className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: color }}
                  aria-label={`Color: ${color}`}
                />
              ))}
              {colors.length > 3 && (
                <span className="stylestack-caption text-muted-foreground">+{colors.length - 3}</span>
              )}
            </div>
            {item.size && (
              <p className="stylestack-caption ml-auto whitespace-nowrap">Size {item.size}</p>
            )}
          </div>
          {item.brand && (
            <p className="stylestack-caption text-muted-foreground truncate" title={item.brand}>
              {item.brand}
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="stylestack-glass border-0 h-8 px-3 text-xs font-medium w-full mt-2"
          onClick={(e) => {
            e.stopPropagation();
            handleLaundryToggle();
          }}
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
