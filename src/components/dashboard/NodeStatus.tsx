import { Server, Cpu, HardDrive, Thermometer, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EdgeNode } from '@/lib/mockData';
import { Progress } from '@/components/ui/progress';

interface NodeStatusProps {
  nodes: EdgeNode[];
}

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

export function NodeStatus({ nodes }: NodeStatusProps) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Edge Nodes</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {nodes.filter((n) => n.status === 'online').length}/{nodes.length} Healthy
        </span>
      </div>

      <div className="space-y-4">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={cn(
              'p-3 rounded-lg border transition-all hover:border-primary/30',
              node.status === 'warning' ? 'border-warning/50 bg-warning/5' : 'border-border bg-secondary/30'
            )}
          >
            {/* Node Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn('status-dot', statusStyles[node.status])} />
                <span className="font-medium text-sm">{node.name}</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{node.id}</span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-3">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Cpu className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">CPU</span>
                </div>
                <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn('absolute left-0 top-0 h-full rounded-full', getProgressColor(node.metrics.cpu))}
                    style={{ width: `${node.metrics.cpu}%` }}
                  />
                </div>
                <span className={cn('text-xs font-mono mt-1', getMetricColor(node.metrics.cpu))}>
                  {node.metrics.cpu}%
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Activity className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">GPU</span>
                </div>
                <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn('absolute left-0 top-0 h-full rounded-full', getProgressColor(node.metrics.gpu))}
                    style={{ width: `${node.metrics.gpu}%` }}
                  />
                </div>
                <span className={cn('text-xs font-mono mt-1', getMetricColor(node.metrics.gpu))}>
                  {node.metrics.gpu}%
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <HardDrive className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">MEM</span>
                </div>
                <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn('absolute left-0 top-0 h-full rounded-full', getProgressColor(node.metrics.memory))}
                    style={{ width: `${node.metrics.memory}%` }}
                  />
                </div>
                <span className={cn('text-xs font-mono mt-1', getMetricColor(node.metrics.memory))}>
                  {node.metrics.memory}%
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Thermometer className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">TEMP</span>
                </div>
                <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn('absolute left-0 top-0 h-full rounded-full', getProgressColor(node.metrics.temperature))}
                    style={{ width: `${node.metrics.temperature}%` }}
                  />
                </div>
                <span className={cn('text-xs font-mono mt-1', getMetricColor(node.metrics.temperature))}>
                  {node.metrics.temperature}°C
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">
                {node.assignedCameras} cameras assigned
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Uptime: {node.uptime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
