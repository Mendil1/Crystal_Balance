// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZWhhbXNyYW1rZnpnZHR4cWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NzM3ODIsImV4cCI6MjA4MjA0OTc4Mn0.VUuWH61s1RY_5hDdsQLnv3x9taxVpmRbZeVMvLhGndA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
