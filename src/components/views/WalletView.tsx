import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";

export function WalletView() {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    fetch("/api/wallet/balances")
      .then(res => res.json())
      .then(data => setBalances(data.balances))
      .catch(console.error);
  }, []);

  const handleAddFunds = (currency: string) => {
    toast.success(`Initiating deposit flow for ${currency}...`);
  };

  const handleSwap = (currency: string) => {
    toast.info(`Swap interface for ${currency} coming soon.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Multi-Currency Wallet</h2>
        <p className="text-muted-foreground">Manage your global balances and stablecoins.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {balances.map((b: any, idx) => (
          <Card key={idx} className={b.currency === "USD" ? "border-zinc-800 bg-zinc-900 text-white" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-sm font-medium ${b.currency === "USD" ? "text-zinc-400" : "text-muted-foreground"}`}>
                {b.currency} Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {b.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="mt-4 flex gap-2">
                <Button 
                  variant={b.currency === "USD" ? "secondary" : "outline"} 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleAddFunds(b.currency)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
                <Button 
                  variant={b.currency === "USD" ? "secondary" : "outline"} 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleSwap(b.currency)}
                >
                  <ArrowRightLeft className="h-4 w-4 mr-1" /> Swap
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
