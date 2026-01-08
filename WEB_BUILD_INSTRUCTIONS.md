# OpSkl Web Version - Build Instructions for Gemini AI

## Project Overview
Build a premium, fully-functional web version of the OpSkl gig economy platform that mirrors all features from the mobile app. This should be a modern, responsive web application that works seamlessly across desktop, tablet, and mobile browsers.

## Platform Description
OpSkl is a trust-first gig economy platform for the Indian market that connects skilled talent with businesses and individuals. It features Aadhaar-verified profiles, UPI-based escrow payments, dynamic gig discovery, and comprehensive portfolio management.

## Technology Stack Requirements

### Frontend Framework
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **React 18+** for components

### Styling & Design
- **TailwindCSS** for styling
- **shadcn/ui** for premium UI components
- **Lucide React** for icons (matching mobile app)
- **Framer Motion** for smooth animations and transitions

### Backend & Services
- **Supabase** for:
  - Authentication (email/password, OTP)
  - PostgreSQL Database
  - Real-time subscriptions
  - Storage for images/documents
  - Edge Functions for business logic

### Payment Integration
- **Razorpay** for Indian payment methods (UPI, Cards, NetBanking)

### State Management
- **Zustand** for global state
- **React Query** for server state and caching

### Additional Libraries
- **React Hook Form** + **Zod** for form validation
- **Recharts** for analytics and charts
- **date-fns** for date handling
- **Geolocation API** for location services

## Core Features to Implement

### 1. Authentication & Onboarding
- **Landing Page**: Premium, animated hero section showcasing platform benefits
- **Sign Up Flow**:
  - Email/Phone registration
  - OTP verification
  - Profile setup (name, location, skills)
  - Role selection (Service Provider / Client)
  - Aadhaar verification integration (mock for MVP)
- **Login**: Email/password and OTP-based login
- **Profile Management**: Edit profile, upload portfolio, manage skills

### 2. User Dashboard
- **For Service Providers**:
  - Active gigs overview
  - Earnings analytics with charts
  - Profile completion progress
  - XP and reputation score display
  - Recent activity feed
- **For Clients**:
  - Posted gigs status
  - Active contracts
  - Payment history
  - Saved service providers

### 3. Gig Discovery & Search
- **Browse Gigs Page** (for Service Providers):
  - Filter by category, budget, location radius
  - Sort by posted date, budget, relevance
  - Card-based layout with gig details
  - Quick apply functionality
- **Browse Talent Page** (for Clients):
  - Filter by skills, rating, location, availability
  - Portfolio preview cards
  - Direct hire or request quote options

### 4. Gig Posting & Management
- **Post a Gig** (Clients):
  - Multi-step form: Title, Description, Category, Budget, Timeline
  - Location selection with map integration
  - Required skills tagging
  - Upload reference images/documents
- **Gig Details Page**:
  - Full gig description
  - Client information
  - Apply or bid functionality
  - Similar gigs recommendations
- **My Gigs**:
  - All posted/applied gigs
  - Status tracking (Open, In Progress, Completed, Cancelled)
  - Manage applications/bids

### 5. Messaging & Communication
- **Real-time Chat**:
  - One-on-one conversations
  - Message notifications
  - File sharing capability
  - Delivered/Read status
- **Notifications Center**:
  - In-app notifications
  - Email notifications for important events

### 6. Payment & Escrow System
- **Wallet Dashboard**:
  - Current balance
  - Transaction history
  - Add money via Razorpay
  - Withdraw to bank (UPI integration)
- **Escrow Flow**:
  - Client deposits payment when accepting bid
  - Funds held in escrow during gig
  - Release payment on gig completion
  - Dispute resolution interface
- **Payment Pages**:
  - Checkout with multiple payment methods
  - Invoice generation
  - Payment receipts

### 7. Profile & Portfolio
- **Public Profile Page**:
  - Profile photo, bio, skills
  - Verification badges (Aadhaar, Email, Phone)
  - XP level and reputation score
  - Portfolio gallery with images/videos
  - Reviews and ratings
  - Completed gigs showcase
- **Edit Profile**:
  - Update all profile information
  - Upload/manage portfolio items
  - Add/edit skills
  - Set availability status

### 8. Reviews & Ratings
- **Review System**:
  - 5-star rating with detailed feedback
  - Both client and provider can review after gig completion
  - Display average rating and review count
  - Filter and sort reviews

### 9. Admin Features (Optional for MVP)
- **Admin Dashboard** access through separate route
- User management and verification
- Gig monitoring and moderation
- Platform analytics
- Dispute resolution tools

## Design Requirements

### **CRITICAL: UI Must Match Mobile App Exactly**
The web version MUST replicate the exact UI/UX from the mobile app (`apps/mobile/`). This is non-negotiable.

**Before starting design:**
1. **Study the mobile app thoroughly**: Review all screens in `apps/mobile/src/screens/`
2. **Extract exact colors**: Check `apps/mobile/src/constants/` or theme files for color values
3. **Match component styling**: Buttons, cards, inputs should look identical
4. **Replicate layouts**: Same spacing, typography hierarchy, and visual structure
5. **Copy animations**: Match any animations or transitions from the mobile app
6. **Reference screenshots**: If available, use mobile app screenshots as design reference

### Visual Excellence
- **Match Mobile App Design**:
  - Use the EXACT color palette from the mobile app
  - Replicate the same component designs (buttons, cards, inputs, etc.)
  - Match typography (font families, sizes, weights, line heights)
  - Implement the same spacing and layout patterns
  - Copy animation styles and micro-interactions
  - Maintain the same visual hierarchy

