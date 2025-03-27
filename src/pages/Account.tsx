
import Layout from '../components/Layout';
import { User } from 'lucide-react';

const Account = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-closet-gray-dark">Account</h1>
        
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-closet-blue/10 flex items-center justify-center">
              <User className="h-8 w-8 text-closet-blue" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-closet-gray-dark">Guest User</h2>
              <p className="text-closet-gray-medium">Using local storage to save your data</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-closet-gray-medium">
              Currently, Closet Keeper saves your data locally in your browser. To sync your data across devices or back it up, consider creating an account.
            </p>
            
            <button className="inline-flex h-10 items-center justify-center rounded-md bg-closet-blue px-4 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 active:scale-95">
              Sign Up (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
