import React from 'react';
import { Ticket, Search, Clock, CheckCircle, AlertTriangle, Users, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

export function SupportDashboard() {
  const { profile, signOut } = useAuth();

  const supportMetrics = [
    { label: 'Tickets Resolved', value: '142', color: 'green' },
    { label: 'Pending Tickets', value: '23', color: 'yellow' },
    { label: 'Avg Resolution Time', value: '4.2h', color: 'blue' },
    { label: 'Customer Satisfaction', value: '94%', color: 'purple' }
  ];

  const ticketQueue = [
    {
      id: 'TKT-001',
      enterprise: 'Acme Corporation',
      issue: 'Payment verification failed for subscription',
      priority: 'high',
      status: 'open',
      assignee: 'You',
      created: '2 hours ago'
    },
    {
      id: 'TKT-002',
      enterprise: 'Tech Solutions Ltd',
      issue: 'User unable to access wallet features',
      priority: 'medium',
      status: 'pending',
      assignee: 'Sarah Johnson',
      created: '4 hours ago'
    },
    {
      id: 'TKT-003',
      enterprise: 'Global Industries',
      issue: 'Subscription not activated after payment',
      priority: 'high',
      status: 'open',
      assignee: 'You',
      created: '1 day ago'
    },
    {
      id: 'TKT-004',
      enterprise: 'StartUp Inc',
      issue: 'CSV user upload failed',
      priority: 'low',
      status: 'resolved',
      assignee: 'Mike Wilson',
      created: '2 days ago'
    }
  ];

  const enterpriseStatuses = [
    {
      name: 'Acme Corporation',
      subscription: 'Enterprise Pro',
      status: 'active',
      expires: '23 days',
      lastPayment: '0x123...abc',
      paymentStatus: 'verified'
    },
    {
      name: 'Tech Solutions Ltd',
      subscription: 'Enterprise Basic',
      status: 'expired',
      expires: 'Expired 3 days ago',
      lastPayment: '0x456...def',
      paymentStatus: 'pending'
    },
    {
      name: 'Global Industries',
      subscription: 'Enterprise Pro',
      status: 'active',
      expires: '45 days',
      lastPayment: '0x789...ghi',
      paymentStatus: 'verified'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Support Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
              <Badge variant="secondary" className="mt-1">Support Staff</Badge>
            </div>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Support Access Notice */}
        <Card className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">Limited Support Access</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You have read-only access to view tickets and enterprise statuses. Contact admin for escalations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Metrics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Support Metrics
            </CardTitle>
            <CardDescription>Your performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {supportMetrics.map((metric, index) => (
                <div key={index} className={`text-center p-4 bg-${metric.color}-50 dark:bg-${metric.color}-950 rounded-lg`}>
                  <div className={`text-2xl font-bold text-${metric.color}-600`}>{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ticket Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Ticket Queue
              </CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Input placeholder="Search tickets..." className="flex-1" />
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ticketQueue.map((ticket) => (
                  <div key={ticket.id} className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-mono text-sm font-medium">{ticket.id}</div>
                      <div className="flex gap-2">
                        <Badge variant={
                          ticket.priority === 'high' ? 'destructive' : 
                          ticket.priority === 'medium' ? 'outline' : 'secondary'
                        }>
                          {ticket.priority}
                        </Badge>
                        <Badge variant={
                          ticket.status === 'open' ? 'destructive' :
                          ticket.status === 'pending' ? 'outline' : 'secondary'
                        }>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm font-medium mb-1">{ticket.enterprise}</div>
                    <div className="text-sm text-muted-foreground mb-2">{ticket.issue}</div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Assigned to: {ticket.assignee}</span>
                      <span>{ticket.created}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Status Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Enterprise Status
              </CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Input placeholder="Search enterprises..." className="flex-1" />
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {enterpriseStatuses.map((enterprise, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{enterprise.name}</div>
                      <Badge variant={enterprise.status === 'active' ? 'secondary' : 'destructive'}>
                        {enterprise.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {enterprise.subscription} • {enterprise.expires}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Payment: {enterprise.lastPayment}</span>
                      <Badge variant={enterprise.paymentStatus === 'verified' ? 'secondary' : 'outline'} className="text-xs">
                        {enterprise.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common support operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm">View Transaction Details</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">Check Subscription Status</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">Escalate to Admin</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}