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
        }
    }
}
