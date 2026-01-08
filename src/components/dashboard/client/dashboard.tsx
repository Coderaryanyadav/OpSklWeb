"use client";

import React from "react";
import { Users, Plus, FileCheck, DollarSign, Briefcase, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Profile, Gig } from "@/types";

interface ClientDashboardProps {
    profile: Profile;
    stats?: {
        activeProjects: number;
        totalSpent: number;
        talentHired: number;
        openGigs: number;
    };
    gigs?: Gig[];
}

export function ClientDashboard({ profile, stats, gigs }: ClientDashboardProps) {
    const displayStats = [
        { label: "Active Contracts", value: stats?.activeProjects.toString() || "0", icon: FileCheck, color: "text-blue-500", trend: "Live Projects" },
        { label: "Total Spent", value: `₹${stats?.totalSpent.toLocaleString() || "0"}`, icon: DollarSign, color: "text-emerald-500", trend: "Life-time" },
        { label: "Talent hired", value: stats?.talentHired.toString() || "0", icon: Users, color: "text-purple-500", trend: "Verified experts" },
        { label: "Posted Gigs", value: stats?.openGigs.toString() || "0", icon: Briefcase, color: "text-orange-500", trend: "In marketplace" },
    ];

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-accent font-black uppercase text-[10px] tracking-[0.3em] mb-3">
                        <Users className="h-3 w-3" />
                        Business Command Center
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight">
                        Managing <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">{profile.name.split(' ')[0]}&apos;s</span> Ecosystem
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/post-gig"
                        className="h-14 px-8 rounded-2xl bg-primary text-white flex items-center gap-2 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:scale-105 transition-all font-heading"
                    >
                        Post New Project <Plus className="h-4 w-4" />
                    </Link>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayStats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={cn("p-3 rounded-xl bg-white/5 border border-white/10", stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className="text-[10px] font-black text-zinc-500 flex items-center gap-1 uppercase tracking-widest">
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className="text-3xl font-black font-heading tracking-tight">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.03]">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black tracking-tight">My Active Gigs</h3>
                    <Link href="/gigs" className="text-xs font-black uppercase tracking-widest text-primary border-b border-primary/20 pb-1">View Marketplace</Link>
                </div>

                <div className="space-y-6">
                    {gigs && gigs.length > 0 ? gigs.map((gig, idx) => (
                        <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/5 group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h4 className="font-black text-xl group-hover:text-primary transition-colors">{gig.title}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Budget:</span>
                                        <span className="text-xs font-bold text-emerald-500">₹{gig.budget_min} - ₹{gig.budget_max}</span>
                                    </div>
                                </div>
                                <div className={cn(
                                    "px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest",
                                    gig.status === 'open' ? "bg-primary/10 border-primary/20 text-primary" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                                )}>
                                    {gig.status}
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                <span>Posted on {new Date(gig.created_at).toLocaleDateString()}</span>
                                <Link href={`/gigs`} className="text-white hover:text-primary transition-colors flex items-center gap-1">Manage Gig <ArrowUpRight className="h-3 w-3" /></Link>
                            </div>
                        </div>
                    )) : (
                        <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                            <p className="text-zinc-500 font-bold italic">No projects broadcasted yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
