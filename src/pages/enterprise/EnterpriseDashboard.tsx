import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Wallet, CreditCard, TrendingUp, Plus, ArrowUpRight } from 'lucide-react';

const EnterpriseDashboard = () => {
  const stats = [
    { title: 'Active Users', value: '43', change: '+3 this month', icon: Users, color: 'text-primary' },
    { title: 'Total Wallet Balance', value: '$12,450', change: '+$2,340', icon: Wallet, color: 'text-secondary' },
    { title: 'Subscription Status', value: 'Premium', change: 'Expires in 23 days', icon: CreditCard, color: 'text-accent' },
    { title: 'Monthly Usage', value: '87%', change: '13% remaining', icon: TrendingUp, color: 'text-primary' },
  ];

  const recentUsers = [
    { name: 'Alice Johnson', email: 'alice@acme.com', status: 'active', joined: '2 days ago' },
    { name: 'Bob Smith', email: 'bob@acme.com', status: 'active', joined: '1 week ago' },
    { name: 'Carol Davis', email: 'carol@acme.com', status: 'pending', joined: '3 days ago' },
  ];

  const recentTransactions = [
    { type: 'deposit', amount: '+$1,500', description: 'USDC Deposit', time: '2 hours ago' },
    { type: 'withdrawal', amount: '-$850', description: 'User Withdrawal - Alice', time: '1 day ago' },
    { type: 'subscription', amount: '-$299', description: 'Monthly Subscription', time: '5 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold text-foreground">Enterprise Dashboard</h1>
          <p className="text-muted-foreground mt-2">Acme Corp - Enterprise Account</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add New User
        </Button>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Newly added team members</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowUpRight className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{user.joined}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest wallet activity</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowUpRight className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-sm text-foreground">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium text-sm ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;