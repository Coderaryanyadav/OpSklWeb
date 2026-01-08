"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { supabase } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Message, Profile } from "@/types";

export interface ChatPartner {
    id: string;
    name: string;
    avatar: string | null;
}

export function useMessages(selectedPartnerId?: string) {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const [newMessage, setNewMessage] = useState("");

    // Fetch unique partners
    const { data: partners, isLoading: partnersLoading } = useQuery({
        queryKey: ['chat_partners', user?.id],
        queryFn: async () => {
            if (!user) return [];
            const { data: sentMessages } = await supabase
                .from('messages')
                .select('receiver_id')
                .eq('sender_id', user.id);

            const { data: receivedMessages } = await supabase
                .from('messages')
                .select('sender_id')
                .eq('receiver_id', user.id);

            const partnerIds = Array.from(new Set([
                ...(sentMessages?.map(m => m.receiver_id) || []),
                ...(receivedMessages?.map(m => m.sender_id) || [])
            ]));

            if (partnerIds.length === 0) return [];

            const { data: profileData } = await supabase
                .from('profiles')
                .select('id, name, avatar')
                .in('id', partnerIds);

            return (profileData || []) as ChatPartner[];
        },
        enabled: !!user
    });

    // Fetch messages for selected partner
    const { data: messages, isLoading: messagesLoading } = useQuery({
        queryKey: ['chat_messages', user?.id, selectedPartnerId],
        queryFn: async () => {
            if (!user || !selectedPartnerId) return [];
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .or(`and(sender_id.eq.${user.id},receiver_id.eq.${selectedPartnerId}),and(sender_id.eq.${selectedPartnerId},receiver_id.eq.${user.id})`)
                .order('created_at', { ascending: true });

            if (error) throw error;
            return data as Message[];
        },
        enabled: !!user && !!selectedPartnerId
    });

    // Send message mutation
    const sendMessageMutation = useMutation({
        mutationFn: async (content: string) => {
            if (!user || !selectedPartnerId) return;
            const { error } = await supabase
                .from('messages')
                .insert({
                    sender_id: user.id,
                    receiver_id: selectedPartnerId,
                    content,
                    is_read: false
                });
            if (error) throw error;
        },
        onSuccess: () => {
            setNewMessage("");
            queryClient.invalidateQueries({ queryKey: ['chat_messages'] });
        }
    });

    // Real-time subscription
    useEffect(() => {
        if (!user) return;

        const sub = supabase
            .channel('realtime_messages')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `receiver_id=eq.${user.id}`
            }, () => {
                queryClient.invalidateQueries({ queryKey: ['chat_messages'] });
                queryClient.invalidateQueries({ queryKey: ['chat_partners'] });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(sub);
        };
    }, [user, queryClient]);

    return {
        partners,
        partnersLoading,
        messages,
        messagesLoading,
        newMessage,
        setNewMessage,
        sendMessage: (content: string) => sendMessageMutation.mutate(content),
        isSending: sendMessageMutation.isPending
    };
}
