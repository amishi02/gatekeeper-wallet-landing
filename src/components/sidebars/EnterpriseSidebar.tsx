import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Wallet,
  Settings,
  Building,
  FileText,
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

const enterpriseMenuItems = [
  { title: 'Dashboard', url: '/enterprise/dashboard', icon: LayoutDashboard },
  { title: 'User Management', url: '/enterprise/users', icon: Users },
  { title: 'Subscription', url: '/enterprise/subscription', icon: CreditCard },
  { title: 'Wallet Transactions', url: '/enterprise/wallet', icon: Wallet },
  { title: 'Analytics', url: '/enterprise/analytics', icon: BarChart3 },
  { title: 'Reports', url: '/enterprise/reports', icon: FileText },
  { title: 'Settings', url: '/enterprise/settings', icon: Settings },
];

const EnterpriseSidebar = () => {
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
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="font-space-grotesk font-bold text-foreground">Enterprise</h2>
              <p className="text-xs text-muted-foreground">Acme Corp</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Enterprise Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {enterpriseMenuItems.map((item) => (
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
      </SidebarContent>

      <div className="p-4 border-t border-border">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
};

export default EnterpriseSidebar;