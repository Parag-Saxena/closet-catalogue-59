
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shirt, Search, BookOpenText, CreditCard, Shield, MessageSquare, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <Layout excludeSidebar>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-tiffany_blue-500/20 text-tiffany_blue-600 mb-4">
              Your Personal Wardrobe Assistant
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-thulian_pink-500 via-burnt_sienna-500 to-tiffany_blue-500 text-transparent bg-clip-text">
                Simplify Your Wardrobe Management
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Closet Keeper helps you organize your clothes, create outfits, and make smarter fashion choices with ease.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/sign-up">
                <Button size="lg" className="bg-gradient-to-r from-thulian_pink-500 to-burnt_sienna-500 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button size="lg" variant="outline" className="border-thulian_pink-200 hover:bg-thulian_pink-50">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 mb-8 rounded-2xl overflow-hidden shadow-xl max-w-5xl mx-auto">
            <img 
              src="/placeholder.svg" 
              alt="Closet Keeper App Interface" 
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-champagne_pink-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-thulian_pink-500 to-tiffany_blue-500 text-transparent bg-clip-text">
              Everything You Need
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <FeatureCard
              icon={Shirt}
              title="Item Management"
              description="Easily add, edit, and organize all your clothing items in one place."
              color="thulian_pink"
            />
            <FeatureCard
              icon={Search}
              title="Smart Search"
              description="Quickly find items by color, category, season, or any other attribute."
              color="burnt_sienna"
            />
            <FeatureCard
              icon={BookOpenText}
              title="Outfit Creator"
              description="Mix and match to create perfect outfits for any occasion."
              color="tiffany_blue"
            />
            <FeatureCard
              icon={CreditCard}
              title="Budget Tracking"
              description="Keep track of your clothing expenses and make smarter purchases."
              color="thulian_pink"
            />
            <FeatureCard
              icon={Shield}
              title="Private & Secure"
              description="Your wardrobe data is encrypted and never shared with third parties."
              color="burnt_sienna"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Style Advice"
              description="Get personalized recommendations based on your wardrobe."
              color="tiffany_blue"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-burnt_sienna-500 to-tiffany_blue-500 text-transparent bg-clip-text">
              What Our Users Say
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Closet Keeper has completely transformed how I manage my wardrobe. I can finally see everything I own!"
              author="Sarah J."
              accentColor="thulian_pink"
            />
            <TestimonialCard
              quote="The outfit planner is a game-changer. I save so much time in the morning now."
              author="Michael T."
              accentColor="burnt_sienna"
            />
            <TestimonialCard
              quote="I've reduced my impulse shopping significantly since I can see what I already own."
              author="Emma L."
              accentColor="tiffany_blue"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-thulian_pink-500 to-tiffany_blue-500 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Wardrobe Experience?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90">
            Join thousands of users who have simplified their clothing management with Closet Keeper.
          </p>
          <Link to="/sign-up">
            <Button size="lg" variant="secondary" className="bg-white text-thulian_pink-500 hover:bg-white/90">
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-wenge-100 text-wenge-700">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Shirt className="h-6 w-6 mr-2 text-thulian_pink-500" />
              <span className="font-bold text-lg">Closet Keeper</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-thulian_pink-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-thulian_pink-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-thulian_pink-500 transition-colors">Contact</a>
              <a href="#" className="hover:text-thulian_pink-500 transition-colors">About</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-wenge-200 text-center text-sm text-wenge-500">
            &copy; {new Date().getFullYear()} Closet Keeper. All rights reserved.
          </div>
        </div>
      </footer>
    </Layout>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="p-6 rounded-xl bg-white shadow-md border border-champagne_pink-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className={`inline-flex items-center justify-center p-3 mb-4 bg-${color}-100 text-${color}-600 rounded-full`}>
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author, accentColor }) => (
  <div className={`p-6 rounded-xl bg-white border border-${accentColor}-100 shadow-md relative`}>
    <div className={`text-4xl absolute -top-5 left-6 text-${accentColor}-500`}>"</div>
    <p className="mt-4 mb-4 text-foreground italic">{quote}</p>
    <p className={`font-semibold text-right text-${accentColor}-600`}>— {author}</p>
  </div>
);

export default Home;
