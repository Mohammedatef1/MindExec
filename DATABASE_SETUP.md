# Database Setup Instructions

## Supabase Table Setup

To enable workflow storage in the database, you need to create the `workflows` table in your Supabase project.

### Steps:

1. **Open Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor

2. **Run the Migration**
   - Copy the contents of `supabase_migration.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the migration

3. **Verify the Table**
   - Go to the Table Editor in Supabase
   - You should see a new `workflows` table with the following columns:
     - `id` (UUID, Primary Key)
     - `user_id` (UUID, Foreign Key to auth.users)
     - `name` (Text)
     - `data` (JSONB)
     - `runs_count` (Integer)
     - `created_at` (Timestamp)
     - `updated_at` (Timestamp)

4. **Verify Row Level Security**
   - Go to Authentication > Policies in Supabase
   - You should see policies for the `workflows` table ensuring users can only access their own workflows

### Table Structure

The `workflows` table stores:
- **id**: Unique identifier for each workflow
- **user_id**: Links the workflow to the user who created it
- **name**: Display name for the workflow
- **data**: JSON object containing the workflow's nodes and edges (ReactFlow data)
- **runs_count**: Number of times the workflow has been executed
- **created_at**: Timestamp when the workflow was created
- **updated_at**: Timestamp when the workflow was last modified (auto-updated)

### Features

- **Automatic Timestamps**: The `updated_at` field is automatically updated whenever a workflow is modified
- **Row Level Security**: Users can only access, modify, and delete their own workflows
- **Indexed Queries**: Indexes on `user_id` and `updated_at` for fast queries

### Usage

After running the migration:
1. Workflows will be automatically saved to the database when you click "Save" in the editor
2. Workflows will appear on the Dashboard page
3. You can click on a workflow name to open it in the editor
4. You can delete workflows from the Dashboard
