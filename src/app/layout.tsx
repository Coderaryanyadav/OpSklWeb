import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://opskl.com"),
  title: {
    default: "OpSkl | India's Premium Gig Economy Platform",
    template: "%s | OpSkl"
  },
  description: "Secure, verified, and trust-first platform for Indias top freelancers and clients. Integrated Aadhaar verification and secure Escrow payments.",
  keywords: ["freelance", "gig economy", "India", "hiring", "verified professionals", "escrow payments", "Aadhaar verification"],
  authors: [{ name: "OpSkl Team" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://opskl.com",
    siteName: "OpSkl",
    images: [
      {
        url: "/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "OpSkl - India's Premium Gig Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpSkl | India's Premium Gig Platform",
    description: "Building the future of trusted gig work in India.",
    images: ["/og-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-white`}>
        <SkipToContent />
        <Navbar />
        <main id="main-content" className="flex-grow outline-none" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" expand={true} richColors closeButton />
      </body>
    </html>
  );
}
