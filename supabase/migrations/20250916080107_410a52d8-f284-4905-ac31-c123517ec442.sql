-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('ADMIN', 'ENTERPRISE', 'SUPPORT', 'USER');

-- Create profiles table extending auth.users
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT NOT NULL,
    phone_number TEXT UNIQUE,
    token_version INTEGER NOT NULL DEFAULT 0,
    full_name TEXT,
    role public.app_role NOT NULL DEFAULT 'ENTERPRISE',
    enterprise_id UUID, -- Will reference enterprise_profile.id
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_staff BOOLEAN NOT NULL DEFAULT false,
    is_email_verified BOOLEAN NOT NULL DEFAULT false,
    account_type TEXT NOT NULL DEFAULT 'manual' CHECK (account_type IN ('manual', 'google')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enterprise_profile table
CREATE TABLE public.enterprise_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL UNIQUE,
    company_name TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key constraint for enterprise_id in profiles
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_enterprise_id_fkey 
FOREIGN KEY (enterprise_id) REFERENCES public.enterprise_profile(id) ON DELETE SET NULL;

-- Create user_profiles table for additional metadata
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE UNIQUE,
    username TEXT,
    profile_picture_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create otp_log table
CREATE TABLE public.otp_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
    otp_code TEXT NOT NULL,
    otp_type TEXT CHECK (otp_type IN ('email_verification', 'transaction')),
    is_used BOOLEAN NOT NULL DEFAULT false,
    otp_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blacklisted_access_token table
CREATE TABLE public.blacklisted_access_token (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_enterprise_id ON public.profiles(enterprise_id);
CREATE INDEX idx_enterprise_profile_company_name ON public.enterprise_profile(company_name);
CREATE INDEX idx_otp_log_user_type_used ON public.otp_log(user_id, otp_type, is_used);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enterprise_profile_updated_at
    BEFORE UPDATE ON public.enterprise_profile
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_otp_log_updated_at
    BEFORE UPDATE ON public.otp_log
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create profile for new user
    INSERT INTO public.profiles (user_id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'ENTERPRISE')
    );
    
    -- Create user_profiles entry
    INSERT INTO public.user_profiles (user_id, username)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', ''));
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Function to validate user-enterprise relationship
CREATE OR REPLACE FUNCTION public.validate_user_enterprise()
RETURNS TRIGGER AS $$
BEGIN
    -- Normal users (role=USER) must have an enterprise
    IF NEW.role = 'USER' AND NEW.enterprise_id IS NULL THEN
        RAISE EXCEPTION 'Normal users must be associated with an enterprise';
    END IF;
    
    -- Enterprise owners cannot be assigned to other enterprises
    IF NEW.role = 'ENTERPRISE' AND NEW.enterprise_id IS NOT NULL THEN
        -- Check if this user owns an enterprise
        IF EXISTS (SELECT 1 FROM public.enterprise_profile WHERE owner_id = NEW.user_id) THEN
            RAISE EXCEPTION 'Enterprise owners cannot be assigned to other enterprises';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create validation trigger
CREATE TRIGGER validate_user_enterprise_trigger
    BEFORE INSERT OR UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_user_enterprise();

-- Function to validate enterprise profile ownership
CREATE OR REPLACE FUNCTION public.validate_enterprise_owner()
RETURNS TRIGGER AS $$
BEGIN
    -- Only users with role=ENTERPRISE can own enterprises
    IF NOT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE user_id = NEW.owner_id AND role = 'ENTERPRISE'
    ) THEN
        RAISE EXCEPTION 'Only users with role=ENTERPRISE can own enterprise profiles';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create enterprise validation trigger
CREATE TRIGGER validate_enterprise_owner_trigger
    BEFORE INSERT OR UPDATE ON public.enterprise_profile
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_enterprise_owner();

-- Function to generate OTP
CREATE OR REPLACE FUNCTION public.generate_otp(
    p_user_id UUID,
    p_otp_type TEXT,
    p_valid_for_minutes INTEGER DEFAULT 10
)
RETURNS TEXT AS $$
DECLARE
    v_otp_code TEXT;
BEGIN
    -- Generate 6-digit OTP
    v_otp_code := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
    
    -- Insert OTP record
    INSERT INTO public.otp_log (user_id, otp_code, otp_type, otp_expires_at)
    VALUES (
        p_user_id,
        v_otp_code,
        p_otp_type,
        now() + (p_valid_for_minutes || ' minutes')::INTERVAL
    );
    
    RETURN v_otp_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to validate OTP
