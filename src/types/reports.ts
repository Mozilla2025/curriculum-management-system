export type ReportStatus = 'completed' | 'in-progress' | 'pending'

export type ReportIconColor =
  | 'green'
  | 'blue'
  | 'gold'
  | 'red'
  | 'purple'
  | 'orange'

export interface ReportCard {
  id: string
  icon: string
  title: string
  description: string
  statNumber: string
  statLabel: string
  iconColor: ReportIconColor
}

export interface RecentReport {
  id: string
  name: string
  type: string
  generatedBy: string
  date: string
  status: ReportStatus
}

export interface ReportFilters {
  academicYear: string
  school: string
  status: string
  reportType: string
}

export interface QuickAnalyticItem {
  number: number
  label: string
  color: 'green' | 'blue' | 'gold' | 'red'
}

export interface ReportNotification {
  show: boolean
  message: string
  type: 'success' | 'error' | 'info'
}
