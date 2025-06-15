
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import AppSidebar from "./Sidebar";
import MobileNavigation from "./layout/MobileNavigation";
import { LayoutProps } from "@/types";
import { useUser } from "@/context/UserContext";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";

const Layout: React.FC<LayoutProps> = ({
  children,
  excludeSidebar = false,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const { user } = useUser();
  const { sidebarOpen } = useSidebar();

  const showSidebar = user && !isHomePage && !excludeSidebar;

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-background via-background/95 to-background overflow-hidden">
      <Header />
      
      <div className="flex flex-1 h-full overflow-hidden">
        {/* Desktop Sidebar with Glassmorphism */}
        {showSidebar && (
          <div className={cn(
            "hidden lg:block transition-all duration-300 ease-in-out h-full",
            sidebarOpen ? "w-64" : "w-0"
          )}>
            {sidebarOpen && (
              <div className="stylestack-glass-strong h-full border-r border-glass-border">
                <AppSidebar />
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 h-full overflow-y-auto",
          "p-4 lg:p-6",
          showSidebar && sidebarOpen ? "lg:ml-0" : "",
          // Mobile bottom navigation spacing
          user && !isHomePage ? "pb-20 lg:pb-6" : ""
        )}>
          <div className="animate-fade-in max-w-full h-full">
            {children}
          </div>
        </main>

        {/* Mobile Overlay for Sidebar */}
        {showSidebar && sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <div className="absolute left-0 top-16 bottom-0 w-80 max-w-[85vw]">
              <div className="stylestack-glass-strong h-full">
                <AppSidebar />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation with Glassmorphism */}
      {user && !isHomePage && (
        <div className="stylestack-glass-strong border-t border-glass-border lg:hidden">
          <MobileNavigation />
        </div>
      )}
    </div>
  );
};

export default Layout;
