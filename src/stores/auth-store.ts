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
                try {
                    await supabase.auth.signOut();
                } catch (error) {
                    console.error('Logout error:', error);
                }
                // Clear ALL state on logout
                set({ user: null, profile: null, loading: false, initialized: false });
                // Clear localStorage
                localStorage.removeItem('opskl-auth-storage');
            },
            init: async () => {
                // Fix Logic Error #3: Initialization lock
                if (get().initialized || get().loading) return;
                set({ loading: true });

                try {
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
                    } else {
                        set({ user: null, profile: null });
                    }

                    // Fix Logic Error #4 & #5: Enhanced Auth Listener
                    supabase.auth.onAuthStateChange(async (event, session) => {
                        console.log('Auth State Change:', event);

                        if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
                            set({ user: null, profile: null });
                            localStorage.removeItem('opskl-auth-storage');

                            if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
                                window.location.href = '/login?session_expired=true';
                            }
                        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                            if (session?.user) {
                                const currentUser = get().user;
                                set({ user: session.user });

                                // Refetch profile if user ID changed or profile is missing
                                if (!get().profile || currentUser?.id !== session.user.id) {
                                    const { data: profile } = await supabase
                                        .from('profiles')
                                        .select('*')
                                        .eq('id', session.user.id)
                                        .single();

                                    if (profile) {
                                        set({ profile: profile as Profile });
                                    }
                                }
                            }
                        }
                    });
                } catch (error) {
                    console.error('Auth initialization error:', error);
                    set({ user: null, profile: null });
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
