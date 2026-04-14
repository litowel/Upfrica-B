import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Store } from "lucide-react";

export function PayView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pay Merchants</h2>
        <p className="text-muted-foreground">Scan QR codes or enter merchant IDs to pay instantly.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Scan to Pay</CardTitle>
            <CardDescription>Use your camera to scan a merchant QR code.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="p-8 bg-zinc-100 rounded-xl border-2 border-dashed border-zinc-300">
              <QrCode className="h-16 w-16 text-zinc-400" />
            </div>
            <Button variant="outline" className="w-full">Open Camera</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manual Entry</CardTitle>
            <CardDescription>Enter a merchant ID or checkout link.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Merchant ID</Label>
              <Input placeholder="UPF-..." />
            </div>
            <Button className="w-full gap-2">
              <Store className="h-4 w-4" /> Verify Merchant
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
