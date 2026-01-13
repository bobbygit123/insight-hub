// Mock data matching your API structure for Vision Analytics Dashboard

export interface Camera {
  id: string;
  name: string;
  location: string;
  ipAddress: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: string;
  streamUrl: string;
  assignedZones: string[];
  recordingStatus: boolean;
}

export interface EdgeNode {
  id: string;
  name: string;
  ipAddress: string;
  status: 'online' | 'offline' | 'warning';
  uptime: string;
  assignedCameras: number;
  metrics: {
    cpu: number;
    gpu: number;
    memory: number;
    temperature: number;
    diskUsage: number;
  };
}

export interface Employee {
  employeeId: string;
  name: string;
  department: string;
  shift: string;
  status: 'present' | 'absent' | 'late';
  presentTime: string;
  presentDuration: string;
  avatar?: string;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  message: string;
  timestamp: string;
  relatedEntity: {
    type: 'worker' | 'machine' | 'camera' | 'zone';
    id: string;
    name: string;
  };
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface DashboardSummary {
  totalCameras: number;
  totalWorkers: number;
  activeMachines: number;
  activeAlerts: number;
  cameraDetails: { status: string; id: string }[];
  workerDetails: { status: string; count: number }[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
  avatar?: string;
}

// Mock Cameras
export const mockCameras: Camera[] = [
  { id: 'CAM-001', name: 'Assembly Line A', location: 'Floor 1, Zone A', ipAddress: '192.168.1.101', status: 'online', lastSeen: new Date().toISOString(), streamUrl: '/stream/cam001', assignedZones: ['zone-a1', 'zone-a2'], recordingStatus: true },
  { id: 'CAM-002', name: 'Assembly Line B', location: 'Floor 1, Zone B', ipAddress: '192.168.1.102', status: 'online', lastSeen: new Date().toISOString(), streamUrl: '/stream/cam002', assignedZones: ['zone-b1'], recordingStatus: true },
  { id: 'CAM-003', name: 'Packaging Unit', location: 'Floor 2, Zone C', ipAddress: '192.168.1.103', status: 'offline', lastSeen: new Date(Date.now() - 3600000).toISOString(), streamUrl: '/stream/cam003', assignedZones: ['zone-c1'], recordingStatus: false },
  { id: 'CAM-004', name: 'Quality Control', location: 'Floor 2, Zone D', ipAddress: '192.168.1.104', status: 'online', lastSeen: new Date().toISOString(), streamUrl: '/stream/cam004', assignedZones: ['zone-d1', 'zone-d2'], recordingStatus: true },
  { id: 'CAM-005', name: 'Warehouse Entry', location: 'Warehouse', ipAddress: '192.168.1.105', status: 'online', lastSeen: new Date().toISOString(), streamUrl: '/stream/cam005', assignedZones: ['zone-w1'], recordingStatus: true },
  { id: 'CAM-006', name: 'Loading Dock', location: 'Warehouse', ipAddress: '192.168.1.106', status: 'away', lastSeen: new Date(Date.now() - 600000).toISOString(), streamUrl: '/stream/cam006', assignedZones: ['zone-w2'], recordingStatus: true },
];

// Mock Edge Nodes
export const mockNodes: EdgeNode[] = [
  { id: 'NODE-001', name: 'Edge Server Alpha', ipAddress: '192.168.1.10', status: 'online', uptime: '15d 8h 32m', assignedCameras: 3, metrics: { cpu: 45, gpu: 62, memory: 58, temperature: 52, diskUsage: 34 } },
  { id: 'NODE-002', name: 'Edge Server Beta', ipAddress: '192.168.1.11', status: 'online', uptime: '12d 4h 15m', assignedCameras: 2, metrics: { cpu: 38, gpu: 71, memory: 45, temperature: 48, diskUsage: 28 } },
  { id: 'NODE-003', name: 'Edge Server Gamma', ipAddress: '192.168.1.12', status: 'warning', uptime: '3d 2h 45m', assignedCameras: 1, metrics: { cpu: 82, gpu: 88, memory: 78, temperature: 68, diskUsage: 72 } },
];

// Mock Employees
export const mockEmployees: Employee[] = [
  { employeeId: 'EMP-001', name: 'Rajesh Kumar', department: 'Assembly', shift: 'Morning', status: 'present', presentTime: '08:02:00', presentDuration: '4h 32m' },
  { employeeId: 'EMP-002', name: 'Priya Sharma', department: 'Quality', shift: 'Morning', status: 'present', presentTime: '07:55:00', presentDuration: '4h 39m' },
  { employeeId: 'EMP-003', name: 'Amit Patel', department: 'Packaging', shift: 'Morning', status: 'late', presentTime: '08:45:00', presentDuration: '3h 49m' },
  { employeeId: 'EMP-004', name: 'Sunita Devi', department: 'Assembly', shift: 'Morning', status: 'present', presentTime: '08:00:00', presentDuration: '4h 34m' },
  { employeeId: 'EMP-005', name: 'Mohammed Ali', department: 'Warehouse', shift: 'Morning', status: 'absent', presentTime: '-', presentDuration: '-' },
  { employeeId: 'EMP-006', name: 'Neha Gupta', department: 'Quality', shift: 'Morning', status: 'present', presentTime: '07:58:00', presentDuration: '4h 36m' },
  { employeeId: 'EMP-007', name: 'Vikram Singh', department: 'Assembly', shift: 'Morning', status: 'present', presentTime: '08:01:00', presentDuration: '4h 33m' },
  { employeeId: 'EMP-008', name: 'Kavitha Rao', department: 'Packaging', shift: 'Morning', status: 'present', presentTime: '07:56:00', presentDuration: '4h 38m' },
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  { id: 'ALT-001', severity: 'critical', type: 'ZONE_VIOLATION', message: 'Worker detected in restricted zone without PPE', timestamp: new Date(Date.now() - 120000).toISOString(), relatedEntity: { type: 'worker', id: 'EMP-003', name: 'Amit Patel' }, status: 'active' },
  { id: 'ALT-002', severity: 'high', type: 'PHONE_USAGE', message: 'Extended phone usage detected at workstation', timestamp: new Date(Date.now() - 300000).toISOString(), relatedEntity: { type: 'zone', id: 'zone-a1', name: 'Assembly Line A' }, status: 'active' },
  { id: 'ALT-003', severity: 'medium', type: 'IDLE_TIME', message: 'Worker idle for more than 15 minutes', timestamp: new Date(Date.now() - 600000).toISOString(), relatedEntity: { type: 'worker', id: 'EMP-004', name: 'Sunita Devi' }, status: 'acknowledged' },
  { id: 'ALT-004', severity: 'low', type: 'CAMERA_STATUS', message: 'Camera CAM-003 connection unstable', timestamp: new Date(Date.now() - 900000).toISOString(), relatedEntity: { type: 'camera', id: 'CAM-003', name: 'Packaging Unit' }, status: 'active' },
  { id: 'ALT-005', severity: 'high', type: 'MACHINE_UNATTENDED', message: 'Machine M-104 left unattended for 10+ minutes', timestamp: new Date(Date.now() - 1200000).toISOString(), relatedEntity: { type: 'machine', id: 'M-104', name: 'CNC Machine 4' }, status: 'resolved' },
  { id: 'ALT-006', severity: 'critical', type: 'SAFETY_VIOLATION', message: 'No safety helmet detected in hazard zone', timestamp: new Date(Date.now() - 60000).toISOString(), relatedEntity: { type: 'zone', id: 'zone-d1', name: 'Quality Control' }, status: 'active' },
];

// Mock Users
export const mockUsers: User[] = [
  { id: 'USR-001', username: 'admin', email: 'admin@innovex.com', role: 'admin', status: 'active', lastLogin: new Date().toISOString(), createdAt: '2024-01-15T00:00:00Z' },
  { id: 'USR-002', username: 'supervisor1', email: 'supervisor1@innovex.com', role: 'operator', status: 'active', lastLogin: new Date(Date.now() - 3600000).toISOString(), createdAt: '2024-02-20T00:00:00Z' },
  { id: 'USR-003', username: 'viewer1', email: 'viewer1@innovex.com', role: 'viewer', status: 'active', lastLogin: new Date(Date.now() - 86400000).toISOString(), createdAt: '2024-03-10T00:00:00Z' },
];

// Dashboard Summary
export const mockDashboardSummary: DashboardSummary = {
  totalCameras: 6,
  totalWorkers: 8,
  activeMachines: 12,
  activeAlerts: 4,
  cameraDetails: mockCameras.map(c => ({ status: c.status, id: c.id })),
  workerDetails: [
    { status: 'present', count: 6 },
    { status: 'absent', count: 1 },
    { status: 'late', count: 1 },
  ],
};

// Activity Feed
export const mockActivityFeed = [
  { type: 'alert', severity: 'critical', message: 'Safety violation detected in Zone D', timestamp: new Date(Date.now() - 60000).toISOString() },
  { type: 'attendance', severity: 'info', message: 'Rajesh Kumar checked in at 08:02', timestamp: new Date(Date.now() - 120000).toISOString() },
  { type: 'camera', severity: 'warning', message: 'CAM-003 went offline', timestamp: new Date(Date.now() - 180000).toISOString() },
  { type: 'system', severity: 'info', message: 'Edge Node Alpha metrics updated', timestamp: new Date(Date.now() - 240000).toISOString() },
  { type: 'alert', severity: 'high', message: 'Phone usage detected at Assembly Line A', timestamp: new Date(Date.now() - 300000).toISOString() },
];

// Shifts
export const shifts = ['Morning', 'Afternoon', 'Night'];

// Departments
export const departments = ['Assembly', 'Quality', 'Packaging', 'Warehouse', 'Maintenance'];

// Alert stats for charts
export const alertsPerHour = [
  { hour: '06:00', count: 2 },
  { hour: '07:00', count: 5 },
  { hour: '08:00', count: 8 },
  { hour: '09:00', count: 12 },
  { hour: '10:00', count: 7 },
  { hour: '11:00', count: 4 },
  { hour: '12:00', count: 3 },
];

// Report types
export const reportTypes = [
  { id: 'daily_attendance', name: 'Daily Attendance Report', description: 'Complete attendance summary for the day' },
  { id: 'violations', name: 'Violations Report', description: 'All safety and zone violations' },
  { id: 'machine_utilization', name: 'Machine Utilization', description: 'Machine usage and downtime analytics' },
  { id: 'camera_uptime', name: 'Camera Uptime Report', description: 'Camera availability and issues' },
  { id: 'weekly_summary', name: 'Weekly Summary', description: 'Comprehensive weekly overview' },
];
