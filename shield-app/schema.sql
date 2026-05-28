-- Create the reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('whatsapp', 'link', 'bank_account', 'hacked_number')),
  evidence_value TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('confirmed', 'pending')) DEFAULT 'pending',
  recovery_password TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reports (for search)
CREATE POLICY "Allow public read access" ON reports
  FOR SELECT
  USING (true);

-- Allow anyone to insert reports (for anonymous reporting)
CREATE POLICY "Allow public insert access" ON reports
  FOR INSERT
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reports_evidence_value ON reports(evidence_value);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at);
