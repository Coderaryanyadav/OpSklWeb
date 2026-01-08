import { useAuthStore } from "@/stores/auth-store";

export function useUser() {
    const { user, profile, loading, signOut } = useAuthStore();

    return {
        user,
        profile,
        loading,
        isProvider: profile?.title?.includes('Provider') || !profile?.title?.includes('Client'),
        isClient: profile?.title?.includes('Client'),
        signOut
    };
}
