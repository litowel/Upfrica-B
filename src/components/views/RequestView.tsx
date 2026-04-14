import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, FileText } from "lucide-react";

export function RequestView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Request & Invoices</h2>
        <p className="text-muted-foreground">Get paid globally with payment links and invoices.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Payment Link</CardTitle>
            <CardDescription>Generate a shareable link to receive funds.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Amount (Optional)</Label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label>Note</Label>
              <Input placeholder="What's this for?" />
            </div>
            <Button className="w-full gap-2">
              <Link className="h-4 w-4" /> Generate Link
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send Invoice</CardTitle>
            <CardDescription>Professional invoices for clients.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Client Email</Label>
              <Input placeholder="client@company.com" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Services rendered..." className="resize-none" />
            </div>
            <Button variant="secondary" className="w-full gap-2">
              <FileText className="h-4 w-4" /> Create Invoice
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
