import { useState } from 'react';
import { Users, Search, Filter, Download, UserCheck, UserX, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { mockEmployees, shifts, departments } from '@/lib/mockData';

const statusStyles = {
  present: 'bg-success/20 text-success border-success/30',
  absent: 'bg-destructive/20 text-destructive border-destructive/30',
  late: 'bg-warning/20 text-warning border-warning/30',
};

const statusIcons = {
  present: UserCheck,
  absent: UserX,
  late: Clock,
};

export default function Attendance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShift, setSelectedShift] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesShift = selectedShift === 'all' || employee.shift === selectedShift;
    const matchesDept = selectedDept === 'all' || employee.department === selectedDept;
    return matchesSearch && matchesShift && matchesDept;
  });

  const stats = {
    present: mockEmployees.filter((e) => e.status === 'present').length,
    absent: mockEmployees.filter((e) => e.status === 'absent').length,
    late: mockEmployees.filter((e) => e.status === 'late').length,
    total: mockEmployees.length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Attendance
          </h1>
          <p className="text-muted-foreground">
            Track employee attendance and work hours
          </p>
        </div>
        <Button size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
          <p className="text-3xl font-bold font-mono text-primary">{stats.total}</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Present</span>
          </div>
          <p className="text-3xl font-bold font-mono text-success">{stats.present}</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">Late</span>
          </div>
          <p className="text-3xl font-bold font-mono text-warning">{stats.late}</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <UserX className="w-4 h-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Absent</span>
          </div>
          <p className="text-3xl font-bold font-mono text-destructive">{stats.absent}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or ID..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedShift} onValueChange={setSelectedShift}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="All Shifts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Shifts</SelectItem>
            {shifts.map((shift) => (
              <SelectItem key={shift} value={shift}>{shift}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedDept} onValueChange={setSelectedDept}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Employee</TableHead>
              <TableHead className="text-muted-foreground">ID</TableHead>
              <TableHead className="text-muted-foreground">Department</TableHead>
              <TableHead className="text-muted-foreground">Shift</TableHead>
              <TableHead className="text-muted-foreground">Check-in</TableHead>
              <TableHead className="text-muted-foreground">Duration</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => {
              const StatusIcon = statusIcons[employee.status];
              return (
                <TableRow key={employee.employeeId} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {employee.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium">{employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground">
                    {employee.employeeId}
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.shift}</TableCell>
                  <TableCell className="font-mono">
                    {employee.presentTime}
                  </TableCell>
                  <TableCell className="font-mono">
                    {employee.presentDuration}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize',
                        statusStyles[employee.status]
                      )}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {employee.status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No employees found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
