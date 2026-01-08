"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, MapPin, ShieldCheck, Briefcase } from "lucide-react";
import type { Gig } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface GigCardProps {
    gig: Gig;
}

export function GigCard({ gig }: GigCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group"
        >
            <Link href={`/gigs/${gig.id}`} className="block">
                <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all h-full flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                {gig.client?.avatar ? (
                                    <Image
                                        src={gig.client.avatar}
                                        alt={gig.client.name}
                                        width={48}
                                        height={48}
                                        className="h-full w-full object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <Briefcase className="h-6 w-6 text-zinc-500" />
                                )}
                            </div>
                            <div>
                                <div className="font-bold text-sm">{gig.client?.name || "Anonymous Client"}</div>
                                {gig.client?.verified && (
                                    <div className="flex items-center gap-1 text-emerald-500 text-[9px] font-black uppercase">
                                        <ShieldCheck className="h-3 w-3" /> Verified
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {gig.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                        {gig.description}
                    </p>

                    <div className="mt-auto space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-emerald-500">
                                <DollarSign className="h-4 w-4" />
                                <span className="font-black text-sm">₹{gig.budget_min.toLocaleString()} - ₹{gig.budget_max.toLocaleString()}</span>
                            </div>
                            {gig.location && (
                                <div className="flex items-center gap-1 text-zinc-500 text-xs">
                                    <MapPin className="h-3 w-3" />
                                    {gig.location}
                                </div>
                            )}
                        </div>

                        {gig.skills && gig.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {gig.skills.slice(0, 3).map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-wider text-zinc-400"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {gig.skills.length > 3 && (
                                    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                                        +{gig.skills.length - 3}
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
