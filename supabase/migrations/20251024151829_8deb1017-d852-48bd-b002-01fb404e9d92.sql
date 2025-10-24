-- Create subscription_plan table
CREATE TABLE public.subscription_plan (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price NUMERIC(20, 8) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  billing_interval_days INTEGER NOT NULL CHECK (billing_interval_days > 0),
  trial_days INTEGER NOT NULL DEFAULT 0 CHECK (trial_days >= 0),
  is_enterprise_plan BOOLEAN NOT NULL DEFAULT FALSE,
  is_individual_plan BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_discontinued BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscription status enum
CREATE TYPE public.subscription_status AS ENUM ('PENDING', 'ACTIVE', 'EXPIRED', 'CANCELLED');

-- Create subscription table
CREATE TABLE public.subscription (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plan(id) ON DELETE RESTRICT,
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  status public.subscription_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for subscription table
CREATE INDEX idx_subscription_subscriber ON public.subscription(subscriber_id);
CREATE INDEX idx_subscription_status ON public.subscription(status);
CREATE INDEX idx_subscription_is_active ON public.subscription(is_active);
CREATE INDEX idx_subscription_plan ON public.subscription(plan_id);

-- Enable RLS
ALTER TABLE public.subscription_plan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscription_plan
CREATE POLICY "Admins can manage all subscription plans"
ON public.subscription_plan
FOR ALL
USING (get_user_role(auth.uid()) = 'ADMIN');

CREATE POLICY "All authenticated users can view active plans"
ON public.subscription_plan
FOR SELECT
USING (auth.uid() IS NOT NULL AND is_active = TRUE AND is_discontinued = FALSE);

-- RLS Policies for subscription
CREATE POLICY "Admins can manage all subscriptions"
ON public.subscription
FOR ALL
USING (get_user_role(auth.uid()) = 'ADMIN');

CREATE POLICY "Users can view their own subscriptions"
ON public.subscription
FOR SELECT
USING (auth.uid() = subscriber_id);

CREATE POLICY "Enterprise owners can view their enterprise subscriptions"
ON public.subscription
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.enterprise_profile ep
    WHERE ep.owner_id = auth.uid()
    AND ep.owner_id = subscriber_id
  )
);

-- Trigger to update updated_at column
CREATE TRIGGER update_subscription_plan_updated_at
BEFORE UPDATE ON public.subscription_plan
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscription_updated_at
BEFORE UPDATE ON public.subscription
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();