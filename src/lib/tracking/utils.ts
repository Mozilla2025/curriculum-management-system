import { TRACKING_STAGES } from './constants'
import type { CurriculumTracking } from '@/types/tracking'

export function getStatusInfo(status: string) {
  const map: Record<string, { label: string; icon: string; color: string; bgColor: string }> = {
    under_review:     { label: 'Under Review',     icon: 'fas fa-search',          color: '#3b82f6', bgColor: 'rgba(59,130,246,0.1)' },
    pending_approval: { label: 'Pending Approval', icon: 'fas fa-clock',           color: '#f59e0b', bgColor: 'rgba(245,158,11,0.1)' },
    on_hold:          { label: 'On Hold',          icon: 'fas fa-pause-circle',    color: '#f59e0b', bgColor: 'rgba(245,158,11,0.1)' },
    completed:        { label: 'Completed',        icon: 'fas fa-check-circle',    color: '#10b981', bgColor: 'rgba(16,185,129,0.1)' },
    rejected:         { label: 'Rejected',         icon: 'fas fa-times-circle',    color: '#ef4444', bgColor: 'rgba(239,68,68,0.1)'  },
    pending:          { label: 'Pending',          icon: 'fas fa-hourglass-start', color: '#6b7280', bgColor: 'rgba(107,114,128,0.1)' },
  }
  return map[status] ?? { label: status, icon: 'fas fa-circle', color: '#6b7280', bgColor: 'rgba(107,114,128,0.1)' }
}

export function getStatusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    under_review:     'bg-blue-100 text-blue-700 border border-blue-200',
    pending_approval: 'bg-amber-100 text-amber-700 border border-amber-200',
    on_hold:          'bg-amber-100 text-amber-700 border border-amber-200',
    completed:        'bg-emerald-100 text-emerald-700 border border-emerald-200',
    rejected:         'bg-red-100 text-red-700 border border-red-200',
    pending:          'bg-gray-100 text-gray-700 border border-gray-200',
  }
  return map[status] ?? 'bg-gray-100 text-gray-600 border border-gray-200'
}

export function getStageIndex(stageKey: string): number {
  return TRACKING_STAGES.findIndex((s) => s.key === stageKey)
}

export function getStageProgress(stageKey: string): number {
  const idx = getStageIndex(stageKey)
  return idx < 0 ? 0 : ((idx + 1) / TRACKING_STAGES.length) * 100
}

export function formatTrackingDate(date?: string): string {
  if (!date) return 'N/A'
  try { return new Date(date).toLocaleDateString('en-CA') } catch { return 'N/A' }
}

export function formatTrackingDateTime(date?: string): string {
  if (!date) return 'N/A'
  try { return new Date(date).toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short' }) } catch { return 'N/A' }
}

export function getDaysInStage(startDate?: string): number {
  if (!startDate) return 0
  return Math.floor((Date.now() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
}

export function truncateText(text?: string, maxLen = 50): string {
  if (!text) return ''
  return text.length <= maxLen ? text : `${text.slice(0, maxLen)}…`
}

export function getFileIcon(contentType: string): string {
  if (contentType.includes('pdf'))   return 'fas fa-file-pdf'
  if (contentType.includes('word') || contentType.includes('doc')) return 'fas fa-file-word'
  if (contentType.includes('sheet') || contentType.includes('excel') || contentType.includes('xls')) return 'fas fa-file-excel'
  if (contentType.includes('image')) return 'fas fa-file-image'
  if (contentType.includes('zip') || contentType.includes('archive')) return 'fas fa-file-archive'
  return 'fas fa-file-alt'
}

export function getFileIconColor(contentType: string): string {
  if (contentType.includes('pdf'))   return '#ef4444'
  if (contentType.includes('word') || contentType.includes('doc')) return '#2563eb'
  if (contentType.includes('sheet') || contentType.includes('excel')) return '#16a34a'
  if (contentType.includes('image')) return '#7c3aed'
  return '#6b7280'
}

export function formatFileSize(bytes?: number): string {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let size = bytes
  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++ }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

export function getPriorityColor(priority?: string): string {
  if (priority === 'high')   return 'text-red-600'
  if (priority === 'medium') return 'text-amber-600'
  return 'text-gray-500'
}

export function getPriorityBadgeClass(priority?: string): string {
  if (priority === 'high')   return 'bg-red-100 text-red-700 border border-red-200'
  if (priority === 'medium') return 'bg-amber-100 text-amber-700 border border-amber-200'
  return 'bg-gray-100 text-gray-600 border border-gray-200'
}

export function canTakeStageAction(status?: string): boolean {
  return ['under_review', 'on_hold'].includes(status ?? '')
}

export function getUniqueValues(curricula: CurriculumTracking[], field: keyof CurriculumTracking): string[] {
  return [...new Set(curricula.map((c) => String(c[field] ?? '')).filter(Boolean))].sort()
}
