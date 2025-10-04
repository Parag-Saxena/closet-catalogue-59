
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt, BookHeart, GridIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Add New Item",
      description: "Add a new clothing item to your wardrobe",
      icon: Shirt,
      color: "text-blue-500",
      link: "/wardrobe/add"
    },
    {
      title: "Curate Outfit",
      description: "Create a new outfit from your wardrobe items",
      icon: BookHeart,
      color: "text-purple-500",
      link: "/outfits"
    },
    {
      title: "Organize Categories",
      description: "Manage and create wardrobe categories",
      icon: GridIcon,
      color: "text-emerald-500",
      link: "/categories"
    },
    {
      title: "Style Recommendations",
      description: "Get personalized style advice",
      icon: Sparkles,
      color: "text-amber-500",
      link: "/styles"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {actions.map((action) => (
            <Card key={action.title} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-3 sm:p-4">
                <div className={`${action.color} mb-2 sm:mb-3`}>
                  <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="font-medium mb-1 text-sm sm:text-base leading-tight">{action.title}</h3>
                <p className="text-xs text-muted-foreground mb-2 sm:mb-3 line-clamp-2">{action.description}</p>
                <Button asChild size="sm" className="w-full h-8 sm:h-9 text-xs sm:text-sm">
                  <Link to={action.link}>Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
