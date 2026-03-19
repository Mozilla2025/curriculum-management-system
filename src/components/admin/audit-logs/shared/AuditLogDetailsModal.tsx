'use client'

import { useState } from 'react'
import { X, Copy, Download, Share2 } from 'lucide-react'
import type { AuditLog } from '@/types/audit-logs'

interface AuditLogDetailsModalProps {
  log: AuditLog | null
  isOpen: boolean
  onClose: () => void
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'text-green-700 bg-green-50'
    case 'warning':
      return 'text-yellow-700 bg-yellow-50'
    case 'error':
      return 'text-red-700 bg-red-50'
    default:
      return 'text-gray-700 bg-gray-50'
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low':
      return 'text-blue-700 bg-blue-50'
    case 'medium':
      return 'text-orange-700 bg-orange-50'
    case 'high':
      return 'text-red-700 bg-red-50'
    default:
      return 'text-gray-700 bg-gray-50'
  }
}

const getActionIcon = (action: string) => {
  const icons: Record<string, string> = {
    CREATE: '➕',
    UPDATE: '✏️',
    DELETE: '🗑️',
    VIEW: '👁️',
    EXPORT: '📤',
    LOGIN: '🔓',
    LOGOUT: '🔒',
    PERMISSION_CHANGE: '🔐',
    ROLE_CHANGE: '👤',
    SYSTEM_SETTING: '⚙️',
    BULK_OPERATION: '🔄',
  }
  return icons[action] || '📝'
}

export function AuditLogDetailsModal({ log, isOpen, onClose }: AuditLogDetailsModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen || !log) return null

  const handleCopy = () => {
    const logText = JSON.stringify(log, null, 2)
    navigator.clipboard.writeText(logText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const logText = JSON.stringify(log, null, 2)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(logText))
    element.setAttribute('download', `audit-log-${log.id}.json`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShare = () => {
    const logText = `Audit Log #${log.id}: ${log.description}\nTimestamp: ${formatDate(log.timestamp)}\nPerformed by: ${log.performedBy.name}`
    if (navigator.share) {
      navigator.share({
        title: 'Audit Log',
        text: logText,
      })
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-must-green text-white p-6 flex items-start justify-between border-b border-green-700">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{getActionIcon(log.action)}</span>
                <div>
                  <h2 className="text-xl font-bold">{log.actionLabel}</h2>
                  <p className="text-sm text-white/80">Log ID: #{log.id}</p>
                </div>
              </div>
              <p className="text-sm text-white/70 mt-2">{log.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status and Severity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Status
                </label>
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm ${getStatusColor(
                    log.status
                  )}`}
                >
                  {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Severity
                </label>
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm ${getSeverityColor(
                    log.severity
                  )}`}
                >
                  {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                </div>
              </div>
            </div>

            {/* Timestamp and Entity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Timestamp
                </label>
                <p className="text-sm text-gray-900 font-mono">{formatDate(log.timestamp)}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Entity Type
                </label>
                <p className="text-sm text-gray-900 capitalize">
                  {log.entityType.replace('_', ' ')}
                </p>
              </div>
            </div>

            {/* Entity Details */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Entity Information
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Entity Name</p>
                  <p className="text-sm font-medium text-gray-900">{log.entityName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Entity ID</p>
                  <p className="text-sm font-mono text-gray-900">{log.entityId}</p>
                </div>
              </div>
            </div>

            {/* Performed By */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Performed By
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Name</p>
                  <p className="text-sm font-medium text-gray-900">{log.performedBy.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Email</p>
                  <p className="text-sm text-gray-900">{log.performedBy.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Role</p>
                  <p className="text-sm text-gray-900">{log.performedBy.role}</p>
                </div>
              </div>
            </div>

            {/* Affected User */}
            {log.affectedUser && (
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Affected User
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Name</p>
                    <p className="text-sm font-medium text-gray-900">{log.affectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="text-sm text-gray-900">{log.affectedUser.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Changes */}
            {log.changes && log.changes.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Changes Made
                </label>
                <div className="space-y-3">
                  {log.changes.map((change, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <p className="text-sm font-semibold text-gray-900 mb-2 capitalize">
                        {change.field.replace('_', ' ')}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-red-50 rounded p-2 border border-red-200">
                          <p className="text-xs text-red-700 font-semibold mb-1">Old Value</p>
                          <p className="text-sm font-mono text-red-900 break-all">
                            {String(change.oldValue)}
                          </p>
                        </div>
                        <div className="bg-green-50 rounded p-2 border border-green-200">
                          <p className="text-xs text-green-700 font-semibold mb-1">New Value</p>
                          <p className="text-sm font-mono text-green-900 break-all">
                            {String(change.newValue)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Network Information */}
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Network Information
              </label>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-600 mb-1">IP Address</p>
                  <p className="text-sm font-mono text-gray-900">{log.ipAddress}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">User Agent</p>
                  <p className="text-xs text-gray-900 break-all">{log.userAgent}</p>
                </div>
              </div>
            </div>

            {/* Metadata */}
            {log.metadata && Object.keys(log.metadata).length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Additional Metadata
                </label>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-auto max-h-40 font-mono">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Actions */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors font-semibold text-sm"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold text-sm ${
                  copied
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
                title="Copy log to clipboard"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors font-semibold text-sm"
                title="Download log as JSON"
              >
                <Download className="w-4 h-4" />
                Download
              </button>

              {typeof window !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors font-semibold text-sm"
                  title="Share log"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
