"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    UserPlus,
    Search,
    MessageSquare,
    ShieldCheck,
    Wallet,
    Star,
    CheckCircle2,
    Lock,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
    {
        title: "Create Your Profile",
        desc: "Sign up and complete your Aadhaar-linked verification. Businesses build trust by knowing exactly who they're working with.",
        icon: UserPlus,
        color: "primary"
    },
    {
        title: "Post or Browse",
        desc: "Clients post project requirements; freelancers browse opportunities that match their skills and budget.",
        icon: Search,
        color: "accent"
    },
    {
        title: "Secure Escrow",
        desc: "Once a deal is made, the client deposits project funds into our secure escrow. Work starts with payment guaranteed.",
        icon: Lock,
        color: "primary"
    },
    {
        title: "Complete & Get Paid",
        desc: "Deliver the work, get it approved, and funds are instantly released to the freelancer's wallet. Review and build your XP.",
        icon: Wallet,
        color: "emerald-500"
    }
];

export default function HowItWorks() {
    return (
        <div className="container mx-auto px-4 py-16 md:px-6">
            <div className="text-center mb-20">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">How OpSkl Works</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    We've built India's most secure ecosystem for remote work, focused on trust, transparency, and timely payments.
                </p>
            </div>

            <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-transparent hidden lg:block" />

                <div className="space-y-24">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`flex flex-col lg:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            <div className="flex-1 space-y-4">
                                <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-2">
                                    <span className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">{idx + 1}</span>
                                    Step {idx + 1}
                                </div>
                                <h2 className="text-3xl font-bold">{step.title}</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
                                <div className="pt-4">
                                    <Button variant="ghost" className="gap-2 px-0 hover:bg-transparent hover:text-primary">
                                        Learn more <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex-1 flex justify-center">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 rounded-full" />
                                    <div className="relative h-48 w-48 lg:h-64 lg:w-64 rounded-3xl border border-white/10 bg-white/[0.03] flex items-center justify-center shadow-2xl">
                                        <step.icon className="h-20 w-20 lg:h-32 lg:w-32 text-primary" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Verification Detail */}
            <section className="mt-32 rounded-3xl bg-white/[0.02] border border-white/10 p-8 md:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">The OpSkl Trust Layer</h2>
                        <div className="space-y-6">
                            {[
                                { title: "Aadhaar Identity Link", detail: "Government-verified accounts to prevent fraud and impersonation." },
                                { title: "Skill Validation", detail: "Hands-on tests and portfolio verification by industry experts." },
                                { title: "XP and Reputation", detail: "A dynamic scoring system based on real project feedback and quality." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{item.title}</h4>
                                        <p className="text-muted-foreground text-sm">{item.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center overflow-hidden">
                            <ShieldCheck className="h-48 w-48 text-white opacity-20" />
                            <div className="absolute inset-x-8 bottom-8 p-6 rounded-xl bg-background/80 backdrop-blur border border-white/10">
                                <p className="text-sm font-medium">"OpSkl's verification process reduced our hiring time by 60% and eliminated payment disputes entirely."</p>
                                <p className="mt-2 text-xs text-muted-foreground text-right">— Rahul V., Product Lead at Zomato</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
