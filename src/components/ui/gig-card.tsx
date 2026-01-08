"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, timeAgo } from "@/lib/utils";
import Link from "next/link";

interface GigCardProps {
    gig: {
        id: string | number;
        title: string;
        description: string;
        budget: { min: number, max: number };
        client: {
            name: string;
            verified: boolean;
            avatar?: string;
        };
        location: string;
        postedDate: string;
        skills: string[];
    };
}

export function GigCard({ gig }: GigCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-primary/5"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold uppercase overflow-hidden">
                        {gig.client.avatar ? (
                            <img src={gig.client.avatar} alt={gig.client.name} className="h-full w-full object-cover" />
                        ) : (
                            gig.client.name.charAt(0)
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold">{gig.client.name}</span>
                            {gig.client.verified && (
                                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                            )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {gig.location}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                        {formatCurrency(gig.budget.min)} - {formatCurrency(gig.budget.max)}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end">
                        <Clock className="h-3 w-3" />
                        {timeAgo(gig.postedDate)}
                    </div>
                </div>
            </div>

            <Link href={`/gig/${gig.id}`} className="block flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                    {gig.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {gig.description}
                </p>
            </Link>

            <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                    {gig.skills.slice(0, 3).map((skill) => (
                        <span
                            key={skill}
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground"
                        >
                            {skill}
                        </span>
                    ))}
                    {gig.skills.length > 3 && (
                        <span className="text-[10px] font-bold text-muted-foreground py-1">
                            +{gig.skills.length - 3} more
                        </span>
                    )}
                </div>

                <Button variant="outline" className="w-full border-white/10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all rounded-xl" asChild>
                    <Link href={`/gig/${gig.id}`}>View Details</Link>
                </Button>
            </div>
        </motion.div>
    );
}
