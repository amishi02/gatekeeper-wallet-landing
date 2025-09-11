import React from 'react';
import { useRole } from '@/contexts/RoleContext';
import Navigation from '@/components/Navigation';
import AdminSidebar from '@/components/sidebars/AdminSidebar';
import EnterpriseSidebar from '@/components/sidebars/EnterpriseSidebar';
import UserSidebar from '@/components/sidebars/UserSidebar';
import SupportSidebar from '@/components/sidebars/SupportSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface RoleBasedLayoutProps {
  children: React.ReactNode;
}

const RoleBasedLayout: React.FC<RoleBasedLayoutProps> = ({ children }) => {
  const { currentRole, isAuthenticated } = useRole();

  // For guest users, show normal layout
  if (!isAuthenticated || currentRole === 'guest') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
      </div>
    );
  }

  // For authenticated users, show role-based sidebar layout
  const getSidebar = () => {
    switch (currentRole) {
      case 'admin':
        return <AdminSidebar />;
      case 'enterprise':
        return <EnterpriseSidebar />;
      case 'user':
        return <UserSidebar />;
      case 'support':
        return <SupportSidebar />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {getSidebar()}
        <div className="flex-1 flex flex-col">
          <Navigation />
          <main className="flex-1 pt-16 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RoleBasedLayout;