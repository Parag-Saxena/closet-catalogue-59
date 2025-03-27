
import { Link, useLocation } from 'react-router-dom';
import { Plus, Shirt, LogIn, LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface User {
  name: string;
  email: string;
}

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-border">
      <div className="container flex items-center justify-between h-16 max-w-5xl mx-auto px-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Shirt className="h-6 w-6 text-closet-blue" />
          <span className="font-semibold text-lg text-closet-gray-dark">Closet Keeper</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {isHome && (
                <Link
                  to="/add"
                  className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-closet-blue text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95"
                  aria-label="Add new item"
                >
                  <Plus className="h-5 w-5" />
                </Link>
              )}
              
              <div className="flex items-center gap-3">
                <Link to="/account" className="flex items-center gap-2 text-sm font-medium text-closet-gray-dark hover:text-closet-blue">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user.name}</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="text-sm font-medium text-closet-gray-dark hover:text-closet-blue"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Sign Out</span>
                </Button>
              </div>
            </>
          ) : (
            location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && (
              <Link
                to="/sign-in"
                className="flex items-center gap-1 text-sm font-medium text-closet-blue"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )
          )}
          
          {!isHome && location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && (
            <Link
              to="/"
              className="text-sm font-medium text-closet-gray-dark transition-colors hover:text-closet-blue"
            >
              Cancel
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
