
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shirt, Sparkles, Tag, Clock, Shield, PenTool, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <Layout excludeSidebar>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Organize your wardrobe <span className="text-primary">effortlessly</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Closet Keeper helps you manage your clothes, create outfits, and make smarter fashion choices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/sign-up">
                <Button size="lg" className="bg-primary text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 mb-8 rounded-xl overflow-hidden shadow-xl max-w-5xl mx-auto">
            <img 
              src="/placeholder.svg" 
              alt="Closet Keeper App Interface" 
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shirt}
              title="Item Management"
              description="Easily add, edit, and organize all your clothing items in one place."
            />
            <FeatureCard
              icon={Sparkles}
              title="Style Recommendations"
              description="Get personalized outfit suggestions based on your wardrobe."
            />
            <FeatureCard
              icon={Tag}
              title="Smart Organization"
              description="Categorize your items by type, color, season, and more."
            />
            <FeatureCard
              icon={Clock}
              title="Outfit Planning"
              description="Plan your outfits ahead of time for any occasion."
            />
            <FeatureCard
              icon={Shield}
              title="Private & Secure"
              description="Your wardrobe data is encrypted and never shared with third parties."
            />
            <FeatureCard
              icon={PenTool}
              title="Custom Style Guide"
              description="Create your own style guide to reflect your personal fashion preferences."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Closet Keeper has completely transformed how I manage my wardrobe. I can finally see everything I own!"
              author="Sarah J."
            />
            <TestimonialCard
              quote="The outfit planner is a game-changer. I save so much time in the morning now."
              author="Michael T."
            />
            <TestimonialCard
              quote="I've reduced my impulse shopping significantly since I can see what I already own."
              author="Emma L."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Wardrobe Experience?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90">
            Join thousands of users who have simplified their clothing management with Closet Keeper.
          </p>
          <Link to="/sign-up">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-background text-foreground border-t">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Shirt className="h-6 w-6 mr-2 text-primary" />
              <span className="font-bold text-lg">Closet Keeper</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <a href="#" className="hover:text-primary transition-colors">About</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Closet Keeper. All rights reserved.
          </div>
        </div>
      </footer>
    </Layout>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-xl bg-card shadow-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
    <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 text-primary rounded-full">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author }) => (
  <div className="p-6 rounded-xl bg-card border shadow-sm">
    <div className="text-4xl text-primary opacity-30">"</div>
    <p className="mt-4 mb-4 text-foreground">{quote}</p>
    <p className="font-semibold text-right">— {author}</p>
  </div>
);

export default Home;
