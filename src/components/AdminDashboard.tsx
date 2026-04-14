import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Users, Activity, AlertTriangle, DollarSign } from "lucide-react";

export function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Orchestration</h2>
        <p className="text-muted-foreground">Upfrica Platform Analytics & Revenue</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalVolume.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${data.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">From fees & spread</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{data.failedTransfers}</div>
            <p className="text-xs text-muted-foreground mt-1">Failed/Blocked TXNs</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Network Transactions</CardTitle>
          <CardDescription>Real-time ledger and fee extraction monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TXN ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Upfrica Fee</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">No recent transactions</TableCell>
                </TableRow>
              ) : (
                data.recentTransactions.map((tx: any) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                    <TableCell className="capitalize">{tx.type.replace("_", " ")}</TableCell>
                    <TableCell>{tx.amount.toLocaleString()} {tx.currency}</TableCell>
                    <TableCell className="text-green-600 font-medium">
                      {tx.fee > 0 ? `+${tx.fee.toLocaleString()} ${tx.currency}` : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tx.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
