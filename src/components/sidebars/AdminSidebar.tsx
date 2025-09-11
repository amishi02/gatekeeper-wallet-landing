import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building,
  CreditCard,
  FileText,
  Settings,
  BarChart3,
  Shield,
  UserCheck,
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

const adminMenuItems = [
  { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Users', url: '/admin/users', icon: Users },
  { title: 'Enterprises', url: '/admin/enterprises', icon: Building },
  { title: 'Subscriptions', url: '/admin/subscriptions', icon: CreditCard },
  { title: 'Transactions', url: '/admin/transactions', icon: FileText },
  { title: 'Support Team', url: '/admin/support-team', icon: UserCheck },
  { title: 'Reports', url: '/admin/reports', icon: BarChart3 },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
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
            <Shield className="w-5 h-5 text-white" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="font-space-grotesk font-bold text-foreground">Admin Panel</h2>
              <p className="text-xs text-muted-foreground">System Management</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
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

export default AdminSidebar;