'use client'

import { useState, useCallback } from 'react'
import { UserPlus, Download, X, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MetricsCards }       from '@/components/admin/dashboard/MetricsCards'
import { WorkflowBottlenecks } from '@/components/admin/dashboard/WorkflowBottlenecks'
import { QuickActions }        from '@/components/admin/dashboard/QuickActions'
import { RecentActivity }      from '@/components/admin/dashboard/RecentActivity'
import { SystemAlerts }        from '@/components/admin/dashboard/SystemAlerts'
import { CreateUserModal }     from '@/components/admin/dashboard/CreateUserModal'
import { useCreateUser }       from '@/hooks/api/users'
import type { CreateUserRequest } from '@/types/user-management'

interface Toast {
  message: string
  type: 'success' | 'error'
}

export default function AdminDashboardOverview() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toast, setToast]                     = useState<Toast | null>(null)

  const { mutateAsync: createUser } = useCreateUser()

  const showToast = useCallback((message: string, type: Toast['type']) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 5000)
  }, [])

  const handleSubmitUser = useCallback(async (formData: {
    username: string; email: string; password: string; firstName: string; lastName: string
  }) => {
    const payload: CreateUserRequest = {
      username:  formData.username,
      email:     formData.email,
      password:  formData.password,
      firstName: formData.firstName,
      lastName:  formData.lastName,
    }
    await createUser(payload)
    showToast('User created successfully. Login details sent to their email.', 'success')
    setShowCreateModal(false)
  }, [createUser, showToast])

  return (
    <div className="space-y-6 animate-fade-in px-1 py-4 bg-must-green/[0.04] min-h-screen">

      {/* Toast */}
      {toast && (
        <div className={cn(
          'fixed top-4 right-4 left-4 md:left-auto md:max-w-md z-50',
          'bg-white rounded-lg shadow-xl border-l-4 animate-slide-in-right',
          toast.type === 'success' ? 'border-must-green' : 'border-red-500',
        )}>
          <div className="p-4 flex items-center gap-3">
            <div className={cn('flex-shrink-0', toast.type === 'success' ? 'text-must-green' : 'text-red-500')}>
              {toast.type === 'success'
                ? <CheckCircle className="w-5 h-5" />
                : <AlertCircle className="w-5 h-5" />}
            </div>
            <span className="flex-1 text-sm text-gray-700 font-medium">{toast.message}</span>
            <button onClick={() => setToast(null)} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Dismiss">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="border-l-4 border-must-green pl-3">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Complete system overview and management</p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-must-green text-white rounded-lg hover:bg-must-green-dark transition-all text-sm font-semibold shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            Create User
          </button>
          <button
            onClick={() => showToast('Report export started…', 'success')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* Metrics — self-fetching */}
      <MetricsCards />

      {/* Workflow + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <WorkflowBottlenecks />
        <QuickActions />
      </div>

      {/* Recent Activity + System Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <SystemAlerts />
      </div>

      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleSubmitUser}
      />
    </div>
  )
}
