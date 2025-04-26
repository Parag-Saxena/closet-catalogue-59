
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <div>
      <Label htmlFor="color">Color</Label>
      <div className="flex items-center mt-1 gap-2">
        <input
          type="color"
          id="color"
          name="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer"
        />
        <Input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          name="color"
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
