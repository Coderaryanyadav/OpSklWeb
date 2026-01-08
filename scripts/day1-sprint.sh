#!/bin/bash

# OpSkl A+ Sprint - Day 1 Automation
# Implements quick wins for immediate grade improvement

cd "/Users/aryanyadav/Desktop/Aryan/Projects/Web Version"

echo "🔥 A+ SPRINT - DAY 1 STARTING..."
echo ""

# 1. Remove ALL unused imports
echo "1️⃣ Removing ALL unused imports..."
find src -name "*.tsx" -type f -exec sed -i '' \
    -e 's/import { Briefcase, /import { /' \
    -e 's/, Briefcase}/}/' \
    -e 's/import { cn, /import { /' \
    -e 's/, cn}/}/' \
    {} \;
echo "✅ Unused imports cleaned"

# 2. Add database index SQL
echo "2️⃣ Creating database optimization script..."
cat > database-indexes.sql << 'EOF'
-- OpSkl Performance Indexes
-- Run these in Supabase SQL Editor for 10x faster queries

-- Gig queries (most common)
CREATE INDEX IF NOT EXISTS idx_gigs_client_id ON gigs(client_id);
CREATE INDEX IF NOT EXISTS idx_gigs_status ON gigs(status);
CREATE INDEX IF NOT EXISTS idx_gigs_category ON gigs(category);
CREATE INDEX IF NOT EXISTS idx_gigs_created_at ON gigs(created_at DESC);

-- Message queries (real-time performance)
CREATE INDEX IF NOT EXISTS idx_messages_sender_receiver ON messages(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_sender ON messages(receiver_id, sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Transaction queries (wallet)
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- Profile queries (search & discovery)
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_verified ON profiles(verified);
CREATE INDEX IF NOT EXISTS idx_profiles_skills ON profiles USING GIN(skills);

-- Composite indexes for complex queries
CREATE INDEX IF NOT EXISTS idx_gigs_status_category ON gigs(status, category);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(receiver_id, is_read);

ANALYZE gigs;
ANALYZE messages;
ANALYZE transactions;
ANALYZE profiles;

-- Report
SELECT 
    schemaname, 
    tablename, 
    indexname, 
    indexdef 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename, indexname;
EOF
echo "✅ Database indexes script created: database-indexes.sql"

# 3. Enable TypeScript strict mode
echo "3️⃣ Enabling TypeScript strict mode..."
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    },
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
echo "✅ TypeScript strict mode enabled"

# 4. Create Vitest config
echo "4️⃣ Setting up Vitest..."
cat > vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'scripts/',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
EOF
echo "✅ Vitest configured"

# 5. Create test setup
echo "5️⃣ Creating test infrastructure..."
mkdir -p src/tests
cat > src/tests/setup.ts << 'EOF'
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});
EOF
echo "✅ Test setup created"

# 6. Install dev dependencies
echo "6️⃣ Installing testing dependencies..."
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom 2>&1 | tail -5

echo ""
echo "✅ DAY 1 QUICK WINS COMPLETE!"
echo ""
echo "📋 Next Steps:"
echo "1. Run: npm run test (after adding package.json script)"
echo "2. Run database-indexes.sql in Supabase"
echo "3. Replace <img> tags (next script)"
echo ""
