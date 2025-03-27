
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
      link: "/add"
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
      link: "/style"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Card key={action.title} className="overflow-hidden border-none shadow-sm">
              <CardContent className="p-4">
                <div className={`${action.color} mb-3`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium mb-1">{action.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{action.description}</p>
                <Button asChild size="sm" className="w-full">
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
