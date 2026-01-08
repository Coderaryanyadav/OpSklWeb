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

export type NavbarItem = {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
};
