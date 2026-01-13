import { MapPin, Camera, Users, AlertTriangle, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockZones = [
  { id: 'zone-a1', name: 'Assembly Line A', type: 'production', workers: 4, status: 'active' },
  { id: 'zone-a2', name: 'Assembly Line B', type: 'production', workers: 3, status: 'active' },
  { id: 'zone-c1', name: 'Packaging Area', type: 'packaging', workers: 2, status: 'warning' },
  { id: 'zone-d1', name: 'Quality Control', type: 'inspection', workers: 2, status: 'active' },
  { id: 'zone-w1', name: 'Warehouse Entry', type: 'logistics', workers: 1, status: 'active' },
  { id: 'zone-w2', name: 'Loading Dock', type: 'logistics', workers: 0, status: 'inactive' },
];

const statusColors = {
  active: 'bg-success/20 border-success/50 text-success',
  warning: 'bg-warning/20 border-warning/50 text-warning',
  inactive: 'bg-muted/20 border-muted/50 text-muted-foreground',
};

export default function Workstations() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Workstations
          </h1>
          <p className="text-muted-foreground">
            Zone mapping and workstation monitoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Camera className="w-4 h-4 mr-2" />
            Draw Zone
          </Button>
          <Button size="sm">
            Save Layout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone Map */}
        <div className="lg:col-span-2 glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Factory Floor Map</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Move className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Interactive Floor Plan Placeholder */}
          <div className="relative aspect-[16/10] bg-secondary rounded-lg overflow-hidden grid-pattern">
            {/* Floor Plan Zones */}
            <div className="absolute inset-4 grid grid-cols-3 grid-rows-2 gap-4 p-4">
              {/* Assembly Area */}
              <div className="col-span-2 row-span-1 relative rounded-lg border-2 border-dashed border-success/50 bg-success/10 p-3">
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-success/20 text-success text-xs font-medium">
                  Assembly Area
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">7 workers</span>
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-success">Active</span>
                </div>
              </div>

              {/* Quality Control */}
              <div className="relative rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 p-3">
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-primary/20 text-primary text-xs font-medium">
                  QC Zone
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-xs text-primary">2 workers</span>
                </div>
              </div>

              {/* Packaging */}
              <div className="relative rounded-lg border-2 border-dashed border-warning/50 bg-warning/10 p-3">
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-warning/20 text-warning text-xs font-medium">
                  Packaging
                </div>
                <div className="absolute top-2 right-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-warning" />
                  <span className="text-xs text-warning">2 workers</span>
                </div>
              </div>

              {/* Warehouse */}
              <div className="col-span-2 relative rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/10 p-3">
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-muted text-muted-foreground text-xs font-medium">
                  Warehouse & Logistics
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">1 worker</span>
                </div>
              </div>
            </div>

            {/* Camera Indicators */}
            <div className="absolute top-6 left-6 w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary" />
            </div>
            <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary" />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>

        {/* Zone List */}
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-4">Active Zones</h3>
          <div className="space-y-3">
            {mockZones.map((zone) => (
              <div
                key={zone.id}
                className={`p-3 rounded-lg border transition-all cursor-pointer hover:scale-[1.02] ${statusColors[zone.status]}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{zone.name}</h4>
                    <p className="text-xs opacity-70 capitalize">{zone.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold font-mono">{zone.workers}</p>
                    <p className="text-xs opacity-70">workers</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Zones</span>
              <span className="font-medium">{mockZones.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Total Workers</span>
              <span className="font-medium">{mockZones.reduce((acc, z) => acc + z.workers, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