CREATE OR REPLACE FUNCTION public.validate_otp(
    p_user_id UUID,
    p_otp_code TEXT,
    p_otp_type TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_otp_record RECORD;
BEGIN
    -- Find the OTP record
    SELECT * INTO v_otp_record
    FROM public.otp_log
    WHERE user_id = p_user_id
      AND otp_code = p_otp_code
      AND otp_type = p_otp_type
      AND NOT is_used
      AND otp_expires_at > now()
    ORDER BY created_at DESC
    LIMIT 1;
    
    -- Check if OTP exists and is valid
    IF v_otp_record.id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Mark OTP as used
    UPDATE public.otp_log
    SET is_used = TRUE
    WHERE id = v_otp_record.id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to get user role (security definer to bypass RLS)
CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID)
RETURNS public.app_role AS $$
BEGIN
    RETURN (SELECT role FROM public.profiles WHERE user_id = p_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Function to check if user has wallet access
CREATE OR REPLACE FUNCTION public.has_wallet_access(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_profile RECORD;
    v_enterprise_owner_id UUID;
BEGIN
    -- Get user profile
    SELECT * INTO v_profile
    FROM public.profiles
    WHERE user_id = p_user_id AND is_active = true;
    
    -- User must be active
    IF v_profile.id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Role-based access logic
    CASE v_profile.role
        WHEN 'ADMIN' THEN
            RETURN TRUE;
        WHEN 'SUPPORT' THEN
            RETURN FALSE;
        WHEN 'ENTERPRISE' THEN
            -- TODO: Check for active enterprise subscription
            -- For now, return true for enterprise users
            RETURN TRUE;
        WHEN 'USER' THEN
            -- If user belongs to enterprise, check enterprise owner's subscription
            IF v_profile.enterprise_id IS NOT NULL THEN
                -- TODO: Check enterprise owner's subscription
                -- For now, return true if associated with enterprise
                RETURN TRUE;
            ELSE
                -- TODO: Check individual subscription
                -- For now, return false for individual users without enterprise
                RETURN FALSE;
            END IF;
        ELSE
            RETURN FALSE;
    END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enterprise_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blacklisted_access_token ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (public.get_user_role(auth.uid()) = 'ADMIN');

CREATE POLICY "Admins can update all profiles"
    ON public.profiles FOR UPDATE
    USING (public.get_user_role(auth.uid()) = 'ADMIN');

CREATE POLICY "Admins can insert profiles"
    ON public.profiles FOR INSERT
    WITH CHECK (public.get_user_role(auth.uid()) = 'ADMIN');

CREATE POLICY "Enterprise owners can view their members"
    ON public.profiles FOR SELECT
    USING (
        enterprise_id IN (
            SELECT id FROM public.enterprise_profile
            WHERE owner_id = auth.uid()
        )
    );

-- RLS Policies for enterprise_profile table
CREATE POLICY "Enterprise owners can manage their profile"
    ON public.enterprise_profile FOR ALL
    USING (owner_id = auth.uid());

CREATE POLICY "Admins can manage all enterprise profiles"
    ON public.enterprise_profile FOR ALL
    USING (public.get_user_role(auth.uid()) = 'ADMIN');

CREATE POLICY "Enterprise members can view their enterprise"
    ON public.enterprise_profile FOR SELECT
    USING (
        id IN (
            SELECT enterprise_id FROM public.profiles
            WHERE user_id = auth.uid()
        )
    );

-- RLS Policies for user_profiles table
CREATE POLICY "Users can manage their own user profile"
    ON public.user_profiles FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all user profiles"
    ON public.user_profiles FOR ALL
    USING (public.get_user_role(auth.uid()) = 'ADMIN');

-- RLS Policies for otp_log table
CREATE POLICY "Users can view their own OTPs"
    ON public.otp_log FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own OTPs"
    ON public.otp_log FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own OTPs"
    ON public.otp_log FOR UPDATE
    USING (user_id = auth.uid());

-- RLS Policies for blacklisted tokens (admin only)
CREATE POLICY "Admins can manage blacklisted tokens"
    ON public.blacklisted_access_token FOR ALL
    USING (public.get_user_role(auth.uid()) = 'ADMIN');