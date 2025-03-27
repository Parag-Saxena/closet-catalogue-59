
import { Button } from "@/components/ui/button";
import { Search, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface WelcomeHeaderProps {
  userName?: string;
}

const WelcomeHeader = ({ userName = 'there' }: WelcomeHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Hello, {userName}! <span className="hidden sm:inline">Ready to style your day?</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your personal closet management dashboard.
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
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
              <span className="sr-only">Profile</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Guest User</p>
                  <p className="text-xs text-muted-foreground">Using local storage</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Button asChild variant="ghost" size="sm" className="justify-start">
                  <Link to="/account">Account</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="justify-start">
                  <Link to="/settings">Settings</Link>
                </Button>
                <Button variant="ghost" size="sm" className="justify-start text-destructive hover:text-destructive">
                  Logout
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default WelcomeHeader;
