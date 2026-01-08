"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, initialized, init, loading } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if (initialized && !user && !pathname.includes('login') && !pathname.includes('signup')) {
            router.push('/login');
        }
    }, [user, initialized, router, pathname]);

    if (loading || !initialized) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
                <div className="relative">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                </div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Initializing Security</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background">
            {children}
        </div>
    );
}