### Color Palette
**IMPORTANT**: Extract actual colors from `apps/mobile/` codebase. If not found, use:
- Primary: Match mobile app primary color
- Secondary: Match mobile app secondary/accent colors
- Background (Light): Match mobile app light theme
- Background (Dark): Match mobile app dark theme
- Success: Match mobile success color
- Warning: Match mobile warning color
- Error: Match mobile error color

### Typography
- Use **Inter** or **Outfit** from Google Fonts
- Clear hierarchy with varied font weights
- Proper spacing and line height for readability

### Animations & Interactions
- Smooth page transitions using Framer Motion
- Hover effects on all buttons and cards
- Loading states with skeleton screens
- Micro-animations for status changes
- Toast notifications for user feedback

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly targets on mobile
- Adaptive layouts that look great on all screen sizes

## Technical Implementation Details

### Project Setup
```bash
# Initialize Next.js project
npx create-next-app@latest apps/web --typescript --tailwind --app --eslint

# Install dependencies
cd apps/web
npm install @supabase/supabase-js zustand immer react-query lucide-react framer-motion
npm install react-hook-form zod @hookform/resolvers
npm install recharts date-fns
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs
```

### Folder Structure
```
apps/web/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── (auth)/       # Auth routes group
│   │   ├── (dashboard)/  # Protected dashboard routes
│   │   ├── gigs/         # Gig-related pages
│   │   ├── profile/      # Profile pages
│   │   ├── messages/     # Messaging pages
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── gigs/         # Gig-specific components
│   │   ├── profile/      # Profile components
│   │   └── shared/       # Shared components
│   ├── lib/              # Utility functions
│   │   ├── supabase/     # Supabase client & queries
│   │   ├── payments/     # Razorpay integration
│   │   └── utils.ts      # Helper functions
│   ├── hooks/            # Custom React hooks
│   ├── stores/           # Zustand stores
│   ├── types/            # TypeScript types
│   └── styles/           # Global styles
└── public/               # Static assets
```

### Supabase Integration
- Use existing Supabase project and schema from `/supabase` directory
- Implement Row Level Security (RLS) policies
- Create real-time subscriptions for chat and notifications
- Use Supabase Storage for file uploads

### Authentication Flow
- Server-side auth using Supabase Auth Helpers for Next.js
- Protected routes with middleware
- Session management with cookies
- Automatic token refresh

### Data Fetching Strategy
- Server Components for initial data loading
- Client Components with React Query for interactive features
- Optimistic updates for better UX
- Proper error handling and loading states

### SEO Optimization
- Dynamic meta tags for all pages
- Open Graph tags for social sharing
- Structured data for gigs and profiles
- Server-side rendering for public pages

## Implementation Priority

### Phase 1: Foundation (Week 1)
1. Project setup and configuration
2. Supabase integration
3. Authentication system
4. Basic layouts and navigation
5. Design system and UI components

### Phase 2: Core Features (Week 2)
1. User dashboard
2. Gig discovery and search
3. Gig posting and management
4. Profile and portfolio pages

### Phase 3: Advanced Features (Week 3)
1. Real-time messaging
2. Payment and escrow integration
3. Review and rating system
4. Notifications system

### Phase 4: Polish & Deploy (Week 4)
1. Mobile responsiveness refinement
2. Performance optimization
3. Testing and bug fixes
4. Deployment to Vercel
5. Analytics integration

## Deployment

### Hosting
- **Vercel** for Next.js deployment
- Environment variables for Supabase and Razorpay
- Custom domain setup
- SSL/HTTPS enabled

### Environment Variables Needed
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

## Quality Standards

### Performance
- Lighthouse score: 90+ on all metrics
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Optimize images with Next.js Image component
- Code splitting and lazy loading

### Accessibility
- WCAG 2.1 AA compliance
- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatible

### Security
- Input validation and sanitization
- SQL injection prevention (handled by Supabase)
- XSS protection
- CSRF tokens
- Secure payment handling

## Success Criteria

The web version should:
1. ✅ Have feature parity with the mobile app
2. ✅ Look premium and modern with stunning visuals
3. ✅ Be fully responsive across all devices
4. ✅ Have smooth animations and transitions
5. ✅ Integrate seamlessly with existing Supabase backend
6. ✅ Support real-time features (chat, notifications)
7. ✅ Handle payments securely via Razorpay
8. ✅ Be production-ready and deployable to Vercel
9. ✅ Have excellent performance (90+ Lighthouse score)
10. ✅ Provide an exceptional user experience

## Notes for Gemini AI

- **Prioritize aesthetics**: The design should WOW users at first glance
- **Use modern patterns**: Implement latest React and Next.js best practices
- **Don't use placeholders**: Generate real images if needed using generate_image tool
- **Real functionality**: All features should be fully functional, not just UI mockups
- **Indian market focus**: Consider UPI payments, Aadhaar verification, local language support (future)
- **Reuse admin patterns**: Reference the existing admin dashboard for consistent patterns
- **Test thoroughly**: Ensure all features work across different browsers and devices

## Getting Started Command

When you're ready to build this, simply say:
"Build the OpSkl web version according to WEB_BUILD_INSTRUCTIONS.md"

---

**Created**: January 2026  
**Platform**: OpSkl - Trust-First Gig Economy  
**Target**: Web Application (Desktop & Mobile Browsers)
