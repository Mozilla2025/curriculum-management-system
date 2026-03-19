import type { SystemAlert, SystemService } from '@/types/system-monitoring'

export const MOCK_ALERTS: SystemAlert[] = [
  {
    id: 1,
    type: 'warning',
    icon: 'fas fa-exclamation-triangle',
    title: 'High Memory Usage',
    message: 'Server memory usage is at 87%',
    time: '2 minutes ago',
  },
  {
    id: 2,
    type: 'info',
    icon: 'fas fa-info-circle',
    title: 'Scheduled Maintenance',
    message: 'Database backup completed successfully',
    time: '15 minutes ago',
  },
  {
    id: 3,
    type: 'critical',
    icon: 'fas fa-times-circle',
    title: 'Service Restart',
    message: 'Authentication service restarted due to timeout',
    time: '1 hour ago',
  },
]

export const MOCK_SERVICES: SystemService[] = [
  { name: 'Web Server', status: 'online', icon: 'fas fa-check-circle' },
  { name: 'Database', status: 'online', icon: 'fas fa-check-circle' },
  { name: 'API Gateway', status: 'online', icon: 'fas fa-check-circle' },
  { name: 'Cache Server', status: 'maintenance', icon: 'fas fa-tools' },
  { name: 'File Storage', status: 'online', icon: 'fas fa-check-circle' },
  { name: 'Load Balancer', status: 'online', icon: 'fas fa-check-circle' },
]

export const INITIAL_METRICS = {
  uptime: 99.8,
  responseTime: 142,
  activeUsers: 1247,
  errorRate: 0.03,
  cpuUsage: 45,
  memoryUsage: 72,
  diskUsage: 38,
  networkIO: 23,
}

export const ALERT_STYLES: Record<string, { container: string; iconColor: string }> = {
  warning: {
    container: 'border-l-4 border-l-amber-500 bg-amber-500/5',
    iconColor: 'text-amber-500',
  },
  info: {
    container: 'border-l-4 border-l-must-blue bg-must-blue/5',
    iconColor: 'text-must-blue',
  },
  critical: {
    container: 'border-l-4 border-l-red-500 bg-red-500/5',
    iconColor: 'text-red-500',
  },
}

export const SERVICE_STATUS_STYLES: Record<string, { dot: string; icon: string }> = {
  online: { dot: 'bg-must-green', icon: 'text-must-green' },
  maintenance: { dot: 'bg-amber-500', icon: 'text-amber-500' },
  offline: { dot: 'bg-red-500', icon: 'text-red-500' },
}

export const PROGRESS_STYLES: Record<string, string> = {
  healthy: 'bg-must-green',
  warning: 'bg-amber-500',
  critical: 'bg-red-500',
}

export const STATUS_INDICATOR_STYLES: Record<string, string> = {
  healthy: 'bg-must-green/10 text-must-green',
  warning: 'bg-amber-500/10 text-amber-500',
  critical: 'bg-red-500/10 text-red-500',
}
