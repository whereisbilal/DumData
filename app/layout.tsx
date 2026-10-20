// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dumdata.vercel.app"),
  title: "DumData — Free Fake REST API",
  description:
    "DumData gives you instant fake JSON APIs for products, users, posts, carts, todos & more. No setup, no auth, no rate limits.",
  keywords: ["fake api", "rest api", "mock api", "json api", "dummy data", "fake data"],
  authors: [{ name: "DumData" }],
  openGraph: {
    title: "DumData — Free Fake REST API",
    description: "Instant fake JSON APIs for developers. No setup required.",
    url: "https://dumdata.vercel.app",
    siteName: "DumData",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DumData — Free Fake REST API",
    description: "Instant fake JSON APIs for developers. No setup required.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
      </head>
      <body className="bg-white antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}