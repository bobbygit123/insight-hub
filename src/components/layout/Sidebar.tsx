import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Camera,
  Server,
  MapPin,
  Users,
  AlertTriangle,
  FileText,
  UserCog,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import innovexLogo from '@/assets/innovex-logo.png';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Cameras', href: '/cameras', icon: Camera },
  { name: 'Edge Nodes', href: '/nodes', icon: Server },
  { name: 'Workstations', href: '/workstations', icon: MapPin },
  { name: 'Attendance', href: '/attendance', icon: Users },
  { name: 'Alerts', href: '/alerts', icon: AlertTriangle },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Users', href: '/users', icon: UserCog },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <img src={innovexLogo} alt="Innovex Logo" className="w-8 h-8 object-contain" />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-sm">Vision AI</span>
              <span className="text-xs text-muted-foreground">by Innovex Group</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 mt-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'w-5 h-5 flex-shrink-0 transition-colors',
                  isActive ? 'text-primary' : 'group-hover:text-foreground'
                )}
              />
              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
              {isActive && (
                <div className="absolute left-0 w-0.5 h-6 bg-primary rounded-r-full" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* System Status */}
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <div className={cn(
          'glass-card p-3',
          collapsed ? 'flex justify-center' : ''
        )}>
          <div className="flex items-center gap-2">
            <div className="status-dot status-online" />
            {!collapsed && (
              <div>
                <p className="text-xs font-medium text-foreground">System Online</p>
                <p className="text-xs text-muted-foreground">All services running</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
