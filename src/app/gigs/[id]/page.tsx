"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Loader2, MapPin, Calendar, Share2, ShieldCheck, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import Image from "next/image";
import type { Gig } from "@/types";

export default function GigDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { profile } = useAuthStore();
    const gigId = params.id as string;

    const { data: gig, isLoading } = useQuery({
        queryKey: ['gig', gigId],
        queryFn: async () => {
            // Logic to handle numeric ID if DB implies number
            // But params.id is string. Supabase usually handles flexible equality.
            const { data, error } = await supabase
                .from('gigs')
                .select('*, client:profiles(*)')
                .eq('id', gigId)
                .single();

            if (error) throw error;
            return data as Gig;
        }
    });

    const handleApply = () => {
        if (!profile) {
            toast.error("Please login to apply");
            router.push('/login');
            return;
        }
        if (profile.role !== 'provider') {
            toast.error("Only providers can apply for gigs");
            return;
        }
        // Mock application
        toast.success("Application submitted successfully!");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    if (!gig) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <h1 className="text-2xl font-bold">Gig Not Found</h1>
                <button onClick={() => router.push('/gigs')} className="text-primary hover:underline">Back to Marketplace</button>
            </div>
        );
    }

    // JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": gig.title,
        "description": gig.description,
        "datePosted": gig.created_at,
        "validThrough": new Date(new Date(gig.created_at).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        "employmentType": "CONTRACTOR",
        "hiringOrganization": {
            "@type": "Organization",
            "name": gig.client?.name || "OpSkl Client",
            "logo": gig.client?.avatar || "https://opskl.com/logo.png"
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": gig.location || "Remote",
                "addressCountry": "IN"
            }
        },
        "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "INR",
            "value": {
                "@type": "QuantitativeValue",
                "minValue": gig.budget_min,
                "maxValue": gig.budget_max,
                "unitText": "PROJECT"
            }
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-24">
            <Navbar />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="mb-8">
                    <button onClick={() => router.back()} className="text-zinc-500 hover:text-white transition-colors mb-4 text-sm font-medium">
                        ← Back to Transmissions
                    </button>

                    <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest mb-3">
                                <span className="px-2 py-1 rounded bg-primary/10 border border-primary/20">{gig.category || 'Job'}</span>
                                {gig.status === 'open' && <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">ACTIVE</span>}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight mb-4 leading-tight">{gig.title}</h1>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400 font-medium">
                                <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {gig.location || 'Remote'}</span>
                                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Posted {new Date(gig.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <div className="text-2xl md:text-3xl font-black text-white flex items-center gap-1">
                                <span className="text-zinc-500 text-lg font-medium mr-2">Budget</span>
                                ₹{gig.budget_min.toLocaleString()} - ₹{gig.budget_max.toLocaleString()}
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <Share2 className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={handleApply}
                                    className="px-8 py-3 rounded-xl bg-primary text-white font-bold uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex-1 md:flex-none text-center"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="p-8 rounded-[2.5rem] border border-white/10 bg-white/[0.02]">
                            <h3 className="text-lg font-black mb-4 flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /> Scope of Work</h3>
                            <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed whitespace-pre-wrap">
                                {gig.description}
                            </div>
                        </section>

                        <section className="p-8 rounded-[2.5rem] border border-white/10 bg-white/[0.02]">
                            <h3 className="text-lg font-black mb-4">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {gig.skills.map((skill) => (
                                    <span key={skill} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-bold text-sm text-zinc-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/[0.02] sticky top-24">
                            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6">Client Profile</h3>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                                    {gig.client?.avatar ? (
                                        <Image src={gig.client.avatar} alt={gig.client.name} width={64} height={64} className="h-full w-full object-cover" unoptimized />
                                    ) : (
                                        <div className="text-2xl font-black">{gig.client?.name.charAt(0)}</div>
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold text-lg">{gig.client?.name}</div>
                                    <div className="flex items-center gap-1 text-emerald-500 text-xs font-black uppercase">
                                        <ShieldCheck className="h-3 w-3" /> Verified Payment
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Member Since</span>
                                    <span className="font-bold">2023</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Gigs Posted</span>
                                    <span className="font-bold">12</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-bold text-sm transition-colors">
                                View Full Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
