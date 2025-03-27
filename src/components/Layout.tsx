
import React from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAddPage = location.pathname === '/add';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className={`flex-1 px-4 py-6 md:px-6 lg:px-8 max-w-5xl mx-auto w-full ${isAddPage ? 'pt-4' : 'pt-6'}`}>
        <div className="animate-fade-in w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
