# OpSkl Web - User Manual & Demo Guide

## 🌟 Welcome to OpSkl
This guide covers the core workflows of the OpSkl platform. Use this for your MVP demonstration.

---

## 1. Authentication & Onboarding

### Sign Up / Login
- **URL**: `/login` or `/signup`
- **Action**: Create an account or log in with existing credentials.
- **Note**: You can toggle between **Client** (hiring) and **Provider** (working) roles during signup.

### Identity Verification (Aadhaar KYC)
- **URL**: `/verify`
- **Pre-requisite**: Must be logged in.
- **Action**:
  1. Click "Verify Identity" on Dashboard or navigate to `/verify`.
  2. Enter a 12-digit Mock Aadhaar Number.
  3. Upload any dummy image (simulating ID card).
  4. Watch the **AI Verification Animation** (approx 2-3 seconds).
  5. **Success**: You receive the "Verified" badge.
- **A+ Feature**: Notice the `framer-motion` transitions and "Scanning" effect.

---

## 2. Dashboards (Role-Based)

### Client Dashboard
- **URL**: `/dashboard` (if Client)
- **Features**:
  - **Stats**: View Active Spend, Projects, and Contracts.
  - **Actions**: "Post New Project" button (Top Right).
  - **Live Data**: Shows real gigs fetched from Supabase.

### Provider Dashboard
- **URL**: `/dashboard` (if Provider)
- **Features**:
  - **Analytics**: Earnings chart, Profile Views, Reputation Score.
  - **XP System**: Visual progress bar for "Level 1" to "Elite".
  - **Gig Recommendations**: List of open gigs matching your skills.

---

## 3. Gig Marketplace

### Posting a Gig (Client Only)
- **URL**: `/post-gig`
- **Form Flow**:
  1. Enter Title, Description (>50 chars), Budget Range.
  2. Select Category (Dev, Design, etc.).
  3. Click **"Broadcast Project"**.
- **Result**: Redirects to Dashboard. The Gig is now live in the marketplace.

### Viewing Gigs
- **URL**: `/gigs`
- **Details**: Click any gig card to open the **Gig Details Page** (`/gigs/[id]`).
  - View Budget, Location, and Client Verification status.
  - JSON-LD Structured Data is automatically generated for SEO (inspect page source).

---

## 4. Wallet & Payments

### Top Up Balance
- **URL**: `/wallet`
- **Action**:
  1. Click "Add Money" card.
  2. Enter Amount (e.g., ₹50,000).
  3. Click "Add Funds" to open **Razorpay Simulation Modal**.
  4. Select Method (UPI/Card).
  5. Watch the "Processing" state and Success animation.
- **Result**: Balance updates instantly via Optimistic Updates + DB Trigger.

---

## 5. Security & Tech Highlights (For Examiners)

- **Performance**:
  - Images use `next/image` with blur placeholders.
  - Pages are statically generated where possible for speed.
  - Bundle Size optimized (check `.next/analyze`).

- **Accessibility**:
  - Full keyboard navigation support on Forms and Modals.
  - Screen-reader friendly (ARIA labels on inputs/buttons).
  - Verified via `axe-core` tests.

- **Security**:
  - Inputs validated via `Zod` (try submitting empty forms).
  - Row Level Security (RLS) protects database access.
  - Security Headers (CSP, HSTS) active on all responses.

---

**Ready for Demo!** 🚀
