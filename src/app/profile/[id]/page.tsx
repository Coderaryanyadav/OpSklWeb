"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Star,
    MapPin,
    Briefcase,
    Code,
    Award,
    CircleCheck,
    ExternalLink,
    MessageSquare,
    Share2
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function ProfilePage() {
    const { id } = useParams();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Demo data for profiles
        const sampleProfiles = [
            {
                id: "1",
                name: "Rahul Kumar",
                title: "Senior Full-Stack Developer",
                bio: "Dedicated software architect with 8+ years of experience in building scalable web applications. Specialist in Next.js, Go, and PostgreSQL. I focus on clean code and exceptional user experiences.",
                rating: 4.9,
                reviews: 42,
                xp: 2850,
                location: "Bangalore, KA",
                verified: true,
                aadhaarVerified: true,
                skills: ["Next.js", "TypeSript", "Node.js", "Docker", "Go", "AWS"],
                rate: 1200,
                completedGigs: 38,
                portfolio: [
                    { title: "Fintech App", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
                    { title: "AI Dashboard", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" }
                ]
            }
        ];

        async function fetchProfile() {
            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error || !data) {
                    setProfile(sampleProfiles[0]);
                } else {
                    setProfile(data);
                }
            } catch (err) {
                setProfile(sampleProfiles[0]);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [id]);

    if (loading) return <div className="p-20 text-center">Loading...</div>;
    if (!profile) return <div className="p-20 text-center">Profile not found.</div>;

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Brief Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center sticky top-24"
                    >
                        <div className="relative mx-auto h-32 w-32 mb-6">
                            <div className="h-full w-full rounded-2xl bg-primary flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
                                {profile.name.charAt(0)}
                            </div>
                            {profile.verified && (
                                <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-background border-4 border-background flex items-center justify-center text-primary shadow-lg">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                            )}
                        </div>

                        <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
                        <p className="text-sm text-muted-foreground mb-6">{profile.title}</p>

                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="flex items-center text-primary">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1 text-sm font-bold">{profile.rating}</span>
                            </div>
                            <span className="text-muted-foreground text-sm">•</span>
                            <span className="text-muted-foreground text-sm font-medium">{profile.reviews} Reviews</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-white/[0.05] border border-white/5">
                                <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">XP Points</div>
                                <div className="text-lg font-bold text-primary">{profile.xp}</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.05] border border-white/5">
                                <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Success</div>
                                <div className="text-lg font-bold text-emerald-400">98%</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button className="w-full h-12 rounded-xl" variant="premium">Hire Now</Button>
                            <Button className="w-full h-12 rounded-xl" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Detailed Info */}
                <div className="lg:col-span-3 space-y-10">
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">About</h2>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-9 w-9 border border-white/10 rounded-lg">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {profile.bio}
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Code className="h-5 w-5 text-primary" />
                            Technical Expertise
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {profile.skills.map((skill: string) => (
                                <span key={skill} className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-semibold hover:border-primary/50 transition-colors">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            Certifications & Trust
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Aadhaar Identity Link", status: "Verified", date: "Dec 2024", icon: CircleCheck },
                                { label: "UI Design Specialist (OpSkl Test)", status: "Elite", date: "Jan 2025", icon: Award },
                            ].map((cert, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <cert.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{cert.label}</div>
                                            <div className="text-xs text-muted-foreground">{cert.date}</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{cert.status}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-6">Portfolio Showcase</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {profile.portfolio.map((item: any, i: number) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="group relative overflow-hidden rounded-2xl border border-white/10 aspect-video"
                                >
                                    <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                        <div className="font-bold text-lg">{item.title}</div>
                                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
