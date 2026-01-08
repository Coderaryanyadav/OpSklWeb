# OpSkl Web MVP

OpSkl is India's premium, trust-first gig economy platform. This web MVP is designed to demonstrate core user flows, technical execution, and user experience excellence to stakeholders and teachers.

## 🚀 Features

- **Premium Design**: Modern, dark-themed UI with glassmorphism and smooth animations.
- **Real-time Data**: Integrated with Supabase for real-time gig and profile fetching.
- **Trust Layer**: Visual indicators for Aadhaar verification and secure Escrow payments.
- **Multi-step Flows**: Intuitive "Post a Gig" and "Browse" experiences.
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4+](https://tailwindcss.com/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Coderaryanyadav/OpSklWeb.git
   cd OpSklWeb
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file with your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run Dev Server**:
   ```bash
   npm run dev
   ```

## 🌐 Deployment on Vercel

This project is Vercel-ready. To deploy:

1. Push your code to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the `OpSklWeb` repository.
4. Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as Environment Variables.
5. Click **Deploy**.

## 🎨 Design System

- **Primary**: Indigo (#6366f1)
- **Accent**: Pink (#ec4899)
- **Background**: Deep Midnight (#020617)
- **Typography**: Inter (Google Fonts)

---

Built for the India-first Gig Economy. 🚀
