'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { RotateCw, UserPlus, Download, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Import admin dashboard components (to be created)
import { MetricsCards } from '../../../components/admin/dashboard/MetricsCards'
import { WorkflowBottlenecks } from '../../../components/admin/dashboard/WorkflowBottlenecks'
import { QuickActions } from '../../../components/admin/dashboard/QuickActions'
import { RecentActivity } from '../../../components/admin/dashboard/RecentActivity'
import { SystemAlerts } from '../../../components/admin/dashboard/SystemAlerts'
import { CreateUserModal } from '../../../components/admin/dashboard/CreateUserModal'

interface CurriculumStats {
  total: number
  approved: number
  inProgress: number
  overdue: number
  approvalRate: number
  breakdown: {
    pending: number
    underReview: number
    draft: number
  }
}

interface Notification {
  show: boolean
  message: string
  type: 'success' | 'error' | ''
}

export default function AdminDashboardOverview() {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false)
  const [curriculumStats, setCurriculumStats] = useState<CurriculumStats>({
    total: 0,
    approved: 0,
    inProgress: 0,
    overdue: 0,
    approvalRate: 0,
    breakdown: {
      pending: 0,
      underReview: 0,
      draft: 0
    }
  })
  const [statsLoading, setStatsLoading] = useState(true)
  const [notification, setNotification] = useState<Notification>({
    show: false,
    message: '',
    type: ''
  })

  // Responsive state management
  const [screenSize, setScreenSize] = useState('desktop')

  // Check screen size
  const checkScreenSize = useCallback(() => {
    const width = window.innerWidth

    if (width < 768) {
      setScreenSize('mobile')
    } else if (width < 1024) {
      setScreenSize('tablet')
    } else if (width < 1440) {
      setScreenSize('desktop')
    } else {
      setScreenSize('large')
    }
  }, [])

  // Screen size effect
  useEffect(() => {
    checkScreenSize()
    const handleResize = () => checkScreenSize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [checkScreenSize])

  // Load curriculum stats
  const loadCurriculumStats = useCallback(async () => {
    try {
      setStatsLoading(true)
      
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data - replace with actual data
      const mockStats: CurriculumStats = {
        total: 247,
        approved: 189,
        inProgress: 48,
        overdue: 10,
        approvalRate: 76,
        breakdown: {
          pending: 24,
          underReview: 18,
          draft: 6
        }
      }
      
      setCurriculumStats(mockStats)
    } catch (error) {
      console.error('Error loading curriculum statistics:', error)
      showNotification('Failed to load curriculum statistics', 'error')
    } finally {
      setStatsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCurriculumStats()
  }, [loadCurriculumStats])

  const handleCreateUser = useCallback(() => {
    setShowCreateUserModal(true)
  }, [])

  const handleExportReport = useCallback(() => {
    showNotification('Report export started...', 'success')
  }, [])

  const showNotification = useCallback((message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' })
    }, 5000)
  }, [])

  const handleSubmitUser = useCallback(async (formData: { username: string; email: string; password: string; firstName: string; lastName: string }) => {
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      showNotification('User created successfully! Login details have been sent to their email.', 'success')
      setShowCreateUserModal(false)
    } catch (error) {
      console.error('Error creating user:', error)
      showNotification('Network error. Please check your connection and try again.', 'error')
    }
  }, [showNotification])

  const refreshStats = useCallback(async () => {
    try {
      await loadCurriculumStats()
      showNotification('Statistics refreshed successfully', 'success')
    } catch (error) {
      console.error('Error refreshing statistics:', error)
      showNotification('Failed to refresh statistics', 'error')
    }
  }, [loadCurriculumStats, showNotification])

  const gridConfig = useMemo(() => {
    switch (screenSize) {
      case 'mobile':
        return { workflowCols: 'grid-cols-1', activityCols: 'grid-cols-1', gap: 'gap-4' }
      case 'tablet':
        return { workflowCols: 'grid-cols-1', activityCols: 'grid-cols-1', gap: 'gap-6' }
      case 'desktop':
        return { workflowCols: 'lg:grid-cols-[2fr_1fr]', activityCols: 'lg:grid-cols-2', gap: 'gap-6' }
      case 'large':
        return { workflowCols: 'lg:grid-cols-[2fr_1fr]', activityCols: 'lg:grid-cols-2', gap: 'gap-8' }
      default:
        return { workflowCols: 'lg:grid-cols-[2fr_1fr]', activityCols: 'lg:grid-cols-2', gap: 'gap-6' }
    }
  }, [screenSize])

  return (
    <div className="space-y-6 animate-fade-in">
        {/* Notification */}
        {notification.show && (
          <div className={cn(
            'fixed top-4 right-4 left-4 md:left-auto md:max-w-md z-50',
            'bg-white rounded-lg shadow-xl border-l-4 animate-slide-in-right',
            notification.type === 'success' ? 'border-green-500' : 'border-red-500'
          )}>
            <div className="p-4 flex items-center gap-3">
              <div className={cn(
                'flex-shrink-0',
                notification.type === 'success' ? 'text-green-500' : 'text-red-500'
              )}>
                {notification.type === 'success' ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <span className="flex-1 text-sm text-gray-700 font-medium">{notification.message}</span>
              <button
                onClick={() => setNotification({ show: false, message: '', type: '' })}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Header */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Complete system overview and management
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={handleCreateUser}
                className="flex items-center gap-2 px-4 py-2.5 bg-must-green text-white rounded-lg hover:bg-must-green-dark transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create User</span>
              </button>
              
              <button
                onClick={handleExportReport}
                className="flex items-center gap-2 px-4 py-2.5 bg-must-blue text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export Report</span>
                <span className="sm:hidden">Export</span>
              </button>
              
              <button
                onClick={refreshStats}
                disabled={statsLoading}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-must-green hover:bg-must-green-lighter/20 transition-all duration-300 font-semibold text-sm disabled:opacity-60"
              >
                <RotateCw className={cn('w-4 h-4', statsLoading && 'animate-spin')} />
                <span className="hidden sm:inline">Refresh Stats</span>
                <span className="sm:hidden">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <MetricsCards
          curriculumStats={curriculumStats}
          statsLoading={statsLoading}
          onRefreshStats={refreshStats}
        />

        {/* Workflow Status and Quick Actions */}
        <div className={cn('grid', gridConfig.workflowCols, gridConfig.gap)}>
          <WorkflowBottlenecks curriculumStats={curriculumStats} />
          <QuickActions />
        </div>

        {/* Recent Activity and System Alerts */}
        <div className={cn('grid', gridConfig.activityCols, gridConfig.gap)}>
          <RecentActivity />
          <SystemAlerts />
        </div>

        {/* Create User Modal */}
        <CreateUserModal
          isOpen={showCreateUserModal}
          onClose={() => setShowCreateUserModal(false)}
          onSubmit={handleSubmitUser}
        />
      </div>
  )
}