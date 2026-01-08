"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { GigCard } from "@/components/ui/gig-card";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Sample data fallback if Supabase is empty
const sampleGigs = [
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
    const [gigs, setGigs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchGigs() {
            try {
                const { data, error } = await supabase
                    .from("gigs")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;

                if (data && data.length > 0) {
                    setGigs(data);
                } else {
                    // Use sample data if DB is empty for demo purposes
                    setGigs(sampleGigs);
                }
            } catch (err) {
                console.error("Error fetching gigs:", err);
                setGigs(sampleGigs);
            } finally {
                setLoading(false);
            }
        }

        fetchGigs();
    }, []);

    const filteredGigs = gigs.filter(gig =>
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.skills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Browse Opportunities</h1>
                        <p className="text-muted-foreground">Find high-paying gigs from verified Indian clients.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by title or skills..."
                                className="h-11 w-full md:w-80 rounded-xl bg-white/[0.03] border border-white/10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" className="h-11 w-11 border-white/10 shrink-0">
                            <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        {filteredGigs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredGigs.map((gig, idx) => (
                                    <motion.div
                                        key={gig.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <GigCard gig={gig} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <Search className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold">No gigs found</h3>
                                <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                                    Try adjusting your search or filters to find what you're looking for.
                                </p>
                                <Button variant="link" onClick={() => setSearchQuery("")} className="mt-4">
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
