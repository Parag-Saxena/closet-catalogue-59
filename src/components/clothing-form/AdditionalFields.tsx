
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface AdditionalFieldsProps {
  tags: string;
  notes: string;
  onTagsChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  image: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdditionalFields: React.FC<AdditionalFieldsProps> = ({
  tags,
  notes,
  onTagsChange,
  onNotesChange,
  image,
  onImageChange
}) => {
  return (
    <>
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          name="tags"
          value={tags}
          onChange={(e) => onTagsChange(e.target.value)}
          placeholder="summer, favorite, denim"
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Any additional details about this item"
          className="mt-1 min-h-[80px]"
        />
      </div>
      
      <div>
        <Label htmlFor="image">Upload Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="mt-1"
        />
        
        {image && (
          <div className="mt-2 relative rounded-md overflow-hidden w-40 h-40">
            <img
              src={image}
              alt="Item preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AdditionalFields;
