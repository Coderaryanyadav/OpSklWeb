"use client";

import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";
import { ShieldCheck, Zap, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 blur-[150px] rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 blur-[150px] rounded-full" />
                </div>

                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-8"
                        >
                            <Zap className="h-3 w-3" />
                            India&apos;s Trust-First Gig Economy
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tighter mb-8 leading-tight"
                        >
                            Verified Talent.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Premium Opportunities.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium"
                        >
                            Connect with elite service providers or find your next career-defining project. Every profile verified. Every payment secured.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link
                                href="/signup"
                                className="h-16 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-2xl shadow-primary/30 hover:scale-105 transition-all"
                            >
                                Get Started <ArrowRight className="h-5 w-5" />
                            </Link>
                            <Link
                                href="/gigs"
                                className="h-16 px-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm font-black uppercase tracking-wider text-sm flex items-center justify-center hover:bg-white/10 transition-all"
                            >
                                Browse Marketplace
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Aadhaar Verified",
                                description: "Every member verified through government ID. No fake profiles, no catfishing.",
                            },
                            {
                                icon: Zap,
                                title: "Instant Escrow",
                                description: "UPI-powered payment holds. Funds released only when both parties confirm completion.",
                            },
                            {
                                icon: Star,
                                title: "Reputation System",
                                description: "Earn XP and build your legacy. Top performers get premium access and higher visibility.",
                            },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-primary/20 transition-colors"
                            >
                                <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                                    <feature.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-black mb-3 tracking-tight">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "10K+", label: "Verified Professionals" },
                            { value: "₹5Cr+", label: "Paid Out Securely" },
                            { value: "98%", label: "Success Rate" },
                            { value: "24/7", label: "Escrow Protection" },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl md:text-5xl font-black font-heading text-primary mb-2">{stat.value}</div>
                                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
                        <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 tracking-tight">
                            Ready to Build Your Legacy?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join thousands of verified professionals and businesses transforming India&apos;s gig economy.
                        </p>
                        <Link
                            href="/signup"
                            className="inline-flex h-16 px-10 rounded-2xl bg-white text-background font-black uppercase tracking-wider text-sm items-center gap-2 shadow-2xl hover:scale-105 transition-all"
                        >
                            Create Account <CheckCircle2 className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12">
                <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
                    <p>&copy; 2026 OpSkl. Trust-First Gig Economy for India.</p>
                </div>
            </footer>
        </div>
    );
}
