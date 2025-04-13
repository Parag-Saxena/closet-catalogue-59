
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useApp();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Show toast only when user is redirected due to lack of authentication
    if (!loading && !user && !location.pathname.includes('sign-in')) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page.",
        variant: "destructive"
      });
    }
  }, [user, loading, location.pathname, toast]);

  // While checking auth status, return loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
