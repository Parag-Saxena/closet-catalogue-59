
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Shirt,
  LayoutList,
  BookOpenText,
  Settings,
  BookHeart,
  User,
  Ruler,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useSidebar } from '@/context/SidebarContext';

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive: boolean;
}

const AppSidebar = () => {
  const location = useLocation();
  const { user } = useApp();
  const { sidebarOpen } = useSidebar();
  
  // If no user is logged in, don't render the sidebar
  if (!user || !sidebarOpen) {
    return null;
  }
  
  const navigationItems: NavItem[] = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: location.pathname === "/"
    },
    {
      title: "My Wardrobe",
      url: "/wardrobe",
      icon: Shirt,
      isActive: location.pathname === "/wardrobe"
    },
    {
      title: "Categories",
      url: "/categories",
      icon: LayoutList,
      isActive: location.pathname === "/categories"
    },
    {
      title: "My Outfits",
      url: "/outfits",
      icon: BookHeart,
      isActive: location.pathname === "/outfits"
    },
    {
      title: "My Measurements",
      url: "/measurements",
      icon: Ruler,
      isActive: location.pathname === "/measurements"
    },
    {
      title: "Shopping Schedule",
      url: "/shopping-schedule",
      icon: ShoppingBag,
      isActive: location.pathname === "/shopping-schedule"
    },
    {
      title: "My Style",
      url: "/style",
      icon: BookOpenText,
      isActive: location.pathname === "/style"
    }
  ];

  const preferencesItems: NavItem[] = [
    {
      title: "Account",
      url: "/account",
      icon: User,
      isActive: location.pathname === "/account"
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      isActive: location.pathname === "/settings"
    }
  ];

  return (
    <aside className="w-64 min-h-screen border-r border-border bg-background/95 backdrop-blur-sm pt-4 hidden md:block transition-all duration-300">
      <div className="h-full flex flex-col">
        <div className="px-4 py-2">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Navigation</h2>
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                  item.isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-6 px-4 py-2">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Preferences</h2>
          <nav className="space-y-1">
            {preferencesItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                  item.isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
