"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { GigCard } from "@/components/gigs/gig-card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Loader2, Sparkles, Filter, AlertCircle } from "lucide-react";
import type { Gig } from "@/types";
import { cn } from "@/lib/utils";

export default function BrowseGigsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const { data: gigs, isLoading, error } = useQuery({
        queryKey: ['gigs', category, search],
        queryFn: async () => {
            let query = supabase
                .from('gigs')
                .select('*');

            if (category !== "All") query = query.eq('category', category);
            if (search) query = query.ilike('title', `%${search}%`);

            const { data: gigs, error: gigsError } = await query.order('created_at', { ascending: false });
            if (gigsError) throw gigsError;

            const clientIds = Array.from(new Set(gigs?.map(g => g.client_id) || []));
            const { data: profiles } = await supabase
                .from('profiles')
                .select('id, name, avatar, verified')
                .in('id', clientIds);

            return (gigs || []).map(gig => ({
                ...gig,
                client: profiles?.find(p => p.id === gig.client_id)
            })) as unknown as Gig[];
        }
    });

    const categories = ["All", "Development", "Design", "Marketing", "Writing", "Blockchain"];

    return (
        <div className="min-h-screen pt-24 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6">
                <header className="mb-16">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-4">
                            <Sparkles className="h-3.5 w-3.5" />
                            Direct Marketplace
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tighter mb-8 leading-tight">
                            Premium Opportunities <br />
                            <span className="text-muted-foreground">for Elite Talent.</span>
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 items-center p-4 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by role, stack or client name..."
                                className="w-full h-16 bg-white/5 border-none rounded-2xl pl-16 pr-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium text-lg"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={cn(
                                        "h-16 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all",
                                        category === cat
                                            ? "bg-primary text-white shadow-xl shadow-primary/20"
                                            : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                            <button className="h-16 px-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                                <SlidersHorizontal className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {isLoading ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-6">
                        <div className="relative">
                            <Loader2 className="h-12 w-12 text-primary animate-spin" />
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                        </div>
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Syncing Marketplace</p>
                    </div>
                ) : error ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-6 text-center">
                        <div className="h-20 w-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4">
                            <AlertCircle className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-black">Marketplace Unavailable</h3>
                        <p className="text-muted-foreground max-w-sm italic">We encountered an issue syncing with our verified database. Please check your connection.</p>
                    </div>
                ) : gigs?.length === 0 ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-6 text-center">
                        <div className="h-20 w-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
                            <Filter className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-black">No Results Found</h3>
                        <p className="text-muted-foreground max-w-sm italic">Adjust your filters or try a different specialty. New gigs are posted every few minutes.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {gigs?.map((gig) => (
                                <GigCard key={gig.id} gig={gig} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
