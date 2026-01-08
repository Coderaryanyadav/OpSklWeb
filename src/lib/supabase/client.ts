import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    created_at: string
                    name: string
                    title: string
                    bio: string | null
                    avatar: string | null
                    skills: string[]
                    xp: number
                    rating: number
                    verified: boolean
                    location: string | null
                    role: 'provider' | 'client'
                    balance: number
                }
                Insert: {
                    id: string
                    created_at?: string
                    name: string
                    title: string
                    bio?: string | null
                    avatar?: string | null
                    skills?: string[]
                    xp?: number
                    rating?: number
                    verified?: boolean
                    location?: string | null
                    role: 'provider' | 'client'
                    balance?: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    name?: string
                    title?: string
                    bio?: string | null
                    avatar?: string | null
                    skills?: string[]
                    xp?: number
                    rating?: number
                    verified?: boolean
                    location?: string | null
                    role?: 'provider' | 'client'
                    balance?: number
                }
            }
            gigs: {
                Row: {
                    id: number
                    created_at: string
                    title: string
                    description: string
                    category: string | null
                    budget_min: number
                    budget_max: number
                    skills: string[]
                    location: string | null
                    client_id: string
                    status: 'open' | 'in_progress' | 'completed' | 'cancelled'
                }
                Insert: {
                    id?: number
                    created_at?: string
                    title: string
                    description: string
                    category?: string | null
                    budget_min: number
                    budget_max: number
                    skills?: string[]
                    location?: string | null
                    client_id: string
                    status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
                }
                Update: {
                    id?: number
                    created_at?: string
                    title?: string
                    description?: string
                    category?: string | null
                    budget_min?: number
                    budget_max?: number
                    skills?: string[]
                    location?: string | null
                    client_id?: string
                    status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
                }
            }
            messages: {
                Row: {
                    id: number
                    created_at: string
                    sender_id: string
                    receiver_id: string
                    content: string
                    is_read: boolean
                }
                Insert: {
                    id?: number
                    created_at?: string
                    sender_id: string
                    receiver_id: string
                    content: string
                    is_read?: boolean
                }
                Update: {
                    id?: number
                    created_at?: string
                    sender_id?: string
                    receiver_id?: string
                    content?: string
                    is_read?: boolean
                }
            }
            transactions: {
                Row: {
                    id: number
                    created_at: string
                    user_id: string
                    type: 'deposit' | 'withdrawal' | 'escrow_hold' | 'escrow_release'
                    amount: number
                    status: 'pending' | 'completed' | 'failed'
                    gig_id: number | null
                    metadata: Json | null
                }
                Insert: {
                    id?: number
                    created_at?: string
                    user_id: string
                    type: 'deposit' | 'withdrawal' | 'escrow_hold' | 'escrow_release'
                    amount: number
                    status?: 'pending' | 'completed' | 'failed'
                    gig_id?: number | null
                    metadata?: Json | null
                }
                Update: {
                    id?: number
                    created_at?: string
                    user_id?: string
                    type?: 'deposit' | 'withdrawal' | 'escrow_hold' | 'escrow_release'
                    amount?: number
                    status?: 'pending' | 'completed' | 'failed'
                    gig_id?: number | null
                    metadata?: Json | null
                }
            }
        }
    }
}
