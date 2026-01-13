import { FileText, Download, Calendar, Clock, Plus, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { reportTypes } from '@/lib/mockData';

const recentReports = [
  { id: 'RPT-001', name: 'Daily Attendance Report', type: 'daily_attendance', generatedAt: '2024-01-15T08:00:00Z', size: '2.4 MB' },
  { id: 'RPT-002', name: 'Weekly Violations Summary', type: 'violations', generatedAt: '2024-01-14T00:00:00Z', size: '1.8 MB' },
  { id: 'RPT-003', name: 'Machine Utilization Report', type: 'machine_utilization', generatedAt: '2024-01-13T12:00:00Z', size: '3.2 MB' },
];

const scheduledReports = [
  { id: 'SCH-001', name: 'Daily Attendance', schedule: 'Every day at 8:00 AM', nextRun: 'Tomorrow 8:00 AM', status: 'active' },
  { id: 'SCH-002', name: 'Weekly Summary', schedule: 'Every Monday at 9:00 AM', nextRun: 'Monday 9:00 AM', status: 'active' },
  { id: 'SCH-003', name: 'Monthly Analytics', schedule: '1st of every month', nextRun: 'Feb 1, 2024', status: 'paused' },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Reports
          </h1>
          <p className="text-muted-foreground">
            Generate and schedule automated reports
          </p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Report
        </Button>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Generate Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              className="glass-card p-4 cursor-pointer transition-all hover:border-primary/50 hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <Button size="sm" variant="ghost">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="font-medium mb-1">{report.name}</h3>
              <p className="text-sm text-muted-foreground">{report.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <div className="glass-card p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{report.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono">{report.id}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {new Date(report.generatedAt).toLocaleDateString()}
                  </span>
                  <Button size="icon" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Scheduled Reports</h2>
            <Button size="sm" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
          <div className="space-y-3">
            {scheduledReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      report.status === 'active' ? 'bg-success/10' : 'bg-muted'
                    }`}
                  >
                    {report.status === 'active' ? (
                      <Clock className="w-5 h-5 text-success" />
                    ) : (
                      <Pause className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{report.name}</h4>
                    <p className="text-xs text-muted-foreground">{report.schedule}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Next run</p>
                  <p className="text-sm font-mono">{report.nextRun}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
