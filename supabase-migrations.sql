-- =====================================================
-- OPSKL COMPLETE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor to set up everything
-- =====================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    title TEXT,
    bio TEXT,
    avatar TEXT,
    skills TEXT[] DEFAULT '{}',
    xp INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    location TEXT,
    role TEXT CHECK (role IN ('provider', 'client')),
    balance DECIMAL(10,2) DEFAULT 0 CHECK (balance >= 0)
);

-- 2. GIGS TABLE
CREATE TABLE IF NOT EXISTS public.gigs (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    budget_min INTEGER NOT NULL,
    budget_max INTEGER NOT NULL,
    skills TEXT[] DEFAULT '{}',
    location TEXT,
    client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled'))
);

-- 3. MESSAGES TABLE (Real-time Chat)
CREATE TABLE IF NOT EXISTS public.messages (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE
);

-- 4. TRANSACTIONS TABLE (Financial Ledger)
CREATE TABLE IF NOT EXISTS public.transactions (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'escrow_hold', 'escrow_release')),
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    gig_id BIGINT REFERENCES public.gigs(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- =====================================================
-- SECURITY & REALTIME
-- =====================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Gigs Policies
CREATE POLICY "Gigs are viewable by everyone" ON public.gigs FOR SELECT USING (true);
CREATE POLICY "Users can insert their own gigs" ON public.gigs FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Users can update their own gigs" ON public.gigs FOR UPDATE USING (auth.uid() = client_id);

-- Messages Policies
CREATE POLICY "Users can view their own messages" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Transactions Policies
CREATE POLICY "Users can view their own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gigs;

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-update profile balance on transaction completion
CREATE OR REPLACE FUNCTION public.handle_transaction_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' THEN
        IF NEW.type IN ('deposit', 'escrow_release') THEN
            UPDATE public.profiles SET balance = balance + NEW.amount WHERE id = NEW.user_id;
        ELSIF NEW.type IN ('withdrawal', 'escrow_hold') THEN
            UPDATE public.profiles SET balance = balance - NEW.amount WHERE id = NEW.user_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_transaction_completed
    AFTER INSERT OR UPDATE OF status ON public.transactions
    FOR EACH ROW EXECUTE FUNCTION public.handle_transaction_balance();
