import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Building, CreditCard, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'text-primary' },
    { title: 'Active Enterprises', value: '156', change: '+8%', icon: Building, color: 'text-secondary' },
    { title: 'Active Subscriptions', value: '1,923', change: '+15%', icon: CreditCard, color: 'text-accent' },
    { title: 'Monthly Revenue', value: '$47,820', change: '+23%', icon: DollarSign, color: 'text-primary' },
  ];

  const recentActivity = [
    { type: 'subscription', message: 'New enterprise subscription - Acme Corp', time: '2 min ago', status: 'success' },
    { type: 'user', message: '5 new user registrations', time: '15 min ago', status: 'info' },
    { type: 'alert', message: 'Server maintenance scheduled', time: '1 hour ago', status: 'warning' },
    { type: 'transaction', message: 'Payment processed - $299', time: '2 hours ago', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-space-grotesk font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span>{stat.change} from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system events and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-border">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant={activity.status === 'success' ? 'default' : activity.status === 'warning' ? 'destructive' : 'secondary'}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth text-left">
                <Users className="w-6 h-6 mb-2 text-primary" />
                <p className="font-medium text-sm">Manage Users</p>
                <p className="text-xs text-muted-foreground">View and edit user accounts</p>
              </button>
              <button className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth text-left">
                <Building className="w-6 h-6 mb-2 text-secondary" />
                <p className="font-medium text-sm">Enterprise Setup</p>
                <p className="text-xs text-muted-foreground">Create new enterprise accounts</p>
              </button>
              <button className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth text-left">
                <CreditCard className="w-6 h-6 mb-2 text-accent" />
                <p className="font-medium text-sm">Subscription Plans</p>
                <p className="text-xs text-muted-foreground">Manage pricing tiers</p>
              </button>
              <button className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth text-left">
                <TrendingUp className="w-6 h-6 mb-2 text-primary" />
                <p className="font-medium text-sm">View Reports</p>
                <p className="text-xs text-muted-foreground">Analytics and insights</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;