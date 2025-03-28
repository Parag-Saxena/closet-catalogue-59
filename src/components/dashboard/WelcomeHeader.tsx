
import { Button } from "@/components/ui/button";
import { Search, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { ClothingItem } from "../ClothingCard";

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Hello, {userName}! <span className="hidden sm:inline">Ready to style your day?</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your personal closet management dashboard.
          {laundryCount > 0 && (
            <span className="text-amber-600 dark:text-amber-400 ml-1">
              You have {laundryCount} item{laundryCount !== 1 ? 's' : ''} that need washing.
            </span>
          )}
        </p>
      </div>
      
      <div className="flex gap-2 items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search closet..."
            className="h-10 w-full min-w-[200px] rounded-full border border-input bg-background pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        
        <Button variant="outline" size="icon" asChild>
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
