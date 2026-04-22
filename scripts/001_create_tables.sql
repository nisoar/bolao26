-- Create profiles table for user display names
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  created_at timestamptz default now()
);

-- Create matches table
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  match_number integer not null unique,
  team_a text not null,
  team_b text not null,
  match_date timestamptz not null,
  actual_score_a integer,
  actual_score_b integer,
  is_finished boolean default false,
  created_at timestamptz default now()
);

-- Create predictions table
create table if not exists public.predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  match_id uuid not null references public.matches(id) on delete cascade,
  predicted_score_a integer not null,
  predicted_score_b integer not null,
  points integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, match_id)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.matches enable row level security;
alter table public.predictions enable row level security;

-- Profiles policies
create policy "profiles_select_all"
  on public.profiles for select
  using (true);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Matches policies (everyone can read, only admins can write)
create policy "matches_select_all"
  on public.matches for select
  using (true);

-- Predictions policies
create policy "predictions_select_all"
  on public.predictions for select
  using (true);

create policy "predictions_insert_own"
  on public.predictions for insert
  with check (auth.uid() = user_id);

create policy "predictions_update_own"
  on public.predictions for update
  using (auth.uid() = user_id);

create policy "predictions_delete_own"
  on public.predictions for delete
  using (auth.uid() = user_id);
