import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    title: "OpSkl - Trust-First Gig Economy",
    description: "India's verified gig economy platform connecting elite talent with premium opportunities.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
                <Providers>
                    {children}
                    <Toaster position="top-center" richColors />
                </Providers>
            </body>
        </html>
    );
}
