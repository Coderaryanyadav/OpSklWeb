"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Loader2, ShieldCheck, Star, MapPin, Briefcase, Mail, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import type { Profile } from "@/types";

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
                                    <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-5xl font-black">{profile.name.charAt(0)}</span>
                                )}
                            </div>

                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-black mb-2 flex items-center justify-center gap-2">
                                    {profile.name}
                                    {profile.verified && <ShieldCheck className="h-5 w-5 text-emerald-500" />}
                                </h1>
                                <p className="text-muted-foreground font-medium">{profile.title}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                                    <div className="flex items-center gap-2 text-yellow-500">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="font-black">{profile.rating.toFixed(1)}</span>
                                    </div>
                                    <span className="text-xs text-zinc-500 font-bold">{profile.xp} XP</span>
                                </div>

                                {profile.location && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5">
                                        <MapPin className="h-4 w-4 text-zinc-500" />
                                        <span className="text-sm font-medium">{profile.location}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5">
                                    <Calendar className="h-4 w-4 text-zinc-500" />
                                    <span className="text-sm font-medium">Joined {new Date(profile.created_at).getFullYear()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <div className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.02]">
                            <h2 className="text-2xl font-black mb-6">About</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {profile.bio || "No bio available yet."}
                            </p>
                        </div>

                        {profile.skills && profile.skills.length > 0 && (
                            <div className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.02]">
                                <h2 className="text-2xl font-black mb-6">Skills & Expertise</h2>
                                <div className="flex flex-wrap gap-3">
                                    {profile.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-6 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-wider"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.02]">
                            <h2 className="text-2xl font-black mb-6">Stats</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="text-center p-6 rounded-2xl bg-white/5">
                                    <div className="text-3xl font-black font-heading text-primary mb-2">{profile.xp}</div>
                                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Total XP</div>
                                </div>
                                <div className="text-center p-6 rounded-2xl bg-white/5">
                                    <div className="text-3xl font-black font-heading text-yellow-500 mb-2">{profile.rating.toFixed(1)}</div>
                                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Rating</div>
                                </div>
                                <div className="text-center p-6 rounded-2xl bg-white/5">
                                    <div className="text-3xl font-black font-heading text-emerald-500 mb-2">
                                        {profile.verified ? "✓" : "✗"}
                                    </div>
                                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Verified</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
