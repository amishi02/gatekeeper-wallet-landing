import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Wallet, Plus, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PlatformWallet {
  id: string;
  wallet_address: string;
  chain: string;
  label: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function PlatformWallets() {
  const [wallets, setWallets] = useState<PlatformWallet[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<PlatformWallet | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    wallet_address: '',
    chain: '',
    label: '',
    is_active: true
  });

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('platform_wallets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWallets(data || []);
    } catch (error) {
      console.error('Error fetching wallets:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch platform wallets',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('platform_wallets')
        .insert({
          wallet_address: formData.wallet_address,
          chain: formData.chain,
          label: formData.label,
          is_active: formData.is_active,
          created_by: user.id
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Platform wallet added successfully'
      });

      setFormData({
        wallet_address: '',
        chain: '',
        label: '',
        is_active: true
      });
      setIsAddDialogOpen(false);
      fetchWallets();
    } catch (error) {
      console.error('Error adding wallet:', error);
      toast({
        title: 'Error',
        description: 'Failed to add platform wallet',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleWalletStatus = async (wallet: PlatformWallet) => {
    try {
      const { error } = await supabase
        .from('platform_wallets')
        .update({ is_active: !wallet.is_active })
        .eq('id', wallet.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Wallet status updated'
      });

      fetchWallets();
    } catch (error) {
      console.error('Error updating wallet:', error);
      toast({
        title: 'Error',
        description: 'Failed to update wallet status',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Platform Wallets</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Platform Wallet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Platform Wallet</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wallet_address">Wallet Address</Label>
                <Input
                  id="wallet_address"
                  value={formData.wallet_address}
                  onChange={(e) => setFormData({ ...formData, wallet_address: e.target.value })}
                  placeholder="0x..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chain">Chain</Label>
                <Input
                  id="chain"
                  value={formData.chain}
                  onChange={(e) => setFormData({ ...formData, chain: e.target.value })}
                  placeholder="e.g., Ethereum, BSC, Polygon"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g., Main Wallet, Trading Wallet"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Wallet'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {loading && wallets.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">Loading wallets...</p>
            </CardContent>
          </Card>
        ) : wallets.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Wallet className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No platform wallets added yet</p>
            </CardContent>
          </Card>
        ) : (
          wallets.map((wallet) => (
            <Card key={wallet.id}>
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{wallet.label}</h3>
                      <Badge variant={wallet.is_active ? 'default' : 'secondary'}>
                        {wallet.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Chain: {wallet.chain}</p>
                    <p className="text-xs text-muted-foreground font-mono break-all">
                      {wallet.wallet_address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedWallet(wallet)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Wallet Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-muted-foreground">Label</Label>
                            <p className="font-medium">{wallet.label}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Chain</Label>
                            <p className="font-medium">{wallet.chain}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Wallet Address</Label>
                            <p className="font-mono text-sm break-all">{wallet.wallet_address}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Status</Label>
                            <div className="mt-1">
                              <Badge variant={wallet.is_active ? 'default' : 'secondary'}>
                                {wallet.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Created</Label>
                            <p className="text-sm">{new Date(wallet.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleWalletStatus(wallet)}
                    >
                      {wallet.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
