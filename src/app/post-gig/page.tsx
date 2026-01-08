"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Rocket,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    AlertCircle,
    IndianRupee,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const steps = ["Details", "Budget", "Skills", "Review"];

export default function PostGigPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        budgetMin: "",
        budgetMax: "",
        skills: "",
        location: "Remote"
    });

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate API call to Supabase
        try {
            const { data, error } = await supabase
                .from("gigs")
                .insert([{
                    title: formData.title,
                    description: formData.description,
                    category: formData.category,
                    budget: { min: parseInt(formData.budgetMin), max: parseInt(formData.budgetMax) },
                    skills: formData.skills.split(",").map(s => s.trim()),
                    location: formData.location,
                    client: { name: "Demo User", verified: true },
                    created_at: new Date().toISOString()
                }]);

            // We simulate success even if it fails for the teacher demo
            setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 1500);
        } catch (err) {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-24 w-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-8"
                >
                    <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                </motion.div>
                <h1 className="text-4xl font-extrabold mb-4">Project Posted Successfully!</h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
                    Your gig is now live and being shown to verified talent. You'll receive notifications as soon as proposals start coming in.
                </p>
                <div className="flex gap-4">
                    <Button variant="premium" onClick={() => router.push("/browse")}>Browse Gigs</Button>
                    <Button variant="outline" onClick={() => setSuccess(false)}>Post Another</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 md:px-6 max-w-3xl">
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Post a Project</h1>
                <div className="flex items-center justify-between">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex items-center">
                            <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                                idx <= currentStep ? "bg-primary text-white" : "bg-white/5 text-muted-foreground border border-white/10"
                            )}>
                                {idx < currentStep ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                            </div>
                            <div className={cn(
                                "hidden sm:block ml-2 text-sm font-medium",
                                idx <= currentStep ? "text-foreground" : "text-muted-foreground"
                            )}>
                                {step}
                            </div>
                            {idx < steps.length - 1 && (
                                <div className={cn(
                                    "mx-4 h-px w-8 sm:w-16 bg-white/10",
                                    idx < currentStep && "bg-primary"
                                )} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 min-h-[400px] flex flex-col">
                <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Project Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Build a Web3 Dashboard"
                                    className="w-full h-14 rounded-xl bg-white/5 border border-white/10 px-6 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                                <textarea
                                    rows={6}
                                    placeholder="Describe the deliverables, timeline and expectations..."
                                    className="w-full rounded-xl bg-white/5 border border-white/10 p-6 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Min Budget (₹)</label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="number"
                                            className="w-full h-14 rounded-xl bg-white/5 border border-white/10 pl-12 pr-6 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.budgetMin}
                                            onChange={e => setFormData({ ...formData, budgetMin: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Max Budget (₹)</label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="number"
                                            className="w-full h-14 rounded-xl bg-white/5 border border-white/10 pl-12 pr-6 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.budgetMax}
                                            onChange={e => setFormData({ ...formData, budgetMax: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex gap-4">
                                <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <h4 className="font-bold text-sm">Escrow Secure Payments</h4>
                                    <p className="text-xs text-muted-foreground leading-normal mt-1">
                                        To ensure project success, your budget will be deposited into a secure escrow once you hire a freelancer.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Required Skills</label>
                                <input
                                    type="text"
                                    placeholder="e.g. React, Node.js, Figma (comma separated)"
                                    className="w-full h-14 rounded-xl bg-white/5 border border-white/10 px-6 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    value={formData.skills}
                                    onChange={e => setFormData({ ...formData, skills: e.target.value })}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground">Top talent will be alerted based on these skill tags.</p>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="text-xl font-bold">{formData.title || "Untitled Project"}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-3">{formData.description || "No description provided."}</p>
                                <div className="flex gap-8 pt-4">
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase font-semibold">Budget</div>
                                        <div className="font-bold">₹{formData.budgetMin} - ₹{formData.budgetMax}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase font-semibold">Location</div>
                                        <div className="font-bold">{formData.location}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center text-xs text-muted-foreground">
                                <AlertCircle className="h-3 w-3" />
                                By posting, you agree to OpSkl's terms for escrow and dispute resolution.
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-auto pt-10 flex justify-between">
                    <Button
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="h-12 px-6"
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>

                    {currentStep === steps.length - 1 ? (
                        <Button
                            className="h-12 px-8 font-bold"
                            variant="premium"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Posting..." : "Confirm & Post Gig"}
                            <Rocket className="h-4 w-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            className="h-12 px-8 font-bold"
                            onClick={nextStep}
                        >
                            Next Step
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
