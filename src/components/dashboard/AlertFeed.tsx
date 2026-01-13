import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Camera, User, MapPin, Cog, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert } from '@/lib/mockData';

interface AlertFeedProps {
  alerts: Alert[];
  maxItems?: number;
}

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

export function AlertFeed({ alerts, maxItems = 5 }: AlertFeedProps) {
  const displayAlerts = alerts.slice(0, maxItems);

  return (
    <div className="glass-card p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <h3 className="font-semibold">Live Alerts</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <Circle className="w-2 h-2 fill-destructive text-destructive animate-pulse" />
          <span className="text-xs text-muted-foreground">Real-time</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {displayAlerts.map((alert) => {
          const EntityIcon = entityIcons[alert.relatedEntity.type];
          return (
            <div
              key={alert.id}
              className={cn(
                'rounded-lg border-l-4 p-3 transition-all hover:translate-x-1',
                severityStyles[alert.severity]
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-full font-medium uppercase',
                        severityBadgeStyles[alert.severity]
                      )}
                    >
                      {alert.severity}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {alert.id}
                    </span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <EntityIcon className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {alert.relatedEntity.name}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {alerts.length > maxItems && (
        <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors">
          View all {alerts.length} alerts →
        </button>
      )}
    </div>
  );
}
