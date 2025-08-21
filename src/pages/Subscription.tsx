import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Zap, 
  Crown, 
  Check, 
  Star, 
  Coins,
  DollarSign,
  Lock,
  Globe,
  Clock,
  RefreshCw
} from 'lucide-react';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '9.99',
      period: 'month',
      description: 'Perfect for individual users',
      icon: Shield,
      popular: false,
      features: [
        'Up to 5 wallets',
        'Basic multichain support',
        'Standard transaction fees',
        'Email support',
        'Mobile app access',
        'Basic security features'
      ],
      stablecoinOnly: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '19.99',
      period: 'month',
      description: 'Most popular for power users',
      icon: Zap,
      popular: true,
      features: [
        'Unlimited wallets',
        'Full multichain support (15+ chains)',
        'Reduced transaction fees',
        'Priority support',
        'Advanced analytics',
        'Time-delayed transactions',
        'Transaction control features',
        'API access'
      ],
      stablecoinOnly: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '49.99',
      period: 'month',
      description: 'For teams and organizations',
      icon: Crown,
      popular: false,
      features: [
        'Everything in Premium',
        'Team management',
        'Bulk operations',
        'Custom integrations',
        'Dedicated support',
        'Advanced security protocols',
        'Compliance reporting',
        'White-label options'
      ],
      stablecoinOnly: true
    }
  ];

  const supportedStablecoins = [
    { name: 'USDC', chain: 'Ethereum', icon: '🔵' },
    { name: 'USDT', chain: 'Ethereum', icon: '🟢' },
    { name: 'DAI', chain: 'Ethereum', icon: '🟡' },
    { name: 'USDC', chain: 'Polygon', icon: '🔵' },
    { name: 'USDT', chain: 'BSC', icon: '🟢' },
    { name: 'BUSD', chain: 'BSC', icon: '🟠' }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-card/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-border/20">
              <Coins className="w-4 h-4 text-white mr-2" />
              <span className="text-sm text-white font-medium">Stablecoin Payments Only</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-space-grotesk font-bold text-white mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Unlock premium features with our flexible subscription plans. Pay securely with stablecoins only.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-card rounded-2xl p-8 shadow-card border transition-smooth hover-lift relative ${
                    plan.popular
                      ? 'border-primary shadow-glow scale-105'
                      : 'border-border/50 hover:border-primary/50'
                  } ${
                    selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="gradient-primary text-white px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      plan.popular ? 'gradient-primary' : 'gradient-secondary'
                    } hover-glow transition-smooth`}>
                      <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-foreground'}`} />
                    </div>
                    <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-foreground">
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Coins className="w-4 h-4" />
                      <span>Stablecoins only</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                          plan.popular ? 'bg-primary' : 'bg-secondary'
                        }`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    size="lg"
                    className="w-full font-semibold"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supported Stablecoins */}
      <section className="py-20 bg-gradient-to-br from-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-6">
              Supported Stablecoins
            </h2>
            <p className="text-muted-foreground mb-12">
              Pay with any of these supported stablecoins across multiple blockchains
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {supportedStablecoins.map((coin, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-4 shadow-card hover-lift transition-smooth border border-border/50"
                >
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-2xl mr-2">{coin.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">{coin.name}</div>
                      <div className="text-xs text-muted-foreground">{coin.chain}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Security Notice */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-space-grotesk font-bold text-center text-foreground mb-4">
                Secure Stablecoin Payments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">Multi-Chain Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Pay from Ethereum, Polygon, BSC, and more
                  </p>
                </div>
                <div>
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">Instant Activation</h4>
                  <p className="text-sm text-muted-foreground">
                    Your subscription activates immediately after payment
                  </p>
                </div>
                <div>
                  <RefreshCw className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">Auto-Renewal</h4>
                  <p className="text-sm text-muted-foreground">
                    Convenient automatic renewals with stablecoins
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-6">
              Ready to Upgrade?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of users enjoying premium SecureWallet features. Start your subscription today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="secondary" size="xl" className="font-semibold">
                <DollarSign className="w-5 h-5" />
                Start Free Trial
              </Button>
              <Button variant="ghost" size="xl" className="text-white border-white/30 hover:bg-white/10 font-semibold">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscription;