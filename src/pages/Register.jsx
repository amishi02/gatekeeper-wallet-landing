import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Eye, EyeOff, Check } from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle registration submission
    console.log('Registration submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const passwordStrength = (password) => {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[A-Z]/, text: 'One uppercase letter' },
      { regex: /[a-z]/, text: 'One lowercase letter' },
      { regex: /\d/, text: 'One number' },
      { regex: /[^A-Za-z0-9]/, text: 'One special character' }
    ];

    return requirements.map(req => ({
      ...req,
      met: req.regex.test(password)
    }));
  };

  const strength = passwordStrength(formData.password);
  const strengthScore = strength.filter(req => req.met).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
      <Navigation />
      
      <div className="pt-24 pb-12 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Join the SecureWallet community
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                  Full Name
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
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full ${
                            level <= strengthScore
                              ? strengthScore < 3
                                ? 'bg-red-500'
                                : strengthScore < 5
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                              : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="space-y-1">
                      {strength.map((req, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <Check className={`w-3 h-3 mr-2 ${req.met ? 'text-green-500' : 'text-muted-foreground'}`} />
                          <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground mb-2 block">
                  Confirm Password
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
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="rounded border-border mr-3 mt-0.5"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button 
                type="submit" 
                variant="gradient" 
                size="lg" 
                className="w-full font-semibold"
                disabled={!formData.agreeToTerms || strengthScore < 3}
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-secondary/20 rounded-xl p-4 text-center">
            <p className="text-muted-foreground text-sm">
              <Shield className="w-4 h-4 inline mr-1" />
              This account is for website features only. Your wallet remains completely separate and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;