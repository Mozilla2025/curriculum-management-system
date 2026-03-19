'use client'

import { Shield, RefreshCw } from 'lucide-react'

interface AuditLogsPageHeaderProps {
  onRefresh?: () => void
  isRefreshing?: boolean
}

export function AuditLogsPageHeader({ onRefresh, isRefreshing = false }: AuditLogsPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-must-gold/10 rounded-lg">
            <Shield className="w-6 h-6 text-must-gold" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
            <p className="text-sm text-gray-600 mt-1">
              Track all system activities, user actions, and compliance events
            </p>
          </div>
        </div>
      </div>

      {onRefresh && (
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-must-gold text-gray-900 rounded-lg hover:bg-must-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      )}
    </div>
  )
}
