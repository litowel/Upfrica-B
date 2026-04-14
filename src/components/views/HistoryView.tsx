import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function HistoryView() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions/history")
      .then(res => res.json())
      .then(data => setTransactions(data.transactions))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transaction History</h2>
          <p className="text-muted-foreground">View and download your statements.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx: any) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {tx.type.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {tx.recipient || tx.merchant || tx.method || "Transfer"}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {tx.type === "deposit" ? "+" : "-"}{tx.amount.toLocaleString()} {tx.currency}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
