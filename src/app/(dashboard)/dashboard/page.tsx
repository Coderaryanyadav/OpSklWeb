"use client";

import React from "react";
import { useAuthStore } from "@/stores/auth-store";
import { Navbar } from "@/components/layout/navbar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { ClientDashboard } from "@/components/dashboard/client/dashboard";
import { ProviderDashboard } from "@/components/dashboard/provider/dashboard";
import { Loader2 } from "lucide-react";

interface ClientStats {
    activeProjects: number;
    totalSpent: number;
    talentHired: number;
    openGigs: number;
}

interface ProviderStats {
    activeProjects: number;
    totalEarnings: number;
    successRate: string;
    xp: number;
}

export default function DashboardPage() {
    const { user, profile } = useAuthStore();

    const isClient = profile?.role === 'client';

    const { data: dashboardData, isLoading } = useQuery({
        queryKey: ['dashboard_stats', user?.id, isClient],
        queryFn: async () => {
            if (!user) return null;

            if (isClient) {
                const { data: gigs } = await supabase
                    .from('gigs')
                    .select('*')
                    .eq('client_id', user.id);

                const stats: ClientStats = {
                    activeProjects: gigs?.filter(g => g.status === 'in_progress').length || 0,
                    totalSpent: 0,
                    talentHired: 0,
                    openGigs: gigs?.filter(g => g.status === 'open').length || 0
                };

                return { gigs: gigs || [], stats };
            } else {
                const stats: ProviderStats = {
                    activeProjects: 0,
                    totalEarnings: 0,
                    successRate: "0%",
                    xp: profile?.xp || 0
                };
                return { stats };
            }
        },
        enabled: !!user
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6">
                {isClient ? (
                    <ClientDashboard
                        profile={profile!}
                        stats={dashboardData?.stats as ClientStats | undefined}
                        gigs={dashboardData?.gigs}
                    />
                ) : (
                    <ProviderDashboard
                        profile={profile!}
                        stats={dashboardData?.stats as ProviderStats | undefined}
                    />
                )}
            </div>
        </div>
    );
}
