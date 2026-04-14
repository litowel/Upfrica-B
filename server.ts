import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Upfrica Orchestration State ---
  // Upfrica owns the business logic, fees, and analytics.
  const platformState = {
    totalVolume: 1250000,
    revenue: 15400, // Collected from transfer fees, merchant fees, FX spread
    activeUsers: 1542,
    failedTransfers: 12,
  };

  const transactions = [
    { id: "TX-1029", type: "send", amount: 500, currency: "USD", fee: 2.50, status: "completed", date: new Date().toISOString(), recipient: "alice@example.com" },
    { id: "TX-1030", type: "merchant_pay", amount: 120, currency: "USD", fee: 1.20, status: "completed", date: new Date(Date.now() - 86400000).toISOString(), merchant: "Upfrica Store" },
    { id: "TX-1031", type: "deposit", amount: 50000, currency: "NGN", fee: 0, status: "completed", date: new Date(Date.now() - 172800000).toISOString(), method: "Bank Transfer" },
  ];

  const vaults = [
    { id: "V-1", name: "Emergency Fund", balance: 500000, currency: "NGN", goal: 1000000, apy: "5%" },
    { id: "V-2", name: "Travel", balance: 1200, currency: "USD", goal: 3000, apy: "4.5%" }
  ];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Upfrica Borderless Orchestration" });
  });

  // Wallet Balances (Multi-currency)
  app.get("/api/wallet/balances", (req, res) => {
    res.json({
      balances: [
        { currency: "USD", amount: 2450.00, type: "fiat" },
        { currency: "NGN", amount: 1250000.00, type: "fiat" },
        { currency: "GHS", amount: 4500.00, type: "fiat" },
        { currency: "USDC", amount: 500.00, type: "stablecoin" }
      ]
    });
  });

  // Transaction History
  app.get("/api/transactions/history", (req, res) => {
    res.json({ transactions });
  });

  // Vaults
  app.get("/api/vaults", (req, res) => {
    res.json({ vaults });
  });

  // Mock Transaction Endpoint with Risk Controls & Fee Extraction
  app.post("/api/transactions/send", (req, res) => {
    const { fromUserId, toAddress, amount, currency, isRecurring } = req.body;
    
    // Risk control: block large transactions
    if (amount > 10000) {
      platformState.failedTransfers++;
      return res.status(403).json({ error: "Transaction exceeds limit. Manual review required." });
    }

    // Upfrica Orchestration: Calculate Fees (e.g., 0.5% transfer fee)
    const fee = amount * 0.005;
    platformState.revenue += fee;
    platformState.totalVolume += amount;

    const tx: any = {
      id: "TX-" + Math.random().toString(36).substring(7).toUpperCase(),
      type: isRecurring ? "recurring_send" : "send",
      fromUserId,
      toAddress,
      amount,
      currency,
      fee,
      status: "completed",
      date: new Date().toISOString()
    };
    transactions.unshift(tx);

    res.json({ success: true, transaction: tx, feeCharged: fee });
  });

  // Admin Analytics Dashboard Data
  app.get("/api/admin/analytics", (req, res) => {
    res.json({
      ...platformState,
      recentTransactions: transactions.slice(0, 10)
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
