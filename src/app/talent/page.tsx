"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TalentCard } from "@/components/ui/talent-card";
import { ApiService } from "@/lib/api";
import { Profile } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

function TalentSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
                    <div className="flex items-center gap-5">
                        <Skeleton className="h-16 w-16 rounded-2xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-40 rounded-full" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                    </div>
                    <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                        <Skeleton className="h-12 w-32 rounded-2xl" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function TalentPage() {
    const [talent, setTalent] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let isMounted = true;
        async function fetchTalent() {
            setLoading(true);
            const data = await ApiService.getProfiles();
            if (isMounted) {
                setTalent(data);
                setLoading(false);
            }
        }
        fetchTalent();
        return () => { isMounted = false; };
    }, []);

    const filteredTalent = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return talent;
        return talent.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.title.toLowerCase().includes(query) ||
            p.skills.some(s => s.toLowerCase().includes(query))
        );
    }, [talent, searchQuery]);

    return (
        <div className="container mx-auto px-4 py-16 md:px-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-2xl">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-black tracking-tighter mb-4"
                    >
                        Find World-Class Talent
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-xl"
                    >
                        The top 1% of Indian professionals, verified by Aadhaar and vetted by AI.
                    </motion.p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative group flex-grow md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="e.g. Next.js Developer, UI/UX..."
                            className="h-14 w-full rounded-2xl bg-white/[0.03] border border-white/10 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-white/10 hover:bg-white/5 transition-all">
                        <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                </div>
            </header>

            {loading ? (
                <TalentSkeleton />
            ) : (
                <AnimatePresence mode="popLayout">
                    {filteredTalent.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredTalent.map((person, idx) => (
                                <TalentCard key={person.id} person={person} index={idx} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-32 text-center"
                        >
                            <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                                <Search className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-black mb-2">No professionals found</h3>
                            <p className="text-muted-foreground max-w-sm mb-8">We couldn&apos;t find anyone matching &quot;{searchQuery}&quot;. Try broadening your search.</p>
                            <Button variant="ghost" className="font-bold uppercase tracking-widest" onClick={() => setSearchQuery("")}>Clear Search</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}
