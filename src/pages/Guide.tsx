import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Zap, ArrowRight, Download, Key, Lock, Smartphone } from 'lucide-react';

const Guide = () => {
  const steps = [
    {
      title: "Install Scion Extension",
      description: "Download and install the Scion Chrome extension from the Chrome Web Store",
      icon: Download,
      details: ["Visit Chrome Web Store", "Search for 'Scion Wallet'", "Click 'Add to Chrome'", "Pin to toolbar"]
    },
    {
      title: "Create Your Wallet",
      description: "Set up your non-custodial wallet with secure seed phrase generation",
      icon: Key,
      details: ["Click 'Create New Wallet'", "Generate secure seed phrase", "Write down recovery words", "Confirm seed phrase"]
    },
    {
      title: "Secure Your Assets",
      description: "Import tokens and start using secure or time-delayed transactions",
      icon: Lock,
      details: ["Import existing tokens", "Add custom networks", "Enable security features", "Set transaction preferences"]
    },
    {
      title: "Mobile Access",
      description: "Access your wallet anywhere with our mobile companion app",
      icon: Smartphone,
      details: ["Download mobile app", "Sync with extension", "Biometric security", "Cross-device support"]
    }
  ];

  const transactionTypes = [
    {
      type: "Secure Transfer",
      icon: Zap,
      description: "Instant blockchain transactions for immediate transfers",
      features: ["Instant execution", "Standard gas fees", "Real-time confirmation", "Perfect for trading"],
      color: "text-primary"
    },
    {
      type: "Normal Transfer", 
      icon: Clock,
      description: "Time-delayed transactions with smart contract security",
      features: ["24-hour delay", "Reversible within timeframe", "Enhanced security", "Protection against fraud"],
      color: "text-secondary-dark"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-4 animate-glow">
              <Shield className="w-4 h-4 mr-2" />
              Complete Usage Guide
            </Badge>
            <h1 className="text-4xl md:text-6xl font-space-grotesk font-bold text-foreground mb-6">
              Master Your{' '}
              <span className="bg-gradient-to-r from-secondary to-secondary-dark bg-clip-text text-transparent">
                Scion Wallet
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn how to use Scion's advanced features for secure, non-custodial cryptocurrency management
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-foreground mb-4">
              Getting Started
            </h2>
            <p className="text-lg text-muted-foreground">
              Follow these simple steps to set up your Scion wallet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden group hover-scale animate-slide-in-left shadow-card" style={{animationDelay: `${index * 0.2}s`}}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-space-grotesk">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <ArrowRight className="w-4 h-4 mr-2 text-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="text-xs">
                    Step {index + 1}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transaction Types */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-foreground mb-4">
              Transaction Types
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the right transaction type for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {transactionTypes.map((type, index) => (
              <Card key={index} className="relative overflow-hidden hover-scale animate-slide-in-right shadow-card" style={{animationDelay: `${index * 0.3}s`}}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${type.color === 'text-primary' ? 'bg-primary' : 'bg-secondary'}`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-space-grotesk">{type.type}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <type.icon className="w-full h-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-foreground mb-8">
              Security Best Practices
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="hover-scale shadow-card animate-float">
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Secure Your Seed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Never share your seed phrase and store it offline in multiple secure locations.</p>
                </CardContent>
              </Card>
              <Card className="hover-scale shadow-card animate-float" style={{animationDelay: '0.5s'}}>
                <CardHeader>
                  <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Use Time Delays</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Enable time-delayed transactions for large transfers to protect against unauthorized access.</p>
                </CardContent>
              </Card>
              <Card className="hover-scale shadow-card animate-float" style={{animationDelay: '1s'}}>
                <CardHeader>
                  <Key className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Regular Backups</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Regularly backup your wallet and verify your recovery process works correctly.</p>
                </CardContent>
              </Card>
            </div>
            <Button variant="secondary" size="lg" className="group">
              <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Download Security Checklist
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guide;