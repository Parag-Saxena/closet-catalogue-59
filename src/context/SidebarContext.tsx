
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  // Initialize state from localStorage but then manage in context
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    // We need to check if window exists for SSR compatibility
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarState');
      return savedState ? JSON.parse(savedState) : true;
    }
    return true;
  });

  // Persist sidebar state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarState', JSON.stringify(sidebarOpen));
    }
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
