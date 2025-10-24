import React, { useState, useEffect } from 'react';
import { Wallet, Send, ArrowDownToLine, History, CreditCard, AlertTriangle, CheckCircle, Users, Building2, LogOut, User, Mail, Calendar, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EnterpriseDetails {
  id: string;
  company_name: string;
  is_active: boolean;
  created_at: string;
}

export function UserDashboard() {
  const { profile, hasWalletAccess } = useAuth();
  const { toast } = useToast();
  const [walletAccess, setWalletAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enterpriseDetails, setEnterpriseDetails] = useState<EnterpriseDetails | null>(null);
  const [optingOut, setOptingOut] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const access = await hasWalletAccess();
      setWalletAccess(access);
      
      // Fetch enterprise details if user is associated with one
      if (profile?.enterprise_id) {
        const { data, error } = await supabase
          .from('enterprise_profile')
          .select('*')
          .eq('id', profile.enterprise_id)
          .single();
        
        if (!error && data) {
          setEnterpriseDetails(data);
        }
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [hasWalletAccess, profile]);

  const handleOptOutOfEnterprise = async () => {
    if (!profile?.enterprise_id) return;
    
    setOptingOut(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ enterprise_id: null })
        .eq('user_id', profile.user_id);
      
      if (error) throw error;
      
      toast({
        title: "Successfully Opted Out",
        description: "You have been removed from the enterprise. Please purchase an individual subscription to continue using wallet features.",
      });
      
      // Refresh the page to update state
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to opt out of enterprise. Please try again.",
        variant: "destructive",
      });
    } finally {
      setOptingOut(false);
    }
  };

  const walletFeatures = [
    {
      icon: Send,
      title: 'Send Crypto',
      description: 'Send cryptocurrency to other wallets',
      available: walletAccess
    },
    {
      icon: ArrowDownToLine,
      title: 'Receive Crypto',
      description: 'Receive cryptocurrency from other wallets',
      available: walletAccess
    },
    {
      icon: History,
      title: 'Transaction History',
      description: 'View your complete transaction history',
      available: walletAccess
    },
    {
      icon: Wallet,
      title: 'Wallet Extension',
      description: 'Access full wallet functionality',
      available: walletAccess
    }
  ];

  const recentTransactions = [
    { id: 1, type: 'received', amount: '0.5 ETH', from: '0x123...abc', timestamp: '2 hours ago' },
    { id: 2, type: 'sent', amount: '0.2 ETH', to: '0x456...def', timestamp: '1 day ago' },
    { id: 3, type: 'received', amount: '100 USDC', from: '0x789...ghi', timestamp: '3 days ago' }
  ];

  const walletBalances = [
    { token: 'ETH', balance: '2.4567', usdValue: '$4,521.34' },
    { token: 'USDC', balance: '1,250.00', usdValue: '$1,250.00' },
    { token: 'DAI', balance: '500.50', usdValue: '$500.50' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {profile?.full_name || 'User'}</p>
            <Badge variant={profile?.enterprise_id ? "secondary" : "outline"} className="mt-1">
              {profile?.enterprise_id ? "Enterprise Member" : "Individual Account"}
            </Badge>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Subscription Alert */}
        {!walletAccess && (
          <Alert className="mb-6 border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong className="font-semibold">Wallet Access Disabled</strong>
              <p className="text-sm mt-1">
                {profile?.enterprise_id 
                  ? "Your enterprise subscription has expired. Contact your administrator to renew." 
                  : "Purchase a subscription plan to access wallet features."}
              </p>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* User Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Full Name</div>
                    <div className="font-medium">{profile?.full_name || 'Not set'}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-medium text-sm break-all">{profile?.email}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Account Role</div>
                    <Badge variant="outline" className="mt-1">
                      {profile?.role || 'USER'}
                    </Badge>
                  </div>
                </div>

                <Separator />
                
                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Account Status</div>
                    <Badge variant={profile?.is_active ? "default" : "destructive"} className="mt-1">
                      {profile?.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Enterprise Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile?.enterprise_id && enterpriseDetails ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Company Name</div>
                      <div className="font-semibold text-lg">{enterpriseDetails.company_name}</div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Status</div>
                      <Badge variant={enterpriseDetails.is_active ? "default" : "destructive"}>
                        {enterpriseDetails.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Joined On</div>
                      <div className="font-medium">
                        {new Date(enterpriseDetails.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleOptOutOfEnterprise}
                    disabled={optingOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {optingOut ? "Processing..." : "Opt Out of Enterprise"}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground">
                    Note: Opting out will remove enterprise benefits. You'll need to purchase an individual subscription.
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground space-y-3">
                  <Building2 className="h-12 w-12 mx-auto opacity-50" />
                  <div>
                    <p className="font-medium">Not Associated with Enterprise</p>
                    <p className="text-sm">You're using an individual account</p>
                  </div>
                  <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/subscription'}>
                    View Subscription Plans
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subscription Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Current Plan</div>
                  <div className="font-semibold text-lg">
                    {profile?.enterprise_id ? "Enterprise Plan" : "Individual Plan"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {profile?.enterprise_id ? "Managed by Enterprise" : "Self-Managed"}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Wallet Access</div>
                  <Badge variant={walletAccess ? "default" : "destructive"} className="mb-2">
                    {walletAccess ? "Active" : "Inactive"}
                  </Badge>
                  {profile?.enterprise_id && enterpriseDetails && (
                    <p className="text-xs text-muted-foreground">
                      Access is based on enterprise subscription status
                    </p>
                  )}
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-3 bg-card border rounded-lg">
                    <Wallet className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-xs font-medium">Wallet</div>
                    <div className="text-xs text-muted-foreground">
                      {walletAccess ? "Enabled" : "Disabled"}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-card border rounded-lg">
                    <CheckCircle className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-xs font-medium">Features</div>
                    <div className="text-xs text-muted-foreground">
                      {walletAccess ? "Full" : "Limited"}
                    </div>
                  </div>
                </div>
              </div>
              
              {!profile?.enterprise_id && (
                <>
                  <Separator />
                  <Button variant="default" className="w-full" onClick={() => window.location.href = '/subscription'}>
                    Upgrade Subscription
                  </Button>
                </>
              )}
              
              {profile?.enterprise_id && !walletAccess && (
                <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Enterprise subscription expired. Contact your administrator to restore access.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Wallet Overview */}
        {walletAccess && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Wallet Overview
                </CardTitle>
                <CardDescription>Your digital asset balances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {walletBalances.map((balance) => (
                    <div key={balance.token} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{balance.token}</div>
                        <div className="text-sm text-muted-foreground">{balance.usdValue}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{balance.balance}</div>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="pt-2">
                    <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
                    <div className="text-2xl font-bold text-primary">$6,271.84</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Latest wallet activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {tx.type === 'received' ? (
                          <ArrowDownToLine className="h-4 w-4 text-green-600" />
                        ) : (
                          <Send className="h-4 w-4 text-blue-600" />
                        )}
                        <div>
                          <div className="font-medium capitalize">{tx.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {tx.type === 'received' ? `From ${tx.from}` : `To ${tx.to}`}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{tx.amount}</div>
                        <div className="text-sm text-muted-foreground">{tx.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Wallet Features */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Features</CardTitle>
            <CardDescription>
              {walletAccess ? "Available features for your account" : "Features available with active subscription"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {walletFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Button
                    key={index}
                    variant={feature.available ? "default" : "outline"}
                    disabled={!feature.available}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <IconComponent className="h-5 w-5" />
                    <div className="text-center">
                      <div className="text-sm font-medium">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}