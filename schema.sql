-- =========================================
-- Crystal Balance: Supabase Database Schema
-- Fully optimized for AI / Copilot
-- Includes: Profiles, Transactions, Category Limits, Triggers, RLS
-- =========================================

-- =========================================
-- 1. PROFILES TABLE
-- Linked directly to Supabase Auth users
-- =========================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- =========================================
-- 2. AUTOMATIC PROFILE CREATION TRIGGER
-- When a new user signs up, a profile is auto-created
-- =========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================
-- 3. TRANSACTIONS TABLE
-- Stores all income and expense entries
-- =========================================
CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount numeric(15,2) NOT NULL,
  type text NOT NULL CHECK (type IN ('income','expense')),
  category text NOT NULL,
  date date NOT NULL DEFAULT current_date,
  note text,
  created_at timestamptz DEFAULT now()
);

-- Index to speed up queries by user and date
CREATE INDEX IF NOT EXISTS idx_transactions_user_date
ON public.transactions (user_id, date);

-- =========================================
-- 4. CATEGORY LIMITS TABLE
-- Users can set monthly spending limits per category
-- =========================================
CREATE TABLE IF NOT EXISTS public.category_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category text NOT NULL,
  monthly_limit numeric(15,2) NOT NULL CHECK (monthly_limit >= 0),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, category)
);

-- Index for quick lookup by user
CREATE INDEX IF NOT EXISTS idx_category_limits_user
ON public.category_limits (user_id);

-- =========================================
-- 5. OPTIONAL: INSIGHTS TABLE
-- Store generated “Fake AI” insights for auditing or display
-- =========================================
CREATE TABLE IF NOT EXISTS public.insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  generated_at timestamptz DEFAULT now()
);

-- =========================================
-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- Ensures each user sees only their own data
-- =========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

-- =========================================
-- 7. RLS POLICIES
-- Simple, beginner-friendly rules
-- =========================================
-- Profiles
CREATE POLICY "Users can only view their own profile" 
ON public.profiles 
FOR SELECT USING (auth.uid() = id);

-- Transactions
CREATE POLICY "Users can only manage their own transactions"
ON public.transactions 
FOR ALL USING (auth.uid() = user_id);

-- Category Limits
CREATE POLICY "Users can only manage their own category limits"
ON public.category_limits 
FOR ALL USING (auth.uid() = user_id);

-- Insights
CREATE POLICY "Users can only see their own insights"
ON public.insights
FOR ALL USING (auth.uid() = user_id);

