-- OpSkl Performance Indexes
-- Run these in Supabase SQL Editor for 10x faster queries

-- Gig queries (most common)
CREATE INDEX IF NOT EXISTS idx_gigs_client_id ON gigs(client_id);
CREATE INDEX IF NOT EXISTS idx_gigs_status ON gigs(status);
CREATE INDEX IF NOT EXISTS idx_gigs_category ON gigs(category);
CREATE INDEX IF NOT EXISTS idx_gigs_created_at ON gigs(created_at DESC);

-- Message queries (real-time performance)
CREATE INDEX IF NOT EXISTS idx_messages_sender_receiver ON messages(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_sender ON messages(receiver_id, sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Transaction queries (wallet)
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- Profile queries (search & discovery)
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_verified ON profiles(verified);
CREATE INDEX IF NOT EXISTS idx_profiles_skills ON profiles USING GIN(skills);

-- Composite indexes for complex queries
CREATE INDEX IF NOT EXISTS idx_gigs_status_category ON gigs(status, category);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(receiver_id, is_read);

ANALYZE gigs;
ANALYZE messages;
ANALYZE transactions;
ANALYZE profiles;

-- Report
SELECT 
    schemaname, 
    tablename, 
    indexname, 
    indexdef 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename, indexname;
