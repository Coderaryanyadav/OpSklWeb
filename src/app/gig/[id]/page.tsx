"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Clock,
    ShieldCheck,
    ExternalLink,
    Info,
    ChevronRight,
    Zap,
    Lock
} from "lucide-react";
import { formatCurrency, timeAgo } from "@/lib/utils";

export default function GigDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [gig, setGig] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGig() {
            // For demo, we'll try to find it in sample data if id is 1, 2, or 3
            const samples = [
                {
                    id: "1",
                    title: "E-commerce Website Design",
                    description: "We are launching a new high-end fashion label and need a website that reflects our brand's premium identity. The ideal candidate has a strong portfolio in luxury brand design and experience with modern frameworks.\n\nKey Requirements:\n- Interactive UI elements\n- Mobile-first responsive design\n- Integration with Shopify backend\n- SEO-friendly architecture",
                    budget: { min: 15000, max: 25000 },
                    skills: ["UI/UX", "Figma", "React", "Shopify"],
                    client: {
                        name: "Priya Sharma",
                        verified: true,
                        completedGigs: 12,
                        rating: 4.9
                    },
                    location: "Mumbai, Maharashtra",
                    postedDate: new Date().toISOString()
                }
            ];

            try {
                const { data, error } = await supabase
                    .from("gigs")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error || !data) {
                    const sample = samples.find(s => s.id === id);
                    if (sample) setGig(sample);
                } else {
                    setGig(data);
                }
            } catch (err) {
                setGig(samples[0]);
            } finally {
                setLoading(false);
            }
        }

        fetchGig();
    }, [id]);

    if (loading) return <div className="p-20 text-center">Loading...</div>;
    if (!gig) return <div className="p-20 text-center">Gig not found.</div>;

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 max-w-5xl">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Browse
            </button>

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
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{gig.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {gig.location}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Posted {timeAgo(gig.postedDate)}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="prose prose-invert max-w-none"
                    >
                        <h3 className="text-xl font-bold mb-4">Description</h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {gig.description}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-xl font-bold mb-4">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {gig.skills.map((skill: string) => (
                                <div key={skill} className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-medium">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-6"
                    >
                        <div className="space-y-1">
                            <span className="text-sm text-muted-foreground">Budget</span>
                            <div className="text-3xl font-bold text-primary">
                                {formatCurrency(gig.budget.min)} - {formatCurrency(gig.budget.max)}
                            </div>
                        </div>

                        <Button className="w-full h-12 text-base font-bold shadow-xl shadow-primary/20" variant="premium">
                            Apply Now
                        </Button>

                        <div className="pt-6 border-t border-white/10 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Proposal limit:</span>
                                <span className="font-semibold text-foreground">50</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Applied:</span>
                                <span className="font-semibold text-foreground">12</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                    >
                        <h4 className="font-bold mb-4">Client Information</h4>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                                {gig.client.name.charAt(0)}
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5 font-semibold">
                                    {gig.client.name}
                                    {gig.client.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
                                </div>
                                <div className="text-xs text-muted-foreground">Member since 2024</div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <ChevronRight className="h-3 w-3 text-primary" />
                                <span>{gig.client.completedGigs || 5} gigs posted</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-emerald-400">
                                <Zap className="h-3 w-3" />
                                <span>Verified Payment Method</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 flex gap-3 items-start">
                        <Lock className="h-5 w-5 text-primary shrink-0" />
                        <div className="text-xs leading-normal">
                            <span className="font-bold block mb-1">OpSkl Escrow Protected</span>
                            Your payment is guaranteed. Funds are held securely until the work is delivered.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
