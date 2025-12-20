-- Create workflows table for storing user workflows as JSON
CREATE TABLE IF NOT EXISTS workflows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Untitled Workflow',
  data JSONB NOT NULL,
  runs_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);

-- Create index on updated_at for sorting
CREATE INDEX IF NOT EXISTS idx_workflows_updated_at ON workflows(updated_at DESC);

-- Enable Row Level Security
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own workflows
CREATE POLICY "Users can view their own workflows"
  ON workflows
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own workflows
CREATE POLICY "Users can insert their own workflows"
  ON workflows
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own workflows
CREATE POLICY "Users can update their own workflows"
  ON workflows
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can delete their own workflows
CREATE POLICY "Users can delete their own workflows"
  ON workflows
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON workflows
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
