
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Lock, Eye, EyeOff, Check, X, ArrowRight } from 'lucide-react';
import { saveUser, signInWithGoogle } from '@/services/authService';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from "@/components/ui/sheet";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and privacy policy",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showMobileForm, setShowMobileForm] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  
  const watchPassword = form.watch("password");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
  });
  
  useEffect(() => {
    if (!watchPassword) {
      setPasswordStrength({ score: 0, message: "" });
      return;
    }
    
    let score = 0;
    // Length check
    if (watchPassword.length >= 6) score++;
    if (watchPassword.length >= 8) score++;
    
    // Complexity checks
    if (/[A-Z]/.test(watchPassword)) score++;
    if (/[0-9]/.test(watchPassword)) score++;
    if (/[^A-Za-z0-9]/.test(watchPassword)) score++;
    
    let message = "";
    if (score === 0) message = "Too weak";
    else if (score <= 2) message = "Weak";
    else if (score <= 4) message = "Medium";
    else message = "Strong";
    
    setPasswordStrength({ score, message });
  }, [watchPassword]);
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength.score === 0) return "bg-gray-200";
    if (passwordStrength.score <= 2) return "bg-red-500";
    if (passwordStrength.score <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const handleSignUp = async (values: SignUpFormValues) => {
    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      console.log('Signing up with:', values);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user info
      const user = { name: values.name, email: values.email, username: values.username };
      saveUser(user);
      
      toast({
        title: "Success!",
        description: "Your account has been created.",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    
    try {
      const user = await signInWithGoogle();
      toast({
        title: "Success!",
        description: "Signed up with Google successfully.",
      });
      navigate('/');
    } catch (error) {
      console.error('Google sign up error:', error);
      toast({
        title: "Error",
        description: "Failed to sign up with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const renderForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-5">
        {/* Google Sign In Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignUp}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" aria-hidden="true"></span>
              Connecting to Google...
            </div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="h-5 w-5 mr-2">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </>
          )}
        </Button>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-sm text-muted-foreground">or sign up with email</span>
          </div>
        </div>
        
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Full Name</FormLabel>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input 
                    placeholder="Your full name" 
                    className="pl-10"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Username field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Username</FormLabel>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input 
                    placeholder="your_username" 
                    className="pl-10"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="you@example.com" 
                    className="pl-10"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Password</FormLabel>
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
              
              {/* Password strength indicator */}
              {watchPassword && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`} 
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {passwordStrength.message}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      {watchPassword.length >= 6 ? 
                        <Check className="h-3 w-3 text-green-500" /> : 
                        <X className="h-3 w-3 text-red-500" />
                      }
                      <span>At least 6 characters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {/[A-Z]/.test(watchPassword) ? 
                        <Check className="h-3 w-3 text-green-500" /> : 
                        <X className="h-3 w-3 text-red-500" />
                      }
                      <span>Uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {/[0-9]/.test(watchPassword) ? 
                        <Check className="h-3 w-3 text-green-500" /> : 
                        <X className="h-3 w-3 text-red-500" />
                      }
                      <span>Number</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {/[^A-Za-z0-9]/.test(watchPassword) ? 
                        <Check className="h-3 w-3 text-green-500" /> : 
                        <X className="h-3 w-3 text-red-500" />
                      }
                      <span>Special character</span>
                    </div>
                  </div>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Confirm Password field */}
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
        
        {/* Terms and Privacy Policy */}
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-medium leading-none">
                  I accept the <Link to="#" className="text-primary hover:text-primary/80 underline-offset-4 hover:underline dark:text-blue-400 dark:hover:text-blue-300">Terms of Service</Link> and <Link to="#" className="text-primary hover:text-primary/80 underline-offset-4 hover:underline dark:text-blue-400 dark:hover:text-blue-300">Privacy Policy</Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        {/* Submit button */}
        <Button 
          type="submit" 
          className="w-full mt-6"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" aria-hidden="true"></span>
              Creating account...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Create Account <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </Button>
      </form>
    </Form>
  );

  // Mobile view uses a sheet component
  if (isMobile) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative">
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome to Closet Keeper</h1>
              <p className="text-muted-foreground">Your virtual wardrobe organizer</p>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80" 
                alt="Closet inspiration" 
                className="w-full h-52 object-cover"
              />
            </div>
            
            <Button
              className="w-full py-6 text-lg"
              onClick={() => setShowMobileForm(true)}
            >
              Create an Account
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-primary hover:text-primary/80 underline-offset-4 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                Sign in
              </Link>
            </div>
          </div>
        </div>
        
        <Sheet open={showMobileForm} onOpenChange={setShowMobileForm}>
          <SheetContent side="bottom" className="h-[90%] p-6 rounded-t-[20px]">
            <div className="mx-auto w-12 h-1.5 bg-muted rounded-full mb-6" />
            <div className="space-y-4 overflow-y-auto max-h-[90%] pb-10">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Create your account</h2>
                <p className="text-sm text-muted-foreground">Join Closet Keeper to organize your wardrobe</p>
              </div>
              {renderForm()}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  // Desktop view with split screen layout
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Form area */}
      <div className="w-full lg:w-1/2 xl:w-5/12 flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto p-8">
            <div className="space-y-4 mb-6 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Join Closet Keeper</h1>
              <p className="text-muted-foreground">Create an account to start organizing your wardrobe</p>
            </div>
            
            {renderForm()}
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-primary hover:text-primary/80 underline-offset-4 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Image area with improved styling */}
      <div className="hidden lg:block lg:w-1/2 xl:w-7/12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-indigo-600/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80"
          alt="Wardrobe inspiration" 
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ boxShadow: "0 0 40px rgba(0,0,0,0.2)" }}
        />
        
        <div className="absolute top-1/4 left-1/4 z-20 max-w-md bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Organize Your Style</h2>
          <p className="text-white/90 mb-6">
            Keep track of your entire wardrobe, create stunning outfits, and never worry about what to wear again.
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <p className="text-white/80 text-sm">Join thousands of fashion enthusiasts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
