"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    ShieldCheck,
    ChevronRight,
    Zap,
    Lock
} from "lucide-react";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { Gig } from "@/types";

interface GigDetailViewProps {
    gig: Gig;
}

export function GigDetailView({ gig }: GigDetailViewProps) {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 max-w-5xl">
            <nav aria-label="breadcrumb" className="mb-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Browse</span>
                </button>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Open Application</span>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-muted-foreground">Fixed Price</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">{gig.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4 text-primary" />
                                {gig.location}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-primary" />
                                Posted {timeAgo(gig.postedDate || gig.created_at || "")}
                            </div>
                        </div>
                    </motion.div>

                    <motion.article
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="prose prose-invert max-w-none p-6 rounded-2xl bg-white/[0.01] border border-white/5"
                    >
                        <h3 className="text-xl font-bold mb-4">Project Overview</h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
                            {gig.description}
                        </p>
                    </motion.article>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-xl font-bold mb-4">Required Expertise</h3>
                        <div className="flex flex-wrap gap-3">
                            {gig.skills.map((skill: string) => (
                                <div key={skill} className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-semibold hover:border-primary/50 transition-colors cursor-default">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-8 sticky top-24"
                    >
                        <div className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Project Budget</span>
                            <div className="text-4xl font-black text-primary">
                                {formatCurrency(gig.budget.min)} - {formatCurrency(gig.budget.max)}
                            </div>
                        </div>

                        <Button className="w-full h-14 text-lg font-bold shadow-2xl shadow-primary/20 scale-100 hover:scale-[1.02] active:scale-[0.98] transition-all" variant="premium">
                            Submit Proposal
                        </Button>

                        <div className="pt-8 border-t border-white/10 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Proposal limit:</span>
                                <span className="font-bold text-foreground">50 slots remaining</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Client Response rate:</span>
                                <span className="font-bold text-emerald-400">92% (Very Fast)</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-bold text-sm uppercase tracking-wider">About the Client</h4>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center font-bold text-accent">
                                    {gig.client.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 font-bold">
                                        {gig.client.name}
                                        {gig.client.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Aadhaar Verified Client</div>
                                </div>
                            </div>
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <ChevronRight className="h-3 w-3 text-primary" />
                                    <span>{gig.client.completedGigs || 12} projects completed</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
                                    <Zap className="h-3 w-3" />
                                    <span>Payment Method Verified</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-primary/10 border border-primary/20 p-5 flex gap-4 items-start">
                            <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div className="text-[11px] leading-relaxed">
                                <strong className="block text-primary mb-1 uppercase tracking-tighter">Escrow Security Active</strong>
                                Payment is secured upfront and released only upon your approval of the deliverables.
                            </div>
                        </div>
                    </motion.div>
                </aside>
            </div>
        </div>
    );
}
