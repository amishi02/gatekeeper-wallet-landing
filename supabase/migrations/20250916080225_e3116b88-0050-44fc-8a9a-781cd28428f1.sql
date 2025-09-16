-- Fix security issues by setting search_path on functions
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
$$ LANGUAGE plpgsql SET search_path = public;

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
$$ LANGUAGE plpgsql SET search_path = public;