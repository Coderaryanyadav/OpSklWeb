"use client";

import React from "react";
import { Search, Circle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatPartner } from "@/hooks/use-messages";
import Image from "next/image";

interface ChatSidebarProps {
    partners: ChatPartner[] | undefined;
    isLoading: boolean;
    selectedPartnerId?: string;
    onSelectPartner: (partner: ChatPartner) => void;
    isVisible: boolean;
}

export function ChatSidebar({ partners, isLoading, selectedPartnerId, onSelectPartner, isVisible }: ChatSidebarProps) {
    return (
        <div className={cn(
            "w-full md:w-[380px] flex flex-col rounded-[2.5rem] border border-white/5 bg-white/[0.02] overflow-hidden transition-all",
            !isVisible && "hidden md:flex"
        )}>
            <div className="p-6 border-b border-white/5">
                <h2 className="text-xl font-black mb-6">Transmissions</h2>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search freq..."
                        className="w-full h-12 bg-white/5 rounded-2xl pl-12 pr-4 text-sm font-medium outline-none border border-transparent focus:border-primary/20 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {isLoading ? (
                    <div className="flex justify-center py-10"><Circle className="h-6 w-6 animate-pulse text-primary" /></div>
                ) : partners?.length === 0 ? (
                    <div className="text-center py-10 text-zinc-500 text-sm italic">No conversations yet</div>
                ) : partners?.map((partner) => (
                    <button
                        key={partner.id}
                        onClick={() => onSelectPartner(partner)}
                        className={cn(
                            "w-full p-4 rounded-3xl flex items-center gap-4 transition-all hover:bg-white/5 group",
                            selectedPartnerId === partner.id ? "bg-primary/10 border border-primary/20" : "border border-transparent"
                        )}
                    >
                        <div className="relative">
                            <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                {partner.avatar ? (
                                    <Image
                                        src={partner.avatar}
                                        className="h-full w-full object-cover"
                                        alt={partner.name}
                                        width={48}
                                        height={48}
                                        unoptimized
                                    />
                                ) : (
                                    <User className="h-6 w-6 text-zinc-500" />
                                )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-zinc-950" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                            <div className="font-black text-sm truncate uppercase tracking-tight">{partner.name}</div>
                            <div className="text-xs text-zinc-500 truncate font-medium">Tap to open</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
