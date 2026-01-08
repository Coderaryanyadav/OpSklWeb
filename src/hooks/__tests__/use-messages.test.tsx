import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMessages } from '../use-messages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';

// Mock dependencies
vi.mock('@/stores/auth-store', () => ({
    useAuthStore: vi.fn(),
}));

vi.mock('@/lib/supabase/client', () => ({
    supabase: {
        from: vi.fn(() => ({
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            or: vi.fn().mockReturnThis(),
            order: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            insert: vi.fn().mockReturnThis(),
        })),
        channel: vi.fn(() => ({
            on: vi.fn().mockReturnThis(),
            subscribe: vi.fn(),
            unsubscribe: vi.fn(),
        })),
        removeChannel: vi.fn(),
    },
}));

describe('useMessages', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (useAuthStore as any).mockReturnValue({ user: { id: 'user-1' } });
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it('should initialize with default states', () => {
        const { result } = renderHook(() => useMessages(), { wrapper });

        expect(result.current.newMessage).toBe('');
        expect(result.current.messages).toBeUndefined();
    });

    it('should update newMessage state', () => {
        const { result } = renderHook(() => useMessages(), { wrapper });

        act(() => {
            result.current.setNewMessage('Hello');
        });

        expect(result.current.newMessage).toBe('Hello');
    });
});
