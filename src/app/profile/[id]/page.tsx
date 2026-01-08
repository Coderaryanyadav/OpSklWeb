"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import {
    ShieldCheck,
    MapPin,
    Star,
    Briefcase,
    CheckCircle2,
    ExternalLink,
    MessageSquare,
    Award,
    Zap,
    ArrowUpRight
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import type { Profile } from "@/types";

export default function PublicProfilePage() {
    const { id } = useParams();

    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw error;
            return data as Profile;
        }
    });

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="h-12 w-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!profile) return (
        <div className="min-h-screen pt-32 text-center">
            <h1 className="text-4xl font-black">Profile Not Found</h1>
        </div>
    );

    return (
        <div className="min-h-screen pb-24">
            <Navbar />

            {/* Profile Header */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-primary/10 to-transparent -z-10" />

                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Avatar & Basic Info */}
                        <div className="relative group">
                            <div className="h-48 w-48 rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center font-black text-6xl shadow-2xl overflow-hidden">
                                {profile.avatar ? <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" /> : profile.name.charAt(0)}
                            </div>
                            {profile.verified && (
                                <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30 border-4 border-background">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight">{profile.name}</h1>
                                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-black text-xs uppercase tracking-widest">
                                    <Zap className="h-3 w-3" /> Top 1% Professional
                                </div>
                            </div>
                            <p className="text-xl text-muted-foreground font-medium mb-8 max-w-2xl italic">
                                &quot;{profile.title}&quot;
                            </p>

                            <div className="flex flex-wrap gap-8">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    <span className="font-bold">{profile.location || "Remote"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                                    <span className="font-bold">{profile.rating} Rating</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-purple-500" />
                                    <span className="font-bold">42 Projects Done</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto flex flex-col gap-4">
                            <button className="h-16 px-10 rounded-2xl bg-primary text-white text-lg font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                                Hire Now <ArrowUpRight className="h-5 w-5" />
                            </button>
                            <button className="h-16 px-10 rounded-2xl border border-white/10 bg-white/5 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                                Send Message <MessageSquare className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
                {/* About & Skills */}
                <div className="lg:col-span-2 space-y-12">
                    <section className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.02]">
                        <h3 className="text-2xl font-black mb-6 tracking-tight flex items-center gap-3">
                            Professional Bio
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed italic">
                            {profile.bio || "This professional prefers to keep their reputation based on their deliverables. Verified through Aadhaar-linked identity since 2026."}
                        </p>
                    </section>

                    <section className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.02]">
                        <h3 className="text-2xl font-black mb-8 tracking-tight flex items-center gap-3">
                            Core Stack & Expertise
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {profile.skills.map((skill, idx) => (
                                <div key={idx} className="px-6 py-3 rounded-2xl bg-primary/5 border border-primary/20 text-sm font-black uppercase tracking-widest text-primary">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Portfolio Section */}
                    <section>
                        <h3 className="text-2xl font-black mb-8 tracking-tight">Selected Case Studies</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: "NeoBank Mobile App", category: "UI/UX Design", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
                                { title: "Z-Protocol Landing", category: "Web3 Development", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" }
                            ].map((project, idx) => (
                                <div key={idx} className="group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 cursor-pointer">
                                    <div className="aspect-video w-full overflow-hidden">
                                        <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    </div>
                                    <div className="p-8">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{project.category}</div>
                                        <div className="flex justify-between items-center text-xl font-black">
                                            {project.title}
                                            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-8">
                    <section className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 text-center">
                        <div className="h-16 w-16 mx-auto rounded-3xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                            <Award className="h-8 w-8" />
                        </div>
                        <h4 className="text-xl font-black mb-2">{profile.xp} XP Points</h4>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-6 leading-relaxed">Top Tier Reputation</p>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-8">
                            <div className="h-full w-[85%] bg-primary" />
                        </div>
                        <div className="flex justify-between items-center px-4">
                            <div>
                                <div className="text-[10px] font-black uppercase text-zinc-500">Reviews</div>
                                <div className="text-xl font-black">42</div>
                            </div>
                            <div className="h-8 w-px bg-white/10" />
                            <div>
                                <div className="text-[10px] font-black uppercase text-zinc-500">Hourly</div>
                                <div className="text-xl font-black">₹{profile.rate || "1200"}</div>
                            </div>
                        </div>
                    </section>

                    <section className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.02]">
                        <h3 className="text-xl font-black mb-8 tracking-tight flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Verified Credentials
                        </h3>
                        <div className="space-y-6">
                            {[
                                { label: "Aadhaar Identity", date: "Verified 2026" },
                                { label: "Phone & OTP", date: "Verified 2026" },
                                { label: "Skill Assessment", date: "Score 9.8/10" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0">
                                    <span className="font-bold text-sm">{item.label}</span>
                                    <span className="text-[10px] font-black uppercase text-emerald-500 tracking-tighter">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

