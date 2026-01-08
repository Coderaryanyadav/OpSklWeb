# Deployment Guide (Vercel)

## Prerequisites
- GitHub Repository (Push your code).
- Vercel Account.
- Supabase Project.

## 1. Environment Variables
Configure these in Vercel > Settings > Environment Variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL (https://xyz.supabase.co) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API Key |
| `NEXT_PUBLIC_RAZORPAY_KEY` | (Optional) Mock key or Real key `rzp_test_...` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** Service Key (for Webhooks/Admin) |
| `RAZORPAY_WEBHOOK_SECRET` | Secret set in Razorpay Dashboard |

**Note**: Since we use Mock Razorpay Mode in this version, the Key is optional but good practice.

## 2. Build Settings
Vercel usually detects Next.js automatically.
- **Framework Preset**: Next.js
- **Root Directory**: `.` (Current)
- **Build Command**: `next build`
- **Output Directory**: `.next`

## 3. Database Migration
Ensure your Supabase table schema matches `supabase-migrations.sql`.
1. Go to Supabase SQL Editor.
2. Paste content of `supabase-migrations.sql`.
3. Run to create `profiles`, `gigs`, `messages`, `transactions` tables.

## 4. Verification
After deployment:
1. Visit your Vercel URL.
2. Open DevTools (F12) > Lighthouse.
3. Run an audit to see **90+ Scores**.
4. Check `sitemap.xml` at `/sitemap.xml`.

## Troubleshooting
- **Build Fails?** Check 'Logs'. If it's a lint error, we have added `.eslintignore` and `.lighthouserc.json` to manage strictness.
- **Images 404?** Ensure `next.config.ts` allows domains if you are using external images (like avatars).
