import React from 'react';
import { Shield, Clock, Zap, Lock, RefreshCw, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Non-Custodial Security',
      description: 'Your private keys never leave your device. Complete ownership and control of your digital assets.',
      gradient: 'from-blue-500 to-blue-700',
    },
    {
      icon: Globe,
      title: 'Multichain Support',
      description: 'Seamlessly manage assets across 15+ blockchains from a single, unified interface.',
      gradient: 'from-purple-500 to-purple-700',
    },
    {
      icon: Zap,
      title: 'Secure Transfer',
      description: 'Instant blockchain transactions with military-grade encryption for immediate transfers.',
      gradient: 'from-green-500 to-green-700',
    },
    {
      icon: Clock,
      title: 'Normal Transfer',
      description: 'Time-delayed smart contract transactions with 24-hour window for enhanced security.',
      gradient: 'from-orange-500 to-orange-700',
    },
    {
      icon: RefreshCw,
      title: 'Transaction Control',
      description: 'Speed up or reverse normal transfers before confirmation. Ultimate transaction flexibility.',
      gradient: 'from-pink-500 to-pink-700',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Zero data collection. No tracking. Your financial privacy is completely protected.',
      gradient: 'from-indigo-500 to-indigo-700',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-foreground mb-6">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              SecureWallet
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built for the next generation of crypto users who demand security, flexibility, and complete control
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-smooth hover-scale border border-border/50"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-space-grotesk font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transaction Modes Comparison */}
        <div className="mt-20">
          <h3 className="text-3xl font-space-grotesk font-bold text-center text-foreground mb-12">
            Two Transaction Modes for Every Need
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Secure Transfer */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full" />
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-green-700 p-2.5 mr-4">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-space-grotesk font-semibold text-foreground">Secure Transfer</h4>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3" />
                  Instant blockchain execution
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3" />
                  Immediate confirmation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3" />
                  Perfect for time-sensitive trades
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3" />
                  Standard gas fees
                </li>
              </ul>
            </div>

            {/* Normal Transfer */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full" />
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 p-2.5 mr-4">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-space-grotesk font-semibold text-foreground">Normal Transfer</h4>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-3" />
                  24-hour delay via smart contract
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-3" />
                  Option to speed up or cancel
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-3" />
                  Enhanced security for large amounts
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-3" />
                  Protection against rushed decisions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;