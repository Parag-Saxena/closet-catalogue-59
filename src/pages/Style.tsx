
import Layout from '../components/Layout';
import { BookOpenText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Style = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-closet-gray-dark">My Style</h1>
          <Link 
            to="/add-style"
            className="inline-flex items-center justify-center rounded-full h-10 px-4 py-2 bg-closet-blue text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Add Style Guide</span>
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="rounded-full bg-closet-blue/10 p-4 mb-6">
            <BookOpenText className="h-10 w-10 text-closet-blue" />
          </div>
          <h2 className="text-xl font-medium text-closet-gray-dark mb-2">Define your style</h2>
          <p className="text-closet-gray-medium max-w-md mb-8">
            Create style guides to define your fashion preferences and help you make outfit decisions.
          </p>
          <Link
            to="/add-style"
            className="inline-flex h-10 items-center justify-center rounded-full bg-closet-blue px-6 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95"
          >
            Create Style Guide
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Style;
