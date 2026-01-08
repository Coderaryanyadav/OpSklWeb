import React from "react";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { ProfileView } from "@/components/profile/profile-view";
import { Profile } from "@/types";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

import { ApiService } from "@/lib/api";

async function getProfile(id: string): Promise<Profile | null> {
    return await ApiService.getProfileById(id);
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
