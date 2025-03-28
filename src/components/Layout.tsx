
import React from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAddPage = location.pathname === '/add';
  const isDashboard = location.pathname === '/';

  return (
    <SidebarProvider defaultOpen={!window.matchMedia("(max-width: 768px)").matches}>
      <div className="flex flex-col min-h-screen w-full bg-background">
        <Header />
        <div className="flex flex-1 w-full">
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
