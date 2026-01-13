import { Camera as CameraIcon, Circle, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Camera } from '@/lib/mockData';

interface CameraGridProps {
  cameras: Camera[];
  compact?: boolean;
}

const statusStyles = {
  online: 'status-online',
  offline: 'status-offline',
  away: 'status-warning',
};

const statusLabels = {
  online: 'Live',
  offline: 'Offline',
  away: 'Away',
};

export function CameraGrid({ cameras, compact = false }: CameraGridProps) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CameraIcon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Camera Feeds</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {cameras.filter((c) => c.status === 'online').length}/{cameras.length} Online
        </span>
      </div>

      <div
        className={cn(
          'grid gap-3',
          compact ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        )}
      >
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className={cn(
              'relative group rounded-lg overflow-hidden border border-border bg-secondary aspect-video transition-all hover:border-primary/50',
              camera.status === 'offline' && 'opacity-60'
            )}
          >
            {/* Placeholder for video feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              {camera.status === 'online' ? (
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">Live Feed</span>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-2">
                    <Pause className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="text-xs text-muted-foreground">No Signal</span>
                </div>
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {camera.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {camera.location}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={cn('status-dot', statusStyles[camera.status])} />
                  <span className="text-xs text-muted-foreground">
                    {statusLabels[camera.status]}
                  </span>
                </div>
              </div>
            </div>

            {/* Recording indicator */}
            {camera.recordingStatus && camera.status === 'online' && (
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/80">
                <Circle className="w-2 h-2 fill-white text-white animate-pulse" />
                <span className="text-xs text-white font-medium">REC</span>
              </div>
            )}

            {/* Camera ID */}
            <div className="absolute top-2 left-2 px-2 py-1 rounded bg-background/80 backdrop-blur-sm">
              <span className="text-xs font-mono text-muted-foreground">
                {camera.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
