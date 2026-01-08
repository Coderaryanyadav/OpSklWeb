"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Loader2, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
    id: string;
    created_at: string;
    amount: number;
    type: 'deposit' | 'withdrawal' | 'payment' | 'incoming';
    status: 'completed' | 'pending' | 'failed';
    description?: string;
}

export function TransactionList({ userId }: { userId?: string }) {
    const { data: transactions, isLoading } = useQuery({
        queryKey: ['transactions', userId],
        queryFn: async () => {
            if (!userId) return [];
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(20);

            if (error) throw error;
            return data as Transaction[];
        },
        enabled: !!userId,
    });

    if (isLoading) {
        return <div className="p-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-zinc-500" /></div>;
    }

    if (!transactions || transactions.length === 0) {
        return (
            <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                <p className="text-zinc-500 font-bold italic">No transactions yet. Start by adding funds or completing a gig.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {transactions.map((tx) => (
                <div key={tx.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${tx.type === 'deposit' || tx.type === 'incoming'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-red-500/10 text-red-500'
                            }`}>
                            {tx.type === 'deposit' || tx.type === 'incoming'
                                ? <ArrowDownLeft className="h-6 w-6" />
                                : <ArrowUpRight className="h-6 w-6" />
                            }
                        </div>
                        <div>
                            <div className="font-bold text-sm capitalize mb-0.5 text-white group-hover:text-primary transition-colors">
                                {tx.type.replace('_', ' ')}
                            </div>
                            <div className="text-[10px] uppercase font-black tracking-wider text-zinc-500">
                                {format(new Date(tx.created_at), 'MMM dd, yyyy • hh:mm a')}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-lg font-black font-heading ${tx.type === 'deposit' || tx.type === 'incoming'
                            ? 'text-emerald-500'
                            : 'text-white'
                            }`}>
                            {tx.type === 'deposit' || tx.type === 'incoming' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                        </div>
                        <div className={`text-[10px] font-black uppercase tracking-widest ${tx.status === 'completed' ? 'text-zinc-500' : 'text-yellow-500'
                            }`}>
                            {tx.status}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
