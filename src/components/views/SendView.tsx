import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Repeat, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SendView() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!recipient || !amount) {
      toast.error("Please enter a recipient and amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/transactions/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromUserId: "current-user",
          toAddress: recipient,
          amount: parseFloat(amount),
          currency,
          isRecurring: false
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        toast.success(`Successfully sent ${amount} ${currency} to ${recipient}`);
        setRecipient("");
        setAmount("");
      } else {
        toast.error(data.error || "Transaction failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Send Money</h2>
        <p className="text-muted-foreground">Transfer globally from your embedded wallet.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
            <CardDescription>Send to any email, phone, or crypto address.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Recipient</Label>
              <Input 
                placeholder="name@example.com or 0x..." 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label>Amount</Label>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="NGN">NGN</SelectItem>
                    <SelectItem value="GHS">GHS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full" onClick={handleSend} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Review Transfer"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" /> Recent Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Alice Johnson", "Bob Smith", "Upfrica Store"].map((name, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setRecipient(name.toLowerCase().replace(" ", "") + "@example.com")}
                  >
                    {name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Repeat className="h-5 w-5" /> Recurring Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => toast.info("Recurring transfers setup coming soon!")}
              >
                Setup Salary or Subscription
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
