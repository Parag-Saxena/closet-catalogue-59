
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shirt, LogIn, User as UserIcon, Menu, Settings, LogOut, X, ArrowLeft, ArrowRight } from 'lucide-react';
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
import { useUser } from '@/context/UserContext';
import { useSidebar } from '@/context/SidebarContext';
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useUser();
  const { sidebarOpen, toggleSidebar } = useSidebar();

  const handleSignOut = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/sign-in');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full stylestack-glass border-0 border-b border-glass-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          {/* Logo and Brand */}
          <Link
            to={user ? "/" : "/home"}
            className="flex items-center gap-3 transition-all duration-200 hover:scale-105"
          >
            <Shirt className="h-6 w-6 text-primary" />
            <span className="stylestack-heading-sm text-foreground hidden sm:block">StyleStack</span>
          </Link>

          {/* Desktop Sidebar Toggle */}
          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn(
                "bg-secondary/20 shadow-md h-10 w-10 hidden lg:flex border-0",
                "hover:scale-105 active:scale-95"
              )}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Button>
          )}

          {/* Mobile Sidebar Toggle */}
          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn(
                "bg-secondary/20 shadow-md h-10 w-10 lg:hidden border-0",
                "hover:scale-105 active:scale-95"
              )}
              aria-label="Toggle navigation"
            >
              <Menu size={18} />
            </Button>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 ml-6">
            <Link
              to="/home"
              className={cn(
                "px-4 py-2 stylestack-body font-medium rounded-lg transition-all duration-200",
                "hover:bg-accent/50 hover:text-foreground stylestack-hover"
              )}
            >
              Home
            </Link>
            {user && (
              <Link
                to="/"
                className={cn(
                  "px-4 py-2 stylestack-body font-medium rounded-lg transition-all duration-200",
                  "hover:bg-accent/50 hover:text-foreground stylestack-hover"
                )}
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "stylestack-glass flex items-center gap-3 h-10 px-3 border-0",
                    "hover:scale-105 active:scale-95"
                  )}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="h-4 w-4" />}
                  </div>
                  <span className="stylestack-body font-medium hidden md:inline truncate max-w-24">
                    {user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 stylestack-glass border-glass-border p-2"
              >
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/20">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="stylestack-body font-medium text-foreground truncate">{user.name}</p>
                    <p className="stylestack-caption text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem asChild>
                  <Link
                    to="/account"
                    className="w-full cursor-pointer text-foreground rounded-lg px-3 py-2 hover:bg-accent/50"
                  >
                    <UserIcon className="h-4 w-4 mr-3" />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/settings"
                    className="w-full cursor-pointer text-foreground rounded-lg px-3 py-2 hover:bg-accent/50"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive hover:bg-destructive/10 focus:bg-destructive/10 rounded-lg px-3 py-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && (
              <Button asChild className="stylestack-button hover:scale-105 active:scale-95">
                <Link to="/sign-in">
                  <LogIn className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
