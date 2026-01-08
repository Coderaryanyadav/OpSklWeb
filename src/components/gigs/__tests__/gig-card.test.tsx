import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GigCard } from '../gig-card';
import type { Gig } from '@/types';

// Mock Framer Motion to avoid animation issues and invalid DOM attributes
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, layout, initial, animate, exit, ...props }: any) => (
            <div className={className} {...props}>{children}</div>
        ),
    },
}));

const mockGig: Gig = {
    id: 123,
    title: 'Senior React Developer Needed',
    description: 'We are looking for an expert in Next.js and Tailwind CSS.',
    budget_min: 50000,
    budget_max: 100000,
    category: 'Development',
    skills: ['React', 'TypeScript', 'Node.js'],
    client_id: 'client-1',
    created_at: new Date().toISOString(),
    status: 'open',
    location: 'Remote, India',
    client: {
        name: 'Tech Corp',
        avatar: 'https://example.com/avatar.jpg',
        verified: true
    }
};

describe('GigCard', () => {
    it('renders gig details correctly', () => {
        render(<GigCard gig={mockGig} />);

        expect(screen.getByText('Senior React Developer Needed')).toBeInTheDocument();
        expect(screen.getByText(/We are looking for an expert/)).toBeInTheDocument();
        expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    });

    it('displays budget range formatted correctly', () => {
        render(<GigCard gig={mockGig} />);
        // Checking for presence of numbers roughly, as grouping separators depend on locale
        expect(screen.getByText((content) => content.includes('50,000') || content.includes('50000'))).toBeInTheDocument();
    });

    it('renders skills as tags', () => {
        render(<GigCard gig={mockGig} />);
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('Node.js')).toBeInTheDocument();
    });

    it('shows verified badge for verified clients', () => {
        render(<GigCard gig={mockGig} />);
        expect(screen.getByText('Verified')).toBeInTheDocument();
    });

    it('handles gigs without client avatar', () => {
        const gigWithoutAvatar = {
            ...mockGig,
            client: { ...mockGig.client!, avatar: undefined }
        };
        render(<GigCard gig={gigWithoutAvatar} />);
        expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    });
});
