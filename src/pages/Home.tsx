import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Shirt, BookHeart, Star } from 'lucide-react';

const Home = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true });

  const features = [
    {
      icon: Shirt,
      title: "Smart Wardrobe Management",
      description: "Organize and track your clothing items with ease"
    },
    {
      icon: BookHeart,
      title: "Outfit Planning",
      description: "Create and save your favorite outfit combinations"
    },
    {
      icon: Star,
      title: "Style Recommendations",
      description: "Get personalized style suggestions based on your preferences"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className={`relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-32 pb-24 ${
          heroInView ? 'animate-fadeIn' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Your Smart Wardrobe Assistant
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Organize your closet, plan outfits, and elevate your style game
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg" asChild>
                <Link to="/sign-up">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Features Section */}
      <div 
        ref={featuresRef}
        className={`py-24 bg-gradient-to-b from-background to-primary/5 ${
          featuresInView ? 'animate-fadeIn' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Everything you need to manage your wardrobe
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="relative group p-6 bg-card rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        ref={ctaRef}
        className={`py-24 bg-primary text-primary-foreground ${
          ctaInView ? 'animate-fadeIn' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your wardrobe?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of users who have simplified their clothing management
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-lg bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link to="/sign-up">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Shirt className="h-6 w-6 mr-2 text-primary" />
              <span className="font-bold text-lg">Closet Keeper</span>
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Closet Keeper. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;