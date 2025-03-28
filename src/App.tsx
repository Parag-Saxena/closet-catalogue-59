
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
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

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="closet-keeper-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/outfits" element={<Outfits />} />
            <Route path="/add-outfit" element={<AddOutfit />} />
            <Route path="/style" element={<Style />} />
            <Route path="/add-style" element={<AddStyleGuide />} />
            <Route path="/account" element={<Account />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
