"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service like Sentry or LogRocket
        console.error("Critical Application Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-8 p-12 rounded-[3.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
                <div className="h-24 w-24 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mx-auto animate-pulse">
                    <AlertTriangle className="h-12 w-12" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-black font-heading tracking-tight">System Anomaly</h1>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                        We&apos;ve encountered a critical execution error. Our engineering team has been notified.
                    </p>
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-[10px] text-red-400 break-all overflow-hidden text-left">
                        ERROR_ID: {error.digest || "UNKNOWN"} <br />
                        MSG: {error.message || "An unexpected error occurred."}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={reset}
                        className="h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                    >
                        <RefreshCcw className="h-4 w-4" /> REBOOT
                    </button>
                    <Link
                        href="/"
                        className="h-16 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                    >
                        <Home className="h-4 w-4" /> ESCAPE
                    </Link>
                </div>
            </div>
        </div>
    );
}
