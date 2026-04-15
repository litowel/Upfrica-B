import React from "react";
import { ConnectButton } from "thirdweb/react";
import { client, wallets } from "../lib/thirdweb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe2, Send, Download, Store, Vault, CheckCircle2 } from "lucide-react";

const features = [
  {
    id: "wallet",
    title: "Global Multi-Currency Wallet",
    icon: <Globe2 className="h-8 w-8 text-blue-500" />,
    description: "Hold and manage your money in multiple currencies without borders.",
    benefits: [
      "Hold money in USD, NGN, GHS, and more.",
      "No hidden conversion fees.",
      "Keep your money safe from inflation.",
      "Access your funds 24/7 from anywhere.",
      "Sign up in seconds with just an email or phone.",
      "No complicated crypto knowledge needed.",
      "See all your balances in one clear view.",
      "Swap between currencies instantly.",
      "Bank-level security for your peace of mind.",
      "Your money is always yours, fully controlled by you."
    ]
  },
  {
    id: "send",
    title: "Send Money Anywhere",
    icon: <Send className="h-8 w-8 text-green-500" />,
    description: "Transfer funds globally to anyone, instantly.",
    benefits: [
      "Send money across borders instantly.",
      "Zero delays, no waiting for days.",
      "Send to an email address or phone number.",
      "Much cheaper than traditional banks.",
      "Track your transfer every step of the way.",
      "Send to crypto addresses if you want.",
      "Set up automatic recurring payments.",
      "Pay your family back home easily.",
      "Get notified the second they receive it.",
      "No paperwork or branch visits required."
    ]
  },
  {
    id: "request",
    title: "Request & Get Paid",
    icon: <Download className="h-8 w-8 text-purple-500" />,
    description: "Generate payment links and professional invoices.",
    benefits: [
      "Create simple payment links in one click.",
      "Send professional invoices to clients.",
      "Get paid by anyone, anywhere in the world.",
      "Add notes so you know what the payment is for.",
      "Share links via WhatsApp, email, or text.",
      "Stop chasing people for money.",
      "Know exactly when you get paid.",
      "Perfect for freelancers and remote workers.",
      "Keep a clean record of all your incoming money.",
      "Look professional to your customers."
    ]
  },
  {
    id: "pay",
    title: "Pay Merchants & Bills",
    icon: <Store className="h-8 w-8 text-orange-500" />,
    description: "Scan QR codes or use IDs to checkout instantly.",
    benefits: [
      "Scan QR codes to pay in seconds.",
      "Pay online stores with a simple Merchant ID.",
      "No need to carry cash or cards.",
      "Safe and secure checkout process.",
      "Keep track of all your shopping receipts.",
      "Avoid card fraud and stolen details.",
      "Works globally with participating merchants.",
      "Instant confirmation for you and the store.",
      "Pay exactly what you owe, no hidden charges.",
      "Fast checkout means less time waiting in line."
    ]
  },
  {
    id: "save",
    title: "Savings Vaults",
    icon: <Vault className="h-8 w-8 text-teal-500" />,
    description: "Earn yield and reach your financial goals faster.",
    benefits: [
      "Earn interest on your idle money.",
      "Create separate vaults for different goals.",
      "Save for a house, car, or emergency fund.",
      "Watch your money grow every day.",
      "Deposit and withdraw whenever you want.",
      "Protect your savings from everyday spending.",
      "Track your progress with visual bars.",
      "Better rates than traditional savings accounts.",
      "Automate your savings so you don't forget.",
      "Build a stronger financial future easily."
    ]
  }
];

export function LandingPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-2xl mb-4 shadow-xl">
          <Globe2 className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900">
          The Global Money <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Super App</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Upfrica Borderless is your all-in-one platform to hold, send, request, and save money globally. 
          Powered by secure blockchain technology, but as easy to use as your favorite app.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <div className="scale-110 transform transition-transform hover:scale-105">
            <ConnectButton
              client={client}
              wallets={wallets}
              connectModal={{ size: "wide" }}
              appMetadata={{
                name: "UpFrica Borderless",
                url: "https://upfrica.africa",
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground sm:hidden">Sign in to get started</p>
        </div>
      </div>

      {/* Features Carousel */}
      <div className="w-full max-w-6xl mx-auto px-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Everything you need, in one place.</h2>
          <p className="text-muted-foreground mt-2">Swipe to explore the features and benefits.</p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {features.map((feature) => (
              <CarouselItem key={feature.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border-2 hover:border-zinc-300 transition-colors duration-300">
                  <CardHeader className="space-y-4 pb-4">
                    <div className="p-3 bg-zinc-100 w-fit rounded-xl">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                      <p className="text-muted-foreground mt-2">{feature.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <CheckCircle2 className="h-5 w-5 text-zinc-900 shrink-0" />
                          <span className="text-zinc-700 leading-tight">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12" />
          <CarouselNext className="hidden md:flex -right-12 h-12 w-12" />
        </Carousel>
      </div>
      
      {/* Bottom CTA */}
      <div className="mt-24 text-center space-y-6 bg-zinc-900 text-white w-full max-w-4xl mx-auto rounded-3xl p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-50" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold">Ready to go borderless?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto mt-4">
            Join thousands of users managing their global finances with Upfrica Borderless. 
            Connect your wallet, email, or phone number to start instantly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
            <ConnectButton
              client={client}
              wallets={wallets}
              connectModal={{ size: "wide" }}
              appMetadata={{
                name: "UpFrica Borderless",
                url: "https://upfrica.africa",
              }}
            />
            <span className="text-zinc-500 text-sm">or</span>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('enable-demo-mode'))}
              className="px-6 py-3 rounded-lg bg-white text-zinc-900 font-semibold hover:bg-zinc-100 transition-colors flex items-center gap-2"
            >
              Try Interactive Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
