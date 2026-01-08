"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Loader2, ShieldCheck, Star, MapPin, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import type { Profile } from "@/types";
import Image from "next/image";

export default function ProfilePage() {
    const params = useParams();
    const profileId = params.id as string;

    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile', profileId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', profileId)
                .single();

            if (error) throw error;
            return data as Profile;
        },
        enabled: !!profileId
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-zinc-500">Profile not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.02] sticky top-24">
                            <div className="h-32 w-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden mx-auto mb-6">
                                {profile.avatar ? (
                                    <Image
                                        src={profile.avatar}
                                        alt={profile.name}
                                        width={128}
                                        height={128}
                                        className="h-full w-full object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <span className="text-5xl font-black">{profile.name.charAt(0)}</span>
                                )}
                            </div>

                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-black mb-1 flex items-center justify-center gap-2">
                                    {profile.name}
                                    {profile.verified && <ShieldCheck className="h-5 w-5 text-emerald-500" />}
                                </h1>
                                <p className="text-zinc-500 font-medium">{profile.title}</p>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-500 text-sm">Rating</span>
                                    <span className="font-bold flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                        {profile.rating.toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-500 text-sm">Experience</span>
                                    <span className="font-bold text-sm">{profile.xp} XP</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-500 text-sm">Location</span>
                                    <span className="font-bold text-sm flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {profile.location || "Remote"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-500 text-sm">Member Since</span>
                                    <span className="font-bold text-sm flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(profile.created_at).getFullYear()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-xl font-black mb-6">About</h2>
                            <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                                <p className="text-zinc-400 leading-relaxed">
                                    {profile.bio || "No bio available."}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-black mb-6">Skills & Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills && profile.skills.length > 0 ? (
                                    profile.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-bold text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-zinc-500 italic">No skills listed</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
