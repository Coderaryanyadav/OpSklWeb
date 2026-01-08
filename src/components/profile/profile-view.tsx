"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Star,
    Code,
    Award,
    CircleCheck,
    ExternalLink,
    MessageSquare,
    Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Profile } from "@/types";

interface ProfileViewProps {
    profile: Profile;
}

export function ProfileView({ profile }: ProfileViewProps) {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Brief Summary */}
                <aside className="lg:col-span-1 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center sticky top-24 shadow-xl"
                    >
                        <div className="relative mx-auto h-32 w-32 mb-6 group">
                            <div className="h-full w-full rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-white overflow-hidden shadow-2xl transition-transform group-hover:rotate-3">
                                {profile.avatar ? (
                                    <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
                                ) : (
                                    profile.name.charAt(0)
                                )}
                            </div>
                            {profile.verified && (
                                <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-background border-4 border-background flex items-center justify-center text-primary shadow-lg animate-pulse">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                            )}
                        </div>

                        <h1 className="text-2xl font-black mb-1 tracking-tight">{profile.name}</h1>
                        <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-widest">{profile.title}</p>

                        <div className="flex items-center justify-center gap-2 mb-8 bg-white/5 py-2 rounded-xl">
                            <div className="flex items-center text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1 text-sm font-bold text-foreground">{profile.rating}</span>
                            </div>
                            <span className="text-muted-foreground text-xs">•</span>
                            <span className="text-muted-foreground text-xs font-bold uppercase">{profile.reviews} Reviews</span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 mb-8">
                            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/5 flex justify-between items-center group">
                                <div className="text-left">
                                    <div className="text-[10px] text-muted-foreground uppercase font-black mb-1">XP Points</div>
                                    <div className="text-xl font-bold text-primary group-hover:scale-110 transition-transform origin-left">{profile.xp.toLocaleString()}</div>
                                </div>
                                <CircleCheck className="h-5 w-5 text-primary opacity-50" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button className="w-full h-14 rounded-2xl text-lg font-bold" variant="premium">Direct Hire</Button>
                            <Button className="w-full h-12 rounded-2xl border-white/10" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Inquiry
                            </Button>
                        </div>
                    </motion.div>
                </aside>

                {/* Right Column: Detailed Info */}
                <main className="lg:col-span-3 space-y-12">
                    <section aria-labelledby="about-title">
                        <div className="flex items-center justify-between mb-6">
                            <h2 id="about-title" className="text-3xl font-extrabold tracking-tight">Professional Bio</h2>
                            <Button variant="ghost" size="icon" className="h-10 w-10 border border-white/10 rounded-xl hover:bg-white/5" aria-label="Share Profile">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-xl">
                            {profile.bio}
                        </p>
                    </section>

                    <section aria-labelledby="skills-title">
                        <h3 id="skills-title" className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Code className="h-5 w-5 text-primary" />
                            </div>
                            Core Specializations
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {profile.skills.map((skill: string) => (
                                <span key={skill} className="px-6 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-bold hover:border-primary transition-all cursor-default shadow-sm active:scale-95">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section aria-labelledby="trust-title">
                        <h3 id="trust-title" className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                            </div>
                            Verified Credentials
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: "Aadhaar Identity Link", status: "Verified", date: "Member since Dec 2024", icon: CircleCheck, color: "text-emerald-500" },
                                { label: "OpSkl Expert Badge", status: "Elite", date: "Verified Skills", icon: Award, color: "text-blue-500" },
                            ].map((cert, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center justify-between p-6 rounded-3xl border border-white/10 bg-white/[0.02]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`h-12 w-12 rounded-full ${cert.color.replace('text', 'bg')}/10 flex items-center justify-center ${cert.color}`}>
                                            <cert.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">{cert.label}</div>
                                            <div className="text-sm text-muted-foreground">{cert.date}</div>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-black uppercase tracking-widest ${cert.color}`}>{cert.status}</span>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <section aria-labelledby="portfolio-title">
                        <h3 id="portfolio-title" className="text-2xl font-bold mb-8">Selected Case Studies</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {profile.portfolio.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-video cursor-pointer"
                                >
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                        <div className="font-bold text-xl group-hover:text-primary transition-colors">{item.title}</div>
                                        <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                            <ExternalLink className="h-5 w-5" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
