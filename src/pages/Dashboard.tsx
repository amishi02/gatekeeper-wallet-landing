import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { EnterpriseDashboard } from '@/components/dashboards/EnterpriseDashboard';
import { SupportDashboard } from '@/components/dashboards/SupportDashboard';
import { UserDashboard } from '@/components/dashboards/UserDashboard';

export default function Dashboard() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-muted-foreground">Profile not found</h2>
          <p className="text-muted-foreground">Please try logging in again.</p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (profile.role) {
      case 'ADMIN':
        return <AdminDashboard />;
      case 'ENTERPRISE':
        return <EnterpriseDashboard />;
      case 'SUPPORT':
        return <SupportDashboard />;
      case 'USER':
        return <UserDashboard />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-muted-foreground">Unknown Role</h2>
              <p className="text-muted-foreground">Contact support for assistance.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {renderDashboard()}
    </div>
  );
}