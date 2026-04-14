import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function SaveView() {
  const [vaults, setVaults] = useState([]);

  useEffect(() => {
    fetch("/api/vaults")
      .then(res => res.json())
      .then(data => setVaults(data.vaults))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Savings Vaults</h2>
          <p className="text-muted-foreground">Earn yield and track your financial goals.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Vault
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {vaults.map((v: any) => {
          const progress = (v.balance / v.goal) * 100;
          return (
            <Card key={v.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{v.name}</CardTitle>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">{v.apy} APY</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="text-2xl font-bold">
                    {v.balance.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">{v.currency}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Goal: {v.goal.toLocaleString()}
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="w-full">Deposit</Button>
                  <Button variant="ghost" size="sm" className="w-full">Manage</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
