import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission
    console.log('Login submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
      <Navigation />
      
      <div className="pt-24 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your SecureWallet account
            </p>
          </div>

          {/* Login Form */}
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-foreground mb-2 block">
                  Password
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
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-border mr-2" />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" variant="gradient" size="lg" className="w-full font-semibold">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Create one now
                </Link>
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-secondary/20 rounded-xl p-4 text-center">
            <p className="text-muted-foreground text-sm">
              <Shield className="w-4 h-4 inline mr-1" />
              This login is for website features only. Your wallet data remains completely separate and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;