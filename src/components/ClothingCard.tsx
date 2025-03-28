
import { useState } from 'react';
import { Tag, Shirt, WashingMachine } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
    <div className="group animate-scale-in overflow-hidden rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800">
      <div className={`relative aspect-square w-full ${!imageLoaded && !item.imageUrl ? 'bg-muted' : ''}`}>
        {item.imageUrl ? (
          <>
            <img
              src={item.image || item.imageUrl}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                setImageLoaded(false);
                e.currentTarget.style.display = 'none';
              }}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-secondary">
                <Shirt className="h-16 w-16 text-muted-foreground opacity-30" />
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <Shirt className="h-16 w-16 text-muted-foreground opacity-30" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="inline-flex items-center rounded-full bg-closet-blue/10 px-2.5 py-1 text-xs font-medium text-closet-blue dark:bg-blue-900/30 dark:text-blue-300">
            {item.category}
          </span>
          {item.needsWashing && (
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:bg-amber-900/30 dark:text-amber-300">
              Needs washing
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-base text-closet-gray-dark truncate dark:text-gray-200">{item.name}</h3>
        <div className="mt-1 flex items-center gap-1.5">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: item.color }}
            aria-label={`Color: ${item.color}`}
          />
          <p className="text-xs text-closet-gray-medium dark:text-gray-200">{item.color}</p>
          {item.size && (
            <p className="text-xs text-closet-gray-medium dark:text-gray-200 ml-2">Size: {item.size}</p>
          )}
        </div>
        {(item.notes || item.tags?.length > 0) && (
          <div className="mt-3 flex items-start gap-1.5">
            <Tag className="h-3.5 w-3.5 text-closet-gray-medium shrink-0 mt-0.5 dark:text-gray-300" />
            <p className="text-xs text-closet-gray-medium line-clamp-2 dark:text-gray-300">
              {item.tags?.length > 0 ? item.tags.join(', ') : item.notes}
            </p>
          </div>
        )}
        <div className="mt-3 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-xs"
            onClick={handleLaundryToggle}
            type="button"
          >
            <WashingMachine className="h-3.5 w-3.5" />
            {item.needsWashing ? 'Mark as Clean' : 'Mark for Laundry'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClothingCard;
