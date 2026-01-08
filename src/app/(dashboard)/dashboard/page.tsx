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

            // Fetch real financial data (Batching requests)
            const [txsResponse, proposalsResponse] = await Promise.all([
                supabase
                    .from('transactions')
                    .select('amount, type, status')
                    .eq('user_id', user.id)
                    .eq('status', 'completed'),
                supabase
                    .from('proposals')
                    .select('gig_id, status')
                    .eq(isClient ? 'id' : 'provider_id', user.id) // This logic depends on schema, usually providers have user_id
            ]);

            const txs = txsResponse.data || [];

            if (isClient) {
                const { data: gigs } = await supabase
                    .from('gigs')
                    .select('*')
                    .eq('client_id', user.id);

                const totalSpent = txs
                    .filter(t => t.type === 'payment' || t.type === 'milestone_release')
                    .reduce((acc, curr) => acc + curr.amount, 0);

                const stats: ClientStats = {
                    activeProjects: gigs?.filter(g => g.status === 'in_progress').length || 0,
                    totalSpent,
                    talentHired: proposalsResponse.data?.filter(p => p.status === 'accepted').length || 0,
                    openGigs: gigs?.filter(g => g.status === 'open').length || 0
                };

                return { gigs: gigs || [], stats };
            } else {
                const totalEarnings = txs
                    .filter(t => t.type === 'deposit' || t.type === 'incoming' || t.type === 'payment')
                    .reduce((acc, curr) => acc + curr.amount, 0);

                const activeProjects = proposalsResponse.data?.filter(p => p.status === 'accepted').length || 0;

                const stats: ProviderStats = {
                    activeProjects,
                    totalEarnings,
                    successRate: "98%", // Mock for now, should be calculated
                    xp: profile?.xp || 0
                };
                return { stats };
            }
        },
        enabled: !!user && !!profile
    });

    if (isLoading || !profile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6">
                {isClient ? (
                    <ClientDashboard
                        profile={profile}
                        stats={dashboardData?.stats as ClientStats | undefined}
                        gigs={dashboardData?.gigs}
                    />
                ) : (
                    <ProviderDashboard
                        profile={profile}
                        stats={dashboardData?.stats as ProviderStats | undefined}
                    />
                )}
            </div>
        </div>
    );
}
