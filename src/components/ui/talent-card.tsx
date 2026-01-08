"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Profile } from "@/types";

interface TalentCardProps {
    person: Profile;
    index?: number;
}

export const TalentCard = React.memo(({ person, index = 0 }: TalentCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all group flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5"
        >
            <div className="flex items-center gap-5 mb-8">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl font-black text-primary shadow-inner">
                    {person.name.charAt(0)}
                </div>
                <div>
                    <div className="flex items-center gap-2 font-black text-xl tracking-tight">
                        {person.name}
                        {person.verified && <ShieldCheck className="h-5 w-5 text-primary" aria-label="Aadhaar Verified" />}
                    </div>
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{person.title}</div>
                </div>
            </div>

            <div className="flex items-center gap-6 text-sm mb-8 font-bold">
                <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="text-primary">{person.rating}</span>
                    <span className="text-primary/50 text-xs">({person.reviews})</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {person.location}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
                {person.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-[10px] font-black uppercase tracking-tighter text-muted-foreground transition-colors group-hover:border-primary/30">
                        {skill}
                    </span>
                ))}
                {person.skills.length > 4 && (
                    <span className="text-[10px] font-black text-muted-foreground/50 py-1.5">
                        +{person.skills.length - 4} MORE
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                <div>
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Starting at</div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white">₹{person.rate}</span>
                        <span className="text-xs font-black text-muted-foreground/50 uppercase">/hr</span>
                    </div>
                </div>
                <Button size="sm" variant="outline" asChild className="h-12 px-6 rounded-2xl border-white/10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all font-black uppercase tracking-widest">
                    <Link href={`/profile/${person.id}`}>View Profile</Link>
                </Button>
            </div>
        </motion.div>
    );
});

TalentCard.displayName = "TalentCard";
