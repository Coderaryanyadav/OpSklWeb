import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { Navbar } from '@/components/layout/navbar';

// Mock Router for Navbar
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock Auth wrapper for Navbar
vi.mock('@/stores/auth-store', () => ({
  useAuthStore: () => ({ user: null, profile: null, signOut: vi.fn() }),
}));

describe('Accessibility Checks', () => {
  it('Navbar has no accessibility violations', async () => {
    const { container } = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
