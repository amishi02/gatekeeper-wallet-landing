-- 1) Break RLS recursion on profiles by removing policies that depend on get_user_role()
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Ensure RLS stays enabled (no-op if already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2) Create helper to ensure a profile exists for the current user (no need for auth schema triggers)
CREATE OR REPLACE FUNCTION public.ensure_profile()
RETURNS public.profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_email text := (auth.jwt() ->> 'email');
  v_is_verified boolean := (auth.jwt() ->> 'email_confirmed_at') IS NOT NULL;
  v_profile public.profiles;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Try to load existing profile
  SELECT * INTO v_profile FROM public.profiles WHERE user_id = v_user_id;

  -- Create one if missing
  IF v_profile.id IS NULL THEN
    IF v_email IS NULL OR v_email = '' THEN
      -- Fallback to auth.users email if JWT lacks the email claim
      SELECT email INTO v_email FROM auth.users WHERE id = v_user_id;
    END IF;

    INSERT INTO public.profiles (
      user_id, email, full_name, role, is_active, is_email_verified
    ) VALUES (
      v_user_id,
      v_email,
      COALESCE((auth.jwt() ->> 'full_name'), ''),
      COALESCE((auth.jwt() ->> 'role')::public.app_role, 'ENTERPRISE'),
      TRUE,
      COALESCE(v_is_verified, FALSE)
    ) RETURNING * INTO v_profile;
  END IF;

  RETURN v_profile;
END;
$$;