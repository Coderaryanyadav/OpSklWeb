import React from "react";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { GigDetailView } from "@/components/gig/gig-detail-view";
import { Gig } from "@/types";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

async function getGig(id: string): Promise<Gig | null> {
    // Demo fallback
    const samples: Gig[] = [
        {
            id: "1",
            title: "E-commerce Website Design",
            description: "We are launching a new high-end fashion label and need a website that reflects our brand's premium identity.\n\nKey Requirements:\n- Interactive UI elements\n- Mobile-first responsive design\n- Integration with Shopify backend\n- SEO-friendly architecture",
            budget: { min: 15000, max: 25000 },
            skills: ["UI/UX", "Figma", "React", "Shopify"],
            client: {
                name: "Priya Sharma",
                verified: true,
                completedGigs: 12,
                rating: 4.9
            },
            location: "Mumbai, Maharashtra",
            postedDate: new Date().toISOString()
        }
    ];

    try {
        const { data, error } = await supabase
            .from("gigs")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            return samples.find(s => s.id === id) || null;
        }
        return data;
    } catch (err) {
        return samples.find(s => s.id === id) || null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const gig = await getGig(id);

    if (!gig) {
        return { title: "Gig Not Found | OpSkl" };
    }

    return {
        title: `${gig.title} | OpSkl Opportunities`,
        description: gig.description.substring(0, 160),
    };
}

export default async function GigPage({ params }: Props) {
    const { id } = await params;
    const gig = await getGig(id);

    if (!gig) {
        notFound();
    }

    return <GigDetailView gig={gig} />;
}
