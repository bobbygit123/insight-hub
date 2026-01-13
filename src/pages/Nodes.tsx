import { Server, Cpu, Activity, HardDrive, Thermometer, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockNodes } from '@/lib/mockData';

const statusStyles = {
  online: 'status-online',
  offline: 'status-offline',
  warning: 'status-warning',
};

function getMetricColor(value: number): string {
  if (value >= 80) return 'text-destructive';
  if (value >= 60) return 'text-warning';
  return 'text-success';
}

function getProgressColor(value: number): string {
  if (value >= 80) return 'bg-destructive';
  if (value >= 60) return 'bg-warning';
  return 'bg-success';
}

export default function Nodes() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Server className="w-6 h-6 text-primary" />
            Edge Nodes
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage edge computing infrastructure
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Node
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Server className="w-4 h-4" />
            <span className="text-sm">Total Nodes</span>
          </div>
          <p className="text-3xl font-bold font-mono text-primary">{mockNodes.length}</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Healthy</span>
          </div>
          <p className="text-3xl font-bold font-mono text-success">
            {mockNodes.filter((n) => n.status === 'online').length}
          </p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Cpu className="w-4 h-4" />
            <span className="text-sm">Avg CPU</span>
          </div>
          <p className="text-3xl font-bold font-mono">
            {Math.round(mockNodes.reduce((acc, n) => acc + n.metrics.cpu, 0) / mockNodes.length)}%
          </p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Thermometer className="w-4 h-4" />
            <span className="text-sm">Avg Temp</span>
          </div>
          <p className="text-3xl font-bold font-mono">
            {Math.round(mockNodes.reduce((acc, n) => acc + n.metrics.temperature, 0) / mockNodes.length)}°C
          </p>
        </div>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockNodes.map((node) => (
          <div
            key={node.id}
            className={cn(
              'glass-card p-6 transition-all hover:border-primary/30',
              node.status === 'warning' && 'border-warning/50'
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    node.status === 'online'
                      ? 'bg-success/10'
                      : node.status === 'warning'
                      ? 'bg-warning/10'
                      : 'bg-destructive/10'
                  )}
                >
                  <Server
                    className={cn(
                      'w-6 h-6',
                      node.status === 'online'
                        ? 'text-success'
                        : node.status === 'warning'
                        ? 'text-warning'
                        : 'text-destructive'
                    )}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{node.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{node.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn('status-dot', statusStyles[node.status])} />
                <span className="text-sm capitalize">{node.status}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-4">
              {/* CPU */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">CPU Usage</span>
                  </div>
                  <span className={cn('text-sm font-mono font-medium', getMetricColor(node.metrics.cpu))}>
                    {node.metrics.cpu}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', getProgressColor(node.metrics.cpu))}
                    style={{ width: `${node.metrics.cpu}%` }}
                  />
                </div>
              </div>

              {/* GPU */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">GPU Usage</span>
                  </div>
                  <span className={cn('text-sm font-mono font-medium', getMetricColor(node.metrics.gpu))}>
                    {node.metrics.gpu}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', getProgressColor(node.metrics.gpu))}
                    style={{ width: `${node.metrics.gpu}%` }}
                  />
                </div>
              </div>

              {/* Memory */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Memory</span>
                  </div>
                  <span className={cn('text-sm font-mono font-medium', getMetricColor(node.metrics.memory))}>
                    {node.metrics.memory}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', getProgressColor(node.metrics.memory))}
                    style={{ width: `${node.metrics.memory}%` }}
                  />
                </div>
              </div>

              {/* Temperature */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Temperature</span>
                  </div>
                  <span className={cn('text-sm font-mono font-medium', getMetricColor(node.metrics.temperature))}>
                    {node.metrics.temperature}°C
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', getProgressColor(node.metrics.temperature))}
                    style={{ width: `${node.metrics.temperature}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
              <span>{node.assignedCameras} cameras assigned</span>
              <span className="font-mono">Uptime: {node.uptime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
