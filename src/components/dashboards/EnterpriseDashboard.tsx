import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, Wallet, CreditCard, BarChart3, Settings, Calendar, AlertTriangle, CheckCircle, XCircle, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function EnterpriseDashboard() {
  const navigate = useNavigate();
  const { profile, signOut, hasWalletAccess } = useAuth();
  const [walletAccess, setWalletAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkWalletAccess = async () => {
      const access = await hasWalletAccess();
      setWalletAccess(access);
      setLoading(false);
    };
    
    checkWalletAccess();
  }, [hasWalletAccess]);

  const handleCreateUser = async () => {
    if (!newUserEmail || !newUserEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setIsCreatingUser(true);
      
      // Create the user via Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUserEmail,
        email_confirm: true,
        user_metadata: {
          role: 'USER',
          enterprise_id: profile?.enterprise_id || profile?.id,
        }
      });

      if (error) throw error;

      toast.success('User invitation sent successfully');
      setNewUserEmail('');
      setIsCreateUserModalOpen(false);
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user: ' + error.message);
    } finally {
      setIsCreatingUser(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!validTypes.includes(file.type) && !file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV or Excel file');
      return;
    }

    // TODO: Process the file
    toast.success(`File "${file.name}" uploaded successfully`);
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Quick action buttons for enterprise management
  const quickActions = [
    {
      icon: CreditCard,
      label: 'Purchase Subscription Plan',
      variant: 'default' as const,
      onClick: () => navigate('/subscription'),
    },
    {
      icon: Users,
      label: 'Manage All Users',
      variant: 'outline' as const,
      onClick: () => navigate('/manage-users'),
    },
    {
      icon: Users,
      label: 'Create User',
      variant: 'outline' as const,
      onClick: () => setIsCreateUserModalOpen(true),
    },
    {
      icon: Upload,
      label: 'Upload CSV',
      variant: 'outline' as const,
      onClick: () => fileInputRef.current?.click(),
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
    <div className="min-h-screen bg-background pt-16">
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Enterprise Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
            <Badge variant="secondary" className="mt-1">Enterprise Account</Badge>
          </div>
        </div>
      </div>

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

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Manage your enterprise efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button 
                    key={index}
                    variant={action.variant}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={action.onClick}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-sm text-center">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Company</div>
                  <div className="font-semibold">Acme Corporation</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Owner</div>
                  <div className="font-semibold">{profile?.full_name}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Enterprise ID</div>
                <div className="font-mono text-sm">ENT-2024-001</div>
              </div>
            </CardContent>
          </Card>

          {/* Users Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Users Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-muted-foreground">Active</div>
                </div>
                <div className="text-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">4</div>
                  <div className="text-sm text-muted-foreground">Inactive</div>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                8/15 seats used
              </div>
            </CardContent>
          </Card>

          {/* Subscription Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription
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
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">23</div>
                <div className="text-sm text-muted-foreground">Days remaining</div>
              </div>
            </CardContent>
          </Card>

          {/* Issues Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                  <div className="text-xl font-bold text-red-500">2</div>
                  <div className="text-xs text-muted-foreground">Critical</div>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <div className="text-xl font-bold text-yellow-500">5</div>
                  <div className="text-xs text-muted-foreground">Warning</div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="text-xl font-bold text-blue-500">3</div>
                  <div className="text-xs text-muted-foreground">Info</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Hidden file input for CSV upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Create User Modal */}
      <Dialog open={isCreateUserModalOpen} onOpenChange={setIsCreateUserModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Enter the email address of the user you want to add to your enterprise.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isCreatingUser) {
                    handleCreateUser();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateUserModalOpen(false);
                setNewUserEmail('');
              }}
              disabled={isCreatingUser}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateUser} disabled={isCreatingUser}>
              {isCreatingUser ? 'Creating...' : 'Create User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}