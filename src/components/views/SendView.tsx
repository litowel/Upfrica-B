import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Repeat } from "lucide-react";

export function SendView() {
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
              <Input placeholder="name@example.com or 0x..." />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label>Amount</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select defaultValue="USD">
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
            <Button className="w-full">Review Transfer</Button>
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
                  <Button key={i} variant="outline" className="w-full justify-start">
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
              <Button variant="secondary" className="w-full">Setup Salary or Subscription</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
