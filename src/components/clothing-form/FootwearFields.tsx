
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FootwearFieldsProps {
  shoeSize: string;
  heelHeight: string;
  footwearStyle: string;
  onShoeSizeChange: (value: string) => void;
  onHeelHeightChange: (value: string) => void;
  onFootwearStyleChange: (value: string) => void;
}

const FootwearFields: React.FC<FootwearFieldsProps> = ({
  shoeSize,
  heelHeight,
  footwearStyle,
  onShoeSizeChange,
  onHeelHeightChange,
  onFootwearStyleChange
}) => {
  return (
    <>
      <div>
        <Label htmlFor="shoeSize">Shoe Size</Label>
        <Input
          id="shoeSize"
          name="shoeSize"
          value={shoeSize}
          onChange={(e) => onShoeSizeChange(e.target.value)}
          placeholder="US 9, EU 42, etc."
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="heelHeight">Heel Height</Label>
        <select
          id="heelHeight"
          name="heelHeight"
          value={heelHeight}
          onChange={(e) => onHeelHeightChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
        >
          <option value="">Select Heel Height</option>
          <option value="Flat">Flat</option>
          <option value="Low">Low (0.5-1.5")</option>
          <option value="Medium">Medium (2-3")</option>
          <option value="High">High (3.5"+)</option>
        </select>
      </div>
      
      <div>
        <Label htmlFor="footwearStyle">Style</Label>
        <select
          id="footwearStyle"
          name="footwearStyle"
          value={footwearStyle}
          onChange={(e) => onFootwearStyleChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
        >
          <option value="">Select Style</option>
          <option value="Casual">Casual</option>
          <option value="Athletic">Athletic</option>
          <option value="Dress">Dress</option>
          <option value="Boot">Boot</option>
          <option value="Sandal">Sandal</option>
        </select>
      </div>
    </>
  );
};

export default FootwearFields;
