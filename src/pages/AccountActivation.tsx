
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

const AccountActivation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      toast({
        title: "Error",
        description: "Invalid activation link. Please request a new one.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call to verify the token
    setTimeout(() => {
      // For demo purposes, we'll just set success to true
      setIsLoading(false);
      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "Your account has been activated.",
      });
    }, 1500);
  }, [searchParams, toast]);

  // Mobile view layout
  if (isMobile) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="space-y-2 mb-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Account Activation</h1>
              <p className="text-muted-foreground">Verifying your account</p>
            </div>
            
            <div className="bg-background shadow-lg rounded-lg p-6 border">
              {isLoading ? (
                <div className="flex flex-col items-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                  <p>Verifying your account...</p>
                </div>
              ) : isSuccess ? (
                <div className="flex flex-col items-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Account Activated!</h2>
                  <p className="text-center text-muted-foreground mb-6">
                    Your account has been successfully activated. You can now sign in.
                  </p>
                  <Button onClick={() => navigate('/sign-in')}>
                    Sign In Now
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center py-8">
                  <AlertCircle className="h-16 w-16 text-destructive mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Activation Failed</h2>
                  <p className="text-center text-muted-foreground mb-6">
                    We couldn't activate your account. The link may be expired or invalid.
                  </p>
                  <Button onClick={() => navigate('/sign-up')}>
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view with split screen layout
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Activation Content */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-4 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Account Activation</h1>
            <p className="text-muted-foreground">
              Verifying your account
            </p>
          </div>

          <div className="bg-background shadow-sm rounded-lg p-6 border">
            {isLoading ? (
              <div className="flex flex-col items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p>Verifying your account...</p>
              </div>
            ) : isSuccess ? (
              <div className="flex flex-col items-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Account Activated!</h2>
                <p className="text-center text-muted-foreground mb-6">
                  Your account has been successfully activated. You can now sign in.
                </p>
                <Button onClick={() => navigate('/sign-in')}>
                  Sign In Now
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center py-8">
                <AlertCircle className="h-16 w-16 text-destructive mb-4" />
                <h2 className="text-xl font-semibold mb-2">Activation Failed</h2>
                <p className="text-center text-muted-foreground mb-6">
                  We couldn't activate your account. The link may be expired or invalid.
                </p>
                <Button onClick={() => navigate('/sign-up')}>
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side - Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-indigo-600/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1484329081568-8d4cf9ea8633?auto=format&fit=crop&q=80"
          alt="Account activation" 
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ boxShadow: "0 0 40px rgba(0,0,0,0.2)" }}
        />
        
        <div className="absolute top-1/4 left-1/4 z-20 max-w-md bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Welcome to the Community</h2>
          <p className="text-white/90 mb-6">
            Thank you for verifying your account. You're now part of our growing community of fashion enthusiasts.
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <p className="text-white/80 text-sm">We're excited to have you with us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountActivation;
