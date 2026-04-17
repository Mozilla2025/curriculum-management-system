export type AlertType = 'warning' | 'info' | 'critical'
export type ServiceStatus = 'online' | 'offline' | 'maintenance'
export type ResourceHealthType = 'healthy' | 'warning' | 'critical'
export type StatusIndicatorVariant = 'healthy' | 'warning' | 'critical'

export interface SystemMetrics {
  uptime: number
  responseTime: number
  activeUsers: number
  errorRate: number
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkIO: number
}

export interface SystemAlert {
  id: number
  type: AlertType
  icon: string
  title: string
  message: string
  time: string
}

export interface SystemService {
  name: string
  status: ServiceStatus
  icon: string
}

export interface ResourceItem {
  name: string
  details: string
  percentage: number
  healthType: ResourceHealthType
}

export interface DatabaseMetric {
  name: string
  details: string
  value: string
  colorClass: string
}

export interface SecurityMetric {
  name: string
  details: string
  value: string
  colorClass: string
}

export interface MetricCardConfig {
  id: number
  title: string
  value: string
  trend: string
  colorClass: string
  borderColorClass: string
  textColorClass: string
  bgColorClass: string
  changeType: 'up' | 'down'
}

/**
 * Stats Summary Response
 * Contains high-level system statistics
 */
export interface StatsSummary {
  totalSchools: number
  totalDepartments: number
  totalCurriculums: number
}

/**
 * API Response wrapper for stats endpoint
 */
export interface StatsSummaryResponse {
  message: string
  data: StatsSummary
}
