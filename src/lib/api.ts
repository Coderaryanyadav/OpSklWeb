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
                .order("rating", { ascending: false });

            if (error) throw error;
            return (data?.length ? data : personSampleData) as Profile[];
        } catch (err) {
            console.error("[ApiService] Error fetching profiles:", err);
            return personSampleData;
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
            return personSampleData.find(p => String(p.id) === String(id)) || null;
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
                .order("created_at", { ascending: false });

            if (error) throw error;
            return (data?.length ? data : gigSampleData) as Gig[];
        } catch (err) {
            console.error("[ApiService] Error fetching gigs:", err);
            return gigSampleData;
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
            return data as Gig;
        } catch (err) {
            console.error(`[ApiService] Error fetching gig ${id}:`, err);
            return gigSampleData.find(g => String(g.id) === String(id)) || null;
        }
    },

    async createGig(gig: Partial<Gig>): Promise<{ success: boolean; data?: Gig[]; error?: unknown }> {
        try {
            // Map to database column names (snake_case)
            const dbGig = {
                title: gig.title,
                description: gig.description,
                category: gig.category,
                budget: gig.budget,
                skills: gig.skills,
                location: gig.location,
                client: gig.client,
                posted_date: gig.postedDate || new Date().toISOString()
            };

            const { data, error } = await supabase
                .from("gigs")
                .insert([dbGig])
                .select();

            if (error) throw error;
            return { success: true, data: data as Gig[] };
        } catch (err) {
            console.error("[ApiService] Error creating gig:", err);
            return { success: false, error: err };
        }
    }
};
