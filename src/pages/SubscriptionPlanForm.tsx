import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { z } from 'zod';

const planSchema = z.object({
  name: z.string().min(1, 'Name is required').max(128),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  currency: z.string().min(1).max(16),
  billing_interval_days: z.number().int().min(1, 'Must be at least 1 day'),
  trial_days: z.number().int().min(0),
  is_enterprise_plan: z.boolean(),
  is_individual_plan: z.boolean(),
  is_active: z.boolean(),
  is_discontinued: z.boolean(),
});

type PlanFormData = z.infer<typeof planSchema>;

export default function SubscriptionPlanForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PlanFormData>({
    name: '',
    description: '',
    price: 0,
    currency: 'USD',
    billing_interval_days: 30,
    trial_days: 0,
    is_enterprise_plan: false,
    is_individual_plan: false,
    is_active: true,
    is_discontinued: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPlan();
    }
  }, [id]);

  const fetchPlan = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plan')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name,
          description: data.description,
          price: Number(data.price),
          currency: data.currency,
          billing_interval_days: data.billing_interval_days,
          trial_days: data.trial_days,
          is_enterprise_plan: data.is_enterprise_plan,
          is_individual_plan: data.is_individual_plan,
          is_active: data.is_active,
          is_discontinued: data.is_discontinued,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      navigate('/subscription-plans');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = planSchema.parse(formData);
      setLoading(true);

      if (id && id !== 'new') {
        // Update existing plan
        const { error } = await supabase
          .from('subscription_plan')
          .update({
            name: validatedData.name,
            description: validatedData.description,
            price: validatedData.price,
            currency: validatedData.currency,
            billing_interval_days: validatedData.billing_interval_days,
            trial_days: validatedData.trial_days,
            is_enterprise_plan: validatedData.is_enterprise_plan,
            is_individual_plan: validatedData.is_individual_plan,
            is_active: validatedData.is_active,
            is_discontinued: validatedData.is_discontinued,
          })
          .eq('id', id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Subscription plan updated successfully',
        });
      } else {
        // Create new plan
        const { error } = await supabase
          .from('subscription_plan')
          .insert([{
            name: validatedData.name,
            description: validatedData.description,
            price: validatedData.price,
            currency: validatedData.currency,
            billing_interval_days: validatedData.billing_interval_days,
            trial_days: validatedData.trial_days,
            is_enterprise_plan: validatedData.is_enterprise_plan,
            is_individual_plan: validatedData.is_individual_plan,
            is_active: validatedData.is_active,
            is_discontinued: validatedData.is_discontinued,
          }]);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Subscription plan created successfully',
        });
      }

      navigate('/subscription-plans');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto p-6 pt-24 max-w-3xl">
      <Button
        variant="ghost"
        onClick={() => navigate('/subscription-plans')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Plans
      </Button>

      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          {id && id !== 'new' ? 'Edit' : 'Create'} Subscription Plan
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Plan Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Premium Plan"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the plan features..."
              rows={4}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              />
              {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency *</Label>
              <Input
                id="currency"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                placeholder="USD"
              />
              {errors.currency && <p className="text-sm text-destructive">{errors.currency}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billing_interval">Billing Interval (days) *</Label>
              <Input
                id="billing_interval"
                type="number"
                value={formData.billing_interval_days}
                onChange={(e) =>
                  setFormData({ ...formData, billing_interval_days: parseInt(e.target.value) || 0 })
                }
              />
              {errors.billing_interval_days && (
                <p className="text-sm text-destructive">{errors.billing_interval_days}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="trial_days">Trial Days</Label>
              <Input
                id="trial_days"
                type="number"
                value={formData.trial_days}
                onChange={(e) => setFormData({ ...formData, trial_days: parseInt(e.target.value) || 0 })}
              />
              {errors.trial_days && <p className="text-sm text-destructive">{errors.trial_days}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enterprise Plan</Label>
                <p className="text-sm text-muted-foreground">
                  This plan is for enterprise customers
                </p>
              </div>
              <Switch
                checked={formData.is_enterprise_plan}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_enterprise_plan: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Individual Plan</Label>
                <p className="text-sm text-muted-foreground">
                  This plan is for individual users
                </p>
              </div>
              <Switch
                checked={formData.is_individual_plan}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_individual_plan: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Active</Label>
                <p className="text-sm text-muted-foreground">
                  Active plans are visible to users
                </p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Discontinued</Label>
                <p className="text-sm text-muted-foreground">
                  Discontinued plans cannot be purchased
                </p>
              </div>
              <Switch
                checked={formData.is_discontinued}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_discontinued: checked })
                }
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : id && id !== 'new' ? 'Update Plan' : 'Create Plan'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/subscription-plans')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
      </div>
    </div>
  );
}
