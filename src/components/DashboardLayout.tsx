import React, { useState } from "react";
import { Wallet, Send, ArrowDownToLine, ShoppingBag, PiggyBank, Gift, Store, History, LifeBuoy, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeModule: string;
  setActiveModule: (module: string) => void;
  isAdmin: boolean;
}

export function DashboardLayout({ children, activeModule, setActiveModule, isAdmin }: DashboardLayoutProps) {
  const userModules = [
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "send", label: "Send", icon: Send },
    { id: "request", label: "Request", icon: ArrowDownToLine },
    { id: "pay", label: "Pay", icon: ShoppingBag },
    { id: "save", label: "Save", icon: PiggyBank },
    { id: "earn", label: "Earn", icon: Gift },
    { id: "merchant", label: "Merchant", icon: Store },
    { id: "history", label: "History", icon: History },
    { id: "support", label: "Support", icon: LifeBuoy },
  ];

  const adminModules = [
    { id: "admin", label: "Analytics", icon: ShieldCheck },
  ];

  const modules = isAdmin ? adminModules : userModules;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r bg-white p-4 space-y-1">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Button
              key={mod.id}
              variant={activeModule === mod.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveModule(mod.id)}
            >
              <Icon className="h-4 w-4" />
              {mod.label}
            </Button>
          );
        })}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-zinc-50/50">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
