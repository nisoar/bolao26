-- Drop existing matches policies
drop policy if exists "matches_select_all" on public.matches;

-- Recreate select policy (everyone can read)
create policy "matches_select_all"
  on public.matches for select
  using (true);

-- Add admin policies for matches (insert, update, delete)
-- Note: In production, you should use a proper admin role system
-- For now, we'll allow authenticated users to perform these operations
-- and check admin status in the application layer

create policy "matches_insert_authenticated"
  on public.matches for insert
  with check (auth.uid() is not null);

create policy "matches_update_authenticated"
  on public.matches for update
  using (auth.uid() is not null);

create policy "matches_delete_authenticated"
  on public.matches for delete
  using (auth.uid() is not null);
