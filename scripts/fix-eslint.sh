#!/bin/bash

# OpSkl ESLint Auto-Fix Script
# Fixes all remaining ESLint warnings

cd "/Users/aryanyadav/Desktop/Aryan/Projects/Web Version"

echo "🔧 Fixing ESLint Issues..."
echo ""

# 1. Fix unescaped entities in all TSX files
echo "1️⃣ Fixing unescaped entities..."
find src -name "*.tsx" -type f -exec sed -i '' -e "s/We've/We\&apos;ve/g" \
    -e "s/don't/don\&apos;t/g" \
    -e "s/India's/India\&apos;s/g" \
    -e "s/you've/you\&apos;ve/g" \
    -e "s/can't/can\&apos;t/g" {} \;

echo "✅ Fixed unescaped entities"
echo ""

# 2. Remove unused imports
echo "2️⃣ Removing unused imports..."

# Remove unused imports from specific files
sed -i '' 's/ArrowUpRight, ArrowDownLeft, //' "src/app/(dashboard)/wallet/page.tsx"
sed -i '' 's/, CheckCircle2, AlertCircle, Clock//' "src/app/(dashboard)/wallet/page.tsx"
sed -i '' 's/, TrendingUp//' "src/app/page.tsx"
sed -i '' 's/DollarSign, MapPin, Tag, FileText, //' "src/app/post-gig/page.tsx"
sed -i '' 's/Briefcase, Mail, //' "src/app/profile/\[id\]/page.tsx"
sed -i '' 's/FileText, //' "src/app/verify/page.tsx"
sed -i '' 's/motion, //' "src/components/dashboard/client/dashboard.tsx"
sed -i '' 's/Star, //' "src/components/gigs/gig-card.tsx"
sed -i '' 's/Briefcase, //' "src/components/talent/talent-card.tsx"
sed -i '' 's/cn, //' "src/components/wallet/razorpay-modal.tsx"
sed -i '' 's/Profile, //' "src/hooks/use-messages.ts"

echo "✅ Removed unused imports"
echo ""

echo "3️⃣ Fixing error handlers..."
# These need manual fixes, marking for reference
echo "⚠️  Manual fixes needed for error handlers (using unknown type)"
echo ""

echo "✅ ESLint auto-fix complete!"
echo ""
echo "Run 'npm run build' to verify all fixes"
