
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Image, Upload } from 'lucide-react';

const categories = [
  'Tops',
  'Bottoms',
  'Outerwear',
  'Dresses',
  'Shoes',
  'Accessories'
];

const colors = [
  'Black',
  'White',
  'Gray',
  'Blue',
  'Green',
  'Red',
  'Yellow',
  'Purple',
  'Pink',
  'Brown',
  'Orange',
  'Beige',
  'Navy',
  'Multicolor'
];

interface FormData {
  name: string;
  category: string;
  color: string;
  notes: string;
  imageUrl: string;
}

const AddClothingForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    color: '',
    notes: '',
    imageUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, we would upload the image to a server
    // For this demo, we'll use a placeholder URL
    setFormData(prev => ({ 
      ...prev, 
      imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=400' 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.category || !formData.color) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // In a real app, we would save the data to a database
    // For this demo, we'll save to localStorage
    const existingItems = JSON.parse(localStorage.getItem('closetItems') || '[]');
    const newItem = {
      ...formData,
      id: Date.now().toString()
    };
    
    localStorage.setItem('closetItems', JSON.stringify([...existingItems, newItem]));
    
    // Show success message
    toast.success('Item added to your closet');
    
    // Redirect to home page
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-1.5">
        <label htmlFor="imageUpload" className="block text-sm font-medium text-closet-gray-dark">
          Image
        </label>
        <div className="relative mt-1 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg p-6 cursor-pointer hover:border-closet-blue/60 transition-colors">
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleImageUpload}
          />
          {formData.imageUrl ? (
            <div className="relative w-full max-w-xs mx-auto">
              <img 
                src={formData.imageUrl} 
                alt="Clothing preview" 
                className="w-full h-auto rounded-md object-cover" 
              />
              <button 
                type="button"
                className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-white shadow-sm"
                onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4 flex text-sm text-muted-foreground">
                <span className="font-medium text-closet-blue">Upload an image</span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-medium text-closet-gray-dark">
          Name <span className="text-destructive">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-closet-blue focus:border-transparent"
          placeholder="White T-shirt"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label htmlFor="category" className="block text-sm font-medium text-closet-gray-dark">
            Category <span className="text-destructive">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-closet-blue focus:border-transparent"
          >
            <option value="" disabled>Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="color" className="block text-sm font-medium text-closet-gray-dark">
            Color <span className="text-destructive">*</span>
          </label>
          <select
            id="color"
            name="color"
            required
            value={formData.color}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-closet-blue focus:border-transparent"
          >
            <option value="" disabled>Select a color</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="notes" className="block text-sm font-medium text-closet-gray-dark">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-closet-blue focus:border-transparent resize-none"
          placeholder="Add any additional details about this item..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-closet-blue px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-closet-blue focus:ring-offset-2 transition-all duration-200 disabled:opacity-70"
      >
        {isSubmitting ? 'Adding...' : 'Add to Closet'}
      </button>
    </form>
  );
};

export default AddClothingForm;
