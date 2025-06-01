import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Loading component
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load routes for better performance
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddItem = lazy(() => import("./pages/AddItem"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Wardrobe = lazy(() => import("./pages/Wardrobe"));
const Categories = lazy(() => import("./pages/Categories"));
const Outfits = lazy(() => import("./pages/Outfits"));
const Style = lazy(() => import("./pages/Style"));
const Account = lazy(() => import("./pages/Account"));
const Settings = lazy(() => import("./pages/Settings"));
const AddOutfit = lazy(() => import("./pages/AddOutfit"));
const AddStyleGuide = lazy(() => import("./pages/AddStyleGuide"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const AccountActivation = lazy(() => import("./pages/AccountActivation"));
const Measurements = lazy(() => import("./pages/Measurements"));
const ShoppingSchedule = lazy(() => import("./pages/ShoppingSchedule"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-full max-w-md p-8 space-y-4">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <Skeleton className="h-64 w-full rounded-md" />
      <div className="flex justify-end space-x-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="closet-keeper-theme">
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Public routes */}
                <Route path="/home" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ChangePassword />} />
                <Route path="/activate-account" element={<AccountActivation />} />

                {/* Dashboard routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                  <Route index element={<Navigate to="/dashboard/wardrobe" replace />} />
                  <Route path="wardrobe" element={<Wardrobe />} />
                  <Route path="add" element={<AddItem />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="outfits" element={<Outfits />} />
                  <Route path="add-outfit" element={<AddOutfit />} />
                  <Route path="style" element={<Style />} />
                  <Route path="measurements" element={<Measurements />} />
                  <Route path="shopping-schedule" element={<ShoppingSchedule />} />
                  <Route path="account" element={<Account />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* Root redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;