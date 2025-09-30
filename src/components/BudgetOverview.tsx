import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";

interface BudgetOverviewProps {
  totalBudget: number;
  totalWishlist: number;
}

export const BudgetOverview = ({ totalBudget, totalWishlist }: BudgetOverviewProps) => {
  const remaining = totalBudget - totalWishlist;
  const percentageUsed = totalBudget > 0 ? (totalWishlist / totalBudget) * 100 : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            R$ {totalBudget.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Seu limite definido</p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor da Lista</CardTitle>
          <TrendingUp className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            R$ {totalWishlist.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Total dos desejos</p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
          <DollarSign className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${remaining >= 0 ? 'text-accent' : 'text-destructive'}`}>
            R$ {remaining.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {remaining >= 0 ? 'Ainda disponível' : 'Acima do orçamento'}
          </p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg md:col-span-3">
        <CardHeader>
          <CardTitle>Progresso do Orçamento</CardTitle>
          <CardDescription>
            {percentageUsed.toFixed(1)}% do orçamento comprometido
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress 
            value={Math.min(percentageUsed, 100)} 
            className="h-3"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>R$ 0</span>
            <span>R$ {totalBudget.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
