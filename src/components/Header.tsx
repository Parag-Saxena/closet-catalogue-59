
import { Link, useLocation } from 'react-router-dom';
import { Plus, Shirt, LogIn, LogOut, User, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useSidebar } from './ui/sidebar';

interface User {
  name: string;
  email: string;
}

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const { toggleSidebar, isMobile } = useSidebar();
  
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/90 border-b border-border">
      <div className="container flex items-center justify-between h-16 max-w-full mx-auto px-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          <Link 
            to="/" 
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Shirt className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg text-foreground">Closet Keeper</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {user ? (
            <>
              {isHome && (
                <Link
                  to="/add"
                  className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-primary text-primary-foreground shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:scale-105 active:scale-95"
                  aria-label="Add new item"
                >
                  <Plus className="h-5 w-5" />
                </Link>
              )}
              
              <div className="flex items-center gap-2">
                <Link to="/account" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user.name}</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="text-sm font-medium text-foreground hover:text-primary"
                >
                  <LogOut className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Sign Out</span>
                </Button>
              </div>
            </>
          ) : (
            location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && (
              <Link
                to="/sign-in"
                className="flex items-center gap-1 text-sm font-medium text-primary"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )
          )}
          
          {!isHome && location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && (
            <Link
              to="/"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary hidden sm:inline-block"
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
