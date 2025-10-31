import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fmwfbihnmyvoxpdwyyoy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2ZiaWhubXl2b3hwZHd5eW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4Mjc4MTYsImV4cCI6MjA3NzQwMzgxNn0.kLKB-ARgwpJ-eMk22lg8DPghlwXQMd6aVW-jojULCnI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
