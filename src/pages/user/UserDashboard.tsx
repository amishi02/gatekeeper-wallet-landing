import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wallet, CreditCard, Building, ArrowUpRight, Plus, Download, Send, TrendingUp } from 'lucide-react';

const UserDashboard = () => {
  const walletStats = [
    { title: 'Total Balance', value: '$2,847.50', change: '+$247.50', icon: Wallet, color: 'text-primary' },
    { title: 'Available Balance', value: '$2,450.00', change: 'Ready to use', icon: TrendingUp, color: 'text-secondary' },
    { title: 'Pending', value: '$397.50', change: '2 transactions', icon: CreditCard, color: 'text-accent' },
  ];

  const recentTransactions = [
    { type: 'received', amount: '+$500.00', description: 'Salary Payment', time: '2 hours ago', status: 'completed' },
    { type: 'sent', amount: '-$125.50', description: 'Transfer to Alice', time: '1 day ago', status: 'completed' },
    { type: 'received', amount: '+$75.00', description: 'Refund', time: '3 days ago', status: 'completed' },
    { type: 'pending', amount: '-$247.50', description: 'Withdrawal Request', time: '5 days ago', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold text-foreground">Wallet Dashboard</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-muted-foreground">John Doe</p>
            <Badge variant="secondary" className="gap-1">
              <Building className="w-3 h-3" />
              Acme Corp
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Send className="w-4 h-4" />
            Send Money
          </Button>
        </div>
      </div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {walletStats.map((stat, index) => (
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
          <CardDescription>Common wallet operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="w-6 h-6" />
              <span className="text-sm">Deposit</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Send className="w-6 h-6" />
              <span className="text-sm">Send</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Download className="w-6 h-6" />
              <span className="text-sm">Withdraw</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">History</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest wallet activity</CardDescription>
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
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">{transaction.time}</p>
                      <Badge 
                        variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium text-sm ${
                      transaction.type === 'received' ? 'text-green-600' : 
                      transaction.type === 'sent' ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {transaction.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscription Info */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
            <CardDescription>Your current plan and enterprise association</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-primary">Enterprise Plan</h3>
                <Badge>Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Through Acme Corp</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Plan expires:</span>
                  <span className="font-medium">March 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Features:</span>
                  <span className="font-medium">Unlimited</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <Button variant="outline" className="w-full mb-2">
                View Subscription History
              </Button>
              <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
                Quit Enterprise (Switch to Individual)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;