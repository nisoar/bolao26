-- ============================================================
-- 010: Fix RLS policies and secure SECURITY DEFINER functions
-- ============================================================

-- -------------------------------------------------------
-- 1. MATCHES table — restrict write operations to admins only
--    (previously any authenticated user could insert/update/delete)
-- -------------------------------------------------------

-- Drop the overly-permissive policies
DROP POLICY IF EXISTS matches_insert_authenticated ON matches;
DROP POLICY IF EXISTS matches_update_authenticated ON matches;
DROP POLICY IF EXISTS matches_delete_authenticated ON matches;

-- Re-create with admin-only guard
CREATE POLICY matches_insert_admin ON matches
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.is_admin = true
    )
  );

CREATE POLICY matches_update_admin ON matches
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.is_admin = true
    )
  );

CREATE POLICY matches_delete_admin ON matches
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.is_admin = true
    )
  );


-- -------------------------------------------------------
-- 2. PREDICTIONS table — restrict SELECT to own rows or finished matches
--    (previously "using (true)" exposed every prediction to everyone)
-- -------------------------------------------------------

DROP POLICY IF EXISTS predictions_select_all ON predictions;

CREATE POLICY predictions_select_own_or_finished ON predictions
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM matches
      WHERE matches.id = predictions.match_id
        AND matches.is_finished = true
    )
  );


-- -------------------------------------------------------
-- 3. update_match_score() — add admin check inside the function
--    (previously any authenticated user could call it directly via API)
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION update_match_score(
  p_match_id UUID,
  p_score_a INTEGER,
  p_score_b INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_admin BOOLEAN;
BEGIN
  -- Verify the caller is an admin
  SELECT is_admin INTO v_is_admin
  FROM profiles
  WHERE id = auth.uid();

  IF v_is_admin IS NOT TRUE THEN
    RAISE EXCEPTION 'Unauthorized: admin access required';
  END IF;

  -- Update the match
  UPDATE matches
  SET
    actual_score_a = p_score_a,
    actual_score_b = p_score_b,
    is_finished = true
  WHERE id = p_match_id;

  -- Recalculate points for all predictions on this match
  UPDATE predictions
  SET points = CASE
    WHEN predicted_score_a = p_score_a AND predicted_score_b = p_score_b THEN 3
    WHEN (predicted_score_a - predicted_score_b) = (p_score_a - p_score_b) THEN 2
    WHEN (predicted_score_a > predicted_score_b AND p_score_a > p_score_b)
      OR (predicted_score_a < predicted_score_b AND p_score_a < p_score_b)
      OR (predicted_score_a = predicted_score_b AND p_score_a = p_score_b) THEN 1
    ELSE 0
  END
  WHERE match_id = p_match_id;
END;
$$;


-- -------------------------------------------------------
-- 4. get_all_users_with_emails() — add admin check inside the function
--    (previously any authenticated user could list all emails)
--    NOTE: must DROP first because we cannot change return type in-place
-- -------------------------------------------------------

DROP FUNCTION IF EXISTS get_all_users_with_emails();

CREATE FUNCTION get_all_users_with_emails()
RETURNS TABLE (
  id UUID,
  display_name TEXT,
  email TEXT,
  is_admin BOOLEAN,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_admin BOOLEAN;
BEGIN
  -- Verify the caller is an admin
  SELECT profiles.is_admin INTO v_is_admin
  FROM profiles
  WHERE profiles.id = auth.uid();

  IF v_is_admin IS NOT TRUE THEN
    RAISE EXCEPTION 'Unauthorized: admin access required';
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    p.display_name,
    COALESCE(au.email::TEXT, 'N/A'),
    p.is_admin,
    p.created_at
  FROM profiles p
  LEFT JOIN auth.users au ON au.id = p.id
  ORDER BY p.created_at DESC;
END;
$$;

-- Re-grant execute only to authenticated users (revoke from public/anon)
REVOKE EXECUTE ON FUNCTION get_all_users_with_emails() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION get_all_users_with_emails() FROM anon;
GRANT EXECUTE ON FUNCTION get_all_users_with_emails() TO authenticated;
