import { BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { alertsPerHour } from '@/lib/mockData';

export function AlertsChart() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Alerts per Hour</h3>
        </div>
        <span className="text-xs text-muted-foreground">Today</span>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={alertsPerHour}>
            <defs>
              <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 15%, 18%)" />
            <XAxis
              dataKey="hour"
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(230, 20%, 10%)',
                border: '1px solid hsl(230, 15%, 22%)',
                borderRadius: '8px',
                color: 'hsl(210, 40%, 98%)',
              }}
              labelStyle={{ color: 'hsl(215, 20%, 55%)' }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="hsl(187, 100%, 50%)"
              strokeWidth={2}
              fill="url(#alertGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
