import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Store, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function PayView() {
  const [merchantId, setMerchantId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyMerchant = () => {
    if (!merchantId) {
      toast.error("Please enter a merchant ID");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Merchant ${merchantId} verified! Proceeding to checkout...`);
      setMerchantId("");
    }, 1500);
  };

  const handleScan = () => {
    toast.info("Camera access requested. Please allow permissions.");
  };

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
            <Button variant="outline" className="w-full" onClick={handleScan}>Open Camera</Button>
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
              <Input 
                placeholder="UPF-..." 
                value={merchantId}
                onChange={(e) => setMerchantId(e.target.value)}
              />
            </div>
            <Button className="w-full gap-2" onClick={handleVerifyMerchant} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Store className="h-4 w-4" />}
              {loading ? "Verifying..." : "Verify Merchant"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
