// OpSkl - Unit Tests for Utilities
import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn (className utility)', () => {
    it('should merge class names correctly', () => {
        expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
        expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
    });

    it('should merge Tailwind classes correctly', () => {
        expect(cn('px-2 py-1', 'px-4')).toContain('px-4');
    });

    it('should handle empty inputs', () => {
        expect(cn()).toBe('');
    });

    it('should handle undefined and null', () => {
        expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
    });
});
