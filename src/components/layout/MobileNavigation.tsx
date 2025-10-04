
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Shirt,
  BookHeart,
  Settings,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNavigation = () => {
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Wardrobe",
      url: "/wardrobe",
      icon: Shirt,
    },
    {
      title: "Add",
      url: "/wardrobe/add",
      icon: Plus,
    },
    {
      title: "Outfits",
      url: "/outfits",
      icon: BookHeart,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    }
  ];

  return (
    <nav className="mobile-nav">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.url || location.pathname.startsWith(item.url + '/');

          return (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                "flex flex-col items-center justify-center touch-target",
                "px-2 py-1 rounded-xl transition-all duration-200",
                "text-xs font-medium",
                isActive
                  ? "text-primary bg-primary/10 scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 mb-1 transition-all duration-200",
                  isActive ? "scale-110" : ""
                )}
              />
              <span className={cn(
                "transition-all duration-200",
                isActive ? "font-semibold" : ""
              )}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
