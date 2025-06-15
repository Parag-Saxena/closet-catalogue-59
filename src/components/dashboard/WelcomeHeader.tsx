
import { Button } from "@/components/ui/button";
import { Search, Settings, Sparkles, Heart } from "lucide-react";
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
  const [favoriteCount, setFavoriteCount] = useState(0);
  const { user } = useUser();
  
  const displayName = userName || (user ? user.name : 'there');
  
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]') as ClothingItem[];
    const laundryItems = storedItems.filter(item => item.needsWashing);
    const favoriteItems = storedItems.filter(item => item.isFavorite);
    setLaundryCount(laundryItems.length);
    setFavoriteCount(favoriteItems.length);
  }, []);
  
  return (
    <div className="space-stylestack">
      {/* Welcome Section */}
      <div className="stylestack-glass-strong padding-stylestack">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 stylestack-glass rounded-xl flex items-center justify-center animate-stylestack-glow">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="stylestack-heading-lg bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Welcome to StyleStack
                </h1>
                <p className="stylestack-caption">
                  Hello, {displayName}! Your personal wardrobe awaits.
                </p>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="flex flex-wrap gap-3">
              {laundryCount > 0 && (
                <div className="stylestack-glass-subtle px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  <span className="stylestack-caption font-medium">
                    {laundryCount} item{laundryCount !== 1 ? 's' : ''} need washing
                  </span>
                </div>
              )}
              {favoriteCount > 0 && (
                <div className="stylestack-glass-subtle px-4 py-2 rounded-full flex items-center gap-2">
                  <Heart className="w-3 h-3 text-primary fill-current" />
                  <span className="stylestack-caption font-medium">
                    {favoriteCount} favorite{favoriteCount !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 min-w-fit">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search your wardrobe..."
                className={cn(
                  "stylestack-glass-subtle h-12 w-full sm:w-72",
                  "pl-12 pr-4 stylestack-body border-0",
                  "focus:ring-2 focus:ring-primary/50 transition-all duration-300",
                  "placeholder:text-muted-foreground"
                )}
              />
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              asChild 
              className="stylestack-glass h-12 w-12 border-0"
            >
              <Link to="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Bento Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stylestack-glass text-center padding-stylestack animate-stylestack-float" style={{ animationDelay: '0s' }}>
          <div className="stylestack-heading-md text-primary">0</div>
          <div className="stylestack-caption">Added Today</div>
        </div>
        <div className="stylestack-glass text-center padding-stylestack animate-stylestack-float" style={{ animationDelay: '0.2s' }}>
          <div className="stylestack-heading-md text-accent">0</div>
          <div className="stylestack-caption">Outfits Created</div>
        </div>
        <div className="stylestack-glass text-center padding-stylestack animate-stylestack-float" style={{ animationDelay: '0.4s' }}>
          <div className="stylestack-heading-md text-emerald-500">0</div>
          <div className="stylestack-caption">Style Points</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
