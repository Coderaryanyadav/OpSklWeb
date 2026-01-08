# OpSkl Platform - Technical Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  Next.js 15 (App Router) + React 19 + TypeScript           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     State Management                         │
│  • Zustand (Auth)                                           │
│  • TanStack Query (Server State)                           │
│  • React Hooks (Local State)                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend Services                          │
│  • Supabase Auth (JWT)                                      │
│  • Supabase Database (PostgreSQL)                          │
│  • Supabase Realtime (WebSockets)                          │
│  • Razorpay (Payments - Mock/Production)                   │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes group
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/              # Protected routes
│   │   ├── dashboard/
│   │   └── wallet/
│   ├── gigs/                     # Marketplace
│   ├── talent/                   # Provider directory
│   ├── messages/                 # Real-time chat
│   ├── profile/[id]/            # Dynamic profiles
│   ├── verify/                   # KYC flow
│   ├── post-gig/                # Gig creation
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── error.tsx                # Global error boundary
│   └── loading.tsx              # Global loading state
│
├── components/
│   ├── dashboard/
│   │   ├── client/              # Client dashboard
│   │   └── provider/            # Provider dashboard
│   ├── gigs/
│   │   └── gig-card.tsx
│   ├── talent/
│   │   └── talent-card.tsx
│   ├── messages/
│   │   ├── chat-sidebar.tsx     # Modular chat UI
│   │   └── chat-window.tsx
│   ├── wallet/
│   │   └── razorpay-modal.tsx   # Payment modal
│   ├── layout/
│   │   └── navbar.tsx
│   └── providers.tsx            # App providers wrapper
│
├── hooks/
│   └── use-messages.ts          # Custom messaging hook
│
├── lib/
│   ├── supabase/
│   │   └── client.ts            # Supabase client
│   └── utils.ts                 # Utility functions
│
├── stores/
│   └── auth-store.ts            # Zustand auth store
│
└── types/
    └── index.ts                 # TypeScript definitions
```

## 🔐 Database Schema

### Tables

#### `profiles`
```sql
- id: UUID (FK to auth.users)
- name: TEXT
- title: TEXT
- bio: TEXT
- avatar: TEXT
- skills: TEXT[]
- xp: INTEGER
- rating: DECIMAL(3,2)
- verified: BOOLEAN
- location: TEXT
- role: TEXT (provider | client)
- balance: DECIMAL(10,2)
- created_at: TIMESTAMPTZ
```

#### `gigs`
```sql
- id: BIGSERIAL
- title: TEXT
- description: TEXT
- category: TEXT
- budget_min: INTEGER
- budget_max: INTEGER
- skills: TEXT[]
- location: TEXT
- client_id: UUID (FK to profiles)
- status: TEXT (open | in_progress | completed | cancelled)
- created_at: TIMESTAMPTZ
```

#### `messages`
```sql
- id: BIGSERIAL
- sender_id: UUID (FK to profiles)
- receiver_id: UUID (FK to profiles)
- content: TEXT
- is_read: BOOLEAN
- created_at: TIMESTAMPTZ
```

#### `transactions`
```sql
- id: BIGSERIAL
- user_id: UUID (FK to profiles)
- type: TEXT (deposit | withdrawal | escrow_hold | escrow_release)
- amount: DECIMAL(10,2)
- status: TEXT (pending | completed | failed)
- gig_id: BIGINT (FK to gigs, nullable)
- metadata: JSONB
- created_at: TIMESTAMPTZ
```

### Row Level Security (RLS) Policies

```sql
-- Profiles: Public read, own write
- SELECT: true
- INSERT: auth.uid() = id
- UPDATE: auth.uid() = id

-- Gigs: Public read, client write
- SELECT: true
- INSERT: auth.uid() = client_id
- UPDATE: auth.uid() = client_id

-- Messages: Own messages only
- SELECT: auth.uid() IN (sender_id, receiver_id)
- INSERT: auth.uid() = sender_id

