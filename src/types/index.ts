export type Profile = {
    id: string;
    name: string;
    title: string;
    bio?: string;
    avatar?: string;
    skills: string[];
    xp: number;
    rating: number;
    verified: boolean;
    location?: string;
    role: 'provider' | 'client';
    rate?: string | number;
    balance: number;
    created_at: string;
};

export type Gig = {
    id: number;
    title: string;
    description: string;
    category?: string;
    budget_min: number;
    budget_max: number;
    skills: string[];
    location?: string;
    client_id: string;
    status: 'open' | 'in_progress' | 'completed' | 'cancelled';
    created_at: string;
    client?: {
        name: string;
        avatar?: string;
        verified: boolean;
    };
};

export type Message = {
    id: number;
    sender_id: string;
    receiver_id: string;
    content: string;
    created_at: string;
    is_read: boolean;
};

export type Transaction = {
    id: number;
    user_id: string;
    type: 'deposit' | 'withdrawal' | 'escrow_hold' | 'escrow_release';
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    gig_id?: number;
    created_at: string;
    metadata?: Record<string, any>;
};

export type NavbarItem = {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
};
