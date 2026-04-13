-- =====================================================
-- Teziuactua - Site Visits Counter
-- Run this in your Supabase SQL Editor
-- =====================================================

-- 1. Create site_visits table (simple counter)
CREATE TABLE IF NOT EXISTS site_visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_hash VARCHAR(64) NOT NULL,
  user_agent TEXT,
  page VARCHAR(255) DEFAULT '/',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes
CREATE INDEX IF NOT EXISTS idx_site_visits_created_at ON site_visits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_visits_ip_hash ON site_visits(ip_hash);

-- 3. Enable Row Level Security
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Allow anyone to insert visits
CREATE POLICY "Allow visit recording"
  ON site_visits
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read count (just count, no PII)
CREATE POLICY "Allow public count"
  ON site_visits
  FOR SELECT
  USING (true);

-- 5. Function to get unique visitors count (deduplicated by IP per 24h)
CREATE OR REPLACE FUNCTION public.get_unique_visitor_count()
RETURNS BIGINT AS $$
DECLARE
  count BIGINT;
BEGIN
  SELECT COUNT(DISTINCT ip_hash)
  INTO count
  FROM site_visits
  WHERE created_at > NOW() - INTERVAL '30 days';
  RETURN count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Comment
COMMENT ON TABLE site_visits IS 'Site visit counter with IP-based deduplication';
