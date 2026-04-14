import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, wallets } from "./lib/thirdweb";
import { DashboardLayout } from "./components/DashboardLayout";
import { WalletView } from "./components/views/WalletView";
import { SendView } from "./components/views/SendView";
import { RequestView } from "./components/views/RequestView";
import { PayView } from "./components/views/PayView";
import { SaveView } from "./components/views/SaveView";
import { HistoryView } from "./components/views/HistoryView";
import { AdminDashboard } from "./components/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Globe2, ShieldCheck } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const [view, setView] = useState<"user" | "admin">("user");
  const [activeModule, setActiveModule] = useState("wallet");
  const account = useActiveAccount();

  const renderModule = () => {
    if (view === "admin") return <AdminDashboard />;
    
    switch (activeModule) {
      case "wallet": return <WalletView />;
      case "send": return <SendView />;
      case "request": return <RequestView />;
      case "pay": return <PayView />;
      case "save": return <SaveView />;
      case "history": return <HistoryView />;
      default: return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          Module "{activeModule}" is under construction.
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 text-white p-1.5 rounded-lg">
              <Globe2 className="h-5 w-5" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">Upfrica Borderless</h1>
          </div>
          <div className="flex items-center gap-4">
            {account && (
              <div className="hidden md:block">
                <ConnectButton client={client} wallets={wallets} />
              </div>
            )}
            <nav className="flex items-center gap-2 border-l pl-4">
              <Button 
                variant={view === "user" ? "default" : "ghost"} 
                onClick={() => setView("user")}
                size="sm"
              >
                Wallet
              </Button>
              <Button 
                variant={view === "admin" ? "default" : "ghost"} 
                onClick={() => setView("admin")}
                size="sm"
                className="gap-2"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {!account ? (
        <main className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Welcome to Upfrica Borderless</h2>
            <p className="text-muted-foreground">Sign in with email or phone to access your global wallet.</p>
          </div>
          <ConnectButton
            client={client}
            wallets={wallets}
            connectModal={{ size: "wide" }}
          />
        </main>
      ) : (
        <DashboardLayout 
          activeModule={view === "admin" ? "admin" : activeModule} 
          setActiveModule={setActiveModule}
          isAdmin={view === "admin"}
        >
          {renderModule()}
        </DashboardLayout>
      )}
      <Toaster />
    </div>
  );
}
