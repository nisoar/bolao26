-- Create a function to get all users with their emails
-- This function runs with SECURITY DEFINER to access auth.users
CREATE OR REPLACE FUNCTION get_all_users_with_emails()
RETURNS TABLE (
  id uuid,
  display_name text,
  email text,
  is_admin boolean,
  created_at timestamptz
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.display_name,
    -- Cast email to text to match function return type
    COALESCE(au.email::text, 'N/A') as email,
    p.is_admin,
    p.created_at
  FROM profiles p
  LEFT JOIN auth.users au ON p.id = au.id
  ORDER BY p.created_at DESC;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_all_users_with_emails() TO authenticated;
