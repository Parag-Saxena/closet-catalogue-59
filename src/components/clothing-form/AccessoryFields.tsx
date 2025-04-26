
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface AccessoryFieldsProps {
  size: string;
  onSizeChange: (value: string) => void;
}

const AccessoryFields: React.FC<AccessoryFieldsProps> = ({
  size,
  onSizeChange
}) => {
  return (
    <div>
      <Label htmlFor="size">Size (if applicable)</Label>
      <Input
        id="size"
        name="size"
        value={size}
        onChange={(e) => onSizeChange(e.target.value)}
        placeholder="One Size, S, M, L, etc."
        className="mt-1"
      />
    </div>
  );
};

export default AccessoryFields;
