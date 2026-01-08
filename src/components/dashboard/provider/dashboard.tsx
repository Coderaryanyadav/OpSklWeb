"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Briefcase, DollarSign, CheckCircle2, ShieldCheck, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Profile } from "@/types";

const data = [
    { name: 'Mon', total: 4000 },
    { name: 'Tue', total: 3000 },
    { name: 'Wed', total: 5000 },
    { name: 'Thu', total: 2780 },
    { name: 'Fri', total: 6890 },
    { name: 'Sat', total: 2390 },
    { name: 'Sun', total: 3490 },
];

interface ProviderDashboardProps {
    profile: Profile;
    stats?: {
        activeProjects: number;
        totalEarnings: number;
        successRate: string;
        xp: number;
    };
}

export function ProviderDashboard({ profile, stats }: ProviderDashboardProps) {
    const statCards = [
        { label: "Active Gigs", value: stats?.activeProjects.toString() || "0", icon: Briefcase, color: "text-blue-500", detail: "Active work" },
        { label: "Total Earnings", value: `₹${stats?.totalEarnings.toLocaleString() || "0"}`, icon: DollarSign, color: "text-emerald-500", detail: "Life-time" },
        { label: "Success Rate", value: stats?.successRate || "0%", icon: CheckCircle2, color: "text-purple-500", detail: "Top tier status" },
        { label: "XP Points", value: stats?.xp.toString() || profile.xp.toString(), icon: Zap, color: "text-purple-500", detail: "Level 12 Provider" },
    ];

    const completionItems = [
        { label: "Aadhaar Verified", done: profile.verified },
        { label: "Profile Photo", done: !!profile.avatar },
        { label: "Skills Tagged", done: profile.skills.length > 0 },
        { label: "Bio Written", done: !!profile.bio },
    ];
    const completionRate = Math.round((completionItems.filter(i => i.done).length / completionItems.length) * 100);

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-3">
                        <Zap className="h-3 w-3" />
                        Service Provider Hub
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight">
                        Dashboard
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/gigs"
                        className="h-14 px-8 rounded-2xl bg-primary text-white flex items-center gap-2 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:scale-105 transition-all"
                    >
                        Find Work <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                    <div
                        key={idx}
                        className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={cn("p-3 rounded-xl bg-white/5 border border-white/10", stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className="text-[10px] font-black text-emerald-500">{stat.detail}</div>
                        </div>
                        <div>
                            <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className="text-3xl font-black font-heading tracking-tight">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <section className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.03]">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black tracking-tight">Earnings Stream</h3>
                                <p className="text-sm text-zinc-500 font-medium">Revenue flow for current week</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-emerald-500">₹{stats?.totalEarnings.toLocaleString() || "0"}</div>
                                <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Withdrawal Ready</div>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#71717a', fontSize: 12, fontWeight: 900 }}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#09090b', borderRadius: '16px', border: '1px solid #ffffff10', fontSize: '12px' }}
                                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#4F46E5"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorTotal)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.03]">
                        <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            Onboarding Health
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-end justify-between mb-2">
                                <div className="text-3xl font-black tracking-tighter">{completionRate}%</div>
                                <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Profile Strength</div>
                            </div>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${completionRate}%` }}
                                    className="h-full bg-emerald-500"
                                />
                            </div>
                            <div className="space-y-3 pt-4">
                                {completionItems.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className={cn("h-4 w-4 rounded-full flex items-center justify-center", item.done ? "bg-emerald-500/20 text-emerald-500" : "bg-white/5 text-zinc-600")}>
                                            <CheckCircle2 className="h-2.5 w-2.5" />
                                        </div>
                                        <span className={cn("text-xs font-bold", item.done ? "text-zinc-300" : "text-zinc-600")}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
                        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                            <ShieldCheck className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-black tracking-tight mb-2">Reputation Level</h3>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-8 italic">Verified Provider since 2026</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Total Ratings</div>
                                <div className="text-xl font-black">0</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Avg Rating</div>
                                <div className="text-xl font-black flex items-center gap-1">
                                    {profile.rating} <Star className="h-3 w-3 fill-current text-yellow-500" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
