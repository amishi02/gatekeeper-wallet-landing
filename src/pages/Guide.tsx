import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Zap, ArrowRight, Download, Key, Lock, Smartphone, Chrome, Wallet, Settings, CheckCircle, MousePointer, Eye, RefreshCw, Bell } from 'lucide-react';

const Guide = () => {
  const visualSteps = [
    {
      step: 1,
      title: "Install Extension",
      description: "Get Scion from Chrome Web Store",
      icon: Chrome,
      visual: "🌐",
      actions: [
        { icon: MousePointer, text: "Visit Chrome Web Store", color: "bg-blue-500" },
        { icon: Eye, text: "Search 'Scion Wallet'", color: "bg-green-500" },
        { icon: Download, text: "Click 'Add to Chrome'", color: "bg-purple-500" },
        { icon: CheckCircle, text: "Pin to browser toolbar", color: "bg-orange-500" }
      ]
    },
    {
      step: 2,
      title: "Create Wallet",
      description: "Secure seed phrase generation",
      icon: Key,
      visual: "🔐",
      actions: [
        { icon: MousePointer, text: "Click 'Create New Wallet'", color: "bg-indigo-500" },
        { icon: RefreshCw, text: "Generate secure seed phrase", color: "bg-pink-500" },
        { icon: Key, text: "Write down recovery words", color: "bg-red-500" },
        { icon: CheckCircle, text: "Confirm seed phrase", color: "bg-teal-500" }
      ]
    },
    {
      step: 3,
      title: "Setup Security",
      description: "Configure protection features",
      icon: Lock,
      visual: "🛡️",
      actions: [
        { icon: Wallet, text: "Import existing tokens", color: "bg-emerald-500" },
        { icon: Settings, text: "Add custom networks", color: "bg-cyan-500" },
        { icon: Shield, text: "Enable security features", color: "bg-violet-500" },
        { icon: Bell, text: "Set transaction preferences", color: "bg-amber-500" }
      ]
    },
    {
      step: 4,
      title: "Mobile Sync",
      description: "Cross-device access setup",
      icon: Smartphone,
      visual: "📱",
      actions: [
        { icon: Download, text: "Download mobile app", color: "bg-lime-500" },
        { icon: RefreshCw, text: "Sync with extension", color: "bg-sky-500" },
        { icon: Shield, text: "Enable biometric security", color: "bg-rose-500" },
        { icon: CheckCircle, text: "Verify cross-device support", color: "bg-slate-500" }
      ]
    }
  ];

  const transactionVisual = [
    {
      type: "Instant Transfer",
      icon: Zap,
      description: "Immediate blockchain execution",
      visual: "⚡",
      speed: "< 1 second",
      security: "Standard",
      useCase: "Daily transactions & trading",
      color: "gradient-primary",
      features: [
        { icon: Zap, text: "Lightning fast execution" },
        { icon: CheckCircle, text: "Real-time confirmation" },
        { icon: Wallet, text: "Perfect for trading" }
      ]
    },
    {
      type: "Secure Transfer",
      icon: Clock,
      description: "Time-delayed with smart contract protection",
      visual: "🕐",
      speed: "24 hours",
      security: "Enhanced",
      useCase: "Large transfers & savings",
      color: "bg-gradient-to-r from-secondary to-secondary-dark",
      features: [
        { icon: Clock, text: "24-hour safety window" },
        { icon: RefreshCw, text: "Reversible if needed" },
        { icon: Shield, text: "Fraud protection" }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-4 animate-glow">
              <Shield className="w-4 h-4 mr-2" />
              Visual Setup Guide
            </Badge>
            <h1 className="text-4xl md:text-6xl font-space-grotesk font-bold text-white mb-6">
              Master Your{' '}
              <span className="bg-gradient-to-r from-secondary to-secondary-dark bg-clip-text text-transparent">
                Scion Wallet
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Visual step-by-step guide to securely set up and use your non-custodial cryptocurrency wallet
            </p>
          </div>
        </div>
      </section>

      {/* Visual Setup Flow */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-foreground mb-4">
              Quick Visual Setup
            </h2>
            <p className="text-lg text-muted-foreground">
              Follow the visual cues - no complex reading required
            </p>
          </div>

          {/* Progress Flow */}
          <div className="max-w-6xl mx-auto">
            {visualSteps.map((step, index) => (
              <div key={step.step} className="relative mb-16 last:mb-0">
                {/* Connection Line */}
                {index < visualSteps.length - 1 && (
                  <div className="absolute left-1/2 top-32 w-px h-16 bg-gradient-to-b from-primary to-primary/50 transform -translate-x-1/2 z-0" />
                )}
                
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'}`}>
                  {/* Visual Side */}
                  <div className={`relative ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="bg-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-500 text-center group">
                      <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        {step.visual}
                      </div>
                      <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        Step {step.step}
                      </Badge>
                    </div>
                  </div>

                  {/* Instructions Side */}
                  <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-3xl font-space-grotesk font-bold text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-xl text-muted-foreground mb-6">
                          {step.description}
                        </p>
                      </div>
                      
                      {/* Action Items */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        {step.actions.map((action, actionIndex) => (
                          <div
                            key={actionIndex}
                            className="flex items-center space-x-3 p-4 bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
                          >
                            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <action.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-foreground font-medium">{action.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transaction Types Visual Comparison */}
      <section className="py-20 bg-gradient-to-br from-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-foreground mb-4">
              Choose Your Transaction Type
            </h2>
            <p className="text-lg text-muted-foreground">
              Visual comparison to help you decide
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {transactionVisual.map((type, index) => (
              <Card key={index} className="relative overflow-hidden hover-scale shadow-card bg-card/50 backdrop-blur-sm border-2 hover:border-primary/30 transition-all duration-300">
                <CardHeader className="text-center pb-6">
                  <div className="text-6xl mb-4">{type.visual}</div>
                  <div className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-space-grotesk">{type.type}</CardTitle>
                  <CardDescription className="text-lg">{type.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Speed & Security Indicators */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">{type.speed}</div>
                      <div className="text-sm text-muted-foreground">Speed</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-2xl font-bold text-secondary mb-1">{type.security}</div>
                      <div className="text-sm text-muted-foreground">Security</div>
                    </div>
                  </div>

                  {/* Use Case */}
                  <div className="text-center p-4 bg-primary/10 rounded-xl">
                    <div className="text-foreground font-semibold">{type.useCase}</div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Visual Checklist */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-foreground mb-4">
              Security Checklist
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Essential security practices visualized
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="hover-scale shadow-card text-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <CardHeader className="relative z-10">
                  <div className="text-4xl mb-4">🔐</div>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Secure Your Seed</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Write on paper</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Store in safe place</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Never share online</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale shadow-card text-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent" />
                <CardHeader className="relative z-10">
                  <div className="text-4xl mb-4">⏰</div>
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Use Time Delays</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Large transfers</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>24-hour window</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Cancel if needed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale shadow-card text-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                <CardHeader className="relative z-10">
                  <div className="text-4xl mb-4">💾</div>
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Regular Backups</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Multiple copies</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Test recovery</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Update regularly</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button variant="secondary" size="lg" className="group">
                <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Download Complete Security Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guide;