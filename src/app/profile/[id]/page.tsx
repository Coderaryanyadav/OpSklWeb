import React from "react";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { ProfileView } from "@/components/profile/profile-view";
import { Profile } from "@/types";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

async function getProfile(id: string): Promise<Profile | null> {
    const sampleProfiles: Profile[] = [
        {
            id: "1",
            name: "Rahul Kumar",
            title: "Senior Full-Stack Developer",
            bio: "Dedicated software architect with 8+ years of experience in building scalable web applications. Specialist in Next.js, Go, and PostgreSQL. I focus on clean code and exceptional user experiences.",
            rating: 4.9,
            reviews: 42,
            xp: 2850,
            location: "Bangalore, KA",
            verified: true,
            aadhaarVerified: true,
            skills: ["Next.js", "TypeScript", "Node.js", "Docker", "Go", "AWS"],
            rate: 1200,
            completedGigs: 38,
            portfolio: [
                { title: "Fintech App", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
                { title: "AI Dashboard", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" }
            ]
        }
    ];

    try {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            return sampleProfiles.find(p => p.id === id) || sampleProfiles[0];
        }
        return data;
    } catch {
        return sampleProfiles[0];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const profile = await getProfile(id);

    if (!profile) return { title: "Profile Not Found | OpSkl" };

    return {
        title: `${profile.name} | ${profile.title} on OpSkl`,
        description: profile.bio.substring(0, 160),
    };
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    const profile = await getProfile(id);

    if (!profile) notFound();

    return <ProfileView profile={profile} />;
}
