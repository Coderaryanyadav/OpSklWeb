"use client";

import React from "react";
import { useAuthStore } from "@/stores/auth-store";
import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    Briefcase,
    DollarSign,
    Clock,
    CheckCircle2,
    Star,
    ChevronRight,
    ArrowUpRight,
    Plus
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const { profile } = useAuthStore();
    const isProvider = profile?.title?.includes('Provider') || !profile?.title?.includes('Client');

    return (
        <div className="min-h-screen pt-24 pb-12">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-3">
                            <TrendingUp className="h-3 w-3" />
                            Operational Dashboard
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight">
                            Welcome, <span className="text-muted-foreground">{profile?.name?.split(' ')[0] || 'Member'}</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {isProvider ? (
                            <Link
                                href="/gigs"
                                className="h-12 px-6 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                            >
                                Find Gigs
                            </Link>
                        ) : null}
                        <Link
                            href="/post-gig"
                            className="h-12 px-6 rounded-xl bg-primary text-white flex items-center gap-2 text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/25 hover:scale-105 transition-all"
                        >
                            Post Project <Plus className="h-4 w-4" />
                        </Link>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Active Projects", value: "4", icon: Briefcase, color: "text-blue-500" },
                        { label: "Completed", value: "12", icon: CheckCircle2, color: "text-emerald-500" },
                        { label: "Earnings", value: "₹42,000", icon: DollarSign, color: "text-purple-500" },
                        { label: "Success Rate", value: "98%", icon: Star, color: "text-yellow-500" },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("p-3 rounded-xl bg-white/5 border border-white/10", stat.color)}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div className="text-[10px] font-black text-emerald-500 flex items-center gap-1">
                                    <ArrowUpRight className="h-3 w-3" /> +12%
                                </div>
                            </div>
                            <div>
                                <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</div>
                                <div className="text-3xl font-black font-heading">{stat.value}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.03] overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Clock className="h-32 w-32" />
                            </div>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black tracking-tight">Recent Activity</h3>
                                <Link href="#" className="text-xs font-black uppercase tracking-widest text-primary">View All</Link>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { title: "Project Milestone Approved", desc: "Payment released for Landing Page Design", time: "2h ago", status: "success" },
                                    { title: "New Message from Client", desc: "Regarding the Web3 Dashboard project", time: "5h ago", status: "msg" },
                                    { title: "Gig Application Received", desc: "3 new experts applied for your project", time: "18h ago", status: "alert" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 group cursor-pointer">
                                        <div className="h-10 w-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1 pb-6 border-b border-white/5 last:border-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{item.title}</h4>
                                                <span className="text-[10px] text-zinc-500 font-black uppercase">{item.time}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground italic">&quot;{item.desc}&quot;</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
                            <h3 className="text-xl font-black tracking-tight mb-4 flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                Trust Level: Elite
                            </h3>
                            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                                Your profile is top-ranked in India. Maintain your responsiveness to keep the badge.
                            </p>
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[85%] bg-primary" />
                                </div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                    <span>850 XP</span>
                                    <span>1000 XP</span>
                                </div>
                            </div>
                        </section>

                        <section className="p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.03]">
                            <h3 className="text-xl font-black tracking-tight mb-8">Premium Gigs for You</h3>
                            <div className="space-y-6">
                                {[
                                    { title: "AI/ML Integration", client: "TechStack Inc.", budget: "₹85k" },
                                    { title: "Mobile UI Kit", client: "NeoBank", budget: "₹120k" },
                                ].map((gig, idx) => (
                                    <div key={idx} className="group cursor-pointer">
                                        <div className="text-xs font-black text-muted-foreground mb-1 uppercase tracking-widest">{gig.client}</div>
                                        <div className="flex justify-between items-center">
                                            <div className="font-bold text-lg group-hover:text-primary transition-colors">{gig.title}</div>
                                            <div className="text-emerald-500 font-black tracking-tight">{gig.budget}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:border-primary hover:text-white transition-all">
                                Explore All Opportunities
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
