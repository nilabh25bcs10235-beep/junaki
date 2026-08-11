import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { LiquidBackground } from "@/components/system/LiquidBackground";
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
    "Junaki is a modern boutique with AI styling, community, and liquid glass design.",
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
        {children}
      </body>
    </html>
  );
}
