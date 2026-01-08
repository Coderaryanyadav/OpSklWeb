"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Search, SlidersHorizontal, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GigCard } from "@/components/ui/gig-card";
import { ApiService } from "@/lib/api";
import { Gig } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

function GigSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                        <div className="space-y-2 text-right">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-3 w-16 ml-auto" />
                        </div>
                    </div>
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-6 w-12" />
                    </div>
                    <Skeleton className="h-12 w-full rounded-2xl" />
                </div>
            ))}
        </div>
    );
}

export default function BrowsePage() {
    const [gigs, setGigs] = useState<Gig[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchGigs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ApiService.getGigs();
            setGigs(data);
        } catch {
            setError("Failed to fetch opportunities. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGigs();
    }, [fetchGigs]);

    const filteredGigs = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return gigs;

        return gigs.filter(gig =>
            gig.title.toLowerCase().includes(query) ||
            gig.skills.some(s => s.toLowerCase().includes(query)) ||
            gig.description.toLowerCase().includes(query)
        );
    }, [gigs, searchQuery]);

    return (
        <div className="container mx-auto px-4 py-16 md:px-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-2xl">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-black tracking-tighter mb-4"
                    >
                        Explore Gigs
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-xl"
                    >
                        High-impact projects from top Indian startups and global firms.
                    </motion.p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative group flex-grow md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by title, skills or stack..."
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

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold mb-8"
                >
                    <AlertCircle className="h-5 w-5" />
                    {error}
                    <Button variant="ghost" size="sm" onClick={fetchGigs} className="ml-auto text-red-500 hover:bg-red-500/10">Try Again</Button>
                </motion.div>
            )}

            {loading ? (
                <GigSkeleton />
            ) : (
                <AnimatePresence mode="popLayout">
                    {filteredGigs.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredGigs.map((gig) => (
                                <GigCard key={gig.id} gig={gig} />
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
                            <h3 className="text-2xl font-black mb-2">No matching gigs</h3>
                            <p className="text-muted-foreground max-w-sm mb-8">We couldn&apos;t find any opportunities matching &quot;{searchQuery}&quot;. Try broadening your search.</p>
                            <Button variant="ghost" className="font-bold uppercase tracking-widest" onClick={() => setSearchQuery("")}>Clear Search</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}
