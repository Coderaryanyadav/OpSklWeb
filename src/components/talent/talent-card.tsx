"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, Zap, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Profile } from "@/types";

interface TalentCardProps {
    profile: Profile;
}

export function TalentCard({ profile }: TalentCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Zap className="h-24 w-24 text-primary" />
            </div>

            <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                    <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center font-black text-2xl group-hover:scale-110 transition-transform">
                        {profile.avatar ? <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover rounded-3xl" /> : profile.name?.charAt(0)}
                    </div>
                    {profile.verified && (
                        <div className="absolute -bottom-2 -right-2 h-7 w-7 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                            <ShieldCheck className="h-4 w-4" />
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-black font-heading tracking-tight group-hover:text-primary transition-colors">{profile.name}</h3>
                        <div className="flex items-center gap-1 text-yellow-500 font-black text-xs">
                            <Star className="h-3 w-3 fill-current" /> {profile.rating}
                        </div>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">{profile.title}</div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            <MapPin className="h-3 w-3" /> {profile.location || "Remote"}
                        </div>
                        <div className="h-1 w-1 rounded-full bg-white/10" />
                        <div className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">{profile.xp} XP</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
                {profile.skills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="text-lg font-black tracking-tight">
                    ₹{profile.rate || "1k"}<span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">/hr</span>
                </div>
                <Link
                    href={`/profile/${profile.id}`}
                    className="h-12 px-6 rounded-xl bg-primary/10 text-primary flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all transform group-hover:scale-105 active:scale-95"
                >
                    View Portfolio <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    );
}
