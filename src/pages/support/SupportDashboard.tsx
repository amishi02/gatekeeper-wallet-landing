import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Ticket, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';

const SupportDashboard = () => {
  const stats = [
    { title: 'Open Tickets', value: '23', change: '+3 today', icon: Ticket, color: 'text-orange-600' },
    { title: 'Resolved Today', value: '15', change: '87% resolution rate', icon: CheckCircle, color: 'text-green-600' },
    { title: 'Avg Response Time', value: '2.4h', change: '-15 min from yesterday', icon: Clock, color: 'text-primary' },
    { title: 'Active Users', value: '847', change: 'Online now', icon: Users, color: 'text-secondary' },
  ];

  const recentTickets = [
    { 
      id: '#2453', 
      title: 'Unable to connect wallet', 
      user: 'Alice Johnson', 
      priority: 'high', 
      status: 'open', 
      time: '10 min ago',
      category: 'technical'
    },
    { 
      id: '#2452', 
      title: 'Subscription renewal issue', 
      user: 'Bob Smith', 
      priority: 'medium', 
      status: 'in-progress', 
      time: '1 hour ago',
      category: 'billing'
    },
    { 
      id: '#2451', 
      title: 'Enterprise user management', 
      user: 'Carol Davis', 
      priority: 'low', 
      status: 'pending', 
      time: '3 hours ago',
      category: 'account'
    },
    { 
      id: '#2450', 
      title: 'Password reset not working', 
      user: 'David Wilson', 
      priority: 'medium', 
      status: 'resolved', 
      time: '5 hours ago',
      category: 'technical'
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'destructive';
      case 'in-progress': return 'secondary';
      case 'pending': return 'outline';
      case 'resolved': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-space-grotesk font-bold text-foreground">Support Dashboard</h1>
        <p className="text-muted-foreground mt-2">Customer support overview and ticket management</p>
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
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common support tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2">
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm">New Ticket</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertCircle className="w-6 h-6" />
              <span className="text-sm">Urgent Issues</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">User Lookup</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CheckCircle className="w-6 h-6" />
              <span className="text-sm">Knowledge Base</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Latest customer support requests</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All Tickets
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTickets.map((ticket, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/5 transition-smooth">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-foreground">{ticket.id}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(ticket.priority)}`}
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-foreground mb-1">{ticket.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{ticket.user}</span>
                      <span>•</span>
                      <span>{ticket.category}</span>
                      <span>•</span>
                      <span>{ticket.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportDashboard;