"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        // You could send this to an error reporting service like Sentry here
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                    <Navbar />
                    <div className="max-w-md w-full p-8 rounded-[3rem] border border-red-500/10 bg-red-500/5 text-center space-y-8">
                        <div className="mx-auto w-24 h-24 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-500">
                            <AlertCircle size={48} />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-3xl font-black font-heading tracking-tight">System Interrupt</h2>
                            <p className="text-muted-foreground italic leading-relaxed">
                                A critical logic exception occurred in the application layer. Our systems have safely isolated the error.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <RefreshCcw size={18} /> Re-initialize App
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                            >
                                <Home size={18} /> Return to Safety
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
