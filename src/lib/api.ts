import { supabase } from "./supabase";
import { personSampleData, gigSampleData } from "./sample-data";
import { Profile, Gig } from "@/types";

/**
 * Professional service layer for interacting with Supabase.
 * Includes error handling, logging, and data normalization.
 */
export const ApiService = {
    /**
     * Profiles / Talent
     */
    async getProfiles(): Promise<Profile[]> {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .order("xp", { ascending: false });

            if (error) throw error;
            return (data || []) as Profile[];
        } catch (err) {
            console.error("[ApiService] Error fetching profiles:", err);
            return [];
        }
    },

    async getProfileById(id: string): Promise<Profile | null> {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            return data as Profile;
        } catch (err) {
            console.error(`[ApiService] Error fetching profile ${id}:`, err);
            return null;
        }
    },

    /**
     * Gigs / Jobs
     */
    async getGigs(): Promise<Gig[]> {
        try {
            const { data, error } = await supabase
                .from("gigs")
                .select("*")
                .order("posted_date", { ascending: false });

            if (error) throw error;

            // Normalize snake_case from DB to camelCase for UI
            return (data || []).map(gig => ({
                ...gig,
                postedDate: gig.posted_date || gig.created_at
            })) as Gig[];
        } catch (err) {
            console.error("[ApiService] Error fetching gigs:", err);
            return [];
        }
    },

    async getGigById(id: string): Promise<Gig | null> {
        try {
            const { data, error } = await supabase
                .from("gigs")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            if (!data) return null;

            return {
                ...data,
                postedDate: data.posted_date || data.created_at
            } as Gig;
        } catch (err) {
            console.error(`[ApiService] Error fetching gig ${id}:`, err);
            return null;
        }
    },

    async createGig(gig: Partial<Gig>): Promise<{ success: boolean; data?: Gig[]; error?: any }> {
        try {
            const dbGig = {
                title: gig.title,
                description: gig.description,
                category: gig.category,
                budget: gig.budget,
                skills: gig.skills,
                location: gig.location,
                client: gig.client,
                posted_date: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from("gigs")
                .insert([dbGig])
                .select();

            if (error) {
                console.error("Supabase Error Details:", error);
                throw error;
            }
            return { success: true, data: data as Gig[] };
        } catch (err) {
            console.error("[ApiService] Critical Failure:", err);
            return { success: false, error: err };
        }
    }
};
