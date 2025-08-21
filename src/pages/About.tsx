import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Shield, Users, Target, Zap, Globe, Lock } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Every decision we make prioritizes the security and privacy of our users above all else.',
    },
    {
      icon: Users,
      title: 'User Empowerment',
      description: 'We believe in giving users complete control over their digital assets and financial sovereignty.',
    },
    {
      icon: Target,
      title: 'Transparency',
      description: 'Open-source development and clear communication build trust with our community.',
    },
  ];


  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-space-grotesk font-bold text-white mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              To democratize financial sovereignty by providing the most secure, user-friendly, 
              and truly non-custodial wallet experience for the decentralized future.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-space-grotesk font-bold text-foreground mb-6">
                  Why We Built SecureWallet
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    The cryptocurrency landscape is evolving rapidly, but most wallet solutions force users to choose 
                    between security and usability. We saw an opportunity to challenge this false dichotomy.
                  </p>
                  <p>
                    SecureWallet was born from the belief that every crypto user deserves complete control over their 
                    assets without sacrificing ease of use. Our innovative time-delayed transaction system provides 
                    an additional layer of security for large transfers while maintaining instant options for everyday use.
                  </p>
                  <p>
                    We're not just building a wallet—we're building the foundation for true financial sovereignty 
                    in the digital age.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-card rounded-2xl p-8 shadow-card">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Innovation</h4>
                      <p className="text-sm text-muted-foreground">Pioneering new security paradigms</p>
                    </div>
                    <div className="text-center group hover-scale">
                      <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 hover-glow transition-smooth">
                        <Globe className="w-8 h-8 text-foreground" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Global</h4>
                      <p className="text-sm text-muted-foreground">Supporting users worldwide</p>
                    </div>
                    <div className="text-center group hover-scale">
                      <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 hover-glow transition-smooth">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Secure</h4>
                      <p className="text-sm text-muted-foreground">Military-grade encryption</p>
                    </div>
                    <div className="text-center group hover-scale">
                      <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 hover-glow transition-smooth">
                        <Users className="w-8 h-8 text-foreground" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Community</h4>
                      <p className="text-sm text-muted-foreground">Built for the people</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/20 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-space-grotesk font-bold text-foreground mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide every decision we make and every feature we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={value.title} className="text-center group">
                <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-space-grotesk font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Be part of the movement towards true financial sovereignty. Together, we're building the future of decentralized finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="secondary" size="xl" className="font-semibold">
                Download SecureWallet
              </Button>
              <Button variant="ghost" size="xl" className="text-white border-white/30 hover:bg-white/10 font-semibold">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;