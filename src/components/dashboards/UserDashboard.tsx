import React, { useState, useEffect } from 'react';
import { Wallet, Send, ArrowDownToLine, History, CreditCard, AlertTriangle, CheckCircle, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export function UserDashboard() {
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

  const walletFeatures = [
    {
      icon: Send,
      title: 'Send Crypto',
      description: 'Send cryptocurrency to other wallets',
      available: walletAccess
    },
    {
      icon: ArrowDownToLine,
      title: 'Receive Crypto',
      description: 'Receive cryptocurrency from other wallets',
      available: walletAccess
    },
    {
      icon: History,
      title: 'Transaction History',
      description: 'View your complete transaction history',
      available: walletAccess
    },
    {
      icon: Wallet,
      title: 'Wallet Extension',
      description: 'Access full wallet functionality',
      available: walletAccess
    }
  ];

  const recentTransactions = [
    { id: 1, type: 'received', amount: '0.5 ETH', from: '0x123...abc', timestamp: '2 hours ago' },
    { id: 2, type: 'sent', amount: '0.2 ETH', to: '0x456...def', timestamp: '1 day ago' },
    { id: 3, type: 'received', amount: '100 USDC', from: '0x789...ghi', timestamp: '3 days ago' }
  ];

  const walletBalances = [
    { token: 'ETH', balance: '2.4567', usdValue: '$4,521.34' },
    { token: 'USDC', balance: '1,250.00', usdValue: '$1,250.00' },
    { token: 'DAI', balance: '500.50', usdValue: '$500.50' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Wallet Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
            <Badge variant="secondary" className="mt-1">Enterprise User</Badge>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {!walletAccess && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Wallet Access Inactive</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Your enterprise subscription is inactive. Contact your enterprise admin for wallet access.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Wallet Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {walletAccess ? (
                <div className="space-y-3">
                  {walletBalances.map((balance) => (
                    <div key={balance.token} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{balance.token}</div>
                        <div className="text-sm text-muted-foreground">{balance.usdValue}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{balance.balance}</div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t">
                    <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
                    <div className="text-2xl font-bold text-primary">$6,271.84</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Wallet access disabled</p>
                  <p className="text-sm">Contact enterprise admin</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subscription Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Enterprise Plan</div>
                  <div className="text-sm text-muted-foreground">Inherited from Enterprise</div>
                </div>
                <Badge variant={walletAccess ? "secondary" : "destructive"}>
                  {walletAccess ? "Active" : "Inactive"}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                  <div className="text-sm font-medium">Wallet Access</div>
                  <div className="text-xs text-muted-foreground">
                    {walletAccess ? "Enabled" : "Disabled"}
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium">Enterprise</div>
                  <div className="text-xs text-muted-foreground">Acme Corporation</div>
                </div>
              </div>

              {!walletAccess && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Subscription Inactive:</strong> Contact your enterprise administrator to renew the subscription for wallet access.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Wallet Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Wallet Features</CardTitle>
            <CardDescription>Available wallet functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {walletFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Button
                    key={index}
                    variant={feature.available ? "default" : "outline"}
                    disabled={!feature.available}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <IconComponent className="h-5 w-5" />
                    <div className="text-center">
                      <div className="text-sm font-medium">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        {walletAccess && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>Your latest wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {tx.type === 'received' ? (
                        <ArrowDownToLine className="h-4 w-4 text-green-600" />
                      ) : (
                        <Send className="h-4 w-4 text-blue-600" />
                      )}
                      <div>
                        <div className="font-medium capitalize">{tx.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {tx.type === 'received' ? `From ${tx.from}` : `To ${tx.to}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{tx.amount}</div>
                      <div className="text-sm text-muted-foreground">{tx.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}