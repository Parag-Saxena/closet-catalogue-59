
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();
  const { logout } = useApp();
  const navigate = useNavigate();
  
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
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/sign-in');
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg font-medium text-foreground">Appearance</CardTitle>
              </CardHeader>
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
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg font-medium text-foreground">Notifications</CardTitle>
              </CardHeader>
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
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg font-medium text-foreground">Account</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
            
            <div>
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg font-medium text-foreground">Data Management</CardTitle>
              </CardHeader>
              <Button 
                variant="destructive" 
                onClick={handleClearData}
              >
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
