import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Download, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/10 to-background/30" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
            <Shield className="w-4 h-4 text-white mr-2" />
            <span className="text-sm text-white font-medium">Non-Custodial & Secure</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-space-grotesk font-bold text-white mb-6 leading-tight">
            Secure.{' '}
            <span className="bg-gradient-to-r from-secondary to-secondary-dark bg-clip-text text-transparent">
              Decentralized.
            </span>{' '}
            <br />
            In Your Control.
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the ultimate non-custodial multichain wallet. Your keys, your crypto, your complete control.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['Multi-chain Support', 'Time-delayed Transactions', 'Instant Security'].map((feature) => (
              <div key={feature} className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm text-white/90">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="secondary" size="xl" className="font-semibold group">
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Download Chrome Extension
            </Button>
            <Button variant="ghost" size="xl" className="text-white border-white/30 hover:bg-white/10 font-semibold group">
              Learn How It Works
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm mb-4">Trusted by crypto enthusiasts worldwide</p>
            <div className="flex justify-center items-center space-x-8 text-white/40">
              <div className="text-2xl font-bold">10K+</div>
              <div className="w-px h-6 bg-white/20" />
              <div className="text-2xl font-bold">15+</div>
              <div className="w-px h-6 bg-white/20" />
              <div className="text-2xl font-bold">100%</div>
            </div>
            <div className="flex justify-center items-center space-x-8 text-white/60 text-xs mt-2">
              <span>Active Users</span>
              <span>Supported Chains</span>
              <span>Non-Custodial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;