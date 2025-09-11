import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield, Download, User, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useRole, UserRole, getRoleLabel, getRoleColor } from '@/contexts/RoleContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentRole, setCurrentRole, isAuthenticated, setIsAuthenticated } = useRole();

  const isActive = (path: string) => location.pathname === path;

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role !== 'guest') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/guide', label: 'Usage Guide' },
    { path: '/subscription', label: 'Pricing' },
    { path: '/contact', label: 'Support' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-scale">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-space-grotesk font-bold text-xl text-foreground">
              Scion
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Role Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className={`font-medium ${getRoleColor(currentRole)}`}>
                    {getRoleLabel(currentRole)}
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border shadow-soft">
                <DropdownMenuItem 
                  onClick={() => handleRoleChange('guest')}
                  className={`cursor-pointer ${currentRole === 'guest' ? 'bg-accent/50' : ''}`}
                >
                  <span className="text-muted-foreground">Guest</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => handleRoleChange('admin')}
                  className={`cursor-pointer ${currentRole === 'admin' ? 'bg-accent/50' : ''}`}
                >
                  <span className="text-destructive">Administrator</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRoleChange('enterprise')}
                  className={`cursor-pointer ${currentRole === 'enterprise' ? 'bg-accent/50' : ''}`}
                >
                  <span className="text-primary">Enterprise User</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRoleChange('user')}
                  className={`cursor-pointer ${currentRole === 'user' ? 'bg-accent/50' : ''}`}
                >
                  <span className="text-secondary">Individual User</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRoleChange('support')}
                  className={`cursor-pointer ${currentRole === 'support' ? 'bg-accent/50' : ''}`}
                >
                  <span className="text-accent">Support Team</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {!isAuthenticated && currentRole === 'guest' && (
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
            )}
            
            <Button variant="gradient" size="sm" className="font-medium">
              <Download className="w-4 h-4" />
              Get Extension
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-smooth"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-card">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-smooth hover:text-primary px-4 py-2 ${
                    isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-2 space-y-2">
                {/* Mobile Role Switcher */}
                <div className="mb-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                        <User className="w-4 h-4" />
                        <span className={`font-medium ${getRoleColor(currentRole)}`}>
                          {getRoleLabel(currentRole)}
                        </span>
                        <ChevronDown className="w-3 h-3 opacity-50 ml-auto" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 bg-card border-border shadow-soft">
                      <DropdownMenuItem 
                        onClick={() => handleRoleChange('guest')}
                        className={`cursor-pointer ${currentRole === 'guest' ? 'bg-accent/50' : ''}`}
                      >
                        <span className="text-muted-foreground">Guest</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleRoleChange('admin')}
                        className={`cursor-pointer ${currentRole === 'admin' ? 'bg-accent/50' : ''}`}
                      >
                        <span className="text-destructive">Administrator</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleRoleChange('enterprise')}
                        className={`cursor-pointer ${currentRole === 'enterprise' ? 'bg-accent/50' : ''}`}
                      >
                        <span className="text-primary">Enterprise User</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleRoleChange('user')}
                        className={`cursor-pointer ${currentRole === 'user' ? 'bg-accent/50' : ''}`}
                      >
                        <span className="text-secondary">Individual User</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleRoleChange('support')}
                        className={`cursor-pointer ${currentRole === 'support' ? 'bg-accent/50' : ''}`}
                      >
                        <span className="text-accent">Support Team</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {!isAuthenticated && currentRole === 'guest' && (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                )}
                
                <Button variant="gradient" size="sm" className="w-full">
                  <Download className="w-4 h-4" />
                  Get Extension
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;