import type { ReportStatus, ReportIconColor } from '@/types/reports'

export function getStatusLabel(status: ReportStatus): string {
  const map: Record<ReportStatus, string> = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    pending: 'Pending',
  }
  return map[status]
}

export function getStatusBadgeClass(status: ReportStatus): string {
  const map: Record<ReportStatus, string> = {
    completed: 'bg-must-green/10 text-must-green-darker border border-must-green/20',
    'in-progress': 'bg-must-blue/10 text-must-blue border border-must-blue/20',
    pending: 'bg-must-gold/10 text-amber-700 border border-must-gold/20',
  }
  return map[status]
}

export function getIconColorClass(color: ReportIconColor): string {
  const map: Record<ReportIconColor, string> = {
    green: 'bg-must-green',
    blue: 'bg-must-blue',
    gold: 'bg-must-gold',
    red: 'bg-red-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
  }
  return map[color]
}

export function getAnalyticColorClasses(color: 'green' | 'blue' | 'gold' | 'red') {
  const map = {
    green: {
      border: 'border-must-green',
      bg: 'bg-must-green/5',
      text: 'text-must-green',
    },
    blue: {
      border: 'border-must-blue',
      bg: 'bg-must-blue/5',
      text: 'text-must-blue',
    },
    gold: {
      border: 'border-must-gold',
      bg: 'bg-must-gold/5',
      text: 'text-must-gold',
    },
    red: {
      border: 'border-red-500',
      bg: 'bg-red-500/5',
      text: 'text-red-500',
    },
  }
  return map[color]
}
