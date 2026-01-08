# OpSkl Environment Variables Setup

## 🔐 Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Supabase Configuration (REQUIRED)

```bash
# Get these from: https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**How to get Supabase credentials:**
1. Go to your Supabase project dashboard
2. Click Settings → API
3. Copy "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
4. Copy "anon/public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Optional: Production Keys

```bash
# Razorpay (for real payments - not needed for MVP/testing)
NEXT_PUBLIC_RAZORPAY_KEY=rzp_live_xxxxxxxxxxxxx

# Supabase Service Role (for admin operations & load testing)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📋 Setup Steps

### 1. Copy Template
```bash
cp .env.example .env.local
```

### 2. Fill in Values
Edit `.env.local` and replace placeholder values with your actual credentials.

### 3. Verify Setup
```bash
npm run dev
```

If you see connection errors, double-check your Supabase credentials.

---

## 🔒 Security Best Practices

### ✅ DO:
- ✅ Keep `.env.local` in `.gitignore` (already configured)
- ✅ Use different keys for dev/staging/production
- ✅ Rotate keys regularly (every 90 days)
- ✅ Use Vercel environment variables for production
- ✅ Never commit API keys to Git

### ❌ DON'T:
- ❌ Share your `.env.local` file
- ❌ Commit `.env.local` to version control
- ❌ Use production keys in development
- ❌ Store keys in plaintext outside of `.env` files
- ❌ Use the same keys across multiple projects

---

## 🚀 Deployment (Vercel)

### Add Environment Variables in Vercel Dashboard:

1. Go to: Project Settings → Environment Variables
2. Add each variable:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase URL
   - Environment: Production, Preview, Development
3. Repeat for all variables
4. Redeploy if already deployed

### Via Vercel CLI:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

---

## 🧪 Testing Credentials

For **load testing only** (scripts/load-test.js):

```bash
# Required for generating 100k test records
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**⚠️ WARNING:** Service role key bypasses RLS. Only use on TEST databases!

---

## 🐛 Troubleshooting

### "Failed to fetch" or "Network error"
- ✅ Check if `NEXT_PUBLIC_SUPABASE_URL` is correct
- ✅ Ensure URL includes `https://`
- ✅ Verify Supabase project is not paused (free tier auto-pauses)

### "Invalid API key"
- ✅ Check if you copied the correct key (anon vs service role)
- ✅ Regenerate key if suspected compromise
- ✅ Ensure no extra spaces or line breaks in `.env.local`

### "Payment failed"
- ✅ Razorpay key is optional for MVP
- ✅ Mock payments work without real Razorpay integration
- ✅ For production, get keys from razorpay.com dashboard

---

## 📞 Support

- Supabase issues: https://supabase.com/docs
- Razorpay setup: https://razorpay.com/docs
- Environment variables docs: https://nextjs.org/docs/basic-features/environment-variables

---

**Last Updated**: January 8, 2026  
**Status**: ✅ Ready for Development
