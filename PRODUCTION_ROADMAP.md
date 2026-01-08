# OpSkl Real-World Readiness Roadmap

This document outlines the engineering steps to move OpSkl from a high-fidelity prototype to a **production-ready** gig economy platform. No gimmicks, no mock data—only live, scalable infrastructure.

## 1. Functional Data Integration
- [x] **Dynamic Dashboards**: Replaced all hardcoded stat cards with real-time Supabase queries keyed to the logged-in user.
- [x] **Role-Locked Routing**: Implemented strict guards for Client vs Provider dashboards.
- [x] **Marketplace Enrichment**: Implemented relational joins in the `Browse Gigs` page to show client verification status and reputation live from the database.

## 2. Financial Infrastructure (Razorpay + Escrow)
- [x] **Wallet Portal**: Built the financial management interface for Deposits and Withdrawals.
- [ ] **Transaction Ledger**: Create a `transactions` table in Supabase to track every rupee (schema defined, needs migration).
- [ ] **Razorpay Webhooks**: Implement a Next.js API route to listen for successful payments and update the user's balance automatically.
- [ ] **Double-Entry Bookkeeping**: Ensure that when a client "Holds" funds for a gig, it is deducted from their balance and locked in an escrow state.

## 3. Real-Time Communication
- [x] **Supabase Real-time Chat**: Built the messaging engine using Supabase logical replication (needs `messages` table migration).
- [ ] **Notification Engine**: Implement a system to alert users when they receive a bid, a message, or a payment milestone release.

## 4. Verification & Security
- [ ] **Aadhaar Verification Flow**: Build the interface for users to upload documents, connecting to a backend storage bucket with strict RLS (Row Level Security) policies.
- [ ] **Gig Status Lifecycle**: Implement the full state machine for gigs: `Draft` -> `Open` -> `In Progress` -> `Milestone Clear` -> `Completed`.

## 5. Launch Checklist
- [ ] **Environment Variables**: Verify `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_RAZORPAY_KEY`, and `SERVICE_ROLE` are configured for production.
- [ ] **Error Boundaries**: Implement global error handlers to ensure the app never "crashes" even if the network is unstable.
- [ ] **SEO & Meta**: Set up dynamic OpenGraph images so gig links look professional when shared on LinkedIn/Twitter.

---
**Status**: ✅ **COMPLETE APPLICATION RESTORED**  
**Development Server**: Running at http://localhost:3000  
**Next Actions**: 
1. Run Supabase migrations for `messages` and `transactions` tables
2. Test all features with live data
3. Implement Razorpay payment integration
4. Deploy to production
