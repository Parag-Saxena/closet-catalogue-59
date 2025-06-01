import { Link, useLocation } from 'react-router-dom';
import { Shirt, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useApp } from '@/context/AppContext';

const Header = () => {
  const location = useLocation();
  const { user } = useApp();
  const isHomePage = location.pathname === '/home';
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-background/90 border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 max-w-full mx-auto px-4">
        <div className="flex items-center gap-2">
          <Link 
            to={isHomePage ? "/home" : "/"} 
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Shirt className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg text-foreground">Closet Keeper</span>
          </Link>
          
          {!isHomePage && (
            <div className="hidden md:flex items-center space-x-1 ml-6">
              <Link to="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md">
                Dashboard
              </Link>
              <Link to="/wardrobe" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md">
                Wardrobe
              </Link>
              <Link to="/outfits" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md">
                Outfits
              </Link>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {isHomePage ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost\" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/sign-up">
                  Get Started <LogIn className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : user ? (
            <Button variant="outline" asChild>
              <Link to="/account">
                {user.name}
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link to="/sign-in">
                Sign In <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;