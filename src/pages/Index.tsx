
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import WardrobeSummary from '../components/dashboard/WardrobeSummary';
import RecentActivity from '../components/dashboard/RecentActivity';
import SuggestedOutfits from '../components/dashboard/SuggestedOutfits';
import WardrobeAnalytics from '../components/dashboard/WardrobeAnalytics';
import QuickActions from '../components/dashboard/QuickActions';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { ClothingItem, User } from '@/types';
import { getCurrentUser } from '@/services/authService';

const Index = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // In a real app, we would fetch from an API
    // For this demo, we'll use localStorage
    const storedItems = JSON.parse(localStorage.getItem('closetItems') || '[]');
    setItems(storedItems);
    
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    
    setIsLoading(false);
  }, []);

  // Get unique categories from items
  const categories = [...new Set(items.map(item => item.category))];
  
  // Mock data for demo purposes
  const recentOutfits = [
    {
      id: '1',
      name: 'Casual Friday',
      date: 'Jun 10, 2023',
      items: ['Blue Jeans', 'White T-shirt', 'Sneakers'],
    },
    {
      id: '2',
      name: 'Business Meeting',
      date: 'Jun 8, 2023',
      items: ['Black Suit', 'White Shirt', 'Dress Shoes'],
    },
    {
      id: '3',
      name: 'Weekend Brunch',
      date: 'Jun 5, 2023',
      items: ['Floral Dress', 'Sandals', 'Sun Hat'],
    }
  ];

  const suggestedOutfits = [
    {
      id: '1',
      name: 'Summer Casual',
      description: 'Perfect for a warm day out in the city.',
      image: '',
    },
    {
      id: '2',
      name: 'Office Chic',
      description: 'Professional yet stylish for work meetings.',
      image: '',
    },
    {
      id: '3',
      name: 'Night Out',
      description: 'Stand out during your evening plans.',
      image: '',
    }
  ];

  const categoryData = [
    { name: 'Casual', value: 45, color: '#0EA5E9' },
    { name: 'Formal', value: 20, color: '#8B5CF6' },
    { name: 'Athletic', value: 15, color: '#10B981' },
    { name: 'Outerwear', value: 10, color: '#F59E0B' },
    { name: 'Accessories', value: 10, color: '#EC4899' },
  ];

  // Calculate dashboard metrics
  const dashboardMetrics = {
    totalItems: items.length,
    categories: categories.length,
    outfits: recentOutfits.length, // In a real app, this would be actual outfits count
    favorites: items.filter(item => item.isFavorite).length
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome to Closet Keeper</h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Sign in to your account to manage your wardrobe, create outfits, and get style recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild>
              <Link to="/sign-in">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/sign-up">
                Create Account
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <WelcomeHeader userName={user.name || "Guest"} />
        
        <WardrobeSummary 
          totalItems={dashboardMetrics.totalItems} 
          categories={dashboardMetrics.categories}
          outfits={dashboardMetrics.outfits}
          favorites={dashboardMetrics.favorites}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity recentOutfits={items.length > 0 ? recentOutfits : []} />
          <SuggestedOutfits suggestions={items.length > 0 ? suggestedOutfits : []} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WardrobeAnalytics categoryData={items.length > 0 ? categoryData : []} />
          <QuickActions />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
