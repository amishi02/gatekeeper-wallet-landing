import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, HelpCircle, Download, Clock, Zap } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const faqs = [
    {
      question: 'How do I install the SecureWallet Chrome extension?',
      answer: 'Visit the Chrome Web Store, search for "SecureWallet", and click "Add to Chrome". Follow the setup wizard to create your first wallet.',
      icon: Download,
    },
    {
      question: 'What\'s the difference between Secure and Normal transfers?',
      answer: 'Secure transfers execute immediately on the blockchain. Normal transfers use a 24-hour delay via smart contract, allowing you to cancel or speed up before execution.',
      icon: Clock,
    },
    {
      question: 'How can I speed up or reverse a Normal transfer?',
      answer: 'During the 24-hour delay period, open your transaction history and select "Speed Up" or "Cancel" for any pending Normal transfer.',
      icon: Zap,
    },
    {
      question: 'Which blockchains does SecureWallet support?',
      answer: 'We support 15+ major blockchains including Ethereum, Bitcoin, Polygon, BSC, Avalanche, Solana, and many more. Check our full list in the extension.',
      icon: HelpCircle,
    },
    {
      question: 'Is my data stored on SecureWallet servers?',
      answer: 'No. SecureWallet is completely non-custodial. Your private keys and wallet data never leave your device. We have zero access to your funds.',
      icon: HelpCircle,
    },
    {
      question: 'What should I do if I forgot my wallet password?',
      answer: 'You can recover your wallet using your seed phrase. Go to the extension, click "Import Wallet", and enter your 12/24-word recovery phrase.',
      icon: HelpCircle,
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
              Get Support
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Need help? Have questions? We're here to support your SecureWallet journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Have a specific question or need technical support? Fill out the form below and our team will get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                        Your Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="text-sm font-medium text-foreground mb-2 block">
                      Subject
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full min-h-[120px]"
                      placeholder="Please describe your question or issue in detail..."
                    />
                  </div>

                  <Button type="submit" variant="gradient" size="lg" className="w-full font-semibold">
                    <MessageCircle className="w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-6">
                  Other Ways to Reach Us
                </h2>
                
                <div className="space-y-6 mb-10">
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mr-4">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email Support</h3>
                        <p className="text-muted-foreground text-sm">For general inquiries</p>
                      </div>
                    </div>
                    <p className="text-primary font-medium">support@securewallet.com</p>
                    <p className="text-muted-foreground text-sm mt-2">Response time: Within 24 hours</p>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-card hover-lift transition-smooth">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center mr-4 hover-glow">
                        <MessageCircle className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Community Discord</h3>
                        <p className="text-muted-foreground text-sm">Join our community</p>
                      </div>
                    </div>
                    <p className="text-primary font-medium">discord.gg/securewallet</p>
                    <p className="text-muted-foreground text-sm mt-2">Get help from the community</p>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-card hover-lift transition-smooth">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mr-4 hover-glow">
                        <HelpCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Documentation</h3>
                        <p className="text-muted-foreground text-sm">Self-service help</p>
                      </div>
                    </div>
                    <p className="text-primary font-medium">docs.securewallet.com</p>
                    <p className="text-muted-foreground text-sm mt-2">Comprehensive guides and tutorials</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">Emergency Support</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    For urgent security issues or wallet access problems, please contact us immediately at:
                  </p>
                  <p className="font-medium text-foreground">emergency@securewallet.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-space-grotesk font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Quick answers to common questions about SecureWallet
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-smooth">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <faq.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground leading-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed ml-14">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;