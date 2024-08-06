import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://wslbhcbmtzocosoaqtmy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbGJoY2JtdHpvY29zb2FxdG15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5NTE4MDQsImV4cCI6MjAzODUyNzgwNH0.aECVGLr5WQOXak83NXF1ax9Ni5tUM0Ta__uOfjTuK7U"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase