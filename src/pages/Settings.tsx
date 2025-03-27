
import { useState } from 'react';
import Layout from '../components/Layout';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-closet-gray-dark">Settings</h1>
        
        <div className="bg-card rounded-lg border border-border p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-closet-gray-dark mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-closet-gray-dark">Dark Mode</h3>
                <p className="text-sm text-closet-gray-medium">Toggle dark mode on or off</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-closet-blue"></div>
              </label>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-closet-gray-dark mb-4">Notifications</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-closet-gray-dark">Enable Notifications</h3>
                <p className="text-sm text-closet-gray-medium">Receive updates and reminders</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-closet-blue"></div>
              </label>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-closet-gray-dark mb-4">Data Management</h2>
            <button className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground shadow-sm transition-all duration-200 hover:bg-destructive/90 active:scale-95">
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
