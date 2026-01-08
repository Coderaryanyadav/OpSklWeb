"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Loader2, ShieldCheck, Star, MapPin, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import type { Profile } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";

export default function ProfilePage() {
    const params = useParams();
    const profileId = params.id as string;
    const { user } = useAuthStore();

    const { data: profile, isLoading, error } = useQuery({
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
        enabled: !!profileId,
        retry: 2,
        staleTime: 30000, // Cache for 30 seconds
    });

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24">
                <Navbar />
                <div className="flex items-center justify-center py-32">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground font-medium">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-24">
                <Navbar />
                <div className="flex items-center justify-center py-32">
                    <div className="text-center max-w-md">
                        <div className="h-20 w-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mx-auto mb-6">
                            <ShieldCheck className="h-10 w-10" />
                        </div>
                        <h2 className="text-2xl font-black mb-4">Profile Unavailable</h2>
                        <p className="text-muted-foreground mb-8">
                            We couldn&apos;t load this profile. It may not exist or there might be a connection issue.
                        </p>
                        <Link
                            href="/talent"
                            className="inline-flex h-14 px-8 rounded-2xl bg-primary text-white font-black uppercase tracking-widest items-center gap-2 hover:scale-105 transition-all"
                        >
                            Browse Talent
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen pt-24">
                <Navbar />
                <div className="flex items-center justify-center py-32">
                    <div className="text-center">
                        <p className="text-zinc-500 font-medium">Profile not found</p>
                        <Link href="/talent" className="text-primary hover:underline mt-4 inline-block">
                            Browse other profiles
                        </Link>
                    </div>
                </div>
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

                            {user?.id !== profile.id && (
                                <Link
                                    href={`/messages?partner=${profile.id}`}
                                    className="mt-6 w-full h-12 rounded-2xl bg-primary text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                                >
                                    Message
                                </Link>
                            )}
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
