
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Shirt, User, Mail, Lock, Eye, EyeOff, Check, X, AlertCircle, ArrowRight } from 'lucide-react';
import { saveUser, signInWithGoogle } from '@/services/authService';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
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
  
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
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
      const user = { name: values.name, email: values.email };
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

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Shirt className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg text-foreground">Closet Keeper</span>
        </Link>
      </div>
      
      {/* Main content */}
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-8 md:gap-8 md:px-6 lg:py-12">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your information to create a Closet Keeper account
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-5">
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
                      I accept the <Link to="#" className="text-primary underline">Terms of Service</Link> and <Link to="#" className="text-primary underline">Privacy Policy</Link>
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
            
            {/* Divider with "or" */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>
            
            {/* Google signup button */}
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
          </form>
        </Form>
        
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
