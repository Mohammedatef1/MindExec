import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rjvmcksmnbyubxxtwbnm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdm1ja3NtbmJ5dWJ4eHR3Ym5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3OTM5NTAsImV4cCI6MjAzNDM2OTk1MH0.6SKSBq4LrtBNW0jLJEE8gZoOmno-1aP8rJWKLxZEuOQ";
export const supabase = createClient(supabaseUrl, supabaseKey);
