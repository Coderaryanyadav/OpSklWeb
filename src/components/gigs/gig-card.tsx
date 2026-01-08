"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, IndianRupee, Clock, ArrowRight, Tag } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import type { Gig } from "@/types";

interface GigCardProps {
    gig: Gig;
}

export function GigCard({ gig }: GigCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col h-full shadow-2xl overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
                <ShieldCheck className="h-24 w-24 text-primary" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs">
                        {gig.client?.name?.charAt(0) || "C"}
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-0.5">Posted by</div>
                        <div className="flex items-center gap-1.5 font-bold text-sm">
                            {gig.client?.name || "Verified Client"}
                            {gig.client?.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-0.5">Budget</div>
                    <div className="text-xl font-black text-emerald-500 tracking-tight flex items-center justify-end gap-0.5">
                        <IndianRupee className="h-4 w-4" />
                        {gig.budget_max.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Body */}
            <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-primary transition-colors leading-tight">
                {gig.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-8 line-clamp-3 leading-relaxed italic">
                &quot;{gig.description}&quot;
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
                {gig.skills.slice(0, 3).map((skill, idx) => (
                    <div key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        {skill}
                    </div>
                ))}
                {gig.skills.length > 3 && (
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 text-[10px] font-black uppercase text-zinc-500">
                        +{gig.skills.length - 3}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        <MapPin className="h-3 w-3" />
                        {gig.location || "Remote"}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        <Clock className="h-3 w-3" />
                        Expired
                    </div>
                </div>

                <Link
                    href={`/gigs/${gig.id}`}
                    className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all transform group-hover:scale-110"
                >
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </motion.div>
    );
}
