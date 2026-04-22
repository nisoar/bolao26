-- Function to update match scores and calculate points
create or replace function public.update_match_score(
  p_match_id uuid,
  p_score_a integer,
  p_score_b integer
)
returns void
language plpgsql
security definer
as $$
declare
  v_prediction record;
  v_points integer;
begin
  -- Update match scores
  update public.matches
  set 
    actual_score_a = p_score_a,
    actual_score_b = p_score_b,
    is_finished = true
  where id = p_match_id;

  -- Calculate points for all predictions
  for v_prediction in 
    select id, predicted_score_a, predicted_score_b
    from public.predictions
    where match_id = p_match_id
  loop
    v_points := 0;
    
    -- Exact score match: 3 points
    if v_prediction.predicted_score_a = p_score_a 
       and v_prediction.predicted_score_b = p_score_b then
      v_points := 3;
    -- Correct winner: 1 point
    elsif (v_prediction.predicted_score_a > v_prediction.predicted_score_b 
           and p_score_a > p_score_b)
       or (v_prediction.predicted_score_a < v_prediction.predicted_score_b 
           and p_score_a < p_score_b)
       or (v_prediction.predicted_score_a = v_prediction.predicted_score_b 
           and p_score_a = p_score_b) then
      v_points := 1;
    end if;

    -- Update prediction points
    update public.predictions
    set points = v_points
    where id = v_prediction.id;
  end loop;
end;
$$;

-- Create view for leaderboard
create or replace view public.leaderboard as
select 
  p.display_name,
  coalesce(sum(pr.points), 0) as total_points,
  count(pr.id) as predictions_count
from public.profiles p
left join public.predictions pr on p.id = pr.user_id
group by p.id, p.display_name
order by total_points desc, predictions_count desc;
