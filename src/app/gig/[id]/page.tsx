import React from "react";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { GigDetailView } from "@/components/gig/gig-detail-view";
import { Gig } from "@/types";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

import { ApiService } from "@/lib/api";

async function getGig(id: string): Promise<Gig | null> {
    return await ApiService.getGigById(id);
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
