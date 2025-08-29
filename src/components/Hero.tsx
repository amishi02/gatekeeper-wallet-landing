import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Download, ArrowRight, Zap, Lock } from 'lucide-react';
import InteractiveBackground from './InteractiveBackground';
import ScrollAnimations from './ScrollAnimations';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

const Hero = () => {
  const downloadButtonRef = useMagneticEffect<HTMLButtonElement>(0.2);
  const logoRef = useMagneticEffect<SVGSVGElement>(0.1);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Interactive Background */}
      <InteractiveBackground />
      <ScrollAnimations />
      
      {/* Background Gradient - Now Morphing */}
      <div className="absolute inset-0 morphing-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/40" />
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/25 rounded-full blur-3xl animate-pulse-glow animate-tilt" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow animate-rotate-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge with Enhanced Animation */}
          <div className="inline-flex items-center bg-card/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-border/20 animate-fade-in hover-lift hover:animate-pulse-glow scroll-trigger">
            <Shield ref={logoRef} className="w-4 h-4 text-foreground mr-2 animate-spin-slow magnetic-effect" />
            <span className="text-sm text-foreground font-medium">Non-Custodial & Secure</span>
            <Zap className="w-3 h-3 text-primary ml-2 animate-pulse-glow" />
          </div>

          {/* Main Headline with Enhanced Effects */}
          <h1 className="text-5xl md:text-7xl font-space-grotesk font-bold text-foreground mb-6 leading-tight animate-fade-in-up scroll-trigger hover-lift">
            <span className="inline-block animate-tilt">Secure.</span>{' '}
            <span className="bg-gradient-to-r from-secondary via-primary to-secondary-dark bg-clip-text text-transparent animate-pulse-glow inline-block">
              Decentralized.
            </span>{' '}
            <br />
            <span className="inline-block animate-float">In Your Control.</span>
            <Lock className="inline-block w-12 h-12 md:w-16 md:h-16 ml-4 text-primary animate-pulse-glow" />
          </h1>

          {/* Subheadline with Scroll Animation */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in scroll-trigger" style={{animationDelay: '0.3s'}}>
            Experience the ultimate non-custodial multichain wallet. Your keys, your crypto, your complete control.
          </p>

          {/* Feature Pills with Enhanced Animations */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in scroll-trigger" style={{animationDelay: '0.6s'}}>
            {['Multi-chain Support', 'Time-delayed Transactions', 'Instant Security'].map((feature, index) => (
              <div key={feature} className="bg-card/20 backdrop-blur-sm rounded-full px-4 py-2 border border-border/30 hover-lift hover:bg-card/30 hover:animate-pulse-glow transition-smooth animate-float magnetic-effect" style={{animationDelay: `${index * 0.2}s`}}>
                <span className="text-sm text-foreground/90">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons with Magnetic Effect */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in scroll-trigger" style={{animationDelay: '0.9s'}}>
            <Button 
              ref={downloadButtonRef}
              variant="secondary" 
              size="xl" 
              className="font-semibold group hover:animate-bounce-gentle hover-lift animate-pulse-glow magnetic-effect"
            >
              <Download className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              Download Chrome Extension
            </Button>
            <Button variant="ghost" size="xl" className="text-white border-white/30 hover:bg-white/20 hover:backdrop-blur-md hover:border-white/50 font-semibold group hover-lift magnetic-effect">
              Learn How It Works
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-transform" />
            </Button>
          </div>

          {/* Trust Indicators with Enhanced Animations */}
          <div className="mt-16 pt-8 border-t border-border/20 animate-fade-in scroll-trigger" style={{animationDelay: '1.2s'}}>
            <p className="text-muted-foreground text-sm mb-4 animate-fade-in" style={{animationDelay: '1.4s'}}>Trusted by crypto enthusiasts worldwide</p>
            <div className="flex justify-center items-center space-x-8 text-muted-foreground">
              <div className="text-2xl font-bold hover:text-primary transition-smooth cursor-default hover-lift animate-pulse-glow magnetic-effect">10K+</div>
              <div className="w-px h-6 bg-border/20 animate-glow" />
              <div className="text-2xl font-bold hover:text-primary transition-smooth cursor-default hover-lift animate-pulse-glow magnetic-effect">15+</div>
              <div className="w-px h-6 bg-border/20 animate-glow" />
              <div className="text-2xl font-bold hover:text-primary transition-smooth cursor-default hover-lift animate-pulse-glow magnetic-effect">100%</div>
            </div>
            <div className="flex justify-center items-center space-x-8 text-muted-foreground text-xs mt-2">
              <span className="hover:text-foreground transition-smooth animate-fade-in" style={{animationDelay: '1.6s'}}>Active Users</span>
              <span className="hover:text-foreground transition-smooth animate-fade-in" style={{animationDelay: '1.7s'}}>Supported Chains</span>
              <span className="hover:text-foreground transition-smooth animate-fade-in" style={{animationDelay: '1.8s'}}>Non-Custodial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;