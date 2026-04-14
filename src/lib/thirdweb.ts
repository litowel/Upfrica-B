import { createThirdwebClient } from "thirdweb";
import { inAppWallet, createWallet } from "thirdweb/wallets";

// Use a placeholder if the env var is not set so the app doesn't crash
const clientId = (import.meta as any).env.VITE_THIRDWEB_CLIENT_ID || "b2b48d28a3031023a105f2afb5e28a58"; // Fallback client ID for demo

export const client = createThirdwebClient({
  clientId,
});

export const wallets = [
  inAppWallet({
    auth: {
      options: ["email", "phone", "google", "apple"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("walletConnect"),
];
