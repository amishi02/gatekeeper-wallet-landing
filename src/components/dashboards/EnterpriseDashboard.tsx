import React, { useState, useEffect } from 'react';
import { Building2, Users, Wallet, CreditCard, BarChart3, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export function EnterpriseDashboard() {
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

  const enterpriseFeatures = [
    {
      icon: Building2,
      title: 'Company Profile',
      description: 'Manage your enterprise profile, company details, and settings.',
      action: 'Manage Profile',
      available: true
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Add, remove, and manage users within your enterprise organization.',
      action: 'Manage Team',
      available: true
    },
    {
      icon: Wallet,
      title: 'Wallet Access',
      description: 'Access and manage your enterprise wallet and transactions.',
      action: 'Open Wallet',
      available: walletAccess
    },
    {
      icon: CreditCard,
      title: 'Subscription',
      description: 'View and manage your enterprise subscription plan and billing.',
      action: 'View Subscription',
      available: true
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Track usage, performance metrics, and team activity.',
      action: 'View Analytics',
      available: true
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Configure enterprise settings, permissions, and preferences.',
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
              <h1 className="text-3xl font-bold text-foreground">Enterprise Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
              <Badge variant="secondary" className="mt-1">Enterprise Account</Badge>
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
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Wallet Access Limited</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Subscribe to an enterprise plan to enable wallet functionality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enterpriseFeatures.map((feature, index) => {
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
                        Upgrade Required
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
              <CardTitle>Enterprise Overview</CardTitle>
              <CardDescription>Quick overview of your enterprise metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Active</div>
                  <div className="text-sm text-muted-foreground">Subscription</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{walletAccess ? 'Enabled' : 'Disabled'}</div>
                  <div className="text-sm text-muted-foreground">Wallet Access</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$2,450</div>
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