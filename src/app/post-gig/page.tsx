"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import { motion, AnimatePresence } from "framer-motion";
import {
    Rocket,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    AlertCircle,
    IndianRupee,
    Target,
    Layout,
    FileText,
    Loader2
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const steps = ["Objectives", "Financials", "Skills", "Review"];

export default function PostGigPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user } = useAuthStore();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Development",
        budgetMin: "",
        budgetMax: "",
        skills: "",
        location: "Remote"
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (currentStep === 0) {
            if (!formData.title) newErrors.title = "Project headline is required";
            if (formData.description.length < 50) newErrors.description = "Provide at least 50 chars of context";
        }
        if (currentStep === 1) {
            if (!formData.budgetMin) newErrors.budgetMin = "Entry budget required";
            if (!formData.budgetMax) newErrors.budgetMax = "Cap budget required";
            if (Number(formData.budgetMin) >= Number(formData.budgetMax)) newErrors.budgetMax = "Cap must exceed entry";
        }
        if (currentStep === 2) {
            if (!formData.skills) newErrors.skills = "Define at least one stack requirement";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleSubmit = async () => {
        if (!validate()) return;
        setLoading(true);

        try {
            const { error } = await supabase
                .from('gigs')
                .insert({
                    title: formData.title,
                    description: formData.description,
                    category: formData.category,
                    budget_min: parseInt(formData.budgetMin),
                    budget_max: parseInt(formData.budgetMax),
                    skills: formData.skills.split(',').map(s => s.trim()),
                    location: formData.location,
                    client_id: user?.id,
                    status: 'open'
                })
                .select();

            if (error) throw error;

            toast.success("Project broadcasted to the network!");
            router.push("/dashboard");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to publish gig";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <header className="mb-16 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-4">
                        <Target className="h-3.5 w-3.5" />
                        Project Scaler
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black font-heading tracking-tighter mb-4">
                        Scale Your <span className="text-muted-foreground italic">Big Idea.</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">Define your requirements and connect with India&apos;s most verified professionals.</p>
                </header>

                {/* Stepper */}
                <div className="mb-12 flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-4 group">
                            <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center text-xs font-black transition-all",
                                idx === currentStep ? "bg-primary text-white shadow-lg shadow-primary/20" :
                                    idx < currentStep ? "bg-emerald-500 text-white" : "bg-white/5 text-muted-foreground"
                            )}>
                                {idx < currentStep ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                            </div>
                            <span className={cn(
                                "hidden md:block text-[10px] font-black uppercase tracking-widest",
                                idx <= currentStep ? "text-white" : "text-muted-foreground"
                            )}>
                                {step}
                            </span>
                            {idx < steps.length - 1 && <div className="hidden lg:block w-12 h-px bg-white/5 mx-2" />}
                        </div>
                    ))}
                </div>

                <div className="p-10 md:p-14 rounded-[3rem] border border-white/10 bg-white/[0.02] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Rocket className="h-48 w-48" />
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-10 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {currentStep === 0 && (
                                <motion.div
                                    key="step0"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                            <Layout className="h-3 w-3" /> Project Headline
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Architect a high-fidelity Web3 Dashboard for Fintech Scaleup"
                                            className={cn(
                                                "w-full h-16 bg-white/5 border rounded-2xl px-6 text-lg font-medium outline-none transition-all",
                                                errors.title ? "border-red-500/50" : "border-white/10 focus:ring-2 focus:ring-primary/50"
                                            )}
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                        {errors.title && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"><AlertCircle className="h-3 w-3" /> {errors.title}</p>}
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                            <FileText className="h-3 w-3" /> Precise Context
                                        </label>
                                        <textarea
                                            rows={6}
                                            placeholder="Explain deliverables, timeline and specific tech requirements..."
                                            className={cn(
                                                "w-full bg-white/5 border rounded-2xl p-6 text-lg font-medium outline-none transition-all resize-none italic leading-relaxed",
                                                errors.description ? "border-red-500/50" : "border-white/10 focus:ring-2 focus:ring-primary/50"
                                            )}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                        <div className="flex justify-between items-center px-1">
                                            {errors.description && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"><AlertCircle className="h-3 w-3" /> {errors.description}</p>}
                                            <span className={cn("text-[10px] font-black uppercase tracking-widest ml-auto", formData.description.length >= 50 ? "text-emerald-500" : "text-muted-foreground")}>
                                                {formData.description.length} / 50 min chars
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-12"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Entry Budget (INR)</label>
                                            <div className="relative group">
                                                <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                                                <input
                                                    type="number"
                                                    placeholder="5000"
                                                    className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 text-2xl font-black outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                    value={formData.budgetMin}
                                                    onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Cap Budget (INR)</label>
                                            <div className="relative group">
                                                <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                                                <input
                                                    type="number"
                                                    placeholder="15000"
                                                    className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 text-2xl font-black outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                    value={formData.budgetMax}
                                                    onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {errors.budgetMax && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"><AlertCircle className="h-3 w-3" /> {errors.budgetMax}</p>}

                                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-6">
                                        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <Target className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm text-zinc-400 italic">Opacity Escrow will secure this project. Funds are released only upon milestone clearance.</p>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Stack Requirement (Comma Separated)</label>
                                        <input
                                            type="text"
                                            placeholder="React, Tailwind, Node.js, AWS..."
                                            className={cn(
                                                "w-full h-16 bg-white/5 border rounded-2xl px-6 text-lg font-medium outline-none transition-all",
                                                errors.skills ? "border-red-500/50" : "border-white/10 focus:ring-2 focus:ring-primary/50"
                                            )}
                                            value={formData.skills}
                                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        />
                                        {errors.skills && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"><AlertCircle className="h-3 w-3" /> {errors.skills}</p>}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {formData.skills.split(',').filter(s => s.trim()).map((skill, idx) => (
                                            <div key={idx} className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-black uppercase tracking-widest text-primary">
                                                {skill.trim()}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-8">
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Final Brief</h4>
                                            <h3 className="text-3xl font-black font-heading tracking-tight mb-4">{formData.title}</h3>
                                            <p className="italic text-zinc-400 leading-relaxed border-l-4 border-primary pl-6">&quot;{formData.description}&quot;</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">Committed Budget</h4>
                                                <div className="text-2xl font-black text-emerald-500">₹{formData.budgetMin} - ₹{formData.budgetMax}</div>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">Stack Summary</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.skills.split(',').slice(0, 3).map((s, i) => (
                                                        <span key={i} className="text-xs font-bold">{s.trim()}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <button
                                type="button"
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors disabled:opacity-0"
                            >
                                <ChevronLeft className="h-4 w-4" /> Back
                            </button>

                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
                                    disabled={loading}
                                    className="flex-1 sm:flex-none h-14 px-12 rounded-2xl bg-primary text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/25 hover:scale-105 active:scale-95 transition-all"
                                >
                                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                        currentStep === steps.length - 1 ? (
                                            <>Broadcast Project <Rocket className="h-5 w-5" /></>
                                        ) : (
                                            <>Next Step <ChevronRight className="h-4 w-4" /></>
                                        )
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
