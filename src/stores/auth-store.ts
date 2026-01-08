import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase/client';
import type { Profile } from '@/types';

interface AuthState {
    user: { id: string; email?: string } | null;
    profile: Profile | null;
    loading: boolean;
    initialized: boolean;
    setUser: (user: { id: string; email?: string } | null) => void;
    setProfile: (profile: Profile | null) => void;
    signOut: () => Promise<void>;
    init: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            profile: null,
            loading: false,
            initialized: false,
            setUser: (user) => set({ user }),
            setProfile: (profile) => set({ profile }),
            signOut: async () => {
                await supabase.auth.signOut();
                set({ user: null, profile: null });
            },
            init: async () => {
                if (get().initialized) return;
                set({ loading: true });

                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    set({ user: session.user });

                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (profile) {
                        set({ profile: profile as Profile });
                    }
                }

                set({ loading: false, initialized: true });
            }
        }),
        {
            name: 'opskl-auth-storage',
            partialize: (state) => ({ user: state.user, profile: state.profile }),
        }
    )
);
