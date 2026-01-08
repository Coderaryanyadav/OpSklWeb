"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useAuthStore } from "@/stores/auth-store";
import { useMessages, type ChatPartner } from "@/hooks/use-messages";
import { ChatSidebar } from "@/components/messages/chat-sidebar";
import { ChatWindow } from "@/components/messages/chat-window";

export default function MessagesPage() {
    const { profile } = useAuthStore();
    const [selectedChat, setSelectedChat] = useState<ChatPartner | null>(null);

    const {
        partners,
        partnersLoading,
        messages,
        messagesLoading,
        newMessage,
        setNewMessage,
        sendMessage,
        isSending
    } = useMessages(selectedChat?.id);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            sendMessage(newMessage.trim());
        }
    };

    return (
        <div className="h-screen pt-20 flex flex-col bg-background">
            <Navbar />

            <div className="flex-1 flex overflow-hidden container mx-auto px-4 md:px-0 py-4 gap-4">
                <ChatSidebar
                    partners={partners}
                    isLoading={partnersLoading}
                    selectedPartnerId={selectedChat?.id}
                    onSelectPartner={setSelectedChat}
                    isVisible={!selectedChat}
                />

                <ChatWindow
                    user={profile}
                    selectedPartner={selectedChat}
                    messages={messages}
                    isLoading={messagesLoading}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    onSend={handleSend}
                    isSending={isSending}
                    onBack={() => setSelectedChat(null)}
                />
            </div>
        </div>
    );
}
