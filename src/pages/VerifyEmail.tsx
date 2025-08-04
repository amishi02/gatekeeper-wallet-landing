import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [email] = useState('user@example.com'); // This would come from registration

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle verification
    console.log('Verification code:', code);
    setIsVerified(true);
  };

  const handleResendCode = () => {
    console.log('Resending verification code');
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
        <Navigation />
        
        <div className="pt-24 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
                Email Verified!
              </h1>
              <p className="text-muted-foreground">
                Your email has been successfully verified
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-card text-center">
              <p className="text-muted-foreground mb-6">
                Your account is now active. You can start using all features of Scion.
              </p>
              <Link to="/login">
                <Button variant="gradient" size="lg" className="w-full font-semibold">
                  Continue to Login
                </Button>
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
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
              Verify Your Email
            </h1>
            <p className="text-muted-foreground">
              We've sent a verification code to{' '}
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </div>

          {/* Verification Form */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="code" className="text-sm font-medium text-foreground mb-2 block">
                  Verification Code
                </label>
                <Input
                  type="text"
                  id="code"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="w-full text-center text-lg font-mono tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <Button type="submit" variant="gradient" size="lg" className="w-full font-semibold">
                Verify Email
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm mb-4">
                Didn't receive the code?
              </p>
              <Button variant="ghost" onClick={handleResendCode} className="text-primary">
                Resend Code
              </Button>
            </div>
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
              This verification is for website features only. Your wallet security remains independent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;