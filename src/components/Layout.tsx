
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from './Header';
import AppSidebar from './Sidebar';
import { LayoutProps } from '@/types';
import { useApp } from '@/context/AppContext';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAddPage = location.pathname === '/add';
  const isDashboard = location.pathname === '/';
  const { user } = useApp();
  
  // Default sidebar state - should be open on desktop when user is logged in
  const defaultSidebarOpen = user !== null && !window.matchMedia("(max-width: 768px)").matches;
  
  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      <div className="flex flex-col min-h-screen w-full bg-background">
        <Header />
        <div className="flex flex-1 w-full pt-16"> {/* Space below the header */}
          <AppSidebar />
          <main className={`flex-1 px-4 py-6 md:px-6 lg:px-8 w-full ${isDashboard ? 'pt-4 pb-12' : isAddPage ? 'pt-4' : 'pt-6'}`}>
            <div className="animate-fade-in max-w-6xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
