import { useState } from 'react';
import { Camera, Search, Filter, Grid3X3, LayoutGrid, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { mockCameras, Camera as CameraType } from '@/lib/mockData';

const statusStyles = {
  online: 'status-online',
  offline: 'status-offline',
  away: 'status-warning',
};

export default function Cameras() {
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCamera, setSelectedCamera] = useState<CameraType | null>(null);

  const filteredCameras = mockCameras.filter(
    (camera) =>
      camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Camera className="w-6 h-6 text-primary" />
            Cameras
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor all connected cameras
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Camera
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search cameras by name or location..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="flex items-center border border-border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'large' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('large')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 p-4 glass-card">
        <div className="flex items-center gap-2">
          <div className="status-dot status-online" />
          <span className="text-sm">
            <span className="font-medium text-success">
              {mockCameras.filter((c) => c.status === 'online').length}
            </span>{' '}
            Online
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="status-dot status-offline" />
          <span className="text-sm">
            <span className="font-medium text-destructive">
              {mockCameras.filter((c) => c.status === 'offline').length}
            </span>{' '}
            Offline
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="status-dot status-warning" />
          <span className="text-sm">
            <span className="font-medium text-warning">
              {mockCameras.filter((c) => c.status === 'away').length}
            </span>{' '}
            Away
          </span>
        </div>
      </div>

      {/* Camera Grid */}
      <div
        className={cn(
          'grid gap-4',
          viewMode === 'grid'
            ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1 lg:grid-cols-2'
        )}
      >
        {filteredCameras.map((camera) => (
          <div
            key={camera.id}
            className={cn(
              'glass-card overflow-hidden cursor-pointer transition-all hover:border-primary/50',
              selectedCamera?.id === camera.id && 'border-primary'
            )}
            onClick={() => setSelectedCamera(camera)}
          >
            {/* Video Feed Placeholder */}
            <div
              className={cn(
                'relative bg-secondary flex items-center justify-center',
                viewMode === 'grid' ? 'aspect-video' : 'aspect-[21/9]'
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                {camera.status === 'online' ? (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2 animate-pulse">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">Live Feed</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-2">
                      <Camera className="w-8 h-8 text-destructive" />
                    </div>
                    <span className="text-sm text-muted-foreground">No Signal</span>
                  </div>
                )}
              </div>

              {/* Camera ID Badge */}
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-background/80 backdrop-blur-sm">
                <span className="text-xs font-mono text-muted-foreground">{camera.id}</span>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
                <div className={cn('status-dot', statusStyles[camera.status])} />
                <span className="text-xs capitalize">{camera.status}</span>
              </div>

              {/* Recording Indicator */}
              {camera.recordingStatus && camera.status === 'online' && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/90">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs text-white font-medium">REC</span>
                </div>
              )}
            </div>

            {/* Camera Info */}
            <div className="p-4">
              <h3 className="font-medium mb-1">{camera.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{camera.location}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">{camera.ipAddress}</span>
                <span>{camera.assignedZones.length} zones</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCameras.length === 0 && (
        <div className="text-center py-12">
          <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No cameras found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
