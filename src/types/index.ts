export interface Client {
    name: string;
    verified: boolean;
    avatar?: string;
    completedGigs?: number;
    rating?: number;
}

export interface Budget {
    min: number;
    max: number;
}

export interface Gig {
    id: string | number;
    title: string;
    description: string;
    budget: Budget;
    skills: string[];
    client: Client;
    location: string;
    postedDate: string;
    category?: string;
    created_at?: string;
}

export interface PortfolioItem {
    title: string;
    img: string;
}

export interface Profile {
    id: string | number;
    name: string;
    title: string;
    bio: string;
    rating: number;
    reviews: number;
    xp: number;
    location: string;
    verified: boolean;
    aadhaarVerified: boolean;
    skills: string[];
    rate: number;
    completedGigs: number;
    portfolio: PortfolioItem[];
    avatar?: string;
}