-- Transactions: Own transactions only
- SELECT: auth.uid() = user_id
```

### Database Triggers

#### `handle_transaction_balance()`
Automatically updates user balance when transaction status = 'completed':
- `deposit` / `escrow_release` → Increase balance
- `withdrawal` / `escrow_hold` → Decrease balance

## 🎨 Design System

### Color Palette
```css
--primary: 262 83% 58%        /* Purple */
--accent: 180 100% 50%         /* Cyan */
--background: 222.2 84% 4.9%   /* Dark */
--foreground: 210 40% 98%      /* Light */
```

### Typography
- **Headings**: Outfit (--font-outfit)
- **Body**: Inter (--font-inter)

### Component Patterns
- **Glassmorphism**: `bg-white/[0.02] backdrop-blur-xl border border-white/10`
- **Rounded Corners**: `rounded-[2rem]` to `rounded-[4rem]`
- **Shadows**: `shadow-xl shadow-primary/25`

## 🔄 Data Flow

### Authentication Flow
```
1. User submits credentials
2. Supabase Auth validates
3. JWT token issued
4. Zustand stores user + profile
5. Protected routes check auth state
```

### Real-time Messaging Flow
```
1. User sends message
2. Insert into Supabase messages table
3. Supabase Realtime broadcasts INSERT event
4. All subscribed clients receive update
5. TanStack Query invalidates cache
6. UI re-renders with new message
```

### Payment Flow (MVP)
```
1. User clicks "Add Funds"
2. Razorpay Modal opens
3. User selects payment method
4. Mock 2-second processing
5. Transaction inserted (status: completed)
6. Database trigger updates balance
7. UI optimistically updates
```

## 🚀 Performance Optimizations

### Implemented
- ✅ TanStack Query caching (60s stale time)
- ✅ Optimistic UI updates
- ✅ Code splitting via Next.js App Router
- ✅ Font optimization with `next/font`
- ✅ Lazy loading with React.lazy (where applicable)

### Recommended for Scale
- [ ] Next.js Image component for all images
- [ ] Redis caching layer for hot data
- [ ] CDN for static assets
- [ ] Database connection pooling
- [ ] Incremental Static Regeneration (ISR)

## 🧪 Testing Strategy

### Unit Tests (Recommended)
```bash
npm install -D vitest @testing-library/react
```

Test coverage targets:
- Custom hooks (use-messages.ts)
- Utility functions (lib/utils.ts)
- Store logic (auth-store.ts)

### E2E Tests (Recommended)
```bash
npm install -D playwright
```

Critical user journeys:
- Sign up → Post gig → Browse talent
- Provider signup → Browse gigs → Send message
- Wallet top-up → Transaction history

## 🔒 Security Considerations

### Implemented
- ✅ Row Level Security on all tables
- ✅ JWT-based authentication
- ✅ Environment variable protection
- ✅ HTTPS enforced (Vercel default)
- ✅ Input validation on forms

### Production Recommendations
- [ ] Rate limiting on API routes
- [ ] CSRF protection
- [ ] Content Security Policy (CSP) headers
- [ ] SQL injection prevention (Supabase handles this)
- [ ] XSS sanitization for user-generated content

## 📊 Monitoring & Observability

### Metrics to Track
1. **Performance**
   - Page load time (target: <2s)
   - Time to Interactive (TTI)
   - Core Web Vitals (LCP, FID, CLS)

2. **Business**
   - User signups (client vs provider)
   - Gigs posted per day
   - Messages sent
   - Wallet transactions

3. **Technical**
   - Error rate
   - API response times
   - Database query performance
   - Realtime connection stability

### Recommended Tools
- Vercel Analytics (built-in)
- Sentry (error tracking)
- PostHog (product analytics)
- Supabase Dashboard (database metrics)

## 🔄 CI/CD Pipeline

### Current Setup
```
GitHub → Vercel (auto-deploy on push to main)
```

### Recommended Enhancements
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run lint
      - run: npm run build
      - run: npm test (when tests added)
```

## 🌐 Internationalization (Future)

For multi-language support:
```bash
npm install next-intl
```

Supported languages roadmap:
- English (en)
- Hindi (hi)
- Tamil (ta)
- Telugu (te)

## 📱 Mobile Strategy

### Current: Responsive Web
- Mobile-first CSS
- Touch-optimized interactions
- PWA-ready architecture

### Future: Native Apps
- React Native (code sharing with web)
- Expo for rapid development
- Shared business logic via custom hooks

## 🎯 Scalability Roadmap

### Phase 1 (Current - MVP)
- ✅ Core features
- ✅ Mock payments
- ✅ Basic verification

### Phase 2 (Next 3 months)
- [ ] Real Razorpay integration
- [ ] Aadhaar API integration
- [ ] Advanced search/filters
- [ ] Gig proposals system
- [ ] Rating & review system

### Phase 3 (6-12 months)
- [ ] Video calls (Agora/Twilio)
- [ ] File sharing in messages
- [ ] Advanced analytics dashboard
- [ ] Referral program
- [ ] Mobile apps

## 🤝 Contributing Guidelines

### Code Standards
- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- Component-driven development

### Pull Request Process
1. Create feature branch from `main`
2. Implement changes with tests
3. Run `npm run lint` and `npm run build`
4. Submit PR with description
5. Code review required
6. Merge to main → auto-deploy

---

**Architecture Version**: 1.0.0  
**Last Updated**: January 8, 2026  
**Maintained By**: OpSkl Engineering Team
