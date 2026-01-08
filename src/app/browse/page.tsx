"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { GigCard } from "@/components/ui/gig-card";
import { Search, SlidersHorizontal, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Gig } from "@/types";

// Sample data fallback if Supabase is empty
const sampleGigs: Gig[] = [
    {
        id: "1",
        title: "E-commerce Website Design",
        description: "Need a modern, responsive design for my fashion store. Looking for someone with experience in Shopify or custom React builds.",
        budget: { min: 15000, max: 25000 },
        skills: ["UI/UX", "Figma", "React"],
        client: {
            name: "Priya Sharma",
            verified: true
        },
        location: "Mumbai, Maharashtra",
        postedDate: new Date().toISOString()
    },
    {
        id: "2",
        title: "Full Stack Developer for SaaS",
        description: "Looking for an experienced developer to build a subscription-based platform. Must be proficient in Next.js and Supabase.",
        budget: { min: 45000, max: 80000 },
        skills: ["Next.js", "Supabase", "TypeScript"],
        client: {
            name: "TechFlow Solutions",
            verified: true
        },
        location: "Bangalore, KA",
        postedDate: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: "3",
        title: "Content Writer - Tech Blog",
        description: "Need 10 SEO-optimized articles about AI and machine learning trends in 2026. Long-term opportunity for the right candidate.",
        budget: { min: 5000, max: 12000 },
        skills: ["SEO", "Content Strategy", "AI"],
        client: {
            name: "Future Media",
            verified: false
        },
        location: "Remote",
        postedDate: new Date(Date.now() - 172800000).toISOString()
    }
];

export default function BrowsePage() {
    const [gigs, setGigs] = useState<Gig[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchGigs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error: sbError } = await supabase
                .from("gigs")
                .select("*")
                .order("created_at", { ascending: false });

            if (sbError) throw sbError;

            if (data && data.length > 0) {
                setGigs(data);
            } else {
                setGigs(sampleGigs);
            }
        } catch (err) {
            console.error("Error fetching gigs:", err);
            setError("Failed to fetch jobs. Showing sample data.");
            setGigs(sampleGigs);
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
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col gap-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Browse Opportunities</h1>
                        <p className="text-muted-foreground">Find high-paying gigs from verified Indian clients.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by title, skills or desc..."
                                aria-label="Search gigs"
                                className="h-11 w-full md:w-80 rounded-xl bg-white/[0.03] border border-white/10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" className="h-11 w-11 border-white/10 shrink-0 hover:bg-white/5" aria-label="Filters">
                            <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </header>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm"
                    >
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </motion.div>
                )}

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col h-64 items-center justify-center gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p className="text-sm font-medium text-muted-foreground animate-pulse">Fetching opportunities...</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filteredGigs.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredGigs.map((gig) => (
                                    <GigCard key={gig.id} gig={gig} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <Search className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold">No results found</h3>
                                <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                                    Try adjusting your search query for &quot;{searchQuery}&quot;.
                                </p>
                                <Button variant="link" onClick={() => setSearchQuery("")} className="mt-4 text-primary">
                                    Clear search query
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
