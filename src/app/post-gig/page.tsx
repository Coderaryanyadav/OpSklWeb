"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useAuthStore } from "@/stores/auth-store";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Briefcase } from "lucide-react";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PostGigPage() {
    const { profile } = useAuthStore();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Development",
        budgetMin: "",
        budgetMax: "",
        skills: "",
        location: "Remote",
    });

    // CRITICAL: Only CLIENTS can post gigs
    useEffect(() => {
        if (profile && profile.role !== 'client') {
            toast.error("Access denied. Providers browse and apply for gigs.");
            router.push('/gigs');
        }
    }, [profile, router]);

    const postGigMutation = useMutation({
        mutationFn: async () => {
            if (!profile) throw new Error("Authentication required");

            const { error } = await supabase.from('gigs').insert({
                title: formData.title.trim(),
                description: formData.description.trim(),
                category: formData.category,
                budget_min: parseInt(formData.budgetMin),
                budget_max: parseInt(formData.budgetMax),
                skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
                location: formData.location.trim(),
                client_id: profile.id,
                status: 'open'
            });

            if (error) throw error;
        },
        onSuccess: () => {
            toast.success("Project broadcasted successfully!");
            queryClient.invalidateQueries({ queryKey: ['gigs'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard_stats'] });
            router.push("/dashboard");
        },
        onError: (error) => {
            const message = error instanceof Error ? error.message : "Failed to broadcast project";
            toast.error(message);
        }
    });

    if (!profile || profile.role !== 'client') {
        return null;
    }

    const validate = () => {
        if (!formData.title.trim() || formData.title.length < 10) {
            toast.error("Project title must be at least 10 characters");
            return false;
        }
        if (formData.title.length > 100) {
            toast.error("Project title is too long (max 100 characters)");
            return false;
        }
        if (!formData.description.trim() || formData.description.length < 50) {
            toast.error("Description must be at least 50 characters to attract elite talent");
            return false;
        }
        if (formData.description.length > 5000) {
            toast.error("Description is too long (max 5000 characters)");
            return false;
        }
        const min = parseInt(formData.budgetMin);
        const max = parseInt(formData.budgetMax);

        if (isNaN(min) || isNaN(max)) {
            toast.error("Budget must be a valid number");
            return false;
        }
        if (min < 500) {
            toast.error("Minimum budget is ₹500");
            return false;
        }
        if (max > 10000000) {
            toast.error("Budget exceeds platform limits (₹1 Cr)");
            return false;
        }
        if (min >= max) {
            toast.error("Maximum budget must be strictly greater than minimum");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (validate()) {
            postGigMutation.mutate();
        }
    };

    const loading = postGigMutation.isPending;


    return (
        <div className="min-h-screen pt-24 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-3">
                        <Briefcase className="h-3.5 w-3.5" />
                        Broadcast to Verified Network
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-4">Post a Project</h1>
                    <p className="text-zinc-500 font-medium text-lg max-w-xl">
                        Connect with elite, verified talent. Encrypted communications. Smart Contracts.
                    </p>
                </header>

                <div className="p-8 md:p-10 rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                    <div className="space-y-8 relative">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Project Title</label>
                            <input
                                type="text"
                                placeholder="e.g. Senior React Developer for Fintech App"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 font-bold outline-none focus:border-primary/50 transition-colors"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Description</label>
                            <textarea
                                placeholder="Detail the scope, requirements, and deliverables..."
                                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 font-medium outline-none focus:border-primary/50 transition-colors resize-none"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Budget Min (₹)</label>
                                <input
                                    type="number"
                                    placeholder="50000"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold outline-none focus:border-primary/50 transition-colors"
                                    value={formData.budgetMin}
                                    onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Budget Max (₹)</label>
                                <input
                                    type="number"
                                    placeholder="100000"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold outline-none focus:border-primary/50 transition-colors"
                                    value={formData.budgetMax}
                                    onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Category</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold outline-none focus:border-primary/50 transition-colors appearance-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Development" className="bg-zinc-900">Development</option>
                                    <option value="Design" className="bg-zinc-900">Design</option>
                                    <option value="Marketing" className="bg-zinc-900">Marketing</option>
                                    <option value="Writing" className="bg-zinc-900">Writing</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Location</label>
                                <input
                                    type="text"
                                    placeholder="Remote, India, etc."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold outline-none focus:border-primary/50 transition-colors"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Skills (comma separated)</label>
                            <input
                                type="text"
                                placeholder="React, Node.js, TypeScript..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 font-bold outline-none focus:border-primary/50 transition-colors"
                                value={formData.skills}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-lg shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
                        >
                            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Broadcast Project"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
