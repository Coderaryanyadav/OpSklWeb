"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { TalentCard } from "@/components/talent/talent-card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Loader2, Users, AlertCircle, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types";

import { useDebounce } from "@/hooks/use-debounce";

export default function BrowseTalentPage() {
    const [search, setSearch] = useState("");
    const [skill, setSkill] = useState("All");
    const [page, setPage] = useState(1);
    const pageSize = 12;

    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading, error } = useQuery({
        queryKey: ['talent', skill, debouncedSearch, page],
        queryFn: async () => {
            const start = (page - 1) * pageSize;
            const end = start + pageSize - 1;

            let query = supabase
                .from('profiles')
                .select('*', { count: 'exact' })
                .eq('role', 'provider');

            if (skill !== "All") {
                query = query.contains('skills', [skill]);
            }

            if (debouncedSearch) {
                // Improved search: check name and title
                query = query.or(`name.ilike.%${debouncedSearch}%,title.ilike.%${debouncedSearch}%`);
            }

            const { data, error, count } = await query
                .order('rating', { ascending: false })
                .range(start, end);

            if (error) throw error;

            return {
                profiles: data as Profile[],
                totalCount: count || 0
            };
        }
    });

    const talent = data?.profiles;
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    const popularSkills = ["All", "React", "Design", "Node.js", "Solidity", "Python"];

    return (
        <div className="min-h-screen pt-24 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6">
                <header className="mb-16">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-4">
                            <Users className="h-3.5 w-3.5" />
                            Verified Talent Network
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tighter mb-8 leading-tight">
                            India&apos;s Elite <br />
                            <span className="text-muted-foreground">Service Providers.</span>
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 items-center p-4 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name, expertise or certifications..."
                                className="w-full h-16 bg-white/5 border-none rounded-2xl pl-16 pr-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium text-lg"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                            {popularSkills.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSkill(s)}
                                    className={cn(
                                        "h-16 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all",
                                        skill === s
                                            ? "bg-primary text-white shadow-xl shadow-primary/20"
                                            : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                    )}
                                >
                                    {s}
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
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Scanning Trusted Network</p>
                    </div>
                ) : error ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-6 text-center">
                        <div className="h-20 w-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4">
                            <AlertCircle className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-black text-white">Network Connection Error</h3>
                        <p className="text-muted-foreground max-w-sm italic">Secure tunnel to professional database failed. Please retry in a few moments.</p>
                    </div>
                ) : talent?.length === 0 ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-6 text-center">
                        <div className="h-20 w-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
                            <Filter className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-black">No Professionals Found</h3>
                        <p className="text-muted-foreground max-w-sm italic">Try searching for a different skill or broadening your filter criteria.</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {talent?.map((profile) => (
                                    <TalentCard key={profile.id} profile={profile} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-16 pt-12 border-t border-white/5">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="h-12 px-6 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-black uppercase tracking-widest text-[10px]"
                                >
                                    Previous
                                </button>
                                <div className="flex gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPage(i + 1)}
                                            className={cn(
                                                "h-12 w-12 rounded-xl flex items-center justify-center font-black transition-all",
                                                page === i + 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                            )}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="h-12 px-6 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-black uppercase tracking-widest text-[10px]"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
