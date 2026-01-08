"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, MapPin } from "lucide-react";
import type { Profile } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface TalentCardProps {
    profile: Profile;
}

export function TalentCard({ profile }: TalentCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group"
        >
            <Link href={`/profile/${profile.id}`} className="block">
                <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all h-full flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                {profile.avatar ? (
                                    <Image
                                        src={profile.avatar}
                                        alt={profile.name}
                                        width={64}
                                        height={64}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl font-black">{profile.name.charAt(0)}</span>
                                )}
                            </div>
                            <div>
                                <div className="font-black text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                                    {profile.name}
                                    {profile.verified && (
                                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    )}
                                </div>
                                <div className="text-xs text-muted-foreground font-medium">{profile.title}</div>
                            </div>
                        </div>
                    </div>

                    {profile.bio && (
                        <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                            {profile.bio}
                        </p>
                    )}

                    <div className="mt-auto space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="font-black text-sm">{profile.rating.toFixed(1)}</span>
                                <span className="text-xs text-zinc-500">({profile.xp} XP)</span>
                            </div>
                            {profile.location && (
                                <div className="flex items-center gap-1 text-zinc-500 text-xs">
                                    <MapPin className="h-3 w-3" />
                                    {profile.location}
                                </div>
                            )}
                        </div>

                        {profile.skills && profile.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.slice(0, 3).map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-wider text-zinc-400"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {profile.skills.length > 3 && (
                                    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                                        +{profile.skills.length - 3}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
