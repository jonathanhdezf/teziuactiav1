-- =====================================================
-- Teziuactua - Citizen Petition Signatures Schema
-- Run this in your Supabase SQL Editor
-- =====================================================

-- 1. Create signatures table
CREATE TABLE IF NOT EXISTS signatures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  domicilio VARCHAR(500) NOT NULL,
  telefono VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_hash VARCHAR(64),
  is_duplicate BOOLEAN DEFAULT FALSE
);

-- 2. Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_signatures_created_at ON signatures(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_signatures_nombre ON signatures(nombre);
CREATE INDEX IF NOT EXISTS idx_signatures_domicilio ON signatures(domicilio);
CREATE INDEX IF NOT EXISTS idx_signatures_ip_hash ON signatures(ip_hash);

-- 3. Create daily count function
CREATE OR REPLACE FUNCTION get_daily_signature_count()
RETURNS INTEGER AS $$
DECLARE
  count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO count
  FROM signatures
  WHERE created_at >= CURRENT_DATE;
  RETURN count;
END;
$$ LANGUAGE plpgsql;

-- 4. Create total count function
CREATE OR REPLACE FUNCTION get_total_signature_count()
RETURNS INTEGER AS $$
DECLARE
  count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO count
  FROM signatures;
  RETURN count;
END;
$$ LANGUAGE plpgsql;

-- 5. Create duplicate check function (prevent same person signing twice)
CREATE OR REPLACE FUNCTION check_duplicate_signature(
  p_nombre TEXT,
  p_domicilio TEXT,
  p_ip_hash TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  is_dup BOOLEAN;
BEGIN
  -- Check by IP hash
  SELECT EXISTS(
    SELECT 1 FROM signatures
    WHERE ip_hash = p_ip_hash
    AND created_at > NOW() - INTERVAL '24 hours'
  ) INTO is_dup;
  
  IF is_dup THEN RETURN TRUE; END IF;
  
  -- Check by name + domicilio similarity
  SELECT EXISTS(
    SELECT 1 FROM signatures
    WHERE LOWER(nombre) = LOWER(p_nombre)
    AND LOWER(domicilio) = LOWER(p_domicilio)
  ) INTO is_dup;
  
  RETURN is_dup;
END;
$$ LANGUAGE plpgsql;

-- 6. Enable Row Level Security
ALTER TABLE signatures ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS Policies
-- Allow anyone to insert (signatures are public petition)
CREATE POLICY "Allow signature creation"
  ON signatures
  FOR INSERT
  WITH CHECK (true);

-- No one can read signatures publicly (protect PII)
CREATE POLICY "Only service role can read signatures"
  ON signatures
  FOR SELECT
  USING (false);

-- Only service role can update
CREATE POLICY "Only service role can update signatures"
  ON signatures
  FOR UPDATE
  USING (false);

-- Only service role can delete
CREATE POLICY "Only service role can delete signatures"
  ON signatures
  FOR DELETE
  USING (false);

-- 8. Create a view for public stats (count only, no PII)
CREATE OR REPLACE VIEW signature_stats AS
SELECT
  COUNT(*) AS total_signatures,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) AS today_signatures,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS week_signatures,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS month_signatures,
  MIN(created_at) AS first_signature,
  MAX(created_at) AS latest_signature
FROM signatures;

-- 9. Allow public access to the stats view
GRANT SELECT ON signature_stats TO anon;
GRANT SELECT ON signature_stats TO authenticated;

-- 10. Create function to get signature count (public)
CREATE OR REPLACE FUNCTION public.get_signature_count()
RETURNS TABLE (
  total_signatures BIGINT,
  today_signatures BIGINT,
  week_signatures BIGINT,
  month_signatures BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    total_signatures,
    today_signatures,
    week_signatures,
    month_signatures
  FROM signature_stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Comments for documentation
COMMENT ON TABLE signatures IS 'Citizen petition signatures for Teziuactua';
COMMENT ON COLUMN signatures.ip_hash IS 'SHA-256 hash of user IP for duplicate prevention';
COMMENT ON COLUMN signatures.is_duplicate IS 'Flag for potential duplicate entries';
