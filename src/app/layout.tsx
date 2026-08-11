import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { LiquidBackground } from "@/components/system/LiquidBackground";
import { SiteNav } from "@/components/layout/SiteNav";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Junaki — Modern Boutique",
  description:
    "Discover curated fashion, AI styling, community looks, and verified buyer reviews with photo & video.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="relative min-h-full font-sans text-foreground">
        <LiquidBackground />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
