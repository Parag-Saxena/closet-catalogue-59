
import { Button } from "@/components/ui/button";
import { Search, Settings, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClothingItem } from "@/types";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";

interface WelcomeHeaderProps {
  userName?: string;
}

const WelcomeHeader = ({ userName }: WelcomeHeaderProps) => {
  const [laundryCount, setLaundryCount] = useState(0);
  const { user } = useUser();
  
  const displayName = userName || (user ? user.name : 'there');
  
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]') as ClothingItem[];
    const laundryItems = storedItems.filter(item => item.needsWashing);
    setLaundryCount(laundryItems.length);
  }, []);
  
  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className="morphism-card p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Hello, {displayName}!
              </h1>
            </div>
            <p className="text-muted-foreground">
              Welcome to your personal closet management dashboard.
            </p>
            {laundryCount > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                  {laundryCount} item{laundryCount !== 1 ? 's' : ''} need washing
                </span>
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search closet..."
                className={cn(
                  "morphism-input h-10 w-full sm:w-64",
                  "pl-10 pr-4 text-sm",
                  "focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                )}
              />
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              asChild 
              className="morphism-button h-10 w-10"
            >
              <Link to="/settings">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="morphism-card p-3 text-center">
          <div className="text-xl font-bold text-primary">0</div>
          <div className="text-xs text-muted-foreground">Added Today</div>
        </div>
        <div className="morphism-card p-3 text-center">
          <div className="text-xl font-bold text-accent">0</div>
          <div className="text-xs text-muted-foreground">Outfits Created</div>
        </div>
        <div className="morphism-card p-3 text-center">
          <div className="text-xl font-bold text-green-500">0</div>
          <div className="text-xs text-muted-foreground">Style Points</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
