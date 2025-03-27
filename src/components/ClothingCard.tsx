
import { useState } from 'react';
import { Tag, Shirt } from 'lucide-react';

export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  notes?: string;
  imageUrl?: string;
}

interface ClothingCardProps {
  item: ClothingItem;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="group animate-scale-in overflow-hidden rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all duration-300">
      <div className={`relative aspect-square w-full ${!imageLoaded && !item.imageUrl ? 'bg-muted' : ''}`}>
        {item.imageUrl ? (
          <div className={`image-container ${!imageLoaded ? 'loading' : ''}`}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <Shirt className="h-16 w-16 text-muted-foreground opacity-30" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-closet-blue/10 px-2.5 py-1 text-xs font-medium text-closet-blue">
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-base text-closet-gray-dark truncate">{item.name}</h3>
        <div className="mt-1 flex items-center gap-1.5">
          <div 
            className="h-3 w-3 rounded-full" 
            style={{ backgroundColor: item.color }}
            aria-label={`Color: ${item.color}`}
          />
          <p className="text-xs text-closet-gray-medium">{item.color}</p>
        </div>
        {item.notes && (
          <div className="mt-3 flex items-start gap-1.5">
            <Tag className="h-3.5 w-3.5 text-closet-gray-medium shrink-0 mt-0.5" />
            <p className="text-xs text-closet-gray-medium line-clamp-2">{item.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothingCard;
