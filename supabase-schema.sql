-- Create the sales_data table in Supabase
CREATE TABLE IF NOT EXISTS sales_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data JSONB NOT NULL,
  analysis_result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_sales_data_user_id ON sales_data(user_id);

-- Create an index on upload_date for faster queries
CREATE INDEX IF NOT EXISTS idx_sales_data_upload_date ON sales_data(upload_date);

-- Enable Row Level Security (RLS)
ALTER TABLE sales_data ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to see only their own data
-- Note: In a production environment, you would use auth.uid() instead of checking user_id
CREATE POLICY "Users can view own sales data" ON sales_data
  FOR SELECT USING (true); -- For demo purposes, allow all reads

CREATE POLICY "Users can insert own sales data" ON sales_data
  FOR INSERT WITH CHECK (true); -- For demo purposes, allow all inserts

CREATE POLICY "Users can update own sales data" ON sales_data
  FOR UPDATE USING (true); -- For demo purposes, allow all updates
