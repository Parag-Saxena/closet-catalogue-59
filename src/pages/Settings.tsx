
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();
  
  const handleClearData = () => {
    // Clear all local storage data except theme
    const currentTheme = localStorage.getItem('closet-keeper-theme');
    localStorage.clear();
    if (currentTheme) {
      localStorage.setItem('closet-keeper-theme', currentTheme);
    }
    
    toast({
      title: "Data cleared",
      description: "All your data has been cleared successfully.",
    });
  };
  
  const handleDarkModeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        
        <div className="bg-card rounded-lg border border-border p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">Toggle dark mode on or off</p>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={handleDarkModeChange}
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-foreground mb-4">Notifications</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Enable Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive updates and reminders</p>
              </div>
              <Switch 
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-foreground mb-4">Data Management</h2>
            <Button 
              variant="destructive" 
              onClick={handleClearData}
              className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-destructive/90 active:scale-95"
            >
              Clear All Data
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
