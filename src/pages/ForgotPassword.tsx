
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      console.log('Password reset requested for:', data.email);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsEmailSent(true);
      toast({
        title: "Email Sent!",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: "Failed to send password reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mobile view layout
  if (isMobile) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="space-y-2 mb-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Forgot Password</h1>
              <p className="text-muted-foreground">
                {!isEmailSent
                  ? "Enter your email to receive password reset instructions"
                  : "Check your email for the reset link"}
              </p>
            </div>

            {!isEmailSent ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                              placeholder="your.email@example.com"
                              className="pl-10"
                              type="email"
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
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
                        Sending...
                      </div>
                    ) : (
                      <>
                        Reset Password <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="bg-background shadow-lg rounded-lg p-6 border">
                <div className="flex flex-col items-center py-4">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-full mb-4">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
                  <p className="text-center text-muted-foreground mb-6">
                    We've sent password reset instructions to your email address. Please check your inbox.
                  </p>
                  <div className="space-y-2 w-full">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsEmailSent(false)}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Try Different Email
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => navigate('/sign-in')}
                    >
                      Return to Sign In
                    </Button>
                  </div>
                </div>
              </div>
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
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-background">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-4 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Forgot Password</h1>
            <p className="text-muted-foreground">
              {!isEmailSent
                ? "Enter your email to receive password reset instructions"
                : "Check your email for the reset link"}
            </p>
          </div>

          {!isEmailSent ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                            placeholder="your.email@example.com"
                            className="pl-10"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
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
                      Sending...
                    </div>
                  ) : (
                    <>
                      Reset Password <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="bg-background shadow-sm rounded-lg p-6 border">
              <div className="flex flex-col items-center py-6">
                <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-full mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
                <p className="text-center text-muted-foreground mb-6">
                  We've sent password reset instructions to your email address. Please check your inbox.
                </p>
                <div className="space-y-2 w-full">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsEmailSent(false)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Try Different Email
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => navigate('/sign-in')}
                  >
                    Return to Sign In
                  </Button>
                </div>
              </div>
            </div>
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
          src="/banner.png"
          alt="Forgot password"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ boxShadow: "0 0 40px rgba(0,0,0,0.2)" }}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
