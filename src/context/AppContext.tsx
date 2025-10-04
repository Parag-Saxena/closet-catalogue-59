
import React, { createContext, useContext, ReactNode } from 'react';
import { UserContext, UserProvider } from './UserContext';
import { WardrobeContext, WardrobeProvider } from './WardrobeContext';
import { SidebarProvider } from './SidebarContext';
import { ThemeProvider } from '@/components/theme-provider';
import { ClothingFormProvider } from './ClothingFormContext';


interface AppProviderProps {
  children: ReactNode;
}

// This is now a composition of the other providers
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <WardrobeProvider>
          <SidebarProvider>
            <ClothingFormProvider>
              {children}
            </ClothingFormProvider>
          </SidebarProvider>
        </WardrobeProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

// For backwards compatibility
export const useApp = () => {
  const user = useContext(UserContext);
  const wardrobe = useContext(WardrobeContext);

  if (!user || !wardrobe) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return {
    ...user,
    ...wardrobe
  };
};

