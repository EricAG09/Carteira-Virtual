import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ShoppingBag } from "lucide-react";

export interface WishItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface WishlistItemProps {
  item: WishItem;
  onDelete: (id: string) => void;
}

export const WishlistItem = ({ item, onDelete }: WishlistItemProps) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      eletrônicos: "bg-primary/10 text-primary border-primary/20",
      roupas: "bg-accent/10 text-accent border-accent/20",
      casa: "bg-secondary/50 text-secondary-foreground border-secondary",
      outros: "bg-muted text-muted-foreground border-border",
    };
    return colors[category.toLowerCase()] || colors.outros;
  };

  return (
    <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardContent className="pt-6 relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <ShoppingBag className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <Badge variant="outline" className={`mt-1 ${getCategoryColor(item.category)}`}>
                {item.category}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            R$ {item.price.toFixed(2)}
          </p>
        </div>
      </CardContent>

      <CardFooter className="pt-0 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(item.id)}
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remover
        </Button>
      </CardFooter>
    </Card>
  );
};
