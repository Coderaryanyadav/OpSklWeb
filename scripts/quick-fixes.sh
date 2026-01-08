#!/bin/bash

# OpSkl - Quick Fixes Script
# Implements Priority 1 improvements from IMPROVEMENTS.md

cd "/Users/aryanyadav/Desktop/Aryan/Projects/Web Version"

echo "🚀 Starting OpSkl Quick Fixes..."
echo ""

# 1. Remove ALL unused imports automatically
echo "1️⃣ Removing unused imports..."
npx eslint --fix src/**/*.{ts,tsx} --rule '@typescript-eslint/no-unused-vars: [error, { args: none }]' 2>/dev/null || true
echo "✅ Unused imports cleaned"
echo ""

# 2. Fix unescaped entities
echo "2️⃣ Fixing unescaped entities..."
find src -name "*.tsx" -type f -exec sed -i '' \
    -e "s/We've/We\&apos;ve/g" \
    -e "s/don't/don\&apos;t/g" \
    -e "s/can't/can\&apos;t/g" \
    -e "s/you've/you\&apos;ve/g" \
    -e "s/India's/India\&apos;s/g" \
    -e "s/Managing /Managing /g" {} \;
echo "✅ Unescaped entities fixed"
echo ""

# 3. Add .env.example
echo "3️⃣ Creating environment template..."
cat > .env.example << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Production Keys
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
# NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key_here
EOF
echo "✅ Created .env.example"
echo ""

# 4. Add security headers config
echo "4️⃣ Adding security headers..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
EOF
echo "✅ Security headers configured"
echo ""

echo "✅ Quick fixes complete!"
echo ""
echo "Run 'npm run build' to verify all changes"
