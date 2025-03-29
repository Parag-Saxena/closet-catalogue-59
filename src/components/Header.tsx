
import { Link, useLocation } from 'react-router-dom';
import { Shirt, LogIn, User as UserIcon, Menu, Settings, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/theme-toggle';
import { useSidebar } from './ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from '@/types';

const Header = () => {
  const location = useLocation();
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-background/90 border-b border-border">
      <div className="container flex items-center justify-between h-16 max-w-full mx-auto px-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="md:hidden"
              type="button"
            >
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-sm font-medium">
                  <UserIcon className="h-4 w-4" />
                  <span className="hidden md:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background">
                <div className="flex items-center gap-2 p-2">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account" className="w-full cursor-pointer text-foreground">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="w-full cursor-pointer text-foreground">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <ThemeToggle />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
