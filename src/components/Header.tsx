
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shirt, LogIn, User as UserIcon, Menu, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from '@/context/AppContext';
import { useSidebar } from '@/context/SidebarContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useApp();
  const { sidebarOpen, toggleSidebar } = useSidebar();
  
  const handleSignOut = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      variant: "success"
    });
    navigate('/sign-in');
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-background/90 border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 max-w-full mx-auto px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Link 
              to={user ? "/" : "/home"} 
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Shirt className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg text-foreground">Closet Keeper</span>
            </Link>
            
            {user && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleSidebar}
                className="h-8 w-8 ml-2 hover:bg-accent"
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </Button>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-1 ml-6">
            <Link to="/home" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md">
              Home
            </Link>
            {user && (
              <Link to="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md">
                Dashboard
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-sm font-medium">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                    {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="h-4 w-4" />}
                  </div>
                  <span className="hidden md:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background">
                <div className="flex items-center gap-2 p-2">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                    {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="h-5 w-5" />}
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
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10" 
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && (
              <Link
                to="/sign-in"
                className="flex items-center gap-1 text-sm font-medium bg-primary text-white px-3 py-2 rounded-full"
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
