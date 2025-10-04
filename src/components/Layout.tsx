
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
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      <Header />

      {/* Main container with proper top spacing for fixed header */}
      <div className="flex flex-1 h-full overflow-hidden pt-16">
        {/* Desktop Sidebar with Glassmorphism */}
        {showSidebar && (
          <div className={cn(
            "hidden lg:block transition-all duration-300 ease-in-out h-full",
            sidebarOpen ? "w-64" : "w-0"
          )}>
            {sidebarOpen && (
              <div className="morphism-sidebar h-full border-r border-glass-border">
                <AppSidebar />
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-y-auto",
          "p-4 lg:p-6",
          showSidebar && sidebarOpen ? "lg:ml-0" : "",
          // Mobile bottom navigation spacing - extra space at bottom
          user && !isHomePage ? "pb-24 lg:pb-12" : "pb-8"
        )}>
          <div className="animate-fade-in max-w-full min-h-full">
            {children}
          </div>
        </main>

        {/* Mobile Overlay for Sidebar */}
        {showSidebar && sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => useSidebar().toggleSidebar()} />
            <div className="absolute left-0 top-16 bottom-0 w-full max-w-sm">
              <div className="morphism-sidebar h-full overflow-hidden">
                <div className="h-full overflow-y-auto">
                  <AppSidebar />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation with Glassmorphism */}
      {user && !isHomePage && (
        <div className="fixed bottom-0 left-0 right-0 morphism-sidebar border-t border-glass-border lg:hidden">
          <MobileNavigation />
        </div>
      )}
    </div>
  );
};

export default Layout;
