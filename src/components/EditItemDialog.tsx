import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ClothingItem } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useClothingForm } from "@/context/ClothingFormContext";

interface EditItemDialogProps {
  item: ClothingItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedItem: ClothingItem) => void;
}

const EditItemDialog = ({ item, isOpen, onClose, onSave }: EditItemDialogProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [notes, setNotes] = useState('');
  const [needsWashing, setNeedsWashing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { toast } = useToast();
  const { categories } = useClothingForm();

  useEffect(() => {
    if (item) {
      setName(item.name);
      setCategory(item.category);
      setColor(item.color || '');
      setBrand(item.brand || '');
      setNotes(item.notes || '');
      setNeedsWashing(item.needsWashing);
      setIsFavorite(item.isFavorite);
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !category.trim()) {
      toast({
        title: "Missing fields",
        description: "Name and category are required",
        variant: "destructive"
      });
      return;
    }

    if (!item) return;

    const updatedItem: ClothingItem = {
      ...item,
      name: name.trim(),
      category: category.trim(),
      color: color.trim() || undefined,
      brand: brand.trim() || undefined,
      notes: notes.trim() || undefined,
      needsWashing,
      isFavorite
    };

    onSave(updatedItem);
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Update the details of your clothing item.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Blue T-Shirt"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                type='color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Nike"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes about this item..."
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="needsWashing"
                checked={needsWashing}
                onCheckedChange={setNeedsWashing}
              />
              <Label htmlFor="needsWashing">Needs washing</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isFavorite"
                checked={isFavorite}
                onCheckedChange={setIsFavorite}
              />
              <Label htmlFor="isFavorite">Mark as favorite</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditItemDialog;
