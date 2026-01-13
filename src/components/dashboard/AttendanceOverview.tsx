import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Employee } from '@/lib/mockData';

interface AttendanceOverviewProps {
  employees: Employee[];
}

export function AttendanceOverview({ employees }: AttendanceOverviewProps) {
  const present = employees.filter((e) => e.status === 'present').length;
  const absent = employees.filter((e) => e.status === 'absent').length;
  const late = employees.filter((e) => e.status === 'late').length;
  const total = employees.length;
  const attendanceRate = Math.round((present / total) * 100);

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Attendance Overview</h3>
        </div>
        <span className="text-sm font-mono text-primary">{attendanceRate}%</span>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 rounded-full bg-secondary mb-4 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-success rounded-full transition-all duration-500"
          style={{ width: `${(present / total) * 100}%` }}
        />
        <div
          className="absolute top-0 h-full bg-warning rounded-full transition-all duration-500"
          style={{ 
            left: `${(present / total) * 100}%`,
            width: `${(late / total) * 100}%` 
          }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 rounded-lg bg-success/10">
          <UserCheck className="w-5 h-5 text-success mx-auto mb-1" />
          <p className="text-2xl font-bold font-mono text-success">{present}</p>
          <p className="text-xs text-muted-foreground">Present</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-warning/10">
          <Clock className="w-5 h-5 text-warning mx-auto mb-1" />
          <p className="text-2xl font-bold font-mono text-warning">{late}</p>
          <p className="text-xs text-muted-foreground">Late</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-destructive/10">
          <UserX className="w-5 h-5 text-destructive mx-auto mb-1" />
          <p className="text-2xl font-bold font-mono text-destructive">{absent}</p>
          <p className="text-xs text-muted-foreground">Absent</p>
        </div>
      </div>

      {/* Recent check-ins */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3">Recent Check-ins</p>
        <div className="space-y-2">
          {employees
            .filter((e) => e.status === 'present')
            .slice(0, 3)
            .map((employee) => (
              <div
                key={employee.employeeId}
                className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {employee.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{employee.department}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {employee.presentTime}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
