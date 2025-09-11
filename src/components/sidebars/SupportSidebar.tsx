import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Ticket,
  FileText,
  Settings,
  HelpCircle,
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

const supportMenuItems = [
  { title: 'Dashboard', url: '/support/dashboard', icon: LayoutDashboard },
  { title: 'Tickets', url: '/support/tickets', icon: Ticket },
  { title: 'Issues', url: '/support/issues', icon: MessageSquare },
  { title: 'Knowledge Base', url: '/support/knowledge', icon: FileText },
  { title: 'Settings', url: '/support/settings', icon: Settings },
];

const SupportSidebar = () => {
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
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-accent-foreground" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="font-space-grotesk font-bold text-foreground">Support</h2>
              <p className="text-xs text-muted-foreground">Help Center</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Support Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportMenuItems.map((item) => (
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

export default SupportSidebar;