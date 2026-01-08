"use client";

import React, { useRef, useEffect } from "react";
import { Send, User, MoreVertical, Paperclip, CheckCheck, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import type { Message, Profile } from "@/types";
import type { ChatPartner } from "@/hooks/use-messages";

interface ChatWindowProps {
    user: Profile | null;
    selectedPartner: ChatPartner | null;
    messages: Message[] | undefined;
    isLoading: boolean;
    newMessage: string;
    setNewMessage: (msg: string) => void;
    onSend: (e: React.FormEvent) => void;
    isSending: boolean;
    onBack: () => void;
}

export function ChatWindow({
    user,
    selectedPartner,
    messages,
    isLoading,
    newMessage,
    setNewMessage,
    onSend,
    isSending,
    onBack
}: ChatWindowProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    if (!selectedPartner) {
        return (
            <div className="flex-1 hidden md:flex flex-col items-center justify-center rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                <div className="h-24 w-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-zinc-700">
                    <Send className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black mb-3">Secure Comms</h3>
                <p className="text-zinc-500 text-sm max-w-xs mx-auto italic">Select a partner to establish an encrypted transmission channel.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col rounded-[2.5rem] border border-white/5 bg-white/[0.02] relative overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="md:hidden p-2 text-zinc-500 hover:text-white">Back</button>
                    <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                        {selectedPartner.avatar ? <img src={selectedPartner.avatar} className="h-full w-full object-cover" alt={selectedPartner.name} /> : <User className="h-6 w-6 text-zinc-500" />}
                    </div>
                    <div>
                        <div className="font-black uppercase tracking-tight">{selectedPartner.name}</div>
                        <div className="text-[10px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Secure Encryption Active
                        </div>
                    </div>
                </div>
                <button className="p-2 text-zinc-500 hover:text-white"><MoreVertical className="h-5 w-5" /></button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full"><Circle className="h-10 w-10 animate-spin text-primary opacity-20" /></div>
                ) : messages?.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-zinc-500 text-sm italic">Start a conversation</div>
                ) : messages?.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "flex flex-col max-w-[80%]",
                            msg.sender_id === user?.id ? "ml-auto items-end" : "items-start"
                        )}
                    >
                        <div className={cn(
                            "p-4 md:p-5 rounded-3xl text-sm font-medium leading-relaxed shadow-sm",
                            msg.sender_id === user?.id
                                ? "bg-primary text-white rounded-tr-none"
                                : "bg-white/5 border border-white/5 rounded-tl-none"
                        )}>
                            {msg.content}
                        </div>
                        <div className="flex items-center gap-2 mt-2 px-1">
                            <span className="text-[9px] font-black text-zinc-600 uppercase italic">
                                {format(new Date(msg.created_at), 'hh:mm a')}
                            </span>
                            {msg.sender_id === user?.id && <CheckCheck className="h-3 w-3 text-emerald-500" />}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-6 md:p-8 pt-0">
                <form
                    onSubmit={onSend}
                    className="p-3 md:p-4 rounded-3xl border border-white/10 bg-white/5 flex items-center gap-4 focus-within:border-primary/50 transition-colors"
                >
                    <button type="button" className="p-2 text-zinc-500 hover:text-white transition-colors"><Paperclip className="h-5 w-5" /></button>
                    <input
                        type="text"
                        placeholder="Transmit message..."
                        className="flex-1 bg-transparent border-none outline-none font-medium text-sm"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || isSending}
                        className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:scale-100"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
