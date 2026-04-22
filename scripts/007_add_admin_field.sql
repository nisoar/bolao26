-- Add is_admin field to profiles table
alter table public.profiles add column if not exists is_admin boolean default false;

-- Update existing admin users (based on email)
-- Note: Run this after users have signed up
-- update public.profiles set is_admin = true where id in (
--   select id from auth.users where email in ('admin@example.com', 'worldcup@admin.com', 'nar@centralenergia.com')
-- );

-- Add RLS policies for admin operations on profiles
create policy "admins_can_update_profiles"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

create policy "admins_can_delete_profiles"
  on public.profiles for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Create a function to check if user is admin
create or replace function public.is_user_admin(user_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = user_id and is_admin = true
  );
end;
$$ language plpgsql security definer;
