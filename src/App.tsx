
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import AddItem from "./pages/AddItem";
import NotFound from "./pages/NotFound";
import Wardrobe from "./pages/Wardrobe";
import Categories from "./pages/Categories";
import Outfits from "./pages/Outfits";
import Style from "./pages/Style";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import AddOutfit from "./pages/AddOutfit";
import AddStyleGuide from "./pages/AddStyleGuide";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import AccountActivation from "./pages/AccountActivation";
import Measurements from "./pages/Measurements";
import ShoppingSchedule from "./pages/ShoppingSchedule";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="closet-keeper-theme">
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Landing page shows different content based on auth state */}
              <Route path="/" element={<Index />} />
              
              {/* Protected routes */}
              <Route path="/add" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
              <Route path="/wardrobe" element={<ProtectedRoute><Wardrobe /></ProtectedRoute>} />
              <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
              <Route path="/outfits" element={<ProtectedRoute><Outfits /></ProtectedRoute>} />
              <Route path="/add-outfit" element={<ProtectedRoute><AddOutfit /></ProtectedRoute>} />
              <Route path="/style" element={<ProtectedRoute><Style /></ProtectedRoute>} />
              <Route path="/add-style" element={<ProtectedRoute><AddStyleGuide /></ProtectedRoute>} />
              <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/reset-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
              <Route path="/activate-account" element={<ProtectedRoute><AccountActivation /></ProtectedRoute>} />
              <Route path="/measurements" element={<ProtectedRoute><Measurements /></ProtectedRoute>} />
              <Route path="/shopping-schedule" element={<ProtectedRoute><ShoppingSchedule /></ProtectedRoute>} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
