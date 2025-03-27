
import { Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-closet-blue/10 p-4 mb-6">
        <Shirt className="h-10 w-10 text-closet-blue" />
      </div>
      <h2 className="text-xl font-medium text-closet-gray-dark mb-2">Your closet is empty</h2>
      <p className="text-closet-gray-medium max-w-md mb-8">
        Add some clothing items to start organizing your wardrobe and make getting dressed easier.
      </p>
      <Link
        to="/add"
        className="inline-flex h-10 items-center justify-center rounded-full bg-closet-blue px-6 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95"
      >
        Add your first item
      </Link>
    </div>
  );
};

export default EmptyState;
