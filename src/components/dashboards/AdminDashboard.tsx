import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building, CreditCard, Settings, BarChart3, Shield, Wallet, DollarSign, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { PlatformWallets } from './PlatformWallets';

export function AdminDashboard() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isWalletsOpen, setIsWalletsOpen] = useState(false);

  const adminOperations = [
    { icon: Building, title: 'Manage Enterprises', description: 'Create, update, delete enterprises', route: '/manage-users' },
    { icon: Users, title: 'Manage All Users', description: 'Enterprise owners, users, support staff', route: '/manage-users' },
    { icon: Shield, title: 'Support Team', description: 'Add, edit, delete support members', route: '/manage-users' },
    { icon: CreditCard, title: 'Subscription Plans', description: 'Create, modify, discontinue plans', route: '/subscription-plans' }
  ];

  const recentTransactions = [
    { id: 'tx1', enterprise: 'Acme Corp', amount: '0.5 ETH', status: 'verified', hash: '0x123...abc' },
    { id: 'tx2', enterprise: 'Tech Solutions', amount: '1.2 ETH', status: 'pending', hash: '0x456...def' },
    { id: 'tx3', enterprise: 'Global Inc', amount: '0.8 ETH', status: 'verified', hash: '0x789...ghi' }
  ];

  const activeIssues = [
    { id: 1, enterprise: 'Acme Corp', issue: 'Payment verification failed', assignee: 'John Smith', priority: 'high' },
    { id: 2, enterprise: 'Tech Solutions', issue: 'Subscription not activated', assignee: 'Sarah Johnson', priority: 'medium' },
    { id: 3, enterprise: 'Global Inc', issue: 'User access denied', assignee: 'Mike Wilson', priority: 'low' }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
            </div>
            <Sheet open={isWalletsOpen} onOpenChange={setIsWalletsOpen}>
              <SheetTrigger asChild>
                <Button>
                  <Wallet className="mr-2 h-4 w-4" />
                  Platform Wallets
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Platform Wallets Management</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <PlatformWallets />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {adminOperations.map((operation, index) => {
            const IconComponent = operation.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(operation.route)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">{operation.title}</h3>
                      <p className="text-sm text-muted-foreground">{operation.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">23</div>
                  <div className="text-sm text-muted-foreground">Enterprises</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <div className="text-sm text-muted-foreground">Enterprise Users</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <div className="text-sm text-muted-foreground">Support Staff</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">142</div>
                  <div className="text-sm text-muted-foreground">Wallet Enabled</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Subscription Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <div className="text-sm text-muted-foreground">Active Subscriptions</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">5</div>
                  <div className="text-sm text-muted-foreground">Expired</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">3</div>
                  <div className="text-sm text-muted-foreground">Expiring Soon</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">$24.5K</div>
                  <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transaction Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>On-chain payments received by admin wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{tx.enterprise}</div>
                      <div className="text-sm text-muted-foreground">{tx.hash}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{tx.amount}</div>
                      <Badge variant={tx.status === 'verified' ? 'secondary' : 'outline'}>
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
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
              <CardDescription>Support tickets requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeIssues.map((issue) => (
                  <div key={issue.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{issue.enterprise}</div>
                      <Badge variant={
                        issue.priority === 'high' ? 'destructive' : 
                        issue.priority === 'medium' ? 'outline' : 'secondary'
                      }>
                        {issue.priority}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{issue.issue}</div>
                    <div className="text-xs text-muted-foreground">Assigned to: {issue.assignee}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}