
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt, GridIcon, BookHeart, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface WardrobeSummaryProps {
  totalItems: number;
  categories: number;
  outfits: number;
  favorites: number;
}

const WardrobeSummary = ({ totalItems, categories, outfits, favorites }: WardrobeSummaryProps) => {
  const summaryCards = [
    {
      title: "Total Items",
      value: totalItems,
      icon: Shirt,
      color: "bg-blue-50 text-blue-500",
      link: "/wardrobe"
    },
    {
      title: "Categories",
      value: categories,
      icon: GridIcon,
      color: "bg-purple-50 text-purple-500",
      link: "/categories"
    },
    {
      title: "Outfits",
      value: outfits,
      icon: BookHeart,
      color: "bg-emerald-50 text-emerald-500",
      link: "/outfits"
    },
    {
      title: "Favorites",
      value: favorites,
      icon: Star,
      color: "bg-amber-50 text-amber-500",
      link: "/wardrobe?filter=favorites"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryCards.map((card) => (
        <Link to={card.link} key={card.title} className="block">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-muted-foreground">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">{card.value}</span>
                <div className={`p-3 rounded-full ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default WardrobeSummary;
