
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Sparkles, Shirt, BookHeart, PenLine, LayoutDashboard, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="backdrop-blur-sm bg-white/5 dark:bg-black/10 border border-border rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3 className="text-xl font-semibold mb-2 gradient-text">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Home = () => {
  const { toast } = useToast();
  const { user } = useApp();
  
  const features = [
    {
      icon: Shirt,
      title: "Digital Wardrobe",
      description: "Save all your clothing items in one place with photos, descriptions, and categories."
    },
    {
      icon: BookHeart,
      title: "Outfit Creation",
      description: "Create and save outfit combinations for easy access when deciding what to wear."
    },
    {
      icon: PenLine,
      title: "Style Guide",
      description: "Create personal style guidelines to help maintain a cohesive wardrobe."
    },
    {
      icon: LayoutDashboard,
      title: "Visual Dashboard",
      description: "Get insights about your wardrobe with visual analytics and statistics."
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Your data is securely stored and accessible only to you."
    },
    {
      icon: Sparkles,
      title: "Outfit Suggestions",
      description: "Get AI-powered outfit suggestions based on your wardrobe items."
    }
  ];

  const showToastSamples = () => {
    toast({
      title: "Default Toast",
      description: "This is a default toast message",
    });
    
    setTimeout(() => {
      toast({
        title: "Success Toast",
        description: "This is a success toast message",
        variant: "success",
      });
    }, 1000);
    
    setTimeout(() => {
      toast({
        title: "Info Toast",
        description: "This is an info toast message",
        variant: "info",
      });
    }, 2000);
    
    setTimeout(() => {
      toast({
        title: "Warning Toast",
        description: "This is a warning toast message",
        variant: "warning",
      });
    }, 3000);
    
    setTimeout(() => {
      toast({
        title: "Destructive Toast",
        description: "This is a destructive toast message",
        variant: "destructive",
      });
    }, 4000);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text leading-tight">
              Organize Your Wardrobe, <br/> Elevate Your Style
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Closet Keeper helps you catalog your clothing, create outfits, and maintain your personal style with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Button asChild size="lg" className="rounded-full px-8 gradient-bg text-white">
                  <Link to="/wardrobe">
                    Go to My Wardrobe <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="rounded-full px-8 gradient-bg text-white">
                  <Link to="/sign-up">
                    Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="lg" className="rounded-full px-8" onClick={showToastSamples}>
                Try Toast Samples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Key Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to organize your wardrobe and elevate your style.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting started with Closet Keeper is simple and straightforward.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Create Your Account",
                  description: "Sign up for a free account to get started with Closet Keeper."
                },
                {
                  step: "2",
                  title: "Add Your Clothing Items",
                  description: "Take photos of your clothes and add them to your digital wardrobe."
                },
                {
                  step: "3",
                  title: "Create Outfits",
                  description: "Combine items to create outfits for different occasions."
                },
                {
                  step: "4",
                  title: "Develop Your Style",
                  description: "Create style guides to help maintain a cohesive wardrobe."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shrink-0 text-white font-semibold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              {user ? (
                <Button asChild size="lg" className="rounded-full px-8 gradient-bg text-white">
                  <Link to="/">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="rounded-full px-8 gradient-bg text-white">
                  <Link to="/sign-in">
                    Sign In Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from people who use Closet Keeper to organize their wardrobes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Alex Johnson",
                role: "Fashion Enthusiast",
                quote: "Closet Keeper has completely transformed how I organize my wardrobe. I can easily plan outfits and keep track of all my clothing items."
              },
              {
                name: "Taylor Smith",
                role: "Minimalist",
                quote: "As someone who values a capsule wardrobe, this app helps me see what I actually wear and what I can donate. The analytics are incredibly useful."
              },
              {
                name: "Jordan Williams",
                role: "Professional Stylist",
                quote: "I use Closet Keeper with my clients to help them visualize their wardrobes and create cohesive outfits. It's an essential tool for my business."
              },
              {
                name: "Casey Martinez",
                role: "Busy Parent",
                quote: "Morning routines are so much easier now that I can quickly find outfit combinations that work. Saved me so much time and stress!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="backdrop-blur-sm bg-white/5 dark:bg-black/10 border border-border rounded-xl p-6 shadow-md">
                <div className="flex items-start mb-4">
                  <div className="mr-2 text-pink-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="italic text-muted-foreground">{testimonial.quote}</p>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Ready to Organize Your Wardrobe?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have transformed their wardrobes with Closet Keeper.
            </p>
            {user ? (
              <Button asChild size="lg" className="rounded-full px-8 gradient-bg text-white">
                <Link to="/">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="rounded-full px-8 gradient-bg text-white">
                <Link to="/sign-up">
                  Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
