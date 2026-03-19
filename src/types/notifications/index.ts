export type NotificationType = 'system' | 'workflow' | 'reminder' | 'alert'
export type NotificationPriority = 'high' | 'medium' | 'low'
export type ToastType = 'success' | 'error' | 'info'

export interface Notification {
  id: number
  type: NotificationType
  priority: NotificationPriority
  title: string
  message: string
  time: string
  timestamp: Date
  unread: boolean
  urgent: boolean
  actions: string[]
}

export interface NotificationStats {
  unread: number
  urgent: number
  reminders: number
  system: number
}

export interface NotificationFilters {
  search: string
  type: string
  priority: string
  status: string
}

export interface NotificationToast {
  id: number
  message: string
  type: ToastType
}
