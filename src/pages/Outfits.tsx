
import Layout from '../components/Layout';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Outfits = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-closet-gray-dark">My Outfits</h1>
          <Link 
            to="/add-outfit"
            className="inline-flex items-center justify-center rounded-full h-10 px-4 py-2 bg-closet-blue text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Create Outfit</span>
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <h2 className="text-xl font-medium text-closet-gray-dark mb-2">No outfits yet</h2>
          <p className="text-closet-gray-medium max-w-md mb-8">
            Create your first outfit by combining items from your wardrobe into a curated style.
          </p>
          <Link
            to="/add-outfit"
            className="inline-flex h-10 items-center justify-center rounded-full bg-closet-blue px-6 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95"
          >
            Create Your First Outfit
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Outfits;
