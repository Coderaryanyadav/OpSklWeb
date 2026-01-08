import { useAuthStore } from "@/stores/auth-store";

export function useUser() {
    const { user, profile, loading, signOut } = useAuthStore();

    return {
        user,
        profile,
        loading,
        isProvider: profile?.role === 'provider',
        isClient: profile?.role === 'client',
        signOut
    };
}
