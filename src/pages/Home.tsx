
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shirt, Search, BookOpenText, CreditCard, Shield, MessageSquare } from 'lucide-react';

const Home = () => {
  return (
    <Layout excludeSidebar>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Simplify Your Wardrobe Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Closet Keeper helps you organize your clothes, create outfits, and make smarter fashion choices with ease.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/sign-up">
              <Button size="lg" className="gradient-bg">
                Get Started
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <FeatureCard
              icon={Shirt}
              title="Item Management"
              description="Easily add, edit, and organize all your clothing items in one place."
            />
            <FeatureCard
              icon={Search}
              title="Smart Search"
              description="Quickly find items by color, category, season, or any other attribute."
            />
            <FeatureCard
              icon={BookOpenText}
              title="Outfit Creator"
              description="Mix and match to create perfect outfits for any occasion."
            />
            <FeatureCard
              icon={CreditCard}
              title="Budget Tracking"
              description="Keep track of your clothing expenses and make smarter purchases."
            />
            <FeatureCard
              icon={Shield}
              title="Private & Secure"
              description="Your wardrobe data is encrypted and never shared with third parties."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Style Advice"
              description="Get personalized recommendations based on your wardrobe."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Wardrobe Experience?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90">
            Join thousands of users who have simplified their clothing management with Closet Keeper.
          </p>
          <Link to="/sign-up">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-xl bg-background shadow-md border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 rounded-full">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author }) => (
  <div className="p-6 rounded-xl bg-secondary/20 border border-secondary relative">
    <div className="text-4xl absolute -top-5 left-6 text-primary">"</div>
    <p className="mt-4 mb-4 text-foreground italic">{quote}</p>
    <p className="font-semibold text-right">— {author}</p>
  </div>
);

export default Home;
