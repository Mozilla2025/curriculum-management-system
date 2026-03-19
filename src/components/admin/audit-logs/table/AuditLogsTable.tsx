'use client'

import { ChevronDown, Copy, Eye } from 'lucide-react'
import { useState } from 'react'
import type { AuditLog } from '@/types/audit-logs'

interface AuditLogsTableProps {
  logs: AuditLog[]
  onViewDetails?: (log: AuditLog) => void
}

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-800 border-green-300'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'error':
      return 'bg-red-100 text-red-800 border-red-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

const getSeverityBadgeColor = (severity: string) => {
  switch (severity) {
    case 'low':
      return 'bg-blue-100 text-blue-800'
    case 'medium':
      return 'bg-orange-100 text-orange-800'
    case 'high':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

const getActionLabel = (action: string) => {
  const actionMap: Record<string, string> = {
    CREATE: '➕ Created',
    UPDATE: '✏️ Updated',
    DELETE: '🗑️ Deleted',
    VIEW: '👁️ Viewed',
    EXPORT: '📤 Exported',
    LOGIN: '🔓 Login',
    LOGOUT: '🔒 Logout',
    PERMISSION_CHANGE: '🔐 Permission Changed',
    ROLE_CHANGE: '👤 Role Changed',
    SYSTEM_SETTING: '⚙️ Setting Changed',
    BULK_OPERATION: '🔄 Bulk Operation',
  }
  return actionMap[action] || action
}

export function AuditLogsTable({ logs, onViewDetails }: AuditLogsTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleCopy = (log: AuditLog, e: React.MouseEvent) => {
    e.stopPropagation()
    const logText = JSON.stringify(log, null, 2)
    navigator.clipboard.writeText(logText)
    setCopiedId(log.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Entity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Performed By
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">
                  {formatDate(log.timestamp)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="font-medium text-gray-900">
                    {getActionLabel(log.action)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{log.entityName}</p>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">
                      {log.entityType}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{log.performedBy.name}</p>
                    <p className="text-xs text-gray-600">{log.performedBy.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeColor(
                      log.status
                    )}`}
                  >
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getSeverityBadgeColor(
                      log.severity
                    )}`}
                  >
                    {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedId(expandedId === log.id ? null : log.id)
                        if (onViewDetails) onViewDetails(log)
                      }}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => handleCopy(log, e)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className={`w-4 h-4 ${copiedId === log.id ? 'text-green-600' : 'text-gray-600'}`} />
                    </button>
                    <button
                      onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                      className={`p-2 hover:bg-gray-200 rounded-lg transition-transform ${
                        expandedId === log.id ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expanded Details */}
      {expandedId !== null && logs.find((log) => log.id === expandedId) && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            {(() => {
              const log = logs.find((l) => l.id === expandedId)
              if (!log) return null

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                          Description
                        </p>
                        <p className="text-sm text-gray-900">{log.description}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                          IP Address
                        </p>
                        <p className="text-sm text-gray-900 font-mono">{log.ipAddress}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                          User Agent
                        </p>
                        <p className="text-xs text-gray-900 break-all">{log.userAgent}</p>
                      </div>

                      {log.affectedUser && (
                        <div>
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                            Affected User
                          </p>
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <p className="text-sm font-medium text-gray-900">{log.affectedUser.name}</p>
                            <p className="text-xs text-gray-600">{log.affectedUser.email}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                          Performed By
                        </p>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{log.performedBy.name}</p>
                          <p className="text-xs text-gray-600">{log.performedBy.email}</p>
                          <p className="text-xs text-gray-600 uppercase tracking-wide">
                            Role: {log.performedBy.role}
                          </p>
                        </div>
                      </div>

                      {log.changes && log.changes.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                            Changes
                          </p>
                          <div className="space-y-2">
                            {log.changes.map((change, idx) => (
                              <div key={idx} className="bg-white p-3 rounded border border-gray-200">
                                <p className="text-xs font-semibold text-gray-700 mb-1">
                                  {change.field}
                                </p>
                                <div className="text-xs space-y-1">
                                  <p>
                                    <span className="text-gray-600">Old: </span>
                                    <span className="font-mono text-red-700">{String(change.oldValue)}</span>
                                  </p>
                                  <p>
                                    <span className="text-gray-600">New: </span>
                                    <span className="font-mono text-green-700">{String(change.newValue)}</span>
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {log.metadata && Object.keys(log.metadata).length > 0 && (
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Metadata
                      </p>
                      <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-40">
                        {JSON.stringify(log.metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Empty State */}
      {logs.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-600 text-sm">No audit logs found.</p>
        </div>
      )}
    </div>
  )
}
