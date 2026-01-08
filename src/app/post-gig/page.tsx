"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useAuthStore } from "@/stores/auth-store";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Briefcase, DollarSign, MapPin, Tag, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PostGigPage() {
    const { user } = useAuthStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Development",
        budgetMin: "",
        budgetMax: "",
        skills: "",
        location: "Remote",
    });

    const validate = () => {
        if (!formData.title.trim()) {
            toast.error("Project title is required");
            return false;
        }
        if (!formData.description.trim() || formData.description.length < 50) {
            toast.error("Description must be at least 50 characters");
            return false;
        }
        if (!formData.budgetMin || !formData.budgetMax) {
            toast.error("Budget range is required");
            return false;
        }
        if (parseInt(formData.budgetMin) >= parseInt(formData.budgetMax)) {
            toast.error("Maximum budget must be greater than minimum");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!user) {
            toast.error("You must be logged in to broadcast projects");
            router.push("/login");
            return;
        }

        if (!validate()) return;
        setLoading(true);

        try {
            const { error } = await supabase.from('gigs').insert({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                budget_min: parseInt(formData.budgetMin),
                budget_max: parseInt(formData.budgetMax),
                skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
                location: formData.location,
                client_id: user.id,
                status: 'open'
            });

            if (error) throw error;

            toast.success("Project broadcasted to marketplace!");
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err.message || "Failed to post gig");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-3">
                        <Briefcase className="h-3.5 w-3.5" />
                        Broadcast to Verified Network
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight">
                        Post New <span className="text-muted-foreground">Project</span>
                    </h1>
                </header>

                <div className="space-y-8">
                    <div className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.02]">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Project Title</label>
                                <input
                                    type="text"
                                    placeholder="E.g. Modern E-Commerce Platform Redesign"
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Detailed Description ({formData.description.length} chars)</label>
                                <textarea
                                    placeholder="Describe the project scope, requirements, and deliverables..."
                                    className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Category</label>
                                    <select
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="Development">Development</option>
                                        <option value="Design">Design</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Writing">Writing</option>
                                        <option value="Blockchain">Blockchain</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Location</label>
                                    <input
                                        type="text"
                                        placeholder="Remote or City Name"
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Minimum Budget (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="10000"
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                                        value={formData.budgetMin}
                                        onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Maximum Budget (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="50000"
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                                        value={formData.budgetMax}
                                        onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Required Skills (comma separated)</label>
                                <input
                                    type="text"
                                    placeholder="React, Node.js, PostgreSQL"
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                                    value={formData.skills}
                                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Broadcast Project"}
                    </button>
                </div>
            </div>
        </div>
    );
}
