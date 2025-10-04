
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useClothingForm } from '@/context/ClothingFormContext';

interface ApparelFieldsProps {
  size: string;
  fabric: string;
  fit: string;
  season: string;
  onSizeChange: (value: string) => void;
  onFabricChange: (value: string) => void;
  onFitChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
}

const ApparelFields: React.FC<ApparelFieldsProps> = ({
  size,
  fabric,
  fit,
  season,
  onSizeChange,
  onFabricChange,
  onFitChange,
  onSeasonChange
}) => {
  const { fits, seasons } = useClothingForm();

  return (
    <>
      <div>
        <Label htmlFor="size">Size</Label>
        <Input
          id="size"
          name="size"
          value={size}
          onChange={(e) => onSizeChange(e.target.value)}
          placeholder="S, M, L, XL, etc."
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="fabric">Fabric</Label>
        <Input
          id="fabric"
          name="fabric"
          value={fabric}
          onChange={(e) => onFabricChange(e.target.value)}
          placeholder="Denim, Cotton, etc."
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="fit">Fit</Label>
        <select
          id="fit"
          name="fit"
          value={fit}
          onChange={(e) => onFitChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
        >
          <option value="">Select Fit</option>
          {fits.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="season">Season</Label>
        <select
          id="season"
          name="season"
          value={season}
          onChange={(e) => onSeasonChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
        >
          <option value="">Select Season</option>
          {seasons.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ApparelFields;
