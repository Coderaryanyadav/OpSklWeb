import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import { MouseSpotlight } from "@/components/ui/mouse-spotlight";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://opskl.com'),
    title: {
        default: "OpSkl - Trust-First Gig Economy",
        template: "%s | OpSkl"
    },
    description: "India's verified gig economy platform connecting elite talent with premium opportunities. Secure payments, verified profiles, and smart contracts.",
    keywords: ["gig economy", "freelance india", "verified talent", "blockchain jobs", "secure freelance"],
    authors: [{ name: "OpSkl Team" }],
    creator: "OpSkl",
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://opskl.com",
        title: "OpSkl - Trust-First Gig Economy",
        description: "India's verified gig economy platform connecting elite talent with premium opportunities.",
        siteName: "OpSkl",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "OpSkl Platform",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "OpSkl - Trust-First Gig Economy",
        description: "India's verified gig economy platform connecting elite talent with premium opportunities.",
        images: ["/og-image.jpg"],
        creator: "@opskl",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
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
                    <MouseSpotlight />
                    {children}
                    <Toaster position="top-center" richColors />
                </Providers>
            </body>
        </html>
    );
}
