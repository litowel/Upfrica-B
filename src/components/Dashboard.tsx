import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { client } from "../lib/thirdweb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Send, Download, Building2, Vault, ShieldAlert, MessageSquare } from "lucide-react";

export function Dashboard() {
  const account = useActiveAccount();
  const [balance, setBalance] = useState("0.00");
  const [currency, setCurrency] = useState("NGN");

  const wallets = [
    inAppWallet({
      auth: {
        options: ["email", "phone", "google", "apple"],
      },
    }),
  ];

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Welcome to Upfrica Borderless</h2>
          <p className="text-muted-foreground">Sign in with email or phone to access your global wallet.</p>
        </div>
        <ConnectButton
          client={client}
          wallets={wallets}
          connectModal={{ size: "wide" }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Wallet connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          KYC Verified (Level 2)
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
          <CardHeader>
            <CardTitle className="text-zinc-300 font-medium text-sm">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {currency === "NGN" ? "₦" : "$"} {balance}
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 text-white border-0">
                <Download className="mr-2 h-4 w-4" /> Deposit
              </Button>
              <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 text-white border-0">
                <Send className="mr-2 h-4 w-4" /> Send
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Building2 className="h-5 w-5" />
              Pay Merchant
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Vault className="h-5 w-5" />
              Vaults
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ShieldAlert className="h-5 w-5" />
              Limits
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <MessageSquare className="h-5 w-5" />
              Support
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="send">Send Globally</TabsTrigger>
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
          <TabsTrigger value="vaults">Vaults</TabsTrigger>
        </TabsList>
        <TabsContent value="send" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Money</CardTitle>
              <CardDescription>Send funds globally with zero borders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address or Email</Label>
                <Input id="recipient" placeholder="0x... or user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
              <Button className="w-full">Review Transfer</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="deposit" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Deposit Funds</CardTitle>
              <CardDescription>Add money via card, bank transfer, or crypto.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Button variant="outline" className="justify-start">Bank Transfer (Local)</Button>
                <Button variant="outline" className="justify-start">Debit/Credit Card</Button>
                <Button variant="outline" className="justify-start">Crypto Deposit</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="merchants" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pay Merchants</CardTitle>
              <CardDescription>Scan QR or enter merchant ID to pay instantly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="merchantId">Merchant ID</Label>
                <Input id="merchantId" placeholder="UPF-..." />
              </div>
              <Button className="w-full">Verify Merchant</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vaults" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Savings Vaults</CardTitle>
              <CardDescription>Earn yield on your local currency balances.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Vault className="mx-auto h-12 w-12 mb-4 opacity-20" />
                <p>No active vaults. Create one to start saving.</p>
                <Button className="mt-4" variant="outline">Create Vault</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
