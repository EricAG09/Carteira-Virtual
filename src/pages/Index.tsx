import { useState } from "react";
import { BudgetOverview } from "@/components/BudgetOverview";
import { WishlistItem, WishItem } from "@/components/WishlistItem";
import { AddItemDialog } from "@/components/AddItemDialog";
import { SetBudgetDialog } from "@/components/SetBudgetDialog";
import { Wallet, Heart } from "lucide-react";

const Index = () => {
  const [budget, setBudget] = useState(5000);
  const [wishlist, setWishlist] = useState<WishItem[]>([
    {
      id: "1",
      name: "Notebook Dell",
      price: 3500,
      category: "Eletrônicos",
    },
    {
      id: "2",
      name: "Tênis Nike",
      price: 450,
      category: "Roupas",
    },
  ]);

  const totalWishlist = wishlist.reduce((sum, item) => sum + item.price, 0);

  const handleAddItem = (item: Omit<WishItem, "id">) => {
    const newItem: WishItem = {
      ...item,
      id: Date.now().toString(),
    };
    setWishlist([...wishlist, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Minha Carteira
                </h1>
                <p className="text-sm text-muted-foreground">Gerencie seus desejos</p>
              </div>
            </div>
            <SetBudgetDialog currentBudget={budget} onSetBudget={setBudget} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Budget Overview */}
        <BudgetOverview totalBudget={budget} totalWishlist={totalWishlist} />

        {/* Wishlist Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-destructive fill-destructive" />
              <h2 className="text-2xl font-bold">Lista de Desejos</h2>
              <span className="text-muted-foreground">({wishlist.length} {wishlist.length === 1 ? 'item' : 'itens'})</span>
            </div>
            <AddItemDialog onAddItem={handleAddItem} />
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-muted/50 mb-4">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sua lista está vazia</h3>
              <p className="text-muted-foreground mb-6">
                Adicione seus desejos e comece a planejar suas compras!
              </p>
              <AddItemDialog onAddItem={handleAddItem} />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((item) => (
                <WishlistItem key={item.id} item={item} onDelete={handleDeleteItem} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
