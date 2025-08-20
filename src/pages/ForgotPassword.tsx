import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, KeyRound, ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset request
    console.log('Password reset requested for:', email);
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
        <Navigation />
        
        <div className="pt-24 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
                Check Your Email
              </h1>
              <p className="text-muted-foreground">
                We've sent password reset instructions to{' '}
                <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-card">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  If an account with that email exists, you'll receive a password reset link within a few minutes.
                </p>
                <p className="text-muted-foreground text-sm">
                  Don't see the email? Check your spam folder or try again.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setEmailSent(false)}
                  className="w-full"
                >
                  Try Different Email
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/login" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
      <Navigation />
      
      <div className="pt-24 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
              Reset Password
            </h1>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>

          {/* Reset Form */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                  placeholder="your@email.com"
                />
              </div>

              <Button type="submit" variant="gradient" size="lg" className="w-full font-semibold">
                Send Reset Instructions
              </Button>
            </form>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-secondary/20 rounded-xl p-4 text-center">
            <p className="text-muted-foreground text-sm">
              <Shield className="w-4 h-4 inline mr-1" />
              This is for website account recovery only. Wallet seed phrases cannot be recovered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;