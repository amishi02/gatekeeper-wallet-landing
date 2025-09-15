import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Shield, 
  Zap, 
  Crown, 
  Check, 
  Star, 
  ArrowLeft,
  Wallet,
  Lock,
  Clock,
  DollarSign
} from 'lucide-react';
import usdcIcon from '@/assets/tokens/usdc-icon.png';
import usdtIcon from '@/assets/tokens/usdt-icon.png';
import daiIcon from '@/assets/tokens/dai-icon.png';
import busdIcon from '@/assets/tokens/busd-icon.png';

const SubscriptionDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get('plan') || 'premium';
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [selectedStablecoin, setSelectedStablecoin] = useState('');

  const plans = {
    basic: {
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
      ]
    },
    premium: {
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
      ]
    },
    enterprise: {
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
      ]
    }
  };

  const supportedStablecoins = [
    { id: 'usdc-eth', name: 'USDC', chain: 'Ethereum', icon: usdcIcon },
    { id: 'usdt-eth', name: 'USDT', chain: 'Ethereum', icon: usdtIcon },
    { id: 'dai-eth', name: 'DAI', chain: 'Ethereum', icon: daiIcon },
    { id: 'usdc-polygon', name: 'USDC', chain: 'Polygon', icon: usdcIcon },
    { id: 'usdt-bsc', name: 'USDT', chain: 'BSC', icon: usdtIcon },
    { id: 'busd-bsc', name: 'BUSD', chain: 'BSC', icon: busdIcon }
  ];

  const selectedPlan = plans[planId as keyof typeof plans] || plans.premium;

  const handleConnectWallet = async () => {
    setIsConnectingWallet(true);
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnectingWallet(false);
      // In a real app, this would trigger the actual wallet connection
      alert('Wallet connection would be initiated here');
    }, 2000);
  };

  const handlePayment = () => {
    if (!selectedStablecoin) {
      alert('Please select a stablecoin for payment');
      return;
    }
    // In a real app, this would initiate the payment flow
    alert(`Payment initiated with ${selectedStablecoin}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-8 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate('/subscription')}
              className="text-white/80 hover:text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plans
            </Button>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-4">
                Complete Your Subscription
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                Review your selected plan and complete payment with stablecoins
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Plan Details */}
          <div>
            <h2 className="text-2xl font-space-grotesk font-bold text-foreground mb-6">
              Plan Details
            </h2>
            
            <Card className="p-8 shadow-card border border-border/50">
              {selectedPlan.popular && (
                <div className="mb-4">
                  <Badge className="gradient-primary text-white px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-4 ${
                  selectedPlan.popular ? 'gradient-primary' : 'gradient-secondary'
                }`}>
                  <selectedPlan.icon className={`w-8 h-8 ${selectedPlan.popular ? 'text-white' : 'text-foreground'}`} />
                </div>
                <div>
                  <h3 className="text-3xl font-space-grotesk font-bold text-foreground">
                    {selectedPlan.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedPlan.description}
                  </p>
                </div>
              </div>

              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold text-foreground">
                  ${selectedPlan.price}
                </span>
                <span className="text-muted-foreground text-lg ml-2">
                  /{selectedPlan.period}
                </span>
              </div>

              <div className="space-y-3 mb-8">
                <h4 className="font-semibold text-foreground mb-4">What's included:</h4>
                {selectedPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                      selectedPlan.popular ? 'bg-primary' : 'bg-secondary'
                    }`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-secondary/20 rounded-lg p-4 flex items-center">
                <Clock className="w-5 h-5 text-primary mr-3" />
                <div>
                  <p className="font-medium text-foreground">Instant Activation</p>
                  <p className="text-sm text-muted-foreground">Your subscription activates immediately after payment</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Payment Section */}
          <div>
            <h2 className="text-2xl font-space-grotesk font-bold text-foreground mb-6">
              Payment Method
            </h2>

            <Card className="p-8 shadow-card border border-border/50 mb-6">
              <div className="flex items-center mb-6">
                <Wallet className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Connect Your Wallet</h3>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Connect your crypto wallet to pay with stablecoins. We support multiple chains and wallets.
              </p>

              <Button
                onClick={handleConnectWallet}
                disabled={isConnectingWallet}
                className="w-full mb-6"
                size="lg"
              >
                {isConnectingWallet ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect Wallet
                  </>
                )}
              </Button>

              <div className="bg-secondary/20 rounded-lg p-4 flex items-center">
                <Lock className="w-5 h-5 text-primary mr-3" />
                <div>
                  <p className="font-medium text-foreground">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">Your wallet and transactions are fully secure</p>
                </div>
              </div>
            </Card>

            {/* Stablecoin Selection */}
            <Card className="p-8 shadow-card border border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Select Payment Token
              </h3>
              <p className="text-muted-foreground mb-6">
                Choose your preferred stablecoin for payment
              </p>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {supportedStablecoins.map((coin) => (
                  <div
                    key={coin.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-smooth hover-lift ${
                      selectedStablecoin === coin.id
                        ? 'border-primary bg-primary/5 shadow-glow'
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedStablecoin(coin.id)}
                  >
                    <div className="flex items-center">
                      <img 
                        src={coin.icon} 
                        alt={`${coin.name} token`} 
                        className="w-8 h-8 mr-3 rounded-full" 
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{coin.name}</div>
                        <div className="text-sm text-muted-foreground">{coin.chain}</div>
                      </div>
                      {selectedStablecoin === coin.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handlePayment}
                className="w-full"
                size="lg"
                variant="gradient"
                disabled={!selectedStablecoin}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Pay ${selectedPlan.price} with {selectedStablecoin ? supportedStablecoins.find(c => c.id === selectedStablecoin)?.name : 'Stablecoin'}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetail;