import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface Subscription {
  id: string;
  subscriber_id: string;
  status: string;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

interface SubscriptionWithProfile extends Subscription {
  subscriber: {
    email: string;
    full_name: string;
  } | null;
}

export default function SubscriptionPlanUsers() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [planName, setPlanName] = useState('');
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithProfile[]>([]);

  useEffect(() => {
    if (id) {
      fetchPlanAndSubscriptions();
    }
  }, [id]);

  const fetchPlanAndSubscriptions = async () => {
    setLoading(true);
    try {
      // Fetch plan details
      const { data: planData, error: planError } = await supabase
        .from('subscription_plan')
        .select('name')
        .eq('id', id)
        .single();

      if (planError) throw planError;
      setPlanName(planData.name);

      // Fetch subscriptions for this plan
      const { data: subsData, error: subsError } = await supabase
        .from('subscription')
        .select('*')
        .eq('plan_id', id)
        .order('created_at', { ascending: false });

      if (subsError) throw subsError;

      // Fetch user profiles for each subscription
      const subscriptionsWithProfiles = await Promise.all(
        (subsData || []).map(async (sub) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('email, full_name')
            .eq('user_id', sub.subscriber_id)
            .single();

          return {
            ...sub,
            subscriber: profileData,
          };
        })
      );

      setSubscriptions(subscriptionsWithProfiles);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      navigate('/subscription-plans');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (subscription: Subscription) => {
    if (subscription.status === 'ACTIVE' && subscription.is_active) {
      return <Badge variant="default">Active</Badge>;
    } else if (subscription.status === 'EXPIRED') {
      return <Badge variant="destructive">Expired</Badge>;
    } else if (subscription.status === 'CANCELLED') {
      return <Badge variant="secondary">Cancelled</Badge>;
    } else if (subscription.status === 'PENDING') {
      return <Badge variant="outline">Pending</Badge>;
    }
    return <Badge variant="secondary">{subscription.status}</Badge>;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto p-6 pt-24">
      <Button
        variant="ghost"
        onClick={() => navigate('/subscription-plans')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Plans
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Users Subscribed to {planName}</h1>
        <p className="text-muted-foreground">View all users with this subscription plan</p>
      </div>

      <Card className="p-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No users have subscribed to this plan yet
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Subscribed On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">
                    {subscription.subscriber?.full_name || 'N/A'}
                  </TableCell>
                  <TableCell>{subscription.subscriber?.email || 'N/A'}</TableCell>
                  <TableCell>{getStatusBadge(subscription)}</TableCell>
                  <TableCell>
                    {subscription.start_date
                      ? format(new Date(subscription.start_date), 'MMM dd, yyyy')
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {subscription.end_date
                      ? format(new Date(subscription.end_date), 'MMM dd, yyyy')
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {format(new Date(subscription.created_at), 'MMM dd, yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
      </div>
    </div>
  );
}
