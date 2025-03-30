
import { useState } from 'react';
import { Tag, Shirt, WashingMachine } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ClothingItem {
  id: string;
  name: string;
  type: string;
  category: string;
  color: string;
  size: string;
  brand: string;
  material: string;
  tags: Array<string>;
  image: string;
  lastWorn: Date;
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean;
  needsWashing?: boolean;
  imageUrl?: string; // keeping for backward compatibility
  notes?: string; // keeping for backward compatibility
}

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
    <div className="group card-hover overflow-hidden rounded-xl bg-card border border-border shadow-sm dark:bg-gray-800">
      <div className={`relative aspect-square w-full ${!imageLoaded && !item.imageUrl ? 'bg-muted' : ''}`}>
        {item.imageUrl ? (
          <>
            <img
              src={item.image || item.imageUrl}
              alt={item.name}
              className={cn(
                "h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                setImageLoaded(false);
                e.currentTarget.style.display = 'none';
              }}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-secondary">
                <Shirt className="h-12 w-12 text-muted-foreground opacity-30" />
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <Shirt className="h-12 w-12 text-muted-foreground opacity-30" />
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary dark:bg-primary/30 dark:text-primary-foreground">
            {item.category}
          </span>
          {item.needsWashing && (
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:bg-amber-500/30 dark:text-amber-200">
              Needs washing
            </span>
          )}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-foreground truncate">{item.name}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
            aria-label={`Color: ${item.color}`}
          />
          <p className="text-muted-foreground">{item.color}</p>
          {item.size && (
            <p className="text-muted-foreground ml-2">Size: {item.size}</p>
          )}
        </div>
        {(item.notes || item.tags?.length > 0) && (
          <div className="mt-2 flex items-start gap-1.5">
            <Tag className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground line-clamp-1">
              {item.tags?.length > 0 ? item.tags.join(', ') : item.notes}
            </p>
          </div>
        )}
        <div className="mt-2 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-xs h-7 px-2"
            onClick={handleLaundryToggle}
            type="button"
          >
            <WashingMachine className="h-3 w-3" />
            {item.needsWashing ? 'Mark Clean' : 'Laundry'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClothingCard;
