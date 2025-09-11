import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'enterprise' | 'user' | 'support' | 'guest';

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

interface RoleProviderProps {
  children: ReactNode;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <RoleContext.Provider value={{ 
      currentRole, 
      setCurrentRole, 
      isAuthenticated, 
      setIsAuthenticated 
    }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const getRoleLabel = (role: UserRole): string => {
  const labels = {
    admin: 'Administrator',
    enterprise: 'Enterprise User',
    user: 'Individual User',
    support: 'Support Team',
    guest: 'Guest'
  };
  return labels[role];
};

export const getRoleColor = (role: UserRole): string => {
  const colors = {
    admin: 'text-destructive',
    enterprise: 'text-primary',
    user: 'text-secondary',
    support: 'text-accent',
    guest: 'text-muted-foreground'
  };
  return colors[role];
};