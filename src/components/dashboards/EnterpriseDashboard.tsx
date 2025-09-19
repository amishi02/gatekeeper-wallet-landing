import React, { useState, useEffect } from 'react';
import { Building2, Users, Wallet, CreditCard, BarChart3, Settings, Calendar, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Company Name</div>
                  <div className="font-semibold">Acme Corporation</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Enterprise ID</div>
                  <div className="font-mono text-sm">ENT-2024-001</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Owner</div>
                  <div className="font-semibold">{profile?.full_name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="font-semibold">Jan 15, 2024</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Contact Email</div>
                <div className="font-semibold">{profile?.email}</div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Enterprise Users
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <div>
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-sm text-muted-foreground">Inactive Users</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>User Capacity</span>
                  <span>8/15</span>
                </div>
                <Progress value={53} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                7 seats available in current plan
              </div>
            </CardContent>
          </Card>

          {/* Subscription Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Enterprise Pro</div>
                  <div className="text-sm text-muted-foreground">$299/month</div>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Next Billing</div>
                  <div className="font-semibold">Mar 15, 2024</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Days Left</div>
                  <div className="font-semibold text-primary">23 days</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Billing Cycle</span>
                  <span>23/30 days</span>
                </div>
                <Progress value={77} className="h-2" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Auto-renewal enabled</span>
              </div>
            </CardContent>
          </Card>

          {/* Active Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-500">2</div>
                  <div className="text-sm text-muted-foreground">Critical</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-500">5</div>
                  <div className="text-sm text-muted-foreground">Warning</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">3</div>
                  <div className="text-sm text-muted-foreground">Info</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 dark:bg-red-950">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="text-sm">Wallet sync failed</div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="text-sm">Storage usage at 85%</div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="text-sm">System maintenance scheduled</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}