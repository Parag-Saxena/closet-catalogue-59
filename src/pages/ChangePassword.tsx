
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const formSchema = z.object({
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
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
      setIsTokenValid(false);
      toast({
        title: "Error",
        description: "Invalid or expired reset link. Please request a new one.",
        variant: "destructive",
      });
      return;
    }

    // Simulate token validation
    // In a real app, you would verify this token with your backend
    console.log('Reset token:', token);
  }, [searchParams, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Update password requirement checks in real-time
  useEffect(() => {
    const password = form.watch("password");
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    });
  }, [form.watch("password")]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      console.log('Password reset for:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      setShowSuccessDialog(true);
      toast({
        title: "Success!",
        description: "Your password has been reset successfully.",
      });
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordRequirementItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center space-x-2">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${met ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'}`}>
        {met ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
      </div>
      <span className={`text-sm ${met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
        {text}
      </span>
    </div>
  );

  // Mobile view layout
  if (isMobile) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="space-y-2 mb-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Reset Password</h1>
              <p className="text-muted-foreground">Create a new password for your account</p>
            </div>
            
            {!isTokenValid ? (
              <div className="bg-background shadow-lg rounded-lg p-6 border">
                <div className="flex flex-col items-center py-8">
                  <AlertCircle className="h-16 w-16 text-destructive mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Invalid Link</h2>
                  <p className="text-center text-muted-foreground mb-6">
                    This password reset link is invalid or has expired. Please request a new one.
                  </p>
                  <Button onClick={() => navigate('/forgot-password')}>
                    Request New Link
                  </Button>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>New Password</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                          <button 
                            type="button"
                            className="absolute right-3 top-2.5 text-muted-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2 bg-background/50 p-3 rounded-md border">
                    <p className="text-sm font-medium text-left">Password must have:</p>
                    <div className="grid grid-cols-1 gap-2 text-left">
                      <PasswordRequirementItem met={passwordRequirements.length} text="At least 8 characters" />
                      <PasswordRequirementItem met={passwordRequirements.uppercase} text="At least one uppercase letter" />
                      <PasswordRequirementItem met={passwordRequirements.lowercase} text="At least one lowercase letter" />
                      <PasswordRequirementItem met={passwordRequirements.number} text="At least one number" />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Confirm Password</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                          <button 
                            type="button"
                            className="absolute right-3 top-2.5 text-muted-foreground"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" aria-hidden="true"></span>
                        Updating Password...
                      </div>
                    ) : "Reset Password"}
                  </Button>
                </form>
              </Form>
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/sign-in" className="text-primary hover:text-primary/80 underline-offset-4 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view with split screen layout
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Form Content */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-4 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Reset Password</h1>
            <p className="text-muted-foreground">
              Create a new password for your account
            </p>
          </div>

          {!isTokenValid ? (
            <div className="bg-background shadow-sm rounded-lg p-6 border">
              <div className="flex flex-col items-center py-8">
                <AlertCircle className="h-16 w-16 text-destructive mb-4" />
                <h2 className="text-xl font-semibold mb-2">Invalid Link</h2>
                <p className="text-center text-muted-foreground mb-6">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
                <Button onClick={() => navigate('/forgot-password')}>
                  Request New Link
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>New Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <button 
                          type="button"
                          className="absolute right-3 top-2.5 text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2 bg-background/50 p-3 rounded-md border">
                  <p className="text-sm font-medium text-left">Password must have:</p>
                  <div className="grid grid-cols-2 gap-2 text-left">
                    <PasswordRequirementItem met={passwordRequirements.length} text="At least 8 characters" />
                    <PasswordRequirementItem met={passwordRequirements.uppercase} text="At least one uppercase letter" />
                    <PasswordRequirementItem met={passwordRequirements.lowercase} text="At least one lowercase letter" />
                    <PasswordRequirementItem met={passwordRequirements.number} text="At least one number" />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Confirm Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <button 
                          type="button"
                          className="absolute right-3 top-2.5 text-muted-foreground"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" aria-hidden="true"></span>
                      Updating Password...
                    </div>
                  ) : "Reset Password"}
                </Button>
              </form>
            </Form>
          )}

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link to="/sign-in" className="text-primary hover:text-primary/80 underline-offset-4 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-indigo-600/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80"
          alt="Reset password" 
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ boxShadow: "0 0 40px rgba(0,0,0,0.2)" }}
        />
        
        <div className="absolute top-1/4 left-1/4 z-20 max-w-md bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Create a Strong Password</h2>
          <p className="text-white/90 mb-6">
            A strong password helps protect your personal information and keeps your account secure.
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <p className="text-white/80 text-sm">Your security is our priority</p>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Password Reset Successful</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-full mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <p className="text-center text-muted-foreground mb-6">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
            <Button 
              className="w-full" 
              onClick={() => {
                setShowSuccessDialog(false);
                navigate('/sign-in');
              }}
            >
              Sign In Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
