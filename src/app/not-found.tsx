"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Ghost, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[128px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 glass-card p-12 rounded-[3rem] border border-white/10 max-w-lg w-full"
            >
                <div className="mb-8 flex justify-center">
                    <div className="h-24 w-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Ghost className="h-12 w-12 text-zinc-400" />
                    </div>
                </div>

                <h1 className="text-8xl font-black font-heading tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                    404
                </h1>

                <h2 className="text-xl font-bold uppercase tracking-widest text-primary mb-6">
                    Signal Lost
                </h2>

                <p className="text-muted-foreground mb-10 leading-relaxed">
                    The frequency you are trying to reach is inactive or does not exist on this timeline.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="h-14 px-8 rounded-2xl bg-primary text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20"
                    >
                        <Home className="h-4 w-4" /> Base Command
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="h-14 px-8 rounded-2xl bg-white/5 text-white border border-white/10 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all hover:scale-105"
                    >
                        <ArrowLeft className="h-4 w-4" /> Retreat
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
