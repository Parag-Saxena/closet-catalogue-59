
import { Link, useLocation } from 'react-router-dom';
import { Plus, Hanger } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-border">
      <div className="container flex items-center justify-between h-16 max-w-5xl mx-auto px-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Hanger className="h-6 w-6 text-closet-blue" />
          <span className="font-semibold text-lg text-closet-gray-dark">Closet Keeper</span>
        </Link>
        
        {isHome ? (
          <Link
            to="/add"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-closet-blue text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95"
            aria-label="Add new item"
          >
            <Plus className="h-5 w-5" />
          </Link>
        ) : (
          <Link
            to="/"
            className="text-sm font-medium text-closet-gray-dark transition-colors hover:text-closet-blue"
          >
            Cancel
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
