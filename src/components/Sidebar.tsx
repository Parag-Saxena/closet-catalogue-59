
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
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
import { useEffect } from 'react';

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive: boolean;
}

const AppSidebar = () => {
  const location = useLocation();
  const { user } = useApp();
  const { setOpen } = useSidebar();
  
  // Sync sidebar state with localStorage on component mount and updates
  useEffect(() => {
    if (user) {
      const sidebarState = localStorage.getItem('sidebar-state');
      if (sidebarState === 'open') {
        setOpen(true);
      }
    }
  }, [user, setOpen]);
  
  // If no user is logged in, don't render the sidebar
  if (!user) {
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
    <Sidebar className="z-40 mt-16 transition-all duration-300">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                    <Link to={item.url} className="transition-all duration-300 hover:translate-x-1">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Preferences</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {preferencesItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                    <Link to={item.url} className="transition-all duration-300 hover:translate-x-1">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
