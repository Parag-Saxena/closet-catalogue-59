
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
import { useUser } from '@/context/UserContext';
import { useSidebar } from '@/context/SidebarContext';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive: boolean;
}

const AppSidebar = () => {
  const location = useLocation();
  const { user } = useUser();
  const { sidebarOpen, toggleSidebar } = useSidebar();

  if (!user) {
    return null;
  }

  const isRouteActive = (url: string) => {
    // Exact match for root path
    if (url === "/") {
      return location.pathname === "/";
    }
    // For other routes, match if current path starts with the route URL
    return location.pathname === url || location.pathname.startsWith(url + "/");
  };

  const navigationItems: NavItem[] = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: isRouteActive("/")
    },
    {
      title: "My Wardrobe",
      url: "/wardrobe",
      icon: Shirt,
      isActive: isRouteActive("/wardrobe")
    },
    {
      title: "Categories",
      url: "/categories",
      icon: LayoutList,
      isActive: isRouteActive("/categories")
    },
    {
      title: "My Outfits",
      url: "/outfits",
      icon: BookHeart,
      isActive: isRouteActive("/outfits")
    },
    {
      title: "My Measurements",
      url: "/measurements",
      icon: Ruler,
      isActive: isRouteActive("/measurements")
    },
    {
      title: "Shopping Schedule",
      url: "/shopping-schedule",
      icon: ShoppingBag,
      isActive: isRouteActive("/shopping-schedule")
    },
    {
      title: "My Style",
      url: "/style",
      icon: BookOpenText,
      isActive: isRouteActive("/style")
    }
  ];

  const preferencesItems: NavItem[] = [
    {
      title: "Account",
      url: "/account",
      icon: User,
      isActive: isRouteActive("/account")
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      isActive: isRouteActive("/settings")
    }
  ];

  return (
    <aside className={cn(
      "morphism-sidebar h-full transition-all duration-300 ease-in-out",
      "w-64 lg:w-64 scrollbar-morphism overflow-y-auto",
      "fixed w-full lg:static lg:top-0 bottom-0 left-0 z-40 lg:z-auto"
    )}>
      <div className="h-full flex flex-col p-responsive pt-6">
        {/* Navigation Section */}
        <div className="space-y-1">
          <div className="px-3 py-2">
            {/* <h2 className="heading-sm text-muted-foreground mb-3">Navigation</h2> */}
            <nav className="space-y-1">
              { navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    onClick={() => {
                      // Close sidebar on mobile when item is clicked
                      if (window.innerWidth < 1024) {
                        toggleSidebar();
                      }
                    }}
                  className={cn(
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium",
                      "transition-all duration-200 interactive-morphism touch-target",
                      item.isActive
                        ? 'morphism-button text-primary shadow-lg scale-105'
                        : 'text-foreground hover:bg-accent/50 hover:text-foreground'
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 mr-3 transition-all duration-200",
                      item.isActive ? "scale-110" : ""
                    )} />
                    <span className="body-md">{item.title}</span>
                  </Link>
                );

              })}
            </nav>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mt-8 space-y-1">
          <div className="px-3 py-2">
            <h2 className="heading-sm text-muted-foreground mb-3">Preferences</h2>
            <nav className="space-y-1">
              { preferencesItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    onClick={() => {
                      // Close sidebar on mobile when item is clicked
                      if (window.innerWidth < 1024) {
                        toggleSidebar();
                      }
                    }}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium",
                      "transition-all duration-200 interactive-morphism touch-target",
                      item.isActive
                        ? 'morphism-button text-primary shadow-lg scale-105'
                        : 'text-foreground transition-colors hover:bg-accent/50 hover:text-foreground'
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 mr-3 transition-all duration-200",
                      item.isActive ? "scale-110" : ""
                    )} />
                    <span className="body-md">{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
