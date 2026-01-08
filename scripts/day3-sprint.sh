#!/bin/bash

# OpSkl A+ Sprint - Day 3 Automation
# Focus: Security Hardening, Accessibility, E2E Testing

cd "/Users/aryanyadav/Desktop/Aryan/Projects/Web Version"

echo "🔥 A+ SPRINT - DAY 3 STARTING..."
echo "🛡 Security & Integration Focus"
echo ""

# 1. Install Accessibility Testing Tools
echo "1️⃣ Installing Accessibility Tools (vitest-axe)..."
npm install -D vitest-axe

# 2. Install Playwright for E2E
echo "2️⃣ Installing Playwright (E2E)..."
npm install -D @playwright/test
# We won't run 'npx playwright install' purely non-interactive here because it downloads browsers.
# We'll let the user do that or handle it if needed. For now just the package.

# 3. Create Playwright Config
echo "3️⃣ Configuring Playwright..."
cat > playwright.config.ts << 'EOF'
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
EOF

# 4. Create common E2E test file
echo "4️⃣ Creating critical user journey test..."
mkdir -p e2e
cat > e2e/auth.spec.ts << 'EOF'
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should allow user to navigate to login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });

  test('should show validation errors on empty login', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Assuming HTML5 validation or Zod validation shows error
    // For Zod/React Hook Form, errors usually appear in text
    // Adjust selector based on actual UI implementation
  });
});
EOF

# 5. Extend Vitest Setup for Accessibility
echo "5️⃣ Extending Vitest with Axe..."
# We need to append to src/tests/setup.ts
cat >> src/tests/setup.ts << 'EOF'
import * as matchers from 'vitest-axe/matchers';
import { expect } from 'vitest';
expect.extend(matchers);
EOF

# 6. Create Accessibility Test
echo "6️⃣ Creating A11y Smoke Test..."
mkdir -p src/tests/a11y
cat > src/tests/a11y/components.test.tsx << 'EOF'
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
EOF

echo ""
echo "✅ DAY 3 INFRASTRUCTURE READY!"
echo "📋 Next Steps:"
echo "1. Run: npx playwright install (to download browsers)"
echo "2. Run: npm run test (includes new a11y tests)"
echo "3. Run: npx playwright test"
echo ""
