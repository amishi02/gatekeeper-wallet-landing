import React, { useState, useEffect } from 'react';
import { User, Wallet, CreditCard, Building2, Settings, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export function UserDashboard() {
  const { profile, signOut, hasWalletAccess } = useAuth();
  const [walletAccess, setWalletAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWalletAccess = async () => {
      const access = await hasWalletAccess();
      setWalletAccess(access);
      setLoading(false);
    };
    
    checkWalletAccess();
  }, [hasWalletAccess]);

  const userFeatures = [
    {
      icon: User,
      title: 'Profile',
      description: 'Manage your personal profile, preferences, and account settings.',
      action: 'Edit Profile',
      available: true
    },
    {
      icon: Wallet,
      title: 'Wallet',
      description: 'Access your digital wallet for transactions and payments.',
      action: 'Open Wallet',
      available: walletAccess
    },
    {
      icon: CreditCard,
      title: 'Subscription',
      description: 'View and manage your individual subscription plan.',
      action: 'View Plan',
      available: true
    },
    {
      icon: Building2,
      title: 'Enterprise',
      description: 'View your enterprise affiliation and team information.',
      action: 'View Enterprise',
      available: !!profile?.enterprise_id
    },
    {
      icon: BarChart3,
      title: 'Activity',
      description: 'Track your usage, transactions, and account activity.',
      action: 'View Activity',
      available: true
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Configure your account settings and preferences.',
      action: 'Settings',
      available: true
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary">User Account</Badge>
                {profile?.enterprise_id && (
                  <Badge variant="outline">Enterprise Member</Badge>
                )}
              </div>
            </div>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!walletAccess && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Wallet Access Required</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    {profile?.enterprise_id 
                      ? "Your enterprise needs an active subscription for wallet access."
                      : "Subscribe to an individual plan or join an enterprise to enable wallet functionality."
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className={`hover:shadow-lg transition-shadow ${
                  !feature.available ? 'opacity-60' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    {!feature.available && (
                      <Badge variant="secondary" className="text-xs">
                        {feature.title === 'Wallet' ? 'Subscription Required' : 'Not Available'}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    disabled={!feature.available}
                  >
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
              <CardDescription>Your account status and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {profile?.enterprise_id ? 'Enterprise' : 'Individual'}
                  </div>
                  <div className="text-sm text-muted-foreground">Account Type</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {walletAccess ? 'Active' : 'Inactive'}
                  </div>
                  <div className="text-sm text-muted-foreground">Wallet Status</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {profile?.is_email_verified ? 'Verified' : 'Pending'}
                  </div>
                  <div className="text-sm text-muted-foreground">Email Status</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$125</div>
                  <div className="text-sm text-muted-foreground">Monthly Usage</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}