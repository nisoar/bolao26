-- Fix: Recreate leaderboard view with SECURITY INVOKER (default)
-- This ensures the view respects the RLS policies of the querying user
-- instead of running with the elevated permissions of the view creator.

drop view if exists public.leaderboard;

create or replace view public.leaderboard
  with (security_invoker = true)
as
select
  p.display_name,
  coalesce(sum(pr.points), 0) as total_points,
  count(pr.id) as predictions_count
from public.profiles p
left join public.predictions pr on p.id = pr.user_id
group by p.id, p.display_name
order by total_points desc, predictions_count desc;

-- Grant read access to authenticated and anonymous users
grant select on public.leaderboard to anon, authenticated;
