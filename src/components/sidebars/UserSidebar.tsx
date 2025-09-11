import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  FileText,
  Settings,
  User,
  Building,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const userMenuItems = [
  { title: 'Dashboard', url: '/user/dashboard', icon: LayoutDashboard },
  { title: 'Wallet', url: '/user/wallet', icon: Wallet },
  { title: 'Subscription', url: '/user/subscription', icon: CreditCard },
  { title: 'Transaction History', url: '/user/transactions', icon: FileText },
  { title: 'Profile Settings', url: '/user/profile', icon: User },
];

const UserSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const getNavClass = (path: string) =>
    isActive(path) 
      ? 'bg-primary/10 text-primary border-r-2 border-primary' 
      : 'hover:bg-accent/50 hover:text-accent-foreground';

  return (
    <Sidebar className={state === "collapsed" ? 'w-14' : 'w-64'} collapsible="icon">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-secondary-foreground" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="font-space-grotesk font-bold text-foreground">User Portal</h2>
              <p className="text-xs text-muted-foreground">John Doe</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="w-4 h-4" />
                      {state === "expanded" && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Enterprise Association Section */}
        {state === "expanded" && (
          <SidebarGroup>
            <SidebarGroupLabel>Enterprise</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 py-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-3 h-3" />
                  <span>Acme Corp</span>
                </div>
                <p>Enterprise User</p>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <div className="p-4 border-t border-border">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
};

export default UserSidebar;