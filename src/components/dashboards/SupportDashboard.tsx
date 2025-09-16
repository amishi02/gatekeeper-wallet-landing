import React from 'react';
import { MessageSquare, Users, FileText, Search, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export function SupportDashboard() {
  const { profile, signOut } = useAuth();

  const supportFeatures = [
    {
      icon: MessageSquare,
      title: 'Ticket Management',
      description: 'View, respond to, and manage customer support tickets.',
      action: 'View Tickets'
    },
    {
      icon: Users,
      title: 'User Assistance',
      description: 'Help users with account issues, password resets, and general inquiries.',
      action: 'Assist Users'
    },
    {
      icon: Search,
      title: 'User Lookup',
      description: 'Search and view user accounts to provide targeted support.',
      action: 'Search Users'
    },
    {
      icon: FileText,
      title: 'Knowledge Base',
      description: 'Access and manage support documentation and FAQ resources.',
      action: 'View Docs'
    },
    {
      icon: Clock,
      title: 'Activity Log',
      description: 'Review recent support activities and case history.',
      action: 'View History'
    },
    {
      icon: AlertTriangle,
      title: 'Escalations',
      description: 'Manage cases that require escalation to higher support tiers.',
      action: 'View Escalations'
    }
  ];

  const supportStats = [
    { label: 'Open Tickets', value: '23', status: 'high' },
    { label: 'Resolved Today', value: '15', status: 'normal' },
    { label: 'Avg Response Time', value: '2.5h', status: 'normal' },
    { label: 'Customer Satisfaction', value: '94%', status: 'good' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Support Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
              <Badge variant="secondary" className="mt-1">Support Team</Badge>
            </div>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Support Access</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    You have limited access to support tools. Wallet and administrative functions are restricted.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {supportFeatures.map((feature, index) => {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Metrics</CardTitle>
              <CardDescription>Your current support performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {supportStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${
                      stat.status === 'high' ? 'text-red-600' :
                      stat.status === 'good' ? 'text-green-600' :
                      'text-primary'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Latest support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Password reset issue</div>
                    <div className="text-sm text-muted-foreground">User: john@example.com</div>
                  </div>
                  <Badge variant="destructive">High</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Account verification</div>
                    <div className="text-sm text-muted-foreground">User: sarah@company.com</div>
                  </div>
                  <Badge variant="secondary">Medium</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Feature question</div>
                    <div className="text-sm text-muted-foreground">User: mike@startup.io</div>
                  </div>
                  <Badge variant="outline">Low</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}