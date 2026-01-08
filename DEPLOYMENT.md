# OpSkl Platform - Production Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account with OpSklWeb repository
- Supabase account with project created
- Vercel account (free tier works)

### Step 1: Database Setup

1. **Run Supabase Migrations**
   - Open your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy the entire contents of `supabase-migrations.sql`
   - Execute the script to create all tables, policies, and triggers

2. **Verify Tables Created**
   ```
   ✓ profiles
   ✓ gigs
   ✓ messages
   ✓ transactions
   ```

3. **Enable Realtime**
   - Go to Database → Replication
   - Enable replication for `messages` and `gigs` tables

### Step 2: Environment Variables

Create a `.env.local` file with:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Razorpay (for production payments)
NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key_id
```

**Where to find Supabase credentials:**
- Dashboard → Settings → API
- Copy the Project URL and anon/public key

### Step 3: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `Coderaryanyadav/OpSklWeb`
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

6. Click "Deploy"

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

### Step 4: Post-Deployment Verification

1. **Test Authentication**
   - Visit your deployed URL
   - Create a test account (both client and provider)
   - Verify profile creation in Supabase

2. **Test Core Features**
   - ✓ Post a gig (as client)
   - ✓ Browse gigs (as provider)
   - ✓ Send a message
   - ✓ Add funds to wallet
   - ✓ Complete Aadhaar verification

3. **Check Real-time**
   - Open two browser windows
   - Send a message from one
   - Verify it appears instantly in the other

## 🔧 Production Optimizations

### Performance

1. **Enable Next.js Image Optimization**
   - Replace `<img>` tags with `<Image>` from `next/image`
   - Already configured in `next.config.js`

2. **Database Indexes** (Optional for scale)
   ```sql
   CREATE INDEX idx_gigs_client_id ON gigs(client_id);
   CREATE INDEX idx_messages_sender ON messages(sender_id);
   CREATE INDEX idx_messages_receiver ON messages(receiver_id);
   CREATE INDEX idx_transactions_user ON transactions(user_id);
   ```

3. **Enable Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```
   
   Add to `layout.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';
   
   // In body
   <Analytics />
   ```

### Security

1. **Row Level Security (RLS)** - ✅ Already enabled
2. **Environment Variables** - ✅ Never commit `.env.local`
3. **API Rate Limiting** - Consider adding Vercel Edge Config

### Monitoring

1. **Vercel Logs**
   - Dashboard → Your Project → Logs
   - Monitor errors and performance

2. **Supabase Logs**
   - Dashboard → Logs
   - Track database queries and auth events

## 🎯 Custom Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `opskl.com`)
3. Update DNS records as instructed by Vercel
4. SSL certificate is automatically provisioned

## 🔐 Production Razorpay Integration

### For Real Payments (Beyond MVP)

1. **Create Razorpay Account**
   - Sign up at [razorpay.com](https://razorpay.com)
   - Complete KYC verification

2. **Get API Keys**
   - Dashboard → Settings → API Keys
   - Generate Key ID and Secret

3. **Create Webhook Endpoint**
   
   Create `src/app/api/webhooks/razorpay/route.ts`:
   ```typescript
   import { NextRequest, NextResponse } from 'next/server';
   import { supabase } from '@/lib/supabase/client';
   import crypto from 'crypto';

   export async function POST(req: NextRequest) {
       const body = await req.text();
       const signature = req.headers.get('x-razorpay-signature');
       
       // Verify webhook signature
       const expectedSignature = crypto
           .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
           .update(body)
           .digest('hex');
       
       if (signature !== expectedSignature) {
           return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
       }
       
       const event = JSON.parse(body);
       
       if (event.event === 'payment.captured') {
           const { order_id, amount } = event.payload.payment.entity;
           
           // Update transaction status
           await supabase
               .from('transactions')
               .update({ status: 'completed' })
               .eq('metadata->order_id', order_id);
       }
       
       return NextResponse.json({ received: true });
   }
   ```

4. **Configure Webhook in Razorpay**
   - Dashboard → Webhooks
   - Add: `https://your-domain.com/api/webhooks/razorpay`
   - Select events: `payment.captured`, `payment.failed`

## 📊 Analytics & Monitoring

### Recommended Tools

1. **Vercel Analytics** - Built-in performance monitoring
2. **Sentry** - Error tracking
3. **PostHog** - Product analytics
4. **LogRocket** - Session replay

### Setup Sentry (Optional)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

## 🚨 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Supabase Connection Issues

- Verify environment variables are set correctly
- Check Supabase project is not paused (free tier auto-pauses after inactivity)
- Ensure RLS policies allow the operations

### Realtime Not Working

- Verify Realtime is enabled in Supabase
- Check browser console for WebSocket errors
- Ensure tables are added to replication

## 📱 Progressive Web App (PWA)

To make OpSkl installable:

1. Install next-pwa:
   ```bash
   npm install next-pwa
   ```

2. Update `next.config.js`:
   ```javascript
   const withPWA = require('next-pwa')({
       dest: 'public',
       register: true,
       skipWaiting: true,
   });

   module.exports = withPWA({
       // existing config
   });
   ```

3. Create `public/manifest.json`:
   ```json
   {
       "name": "OpSkl - Trust-First Gig Economy",
       "short_name": "OpSkl",
       "description": "India's verified gig economy platform",
       "start_url": "/",
       "display": "standalone",
       "background_color": "#0a0a0a",
       "theme_color": "#a855f7",
       "icons": [
           {
               "src": "/icon-192.png",
               "sizes": "192x192",
               "type": "image/png"
           },
           {
               "src": "/icon-512.png",
               "sizes": "512x512",
               "type": "image/png"
           }
       ]
   }
   ```

## 🎓 Next Steps After Deployment

1. **User Testing** - Invite beta users
2. **Performance Audit** - Run Lighthouse tests
3. **SEO Optimization** - Add meta tags, sitemap
4. **Legal Compliance** - Terms of Service, Privacy Policy
5. **Marketing** - Social media, landing page optimization

## 📞 Support

- **GitHub Issues**: [OpSklWeb Issues](https://github.com/Coderaryanyadav/OpSklWeb/issues)
- **Vercel Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

---

**Last Updated**: January 8, 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
