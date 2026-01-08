import { describe, it, expect } from 'vitest';
import {
    loginSchema,
    signupSchema,
    createGigSchema,
    addFundsSchema
} from '../validations';

describe('Validation Schemas', () => {
    describe('loginSchema', () => {
        it('should validate valid email and password', () => {
            const result = loginSchema.safeParse({ email: 'test@example.com', password: 'Password123!' });
            expect(result.success).toBe(true);
        });

        it('should reject invalid email', () => {
            const result = loginSchema.safeParse({ email: 'invalid-email', password: 'Password123!' });
            expect(result.success).toBe(false);
        });

        it('should reject short password', () => {
            const result = loginSchema.safeParse({ email: 'test@example.com', password: 'short' });
            expect(result.success).toBe(false);
        });
    });

    describe('signupSchema', () => {
        it('should validate complete signup data', () => {
            const result = signupSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123!',
                role: 'client'
            });
            expect(result.success).toBe(true);
        });

        it('should reject weak password', () => {
            const result = signupSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password', // Missing uppercase, number, special char
                role: 'client'
            });
            expect(result.success).toBe(false);
        });

        it('should reject invalid role', () => {
            const result = signupSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123!',
                role: 'admin' // Invalid role
            });
            expect(result.success).toBe(false);
        });
    });

    describe('createGigSchema', () => {
        it('should validate correct gig data', () => {
            const validGig = {
                title: 'Need a React Developer',
                description: 'Looking for an experienced developer for a 3-month project. Must know Next.js and Tailwind.',
                category: 'Development',
                budgetMin: 1000,
                budgetMax: 5000,
                skills: ['React', 'TypeScript'],
                location: 'Remote'
            };
            const result = createGigSchema.safeParse(validGig);
            expect(result.success).toBe(true);
        });

        it('should fail if max budget < min budget', () => {
            const invalidGig = {
                title: 'Need a React Developer',
                description: 'Looking for a developer... (sufficient length)',
                category: 'Development',
                budgetMin: 5000,
                budgetMax: 1000,
                skills: ['React'],
                location: 'Remote'
            };
            const result = createGigSchema.safeParse(invalidGig);
            expect(result.success).toBe(false);
        });
    });

    describe('addFundsSchema', () => {
        it('should allow valid deposit amount', () => {
            const result = addFundsSchema.safeParse({ amount: 5000 });
            expect(result.success).toBe(true);
        });

        it('should reject amount below minimum', () => {
            const result = addFundsSchema.safeParse({ amount: 50 });
            expect(result.success).toBe(false);
        });
    });
});
