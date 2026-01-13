import { Camera, Users, Cog, AlertTriangle } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { AlertFeed } from '@/components/dashboard/AlertFeed';
import { CameraGrid } from '@/components/dashboard/CameraGrid';
import { AttendanceOverview } from '@/components/dashboard/AttendanceOverview';
import { NodeStatus } from '@/components/dashboard/NodeStatus';
import { AlertsChart } from '@/components/dashboard/AlertsChart';
import {
  mockCameras,
  mockAlerts,
  mockEmployees,
  mockNodes,
  mockDashboardSummary,
} from '@/lib/mockData';

export default function Dashboard() {
  const activeAlerts = mockAlerts.filter((a) => a.status === 'active');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Factory Overview</h1>
        <p className="text-muted-foreground">
          Real-time monitoring and analytics for your manufacturing floor
        </p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Cameras"
          value={mockCameras.filter((c) => c.status === 'online').length}
          subtitle={`${mockCameras.length} total cameras`}
          icon={Camera}
          trend={{ value: 5, isPositive: true }}
          variant="default"
        />
        <MetricCard
          title="Workers Present"
          value={mockEmployees.filter((e) => e.status === 'present').length}
          subtitle={`${mockEmployees.length} total employees`}
          icon={Users}
          trend={{ value: 2, isPositive: false }}
          variant="success"
        />
        <MetricCard
          title="Active Machines"
          value={mockDashboardSummary.activeMachines}
          subtitle="All systems operational"
          icon={Cog}
          variant="default"
        />
        <MetricCard
          title="Active Alerts"
          value={activeAlerts.length}
          subtitle={`${mockAlerts.filter((a) => a.severity === 'critical').length} critical`}
          icon={AlertTriangle}
          trend={{ value: 15, isPositive: false }}
          variant="danger"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Camera Grid */}
          <CameraGrid cameras={mockCameras} compact />

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AlertsChart />
            <NodeStatus nodes={mockNodes} />
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Alert Feed */}
          <AlertFeed alerts={mockAlerts} maxItems={5} />

          {/* Attendance Overview */}
          <AttendanceOverview employees={mockEmployees} />
        </div>
      </div>
    </div>
  );
}
