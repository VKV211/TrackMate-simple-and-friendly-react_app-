import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fgbiclvjyvbhsktcbzfe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnYmljbHZqeXZiaHNrdGNiemZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NDcyMTksImV4cCI6MjA3NzIyMzIxOX0.RY1ARingvSFZqlzDhfyfKDLpbQk_7UGgFv47g3zyOM8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
