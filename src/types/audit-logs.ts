export type AuditActionType =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'VIEW'
  | 'EXPORT'
  | 'LOGIN'
  | 'LOGOUT'
  | 'PERMISSION_CHANGE'
  | 'ROLE_CHANGE'
  | 'SYSTEM_SETTING'
  | 'BULK_OPERATION'

export type AuditEntityType =
  | 'user'
  | 'curriculum'
  | 'course'
  | 'department'
  | 'permission'
  | 'role'
  | 'system_setting'
  | 'report'

export type AuditStatus = 'success' | 'warning' | 'error'

export interface AuditLog {
  id: number
  timestamp: Date
  action: AuditActionType
  actionLabel: string
  entityType: AuditEntityType
  entityName: string
  entityId: string | number
  performedBy: {
    id: number
    name: string
    email: string
    role: string
  }
  affectedUser?: {
    id: number
    name: string
    email: string
  }
  changes?: {
    field: string
    oldValue: string | number | boolean
    newValue: string | number | boolean
  }[]
  ipAddress: string
  userAgent: string
  status: AuditStatus
  severity: 'low' | 'medium' | 'high'
  description: string
  metadata?: Record<string, any>
}

export interface AuditLogsFilters {
  search: string
  action: string
  entityType: string
  status: string
  severity: string
  dateRange: {
    startDate: string
    endDate: string
  }
  performedBy: string
}

export interface AuditLogsStats {
  totalActions: number
  successfulActions: number
  failedActions: number
  warningActions: number
  criticalActionsToday: number
}
