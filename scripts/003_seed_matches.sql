-- Seed some sample World Cup 2026 matches
insert into public.matches (match_number, team_a, team_b, match_date) values
  (1, 'USA', 'Mexico', '2026-06-11 20:00:00+00'),
  (2, 'Canada', 'Brazil', '2026-06-12 17:00:00+00'),
  (3, 'Argentina', 'Germany', '2026-06-13 20:00:00+00'),
  (4, 'Spain', 'France', '2026-06-14 17:00:00+00'),
  (5, 'England', 'Italy', '2026-06-15 20:00:00+00'),
  (6, 'Portugal', 'Netherlands', '2026-06-16 17:00:00+00'),
  (7, 'Belgium', 'Croatia', '2026-06-17 20:00:00+00'),
  (8, 'Uruguay', 'Colombia', '2026-06-18 17:00:00+00')
on conflict (match_number) do nothing;
