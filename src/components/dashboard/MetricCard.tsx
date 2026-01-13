import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-destructive',
};

const iconBgStyles = {
  default: 'bg-primary/10',
  success: 'bg-success/10',
  warning: 'bg-warning/10',
  danger: 'bg-destructive/10',
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
}: MetricCardProps) {
  return (
    <div className="metric-card group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className={cn('text-3xl font-bold font-mono', variantStyles[variant])}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.isPositive ? 'text-success' : 'text-destructive'
                )}
              >
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground">vs yesterday</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110',
            iconBgStyles[variant]
          )}
        >
          <Icon className={cn('w-6 h-6', variantStyles[variant])} />
        </div>
      </div>
    </div>
  );
}
