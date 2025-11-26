-- Create platform_wallets table
CREATE TABLE public.platform_wallets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  chain TEXT NOT NULL,
  label TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.platform_wallets ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage all platform wallets"
ON public.platform_wallets
FOR ALL
USING (get_user_role(auth.uid()) = 'ADMIN');

-- Add trigger for updated_at
CREATE TRIGGER update_platform_wallets_updated_at
BEFORE UPDATE ON public.platform_wallets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();