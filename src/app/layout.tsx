import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/shared/providers";
import { Toaster } from "sonner";

export const viewport: Viewport = {
    themeColor: "#020617",
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: "OpSkl | India's Premium Gig Economy Platform",
        template: "%s | OpSkl"
    },
    description: "Secure, verified, and trust-first platform for India's top freelancers and clients. Integrated Aadhaar verification and secure Escrow payments.",
    keywords: ["freelance", "gig economy", "India", "hiring", "verified", "escrow", "Aadhaar"],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <body className="antialiased min-h-screen selection:bg-primary/30 selection:text-white">
                <Providers>
                    {children}
                    <Toaster position="top-center" richColors closeButton expand />
                </Providers>
            </body>
        </html>
    );
}
