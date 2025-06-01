import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Loading component
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load routes for better performance
const Index = lazy(() => import("./pages/Index"));
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
const Home = lazy(() => import("./pages/Home"));

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
                {/* Public landing page route */}
                <Route path="/home" element={<Home />} />

                {/* Auth routes */}
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Dashboard home (protected) */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />

                {/* Protected routes */}
                <Route
                  path="/add"
                  element={
                    <ProtectedRoute>
                      <AddItem />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wardrobe"
                  element={
                    <ProtectedRoute>
                      <Wardrobe />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/categories"
                  element={
                    <ProtectedRoute>
                      <Categories />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/outfits"
                  element={
                    <ProtectedRoute>
                      <Outfits />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-outfit"
                  element={
                    <ProtectedRoute>
                      <AddOutfit />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/style"
                  element={
                    <ProtectedRoute>
                      <Style />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reset-password"
                  element={
                    <ProtectedRoute>
                      <ChangePassword />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/activate-account"
                  element={
                    <ProtectedRoute>
                      <AccountActivation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/measurements"
                  element={
                    <ProtectedRoute>
                      <Measurements />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shopping-schedule"
                  element={
                    <ProtectedRoute>
                      <ShoppingSchedule />
                    </ProtectedRoute>
                  }
                />

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
