"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { supabase } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Message } from "@/types";

export interface ChatPartner {
    id: string;
    name: string;
    avatar: string | null;
}

export function useMessages(selectedPartnerId?: string, page = 1) {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const [newMessage, setNewMessage] = useState("");
    const pageSize = 50;

    // Fetch unique partners
    const { data: partners, isLoading: partnersLoading } = useQuery({
        queryKey: ['chat_partners', user?.id],
        queryFn: async () => {
            if (!user) return [];

            // Get last 100 messages to identify recent partners (Optimization)
            const { data: recentMessages, error: msgError } = await supabase
                .from('messages')
                .select('sender_id, receiver_id')
                .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
                .order('created_at', { ascending: false })
                .limit(100);

            if (msgError) throw msgError;

            const partnerIds = Array.from(new Set(
                (recentMessages || []).map(m =>
                    m.sender_id === user.id ? m.receiver_id : m.sender_id
                )
            ));

            if (partnerIds.length === 0) return [];

            const { data: profileData, error: profError } = await supabase
                .from('profiles')
                .select('id, name, avatar')
                .in('id', partnerIds);

            if (profError) throw profError;

            return (profileData || []) as ChatPartner[];
        },
        enabled: !!user
    });

    // Fetch messages for selected partner with pagination
    const { data: messagesData, isLoading: messagesLoading } = useQuery({
        queryKey: ['chat_messages', user?.id, selectedPartnerId, page],
        queryFn: async () => {
            if (!user || !selectedPartnerId) return { messages: [], total: 0 };

            const start = (page - 1) * pageSize;
            const end = start + pageSize - 1;

            const { data, error, count } = await supabase
                .from('messages')
                .select('*', { count: 'exact' })
                .or(`and(sender_id.eq.${user.id},receiver_id.eq.${selectedPartnerId}),and(sender_id.eq.${selectedPartnerId},receiver_id.eq.${user.id})`)
                .order('created_at', { ascending: false }) // Fetch latest first for pagination
                .range(start, end);

            if (error) throw error;
            return {
                messages: (data as Message[]).reverse(), // Show oldest first in UI
                total: count || 0
            };
        },
        enabled: !!user && !!selectedPartnerId
    });

    const messages = messagesData?.messages || [];

    // Send message mutation (Optimistic)
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
        onMutate: async (content) => {
            await queryClient.cancelQueries({ queryKey: ['chat_messages', user?.id, selectedPartnerId] });
            const previousMessages = queryClient.getQueryData(['chat_messages', user?.id, selectedPartnerId, page]);

            if (previousMessages) {
                const optimisticMessage: Message = {
                    id: Math.random() * 1000, // Temp ID
                    created_at: new Date().toISOString(),
                    sender_id: user!.id,
                    receiver_id: selectedPartnerId!,
                    content,
                    is_read: false
                };

                queryClient.setQueryData(['chat_messages', user?.id, selectedPartnerId, page], (old: any) => ({
                    ...old,
                    messages: [...(old?.messages || []), optimisticMessage]
                }));
            }

            return { previousMessages };
        },
        onError: (_err, _newTodo, context: any) => {
            queryClient.setQueryData(['chat_messages', user?.id, selectedPartnerId, page], context?.previousMessages);
            toast.error("Message delivery failed");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['chat_messages', user?.id, selectedPartnerId] });
            queryClient.invalidateQueries({ queryKey: ['chat_partners', user?.id] });
        },
        onSuccess: () => {
            setNewMessage("");
        }
    });

    // Real-time subscription
    useEffect(() => {
        if (!user) return;

        const sub = supabase
            .channel(`chat:${user.id}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                // Listen for messages addressed to me OR from me (if sent from another device)
                filter: `receiver_id=eq.${user.id}`
            }, (payload) => {
                const newMsg = payload.new as Message;
                // Only invalidate if the message is from my current partner
                if (newMsg.sender_id === selectedPartnerId) {
                    queryClient.invalidateQueries({ queryKey: ['chat_messages', user.id, selectedPartnerId] });
                }
                // Always update partners list for new conversation threads
                queryClient.invalidateQueries({ queryKey: ['chat_partners', user.id] });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(sub);
        };
    }, [user, selectedPartnerId, queryClient]);

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
