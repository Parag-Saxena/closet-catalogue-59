
import { BookOpenText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';

const Style = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">My Style</h1>
          <Button asChild>
            <Link to="/add-style">
              <Plus className="h-5 w-5 mr-2" />
              <span>Add Style Guide</span>
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="rounded-full bg-primary/10 p-4 mb-6">
            <BookOpenText className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-xl font-medium text-foreground mb-2">Define your style</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            Create style guides to define your fashion preferences and help you make outfit decisions.
          </p>
          <Button asChild>
            <Link to="/add-style">
              Create Style Guide
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Style;
