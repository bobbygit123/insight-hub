import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertTriangle,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Camera,
  User,
  MapPin,
  Cog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { mockAlerts, Alert } from '@/lib/mockData';

const severityStyles = {
  critical: 'border-l-destructive bg-destructive/5',
  high: 'border-l-orange-500 bg-orange-500/5',
  medium: 'border-l-warning bg-warning/5',
  low: 'border-l-primary bg-primary/5',
};

const severityBadgeStyles = {
  critical: 'badge-critical',
  high: 'badge-high',
  medium: 'badge-medium',
  low: 'badge-low',
};

const entityIcons = {
  worker: User,
  machine: Cog,
  camera: Camera,
  zone: MapPin,
};

const statusIcons = {
  active: AlertTriangle,
  acknowledged: Clock,
  resolved: CheckCircle,
};

export default function Alerts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSearch =
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && alert.status === 'active') ||
      (activeTab === 'acknowledged' && alert.status === 'acknowledged') ||
      (activeTab === 'resolved' && alert.status === 'resolved');
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: mockAlerts.length,
    active: mockAlerts.filter((a) => a.status === 'active').length,
    critical: mockAlerts.filter((a) => a.severity === 'critical').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-warning" />
            Alerts & Violations
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage safety alerts and violations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
          <Button variant="destructive" size="sm">
            <XCircle className="w-4 h-4 mr-2" />
            Clear Resolved
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Alerts</p>
              <p className="text-3xl font-bold font-mono">{stats.total}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
        <div className="glass-card p-4 border-l-4 border-l-destructive">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-3xl font-bold font-mono text-destructive">{stats.active}</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
          </div>
        </div>
        <div className="glass-card p-4 border-l-4 border-l-destructive">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Critical</p>
              <p className="text-3xl font-bold font-mono text-destructive">{stats.critical}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary">
          <TabsTrigger value="all">All ({mockAlerts.length})</TabsTrigger>
          <TabsTrigger value="active">
            Active ({mockAlerts.filter((a) => a.status === 'active').length})
          </TabsTrigger>
          <TabsTrigger value="acknowledged">
            Acknowledged ({mockAlerts.filter((a) => a.status === 'acknowledged').length})
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved ({mockAlerts.filter((a) => a.status === 'resolved').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="space-y-3">
            {filteredAlerts.map((alert) => {
              const EntityIcon = entityIcons[alert.relatedEntity.type];
              const StatusIcon = statusIcons[alert.status];
              return (
                <div
                  key={alert.id}
                  className={cn(
                    'glass-card border-l-4 p-4 transition-all hover:translate-x-1',
                    severityStyles[alert.severity]
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={cn(
                            'text-xs px-2 py-0.5 rounded-full font-medium uppercase',
                            severityBadgeStyles[alert.severity]
                          )}
                        >
                          {alert.severity}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {alert.id}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {alert.type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-foreground mb-3">{alert.message}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <EntityIcon className="w-4 h-4" />
                          <span className="text-sm">{alert.relatedEntity.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <StatusIcon
                          className={cn(
                            'w-4 h-4',
                            alert.status === 'active'
                              ? 'text-destructive'
                              : alert.status === 'acknowledged'
                              ? 'text-warning'
                              : 'text-success'
                          )}
                        />
                        <span className="text-sm capitalize">{alert.status}</span>
                      </div>
                      {alert.status === 'active' && (
                        <Button size="sm" variant="outline">
                          Acknowledge
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredAlerts.length === 0 && (
              <div className="text-center py-12 glass-card">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="font-medium mb-2">No alerts found</h3>
                <p className="text-sm text-muted-foreground">
                  All clear! No alerts match your current filters.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
