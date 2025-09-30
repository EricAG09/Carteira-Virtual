import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { toast } from "sonner";

interface SetBudgetDialogProps {
  currentBudget: number;
  onSetBudget: (budget: number) => void;
}

export const SetBudgetDialog = ({ currentBudget, onSetBudget }: SetBudgetDialogProps) => {
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState(currentBudget.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const budgetNum = parseFloat(budget);
    if (isNaN(budgetNum) || budgetNum < 0) {
      toast.error("Digite um valor válido!");
      return;
    }

    onSetBudget(budgetNum);
    toast.success("Orçamento atualizado!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <Settings className="mr-2 h-5 w-5" />
          Definir Orçamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Definir Orçamento</DialogTitle>
          <DialogDescription>
            Configure o valor total disponível para seus desejos
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Orçamento Total (R$)</Label>
            <Input
              id="budget"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Esse é o valor máximo que você planeja gastar
            </p>
          </div>

          <Button type="submit" variant="success" className="w-full" size="lg">
            Salvar Orçamento
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
