"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, Star, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const sampleTalent = [
    {
        id: "1",
        name: "Rahul Kumar",
        title: "Senior Full-Stack Developer",
        rating: 4.9,
        reviews: 42,
        location: "Bangalore",
        verified: true,
        skills: ["Next.js", "TypeScript", "Node.js"],
        rate: 1200
    },
    {
        id: "2",
        name: "Aisha Verma",
        title: "UI/UX Designer",
        rating: 4.8,
        reviews: 29,
        location: "Remote",
        verified: true,
        skills: ["Figma", "Branding", "Webflow"],
        rate: 950
    },
    {
        id: "3",
        name: "Vikram Singh",
        title: "Python & Data Scientist",
        rating: 5.0,
        reviews: 12,
        location: "Delhi",
        verified: false,
        skills: ["Python", "TensorFlow", "Pandas"],
        rate: 1500
    }
];

export default function TalentPage() {
    const [talent, setTalent] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTalent() {
            try {
                const { data, error } = await supabase.from("profiles").select("*");
                if (error || !data || data.length === 0) {
                    setTalent(sampleTalent);
                } else {
                    setTalent(data);
                }
            } catch (err) {
                setTalent(sampleTalent);
            } finally {
                setLoading(false);
            }
        }
        fetchTalent();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">Find Verified Talent</h1>
                <p className="text-muted-foreground">Work with the top 1% of Indian freelancers, verified by Aadhaar.</p>
            </div>

            <div className="flex gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by skill or title..."
                        className="h-12 w-full rounded-xl bg-white/[0.03] border border-white/10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <Button className="h-12 border-white/10" variant="outline">Filters</Button>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {talent.map((person, idx) => (
                        <motion.div
                            key={person.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                                    {person.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 font-bold text-lg">
                                        {person.name}
                                        {person.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{person.title}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm mb-6">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-primary fill-primary" />
                                    <span className="font-bold">{person.rating}</span>
                                    <span className="text-muted-foreground">({person.reviews})</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    {person.location}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {person.skills.map((skill: string) => (
                                    <span key={skill} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <div>
                                    <span className="text-lg font-bold">₹{person.rate}</span>
                                    <span className="text-xs text-muted-foreground">/hr</span>
                                </div>
                                <Button size="sm" variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                                    <Link href={`/profile/${person.id}`}>View Profile</Link>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
