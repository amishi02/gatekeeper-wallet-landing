import React from 'react';
import { Users, Building, CreditCard, Settings, BarChart3, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function AdminDashboard() {
  const { profile, signOut } = useAuth();

  const adminFeatures = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Create and manage all users, assign roles, and control access permissions.',
      action: 'Manage Users'
    },
    {
      icon: Building,
      title: 'Enterprise Management',
      description: 'Oversee enterprise accounts, manage company profiles and subscriptions.',
      action: 'Manage Enterprises'
    },
    {
      icon: Shield,
      title: 'Support Team',
      description: 'Create and manage support staff accounts with limited access.',
      action: 'Manage Support'
    },
    {
      icon: CreditCard,
      title: 'Subscription Plans',
      description: 'Create, modify and manage subscription plans for enterprises and individuals.',
      action: 'Manage Plans'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'View comprehensive analytics, usage reports, and system metrics.',
      action: 'View Analytics'
    },
    {
      icon: Settings,
      title: 'System Settings',
      description: 'Configure system-wide settings, security policies, and integrations.',
      action: 'System Config'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
            </div>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
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
              <CardTitle>System Overview</CardTitle>
              <CardDescription>Quick system statistics and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">Total Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">23</div>
                  <div className="text-sm text-muted-foreground">Enterprises</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Support Staff</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">98.5%</div>
                  <div className="text-sm text-muted-foreground">System Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}