"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import {
    ArrowRight,
    ShieldCheck,
    Zap,
    Lock,
    Search,
    TrendingUp,
    Gem,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Animated Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[50%] bg-accent/20 blur-[120px] rounded-full animate-pulse delay-700" />
                </div>

                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-8"
                        >
                            <Zap className="h-4 w-4" />
                            <span>India&apos;s #1 Trust-First Gig Platform</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black font-heading tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-[1.1]"
                        >
                            The Modern Way to <br />
                            <span className="text-primary italic">Hire & Work</span> Securely.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12 leading-relaxed"
                        >
                            Bridging the gap between premium businesses and Aadhaar-verified Indian talent.
                            Integrated Escrow, skill certification, and transparent reputation.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                        >
                            <Link
                                href="/gigs"
                                className="h-16 px-10 rounded-2xl bg-primary text-white text-lg font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group"
                            >
                                Hire Expert Talent
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link
                                href="/talent"
                                className="h-16 px-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-lg font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-all"
                            >
                                Find Remote Work
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Metric Banner */}
            <section className="py-12 border-y border-white/5 bg-white/[0.01]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { label: "Verified Professionals", value: "25,000+", icon: ShieldCheck },
                            { label: "Total Volume", value: "₹45Cr+", icon: TrendingUp },
                            { label: "Completed Gigs", value: "15K+", icon: CheckCircle2 },
                            { label: "Trust Score", value: "99.9%", icon: Gem },
                        ].map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center lg:items-start lg:text-left gap-1">
                                <div className="flex items-center gap-2 text-primary mb-1 uppercase text-[10px] font-black tracking-widest">
                                    <stat.icon className="h-3 w-3" />
                                    {stat.label}
                                </div>
                                <div className="text-3xl font-black font-heading">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-20 text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-6">Designed for Trust</h2>
                        <p className="text-muted-foreground text-lg">Every feature is built to protect both clients and providers in the gig economy.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Aadhaar Linked",
                                desc: "Every profile is KYC-verified using Aadhaar. No impersonation, just real, accountable professionals.",
                                icon: ShieldCheck,
                                color: "from-blue-600/20 to-blue-600/5",
                            },
                            {
                                title: "UPI Escrow",
                                desc: "Payments are held securely in a vault. Millions in volume released only upon approved milestones.",
                                icon: Lock,
                                color: "from-purple-600/20 to-purple-600/5",
                            },
                            {
                                title: "Skill Score",
                                desc: "Our AI analysis verifies portfolio claims and skill levels before a single bid is placed.",
                                icon: Gem,
                                color: "from-emerald-600/20 to-emerald-600/5",
                            }
                        ].map((feat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] relative group overflow-hidden"
                            >
                                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", feat.color)} />
                                <div className="relative z-10">
                                    <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 text-primary">
                                        <feat.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 tracking-tight">{feat.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed italic">&quot;{feat.desc}&quot;</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-24 bg-white/[0.01]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-center md:text-left">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-6">Top Specializations</h2>
                            <p className="text-muted-foreground text-lg">Hire from a curated pool of the top 1% talent in India.</p>
                        </div>
                        <Link href="/browse" className="text-primary font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                            View all categories <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            "Digital Marketing", "Full-Stack Dev", "UI/UX Design", "Copywriting",
                            "Blockchain", "Graphic Design", "Data Science", "Video Editing"
                        ].map((cat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-primary/30 cursor-pointer flex items-center justify-between"
                            >
                                <span className="text-lg font-bold tracking-tight">{cat}</span>
                                <Search className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32">
                <div className="container mx-auto px-4">
                    <div className="rounded-[3rem] bg-gradient-to-br from-primary/30 via-primary/10 to-transparent border border-white/10 p-12 md:p-24 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 blur-[150px] rounded-full" />
                        <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tighter mb-8 leading-tight">Ready to scale <br /> your big idea?</h2>
                        <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto italic">
                            Join the ecosystem where trust is the default and quality is mandatory.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/post-gig" className="h-16 px-12 rounded-2xl bg-white text-background text-lg font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                                Post Project
                            </Link>
                            <Link href="/login" className="h-16 px-12 rounded-2xl border border-white/20 bg-white/5 text-lg font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                Create Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="py-12 border-t border-white/5 text-center">
                <div className="text-muted-foreground text-xs font-bold uppercase tracking-[0.3em]">
                    &copy; 2026 OpSkl &bull; Building the Future of Work in India.
                </div>
            </footer>
        </div>
    );
}
