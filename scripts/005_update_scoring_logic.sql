-- Updated function with new scoring logic
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
  v_pred_diff integer;
  v_actual_diff integer;
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
    v_pred_diff := v_prediction.predicted_score_a - v_prediction.predicted_score_b;
    v_actual_diff := p_score_a - p_score_b;
    
    -- Rule 1: Exact Score (25 Points)
    if v_prediction.predicted_score_a = p_score_a 
       and v_prediction.predicted_score_b = p_score_b then
      v_points := 25;
    
    -- Rule 2: Match Winner & Winner's Goals (18 Points) - Not valid for draws
    elsif v_actual_diff != 0 and v_pred_diff != 0 and
          ((v_pred_diff > 0 and v_actual_diff > 0 and v_prediction.predicted_score_a = p_score_a) or
           (v_pred_diff < 0 and v_actual_diff < 0 and v_prediction.predicted_score_b = p_score_b)) then
      v_points := 18;
    
    -- Rule 3: Match Winner & Goal Difference (15 Points)
    elsif v_pred_diff != 0 and v_actual_diff != 0 and
          abs(v_pred_diff) = abs(v_actual_diff) and
          ((v_pred_diff > 0 and v_actual_diff > 0) or (v_pred_diff < 0 and v_actual_diff < 0)) then
      v_points := 15;
    
    -- Rule 4: Correct Draw (15 Points) - Not exact score
    elsif v_pred_diff = 0 and v_actual_diff = 0 then
      v_points := 15;
    
    -- Rule 5: Match Winner & Loser's Goals (12 Points)
    elsif v_actual_diff != 0 and v_pred_diff != 0 and
          ((v_pred_diff > 0 and v_actual_diff > 0 and v_prediction.predicted_score_b = p_score_b) or
           (v_pred_diff < 0 and v_actual_diff < 0 and v_prediction.predicted_score_a = p_score_a)) then
      v_points := 12;
    
    -- Rule 6: Only Match Winner (10 Points)
    elsif (v_pred_diff > 0 and v_actual_diff > 0) or
          (v_pred_diff < 0 and v_actual_diff < 0) then
      v_points := 10;
    
    end if;

    -- Update prediction points
    update public.predictions
    set points = v_points
    where id = v_prediction.id;
  end loop;
end;
$$;
