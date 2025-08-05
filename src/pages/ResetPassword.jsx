import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, KeyRound, Eye, EyeOff, CheckCircle } from 'lucide-react';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle password reset
    console.log('Password reset with token:', token);
    setPasswordReset(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (passwordReset) {
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
                Password Reset!
              </h1>
              <p className="text-muted-foreground">
                Your password has been successfully reset
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-card text-center">
              <p className="text-muted-foreground mb-6">
                You can now log in to your account with your new password.
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

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
        <Navigation />
        
        <div className="pt-24 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-destructive rounded-2xl flex items-center justify-center mx-auto mb-6">
                <KeyRound className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
                Invalid Reset Link
              </h1>
              <p className="text-muted-foreground">
                This password reset link is invalid or has expired
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-card text-center">
              <p className="text-muted-foreground mb-6">
                Please request a new password reset link to continue.
              </p>
              <Link to="/forgot-password">
                <Button variant="gradient" size="lg" className="w-full font-semibold">
                  Request New Link
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
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
              Set New Password
            </h1>
            <p className="text-muted-foreground">
              Enter your new password below
            </p>
          </div>

          {/* Reset Form */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="text-sm font-medium text-foreground mb-2 block">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pr-12"
                    placeholder="Enter new password"
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground mb-2 block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pr-12"
                    placeholder="Confirm new password"
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Password must be at least 8 characters long and include:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>At least one uppercase letter</li>
                  <li>At least one lowercase letter</li>
                  <li>At least one number</li>
                  <li>At least one special character</li>
                </ul>
              </div>

              <Button type="submit" variant="gradient" size="lg" className="w-full font-semibold">
                Reset Password
              </Button>
            </form>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-secondary/20 rounded-xl p-4 text-center">
            <p className="text-muted-foreground text-sm">
              <Shield className="w-4 h-4 inline mr-1" />
              This password is for website access only. Your wallet security remains separate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;