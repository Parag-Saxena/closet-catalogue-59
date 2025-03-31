
import { Button } from "@/components/ui/button";
import { Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClothingItem } from "../ClothingCard";
import { cn } from "@/lib/utils";

interface WelcomeHeaderProps {
  userName?: string;
}

const WelcomeHeader = ({ userName = 'there' }: WelcomeHeaderProps) => {
  const [laundryCount, setLaundryCount] = useState(0);
  
  useEffect(() => {
    // Get items that need washing
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]') as ClothingItem[];
    const laundryItems = storedItems.filter(item => item.needsWashing);
    setLaundryCount(laundryItems.length);
  }, []);
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight bg-clip-text bg-gradient-to-r from-pink-500 via-pink-400 to-indigo-500 text-transparent">
          Hello, {userName}! <span className="hidden sm:inline">Ready to style your day?</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your personal closet management dashboard.
          {laundryCount > 0 && (
            <span className={cn(
              "text-pink-500 dark:text-pink-400 ml-1 font-medium",
              "transition-all duration-300 hover:text-pink-400"
            )}>
              You have {laundryCount} item{laundryCount !== 1 ? 's' : ''} that need washing.
            </span>
          )}
        </p>
      </div>
      
      <div className="flex gap-2 items-center animate-slide-in">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search closet..."
            className="h-10 w-full min-w-[200px] rounded-full border border-input bg-background pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 transition-all duration-300 focus:shadow-sm"
          />
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          radius="full" 
          asChild 
          className="transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-pink-300"
        >
          <Link to="/settings">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default WelcomeHeader;
