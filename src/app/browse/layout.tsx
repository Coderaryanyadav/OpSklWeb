import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Browse Gigs | OpSkl - Verified Indian Talent",
    description: "Explore high-paying, verified gig opportunities in Design, Development, and Marketing. All payments secured by OpSkl Escrow.",
    openGraph: {
        title: "Browse Gigs | OpSkl",
        description: "Connect with premium Indian clients and grow your career with verified opportunities.",
        images: ["/og-browse.jpg"],
    }
};

export default function BrowseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
